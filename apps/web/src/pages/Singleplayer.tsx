import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useChessEngine } from '../hooks/useChessEngine';
import { useGameStore } from '../stores/gameStore';
import { createGameState, BOARD_SIZE } from '../lib/constants';
import type { GameState, Turn, Piece } from '../types/chess';

export function Singleplayer() {
  const { isReady, error, getState, makeMove, getMovesFrom, playAiMove, isInCheck, setState } = useChessEngine();
  const { setMovesFrom, setSelectedSquare } = useGameStore();

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [status, setStatus] = useState('Loading engine...');
  const [lastTurn, setLastTurn] = useState<Turn | null>(null);
  const [inCheckKings, setInCheckKings] = useState<Piece[] | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Board customization state
  const [boardWidth, setBoardWidth] = useState(8);
  const [boardHeight, setBoardHeight] = useState(8);

  // Initialize game state when engine is ready
  useEffect(() => {
    if (isReady && !gameStarted) {
      setStatus('Configure your board and click Start Game');
    }
  }, [isReady, gameStarted]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setStatus(`Error: ${error.message}`);
    }
  }, [error]);

  const startGame = useCallback(() => {
    if (!isReady) return;

    const customState = createGameState(boardWidth, boardHeight);
    const success = setState(customState as GameState);

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
      setStatus('Failed to set custom board. Try standard 8x8.');
    }
  }, [isReady, boardWidth, boardHeight, setState, getState]);

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
    setStatus('Configure your board and click Start Game');
  }, [setSelectedSquare, setMovesFrom]);

  // Preview game state for configuration
  const previewState = createGameState(boardWidth, boardHeight);

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
          {gameStarted && (
            <button
              onClick={handleNewGame}
              className="bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              NEW
            </button>
          )}
          {!gameStarted && <div className="w-16" />}
        </div>

        {/* Game area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Board */}
          <div className="flex-shrink-0">
            {!isReady ? (
              <div className="w-[500px] h-[500px] bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] flex items-center justify-center">
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
                gameState={previewState as GameState}
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
                {/* Board Configuration */}
                <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <h2 className="font-bold text-[#2d3436] mb-4">BOARD SIZE</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#636e72] mb-1">
                        Width: {boardWidth}
                      </label>
                      <input
                        type="range"
                        min={BOARD_SIZE.MIN}
                        max={BOARD_SIZE.MAX}
                        value={boardWidth}
                        onChange={(e) => setBoardWidth(Number(e.target.value))}
                        className="w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                      />
                      <div className="flex justify-between text-xs text-[#636e72]">
                        <span>{BOARD_SIZE.MIN}</span>
                        <span>{BOARD_SIZE.MAX}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#636e72] mb-1">
                        Height: {boardHeight}
                      </label>
                      <input
                        type="range"
                        min={BOARD_SIZE.MIN}
                        max={BOARD_SIZE.MAX}
                        value={boardHeight}
                        onChange={(e) => setBoardHeight(Number(e.target.value))}
                        className="w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                      />
                      <div className="flex justify-between text-xs text-[#636e72]">
                        <span>{BOARD_SIZE.MIN}</span>
                        <span>{BOARD_SIZE.MAX}</span>
                      </div>
                    </div>

                    {/* Quick presets */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { w: 4, h: 4, label: '4×4' },
                        { w: 6, h: 6, label: '6×6' },
                        { w: 8, h: 8, label: '8×8' },
                        { w: 10, h: 10, label: '10×10' },
                        { w: 12, h: 12, label: '12×12' },
                      ].map(({ w, h, label }) => (
                        <button
                          key={label}
                          onClick={() => {
                            setBoardWidth(w);
                            setBoardHeight(h);
                          }}
                          className={`px-3 py-1 text-sm font-bold border-2 border-[#2d3436] ${
                            boardWidth === w && boardHeight === h
                              ? 'bg-[#4ecdc4]'
                              : 'bg-white hover:bg-[#f8f9fa]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start button */}
                <button
                  onClick={startGame}
                  disabled={!isReady}
                  className="w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  START GAME
                </button>

                {/* Info */}
                <div className="bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                  <p className="text-sm text-[#2d3436]">
                    Customize your board size from {BOARD_SIZE.MIN}×{BOARD_SIZE.MIN} to{' '}
                    {BOARD_SIZE.MAX}×{BOARD_SIZE.MAX}. Pieces will be arranged automatically.
                  </p>
                </div>
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
                  <h2 className="font-bold text-[#2d3436] mb-2">BOARD</h2>
                  <p className="text-[#636e72]">
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
