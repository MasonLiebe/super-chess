import type { GameState } from '../types/chess';

import standardChess from './standard_chess.json';
import miniChess from './mini_chess.json';
import microChess from './micro_chess.json';
import bigChess from './big_chess.json';
import holyChess from './holy_chess.json';
import pawnStorm from './pawn_storm.json';

export interface PrebuiltGame {
  id: string;
  name: string;
  description: string;
  state: GameState;
}

export const PREBUILT_GAMES: PrebuiltGame[] = [
  {
    id: 'standard',
    name: 'Standard Chess',
    description: 'Classic 8x8 chess with all standard pieces',
    state: standardChess as GameState,
  },
  {
    id: 'mini',
    name: 'Mini Chess',
    description: 'A smaller 6x6 variant for quicker games',
    state: miniChess as GameState,
  },
  {
    id: 'micro',
    name: 'Micro Chess',
    description: 'Tiny 4x5 board for fast-paced play',
    state: microChess as GameState,
  },
  {
    id: 'big',
    name: 'Big Chess',
    description: 'Expanded 10x10 board with extra pieces',
    state: bigChess as GameState,
  },
  {
    id: 'holy',
    name: 'Holy Chess',
    description: 'Standard chess with holes in the board',
    state: holyChess as GameState,
  },
  {
    id: 'pawn_storm',
    name: 'Pawn Storm',
    description: 'All pawns, no other pieces except kings',
    state: pawnStorm as GameState,
  },
];

export const DEFAULT_GAME = PREBUILT_GAMES[0];
