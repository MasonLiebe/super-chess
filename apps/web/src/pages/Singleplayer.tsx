import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useChessEngine } from '../hooks/useChessEngine';
import { useGameStore } from '../stores/gameStore';
import { useEditorStore } from '../stores/editorStore';
import { PREBUILT_GAMES, DEFAULT_GAME } from '../prebuilt_games';
import type { GameState, Turn, Piece } from '../types/chess';

export function Singleplayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isReady, error, getState, makeMove, getMovesFrom, playAiMove, isInCheck, setState } = useChessEngine();
  const { setMovesFrom, setSelectedSquare } = useGameStore();
  const editorStore = useEditorStore();

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [previewState, setPreviewState] = useState<GameState>(DEFAULT_GAME.state);
  const [selectedGameId, setSelectedGameId] = useState(DEFAULT_GAME.id);
  const [status, setStatus] = useState('Loading engine...');
  const [lastTurn, setLastTurn] =  useState<Turn | null>(null);
  const [inCheckKings, setInCheckKings] = useState<Piece[] | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCustomGame, setIsCustomGame] = useState(false);

  // Check if we're loading a custom game from the editor
  useEffect(() => {
    const fromEditor = searchParams.get('from') === 'editor';
    if (fromEditor) {
      const customState = editorStore.getGameState();
      if (customState.pieces.length > 0) {
        setPreviewState(customState);
        setSelectedGameId('custom');
        setIsCustomGame(true);
      }
    }
  }, [searchParams, editorStore]);

  // Initialize when engine is ready
  useEffect(() => {
    if (isReady && !gameStarted) {
      setStatus('Select a game variant and click Start Game');
    }
  }, [isReady, gameStarted]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setStatus(`Error: ${error.message}`);
    }
  }, [error]);

  // Handle game selection change
  const handleGameSelect = useCallback((gameId: string) => {
    if (gameId === 'custom') {
      // Keep current custom state
      return;
    }
    const game = PREBUILT_GAMES.find((g) => g.id === gameId);
    if (game) {
      setSelectedGameId(gameId);
      setPreviewState(game.state);
      setIsCustomGame(false);
    }
  }, []);

  const startGame = useCallback(() => {
    if (!isReady) return;

    const success = setState(previewState);

    if (success) {
      const state = getState();
      if (state) {
        setGameState(state);
        setGameStarted(true);
        setStatus('Your turn (White)');
        setWinner(null);
        setLastTurn(null);
        setInCheckKings(null);
      }
    } else {
      setStatus('Failed to start game. Please try a different variant.');
    }
  }, [isReady, previewState, setState, getState]);

  const updateGameState = useCallback(() => {
    const state = getState();
    if (state) {
      setGameState(state);

      // Check for check
      if (isInCheck()) {
        const kings = state.pieces.filter(
          (p) => p.pieceType === 'k' && p.owner === state.toMove
        );
        setInCheckKings(kings);
      } else {
        setInCheckKings(null);
      }
    }
  }, [getState, isInCheck]);

  const handleRequestMoves = useCallback(
    (x: number, y: number) => {
      if (isThinking || winner || !gameStarted) return;

      const moves = getMovesFrom(x, y);
      if (moves.length > 0) {
        setSelectedSquare([x, y]);
        setMovesFrom({ from: [x, y], to: moves });
      } else {
        setSelectedSquare(null);
        setMovesFrom(null);
      }
    },
    [getMovesFrom, setSelectedSquare, setMovesFrom, isThinking, winner, gameStarted]
  );

  const handleMove = useCallback(
    async (from: [number, number], to: [number, number]) => {
      if (isThinking || winner || !gameStarted) return;

      const success = makeMove(from[0], from[1], to[0], to[1]);
      if (!success) {
        setSelectedSquare(null);
        setMovesFrom(null);
        return;
      }

      setLastTurn({ from, to, promoteTo: null });
      setSelectedSquare(null);
      setMovesFrom(null);
      updateGameState();

      // Check if player won (AI is now in check after our move)
      if (isInCheck()) {
        setStatus('Checking for checkmate...');
      }

      // AI's turn
      setStatus('AI thinking...');
      setIsThinking(true);

      // Time-limited search in milliseconds - interrupts mid-depth when time runs out
      const aiSuccess = await playAiMove(2000);

      if (aiSuccess) {
        updateGameState();
        const newState = getState();

        if (newState && isInCheck()) {
          // Check if player is in checkmate
          let hasLegalMoves = false;
          for (const piece of newState.pieces) {
            if (piece.owner === 0) {
              const moves = getMovesFrom(piece.x, piece.y);
              if (moves.length > 0) {
                hasLegalMoves = true;
                break;
              }
            }
          }
          if (!hasLegalMoves) {
            setWinner('AI');
            setStatus('Checkmate! AI wins.');
            setIsThinking(false);
            return;
          }
          setStatus('Check! Your turn.');
        } else {
          setStatus('Your turn');
        }
      } else {
        // AI couldn't move - player wins
        setWinner('Player');
        setStatus('Checkmate! You win!');
      }

      setIsThinking(false);
    },
    [
      makeMove,
      playAiMove,
      getState,
      getMovesFrom,
      isInCheck,
      updateGameState,
      setSelectedSquare,
      setMovesFrom,
      isThinking,
      winner,
      gameStarted,
    ]
  );

  const handleNewGame = useCallback(() => {
    setGameStarted(false);
    setWinner(null);
    setLastTurn(null);
    setInCheckKings(null);
    setGameState(null);
    setSelectedSquare(null);
    setMovesFrom(null);
    setStatus('Select a game variant and click Start Game');
  }, [setSelectedSquare, setMovesFrom]);

  const handleCreateCustomGame = useCallback(() => {
    // Load current preview state into editor
    editorStore.loadGameState(previewState);
    navigate('/editor');
  }, [editorStore, previewState, navigate]);

  const selectedGame = PREBUILT_GAMES.find((g) => g.id === selectedGameId);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436]">VS AI</h1>
          {gameStarted ? (
            <button
              onClick={handleNewGame}
              className="bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              NEW
            </button>
          ) : (
            <div className="w-16" />
          )}
        </div>

        {/* Game area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Board */}
          <div className="flex-shrink-0">
            {!isReady ? (
              <div className="w-[560px] h-[560px] bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="font-bold text-[#636e72]">Loading engine...</p>
                </div>
              </div>
            ) : gameStarted && gameState ? (
              <Board
                gameState={gameState}
                playerNum={0}
                flipped={false}
                lastTurn={lastTurn}
                inCheckKings={inCheckKings}
                onRequestMoves={handleRequestMoves}
                onMove={handleMove}
                disabled={isThinking || !!winner || gameState.toMove !== 0}
              />
            ) : (
              <Board
                gameState={previewState}
                playerNum={0}
                flipped={false}
                disabled={true}
              />
            )}
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-4">
            {!gameStarted ? (
              <>
                {/* Game Selection */}
                <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <h2 className="font-bold text-[#2d3436] mb-4">SELECT GAME</h2>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {PREBUILT_GAMES.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleGameSelect(game.id)}
                        className={`w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${
                          selectedGameId === game.id
                            ? 'bg-[#4ecdc4]'
                            : 'bg-white hover:bg-[#f8f9fa]'
                        }`}
                      >
                        <div className="font-bold text-sm">{game.name}</div>
                        <div className="text-xs text-[#636e72]">
                          {game.state.width}×{game.state.height}
                        </div>
                      </button>
                    ))}

                    {isCustomGame && (
                      <button
                        onClick={() => handleGameSelect('custom')}
                        className={`w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${
                          selectedGameId === 'custom'
                            ? 'bg-[#ffe66d]'
                            : 'bg-white hover:bg-[#f8f9fa]'
                        }`}
                      >
                        <div className="font-bold text-sm">Custom Game</div>
                        <div className="text-xs text-[#636e72]">
                          {previewState.width}×{previewState.height} (from editor)
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Game Info */}
                {selectedGame && (
                  <div className="bg-[#f8f9fa] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                    <h3 className="font-bold text-[#2d3436] mb-2">{selectedGame.name}</h3>
                    <p className="text-sm text-[#636e72]">{selectedGame.description}</p>
                  </div>
                )}

                {isCustomGame && selectedGameId === 'custom' && (
                  <div className="bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                    <h3 className="font-bold text-[#2d3436] mb-2">Custom Game</h3>
                    <p className="text-sm text-[#2d3436]">
                      Board created in the editor with {previewState.pieces.length} pieces.
                    </p>
                  </div>
                )}

                {/* Start button */}
                <button
                  onClick={startGame}
                  disabled={!isReady}
                  className="w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  START GAME
                </button>

                {/* Create Custom Game button */}
                <button
                  onClick={handleCreateCustomGame}
                  className="w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
                >
                  CREATE CUSTOM GAME
                </button>
              </>
            ) : (
              <>
                {/* Status */}
                <div
                  className={`p-4 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] ${
                    winner
                      ? winner === 'Player'
                        ? 'bg-[#4ecdc4]'
                        : 'bg-[#ff6b6b]'
                      : isThinking
                      ? 'bg-[#ffe66d]'
                      : inCheckKings
                      ? 'bg-[#ff6b6b]'
                      : 'bg-white'
                  }`}
                >
                  <h2 className="font-bold text-[#2d3436] mb-1">STATUS</h2>
                  <p className="text-[#2d3436]">{status}</p>
                  {isThinking && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-[#2d3436] border-t-transparent rounded-full" />
                      <span className="text-sm">Calculating...</span>
                    </div>
                  )}
                </div>

                {/* Board info */}
                <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <h2 className="font-bold text-[#2d3436] mb-2">GAME</h2>
                  <p className="text-[#636e72]">
                    {isCustomGame ? 'Custom Game' : selectedGame?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-[#636e72]">
                    {gameState?.width}×{gameState?.height}
                  </p>
                </div>

                {/* Turn indicator */}
                <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <h2 className="font-bold text-[#2d3436] mb-2">TURN</h2>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-[#2d3436] ${
                        gameState?.toMove === 0 ? 'bg-white' : 'bg-[#2d3436]'
                      }`}
                    />
                    <span className="font-medium">
                      {gameState?.toMove === 0 ? 'White (You)' : 'Black (AI)'}
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-[#f8f9fa] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <h2 className="font-bold text-[#2d3436] mb-2">HOW TO PLAY</h2>
                  <ul className="text-sm text-[#636e72] space-y-1">
                    <li>• Click a piece to see moves</li>
                    <li>• Click a highlighted square to move</li>
                    <li>• AI plays as Black</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
