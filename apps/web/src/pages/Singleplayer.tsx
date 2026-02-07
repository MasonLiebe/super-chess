import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useChessEngine } from '../hooks/useChessEngine';
import { useGameStore } from '../stores/gameStore';
import { useEditorStore } from '../stores/editorStore';
import { PREBUILT_GAMES, DEFAULT_GAME } from '../prebuilt_games';
import { playMoveSound, playCaptureSound, playCheckSound, playGameOverSound } from '../lib/sounds';
import { useSettingsStore } from '../stores/settingsStore';
import { getVariant } from '../lib/api';
import { ArrowLeft, Volume2, VolumeOff, RotateCcw, HelpCircle, Compass, PencilRuler, Play, ChevronDown } from 'lucide-react';
import type { GameState, Turn, Piece } from '../types/chess';

// AI Difficulty levels with search depth and chess piece icons
const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', depth: 2, color: '#4ecdc4', description: 'Beginner friendly', piece: 'p' },
  { id: 'medium', name: 'Medium', depth: 4, color: '#ffe66d', description: 'Balanced gameplay', piece: 'n' },
  { id: 'hard', name: 'Hard', depth: 6, color: '#ff9f43', description: 'Challenging opponent', piece: 'r' },
  { id: 'max', name: 'Max', depth: 8, color: '#ff6b6b', description: 'Maximum strength', piece: 'q' },
] as const;

type DifficultyId = typeof DIFFICULTY_LEVELS[number]['id'];

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
  const [lastTurn, setLastTurn] = useState<Turn | null>(null);
  const [inCheckKings, setInCheckKings] = useState<Piece[] | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCustomGame, setIsCustomGame] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyId>('medium');
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const gameDropdownRef = useRef<HTMLDivElement>(null);
  const { soundEnabled, toggleSound } = useSettingsStore();

  // Check if we're loading a custom game from the editor or a variant
  useEffect(() => {
    const from = searchParams.get('from');
    if (from === 'editor') {
      const customState = editorStore.getGameState();
      if (customState.pieces.length > 0) {
        setPreviewState(customState);
        setSelectedGameId('custom');
        setIsCustomGame(true);
      }
    } else if (from === 'variant') {
      const variantId = searchParams.get('id');
      if (variantId) {
        getVariant(Number(variantId))
          .then((v) => {
            setPreviewState(v.gameState);
            setSelectedGameId('custom');
            setIsCustomGame(true);
          })
          .catch(() => {
            // ignore, use default
          });
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDifficultyDropdownOpen(false);
      }
      if (gameDropdownRef.current && !gameDropdownRef.current.contains(event.target as Node)) {
        setGameDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      if (isThinking || winner || !gameStarted || !gameState) return;

      // Check if this is a capture (piece on target square)
      const isCapture = gameState.pieces.some((p) => p.x === to[0] && p.y === to[1]);

      const success = makeMove(from[0], from[1], to[0], to[1]);
      if (!success) {
        setSelectedSquare(null);
        setMovesFrom(null);
        return;
      }

      // Play sound for player's move
      if (isCapture) {
        playCaptureSound();
      } else {
        playMoveSound();
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
      const difficultyLevel = DIFFICULTY_LEVELS.find((d) => d.id === difficulty)!;
      setStatus(`AI thinking... (${difficultyLevel.name})`);
      setIsThinking(true);

      // Get state before AI move to detect what moved
      const stateBeforeAi = getState();

      // Time-limited search based on difficulty
      const aiSuccess = await playAiMove(difficultyLevel.depth);

      if (aiSuccess) {
        updateGameState();
        const newState = getState();

        // Detect AI's move by comparing piece positions
        if (stateBeforeAi && newState) {
          // Find a piece that moved (was at one position, now at another)
          for (const oldPiece of stateBeforeAi.pieces.filter(p => p.owner === 1)) {
            const stillThere = newState.pieces.some(
              p => p.owner === 1 && p.x === oldPiece.x && p.y === oldPiece.y && p.pieceType === oldPiece.pieceType
            );
            if (!stillThere) {
              // This piece moved - find where it went
              const newPiece = newState.pieces.find(
                p => p.owner === 1 && p.pieceType === oldPiece.pieceType &&
                !stateBeforeAi.pieces.some(op => op.owner === 1 && op.x === p.x && op.y === p.y && op.pieceType === p.pieceType)
              );
              if (newPiece) {
                setLastTurn({ from: [oldPiece.x, oldPiece.y], to: [newPiece.x, newPiece.y], promoteTo: null });
                break;
              }
            }
          }
        }

        const prevState = stateBeforeAi;

        // Play sound for AI's move
        if (prevState && newState && prevState.pieces.length > newState.pieces.length) {
          playCaptureSound();
        } else {
          playMoveSound();
        }

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
            playGameOverSound(false);
            setIsThinking(false);
            return;
          }
          playCheckSound();
          setStatus('Check! Your turn.');
        } else {
          setStatus('Your turn');
        }
      } else {
        // AI couldn't move - player wins
        setWinner('Player');
        setStatus('Checkmate! You win!');
        playGameOverSound(true);
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
      gameState,
      difficulty,
    ]
  );

  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);

  const handleNewGame = useCallback(() => {
    // If game is over, skip confirmation
    if (winner) {
      doNewGame();
      return;
    }
    setShowNewGameConfirm(true);
  }, [winner]);

  const doNewGame = useCallback(() => {
    setShowNewGameConfirm(false);
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

  return (
    <div className="h-screen bg-[var(--bg-page)] px-4 pb-4 pt-12 flex flex-col">
      <div className={`mx-auto w-full flex-1 min-h-0 flex flex-col ${gameStarted ? 'max-w-[560px]' : 'max-w-5xl'}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <Link
            to="/"
            className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title="Back to home"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </Link>
          <h1 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] flex-1 text-center">VS AI</h1>
          <div className="flex gap-1.5">
            <button
              onClick={toggleSound}
              className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeOff size={18} />}
            </button>
            {gameStarted ? (
              <>
                <button
                  onClick={() => setShowHelpModal(true)}
                  className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
                  title="How to play"
                >
                  <HelpCircle size={18} />
                </button>
                <button
                  onClick={handleNewGame}
                  className="flex items-center justify-center bg-[#ffe66d] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
                  title="New game"
                >
                  <RotateCcw size={16} strokeWidth={3} />
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* Game area */}
        <div className={`flex flex-1 min-h-0 ${gameStarted ? 'flex-col gap-4' : 'flex-col lg:flex-row gap-6 lg:items-center lg:justify-center'}`}>
          {/* Board */}
          <div className={`${gameStarted ? 'w-full' : 'flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0'}`}>
            {!isReady ? (
              <div className="w-full aspect-square max-w-[560px] bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] lg:shadow-[8px_8px_0px_var(--shadow-color)] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-[var(--border-color)] border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="font-bold text-[var(--text-secondary)]">Loading engine...</p>
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
                reservedHeight={{ mobile: 260, desktop: 260 }}
              />
            ) : (
              <Board
                gameState={previewState}
                playerNum={0}
                flipped={false}
                disabled={true}
                reservedHeight={{ mobile: 380, desktop: 130 }}
              />
            )}
          </div>

          {/* Info panel */}
          <div className={`${gameStarted ? 'w-full' : 'w-full lg:w-72'} space-y-2 lg:space-y-4`}>
            {!gameStarted ? (
              <>
                {/* Game Settings Panel */}
                <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4 space-y-3 lg:space-y-4">
                  <h2 className="font-bold text-[var(--text-primary)] text-xs lg:text-base">GAME SETTINGS</h2>
                  <div className="flex flex-row lg:flex-col gap-2 lg:gap-4">
                  {/* Variant Dropdown */}
                  <div ref={gameDropdownRef} className="relative flex-1 min-w-0">
                    <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">PREBUILT VARIANT</span>
                    {(() => {
                      const selectedGame = selectedGameId === 'custom'
                        ? { name: 'Custom Game', description: `${previewState.width}×${previewState.height}`, isCustom: true }
                        : (() => { const g = PREBUILT_GAMES.find((g) => g.id === selectedGameId)!; return { name: g.name, description: `${g.state.width}×${g.state.height}`, isCustom: false }; })();
                      return (
                        <button
                          onClick={() => setGameDropdownOpen(!gameDropdownOpen)}
                          className={`w-full p-2 lg:p-3 border lg:border-3 border-[var(--border-color)] font-bold cursor-pointer flex items-center gap-2 lg:gap-3 transition-all hover:brightness-95 ${
                            selectedGame.isCustom
                              ? 'bg-[#ffe66d] text-[var(--color-dark)]'
                              : 'bg-[#4ecdc4] text-[var(--color-dark)]'
                          }`}
                        >
                          <div className="flex-1 text-left min-w-0">
                            <div className="text-xs lg:text-base truncate">{selectedGame.name}</div>
                            <div className="text-[10px] lg:text-xs font-medium opacity-70 hidden lg:block">{selectedGame.description}</div>
                          </div>
                          <ChevronDown
                            size={16}
                            strokeWidth={3}
                            className={`transition-transform ${gameDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      );
                    })()}

                    {gameDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 border lg:border-3 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[4px_4px_0px_var(--shadow-color)] z-10 overflow-hidden max-h-64 overflow-y-auto">
                        {PREBUILT_GAMES.map((game) => (
                          <button
                            key={game.id}
                            onClick={() => {
                              handleGameSelect(game.id);
                              setGameDropdownOpen(false);
                            }}
                            className={`w-full p-2 lg:p-3 text-left font-bold flex items-center gap-2 lg:gap-3 transition-colors hover:bg-[var(--bg-card-hover)] ${
                              selectedGameId === game.id ? 'bg-[#4ecdc4] text-[var(--color-dark)]' : 'text-[var(--text-primary)]'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="text-xs lg:text-base">{game.name}</div>
                              <div className={`text-[10px] lg:text-xs font-medium ${selectedGameId === game.id ? 'opacity-70' : 'text-[var(--text-secondary)]'}`}>{game.description}</div>
                            </div>
                          </button>
                        ))}
                        {isCustomGame && (
                          <button
                            onClick={() => {
                              handleGameSelect('custom');
                              setGameDropdownOpen(false);
                            }}
                            className={`w-full p-2 lg:p-3 text-left font-bold flex items-center gap-2 lg:gap-3 transition-colors hover:bg-[var(--bg-card-hover)] ${
                              selectedGameId === 'custom' ? 'bg-[#ffe66d] text-[var(--color-dark)]' : 'text-[var(--text-primary)]'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="text-xs lg:text-base">Custom Game</div>
                              <div className={`text-[10px] lg:text-xs font-medium ${selectedGameId === 'custom' ? 'opacity-70' : 'text-[var(--text-secondary)]'}`}>{previewState.width}×{previewState.height}</div>
                            </div>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Difficulty Selection */}
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">DIFFICULTY</span>
                    <div ref={dropdownRef} className="relative">
                      {(() => {
                        const selected = DIFFICULTY_LEVELS.find((d) => d.id === difficulty)!;
                        return (
                          <button
                            onClick={() => setDifficultyDropdownOpen(!difficultyDropdownOpen)}
                            className="w-full p-2 lg:p-3 border lg:border-3 border-[var(--border-color)] font-bold text-[var(--color-dark)] cursor-pointer flex items-center gap-2 lg:gap-3 transition-all hover:brightness-95"
                            style={{ backgroundColor: selected.color }}
                          >
                            <img
                              src={`/images/chess_pieces/black/${selected.piece}.svg`}
                              alt=""
                              className="hidden lg:block w-5 h-5 lg:w-7 lg:h-7 object-contain"
                            />
                            <div className="flex-1 text-left min-w-0">
                              <div className="text-xs lg:text-base truncate">{selected.name}</div>
                              <div className="text-[10px] lg:text-xs font-medium opacity-70 hidden lg:block">{selected.description}</div>
                            </div>
                            <ChevronDown
                              size={16}
                              strokeWidth={3}
                              className={`flex-shrink-0 transition-transform ${difficultyDropdownOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        );
                      })()}

                      {difficultyDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 border lg:border-3 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[4px_4px_0px_var(--shadow-color)] z-10 overflow-hidden">
                          {DIFFICULTY_LEVELS.map((level) => (
                            <button
                              key={level.id}
                              onClick={() => {
                                setDifficulty(level.id);
                                setDifficultyDropdownOpen(false);
                              }}
                              className={`w-full p-2 lg:p-3 text-left font-bold text-[var(--color-dark)] flex items-center gap-2 lg:gap-3 transition-colors hover:brightness-95 ${
                                difficulty === level.id ? 'ring-2 ring-inset ring-[var(--border-color)]' : ''
                              }`}
                              style={{ backgroundColor: level.color }}
                            >
                              <img
                                src={`/images/chess_pieces/black/${level.piece}.svg`}
                                alt=""
                                className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                              />
                              <div className="flex-1">
                                <div className="text-xs lg:text-base">{level.name}</div>
                                <div className="text-[10px] lg:text-xs font-medium opacity-70">{level.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-[var(--divider)]" />

                  {/* Custom variant options */}
                  <div>
                    <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">CUSTOM VARIANT</span>
                    <div className="flex gap-2">
                      <Link
                        to="/browse"
                        className="flex items-center justify-center gap-1.5 flex-1 bg-[#a29bfe] border lg:border-3 border-[var(--border-color)] p-1.5 lg:p-2.5 font-bold text-[10px] lg:text-sm text-[var(--color-dark)] hover:brightness-95 transition-all"
                      >
                        <Compass size={12} strokeWidth={2.5} className="flex-shrink-0" />
                        BROWSE
                      </Link>
                      <button
                        onClick={handleCreateCustomGame}
                        className="flex items-center justify-center gap-1.5 flex-1 bg-[#ffe66d] border lg:border-3 border-[var(--border-color)] p-1.5 lg:p-2.5 font-bold text-[10px] lg:text-sm text-[var(--color-dark)] hover:brightness-95 transition-all"
                      >
                        <PencilRuler size={12} strokeWidth={2.5} className="flex-shrink-0" />
                        EDITOR
                      </button>
                    </div>
                  </div>
                </div>

                {isCustomGame && selectedGameId === 'custom' && (
                  <div className="bg-[#ffe66d] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4">
                    <h3 className="font-bold text-[var(--color-dark)] text-xs lg:text-base mb-1">Custom Game</h3>
                    <p className="text-xs lg:text-sm text-[var(--color-dark)]">
                      {previewState.pieces.length} pieces on the board.
                    </p>
                  </div>
                )}

                {/* Start button */}
                <button
                  onClick={startGame}
                  disabled={!isReady}
                  className="flex items-center justify-center gap-2 w-full bg-[#4ecdc4] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2.5 lg:p-4 font-bold text-sm lg:text-base text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play size={16} strokeWidth={3} />
                  START GAME
                </button>
              </>
            ) : (
              <>
                {/* Status + Difficulty - fixed height, never changes size */}
                {(() => {
                  const level = DIFFICULTY_LEVELS.find((d) => d.id === difficulty)!;
                  const bgColor = winner
                    ? winner === 'Player' ? '#4ecdc4' : '#ff6b6b'
                    : isThinking ? '#ffe66d'
                    : inCheckKings ? '#ff6b6b'
                    : 'var(--bg-card)';
                  return (
                    <div
                      className="border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2.5 lg:p-4 transition-colors"
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
                        {isThinking ? (
                          <div className="animate-spin w-3.5 h-3.5 lg:w-4 lg:h-4 border-2 border-[var(--border-color)] border-t-transparent rounded-full flex-shrink-0" />
                        ) : (
                          <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full flex-shrink-0 border border-[var(--border-color)] lg:border-2" style={{ backgroundColor: bgColor === 'var(--bg-card)' ? '#4ecdc4' : bgColor }} />
                        )}
                        <p className="font-bold text-[var(--color-dark)] text-xs lg:text-sm">{status}</p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 lg:gap-2 px-1.5 lg:px-2 py-0.5 lg:py-1 border border-[var(--border-color)] lg:border-2"
                        style={{ backgroundColor: level.color }}
                      >
                        <img
                          src={`/images/chess_pieces/black/${level.piece}.svg`}
                          alt=""
                          className="w-4 h-4 lg:w-5 lg:h-5 object-contain"
                        />
                        <span className="font-bold text-[10px] lg:text-xs text-[var(--color-dark)]">{level.name}</span>
                        <span className="text-[10px] lg:text-xs text-[var(--color-dark)] opacity-70">{level.description}</span>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-6 max-w-sm w-full mx-4">
            <h2 className="font-bold text-[var(--text-primary)] text-xl mb-4 text-center">HOW TO PLAY</h2>
            <ul className="text-[var(--text-secondary)] space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-primary)]">•</span>
                <span>Click a piece to see available moves</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-primary)]">•</span>
                <span>Click a highlighted square to move</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-primary)]">•</span>
                <span>You play as White, AI plays as Black</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-primary)]">•</span>
                <span>Drag and drop also works</span>
              </li>
            </ul>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-[#4ecdc4] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* New Game Confirmation */}
      {showNewGameConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-6 max-w-xs w-full mx-4 text-center">
            <h2 className="font-bold text-[var(--text-primary)] text-lg mb-2">NEW GAME?</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Your current game will be lost.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewGameConfirm(false)}
                className="flex-1 bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-2.5 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={doNewGame}
                className="flex-1 bg-[#ff6b6b] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-2.5 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                QUIT GAME
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
