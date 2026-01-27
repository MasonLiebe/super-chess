// Types mirroring customchess-common Rust types

export interface Slides {
  north: boolean;
  east: boolean;
  south: boolean;
  west: boolean;
  northeast: boolean;
  northwest: boolean;
  southeast: boolean;
  southwest: boolean;
}

export interface MovementPattern {
  attackSlides: Slides;
  translateSlides: Slides;
  attackJumps: [number, number][];
  translateJumps: [number, number][];
  attackSlideDeltas: [number, number][][];
  translateSlideDeltas: [number, number][][];
}

export interface Turn {
  promoteTo: string | null;
  from: [number, number];
  to: [number, number];
}

export interface Tile {
  x: number;
  y: number;
  tileType: string;
}

export interface Piece {
  owner: number;
  x: number;
  y: number;
  pieceType: string;
}

export interface GameState {
  width: number;
  height: number;
  toMove: number;
  tiles: Tile[];
  pieces: Piece[];
  movementPatterns: Record<string, MovementPattern>;
}

export type Seat = 'white' | 'black' | 'spectator';

export interface RoomInfo {
  room_id: string;
  num_clients: number;
  is_public: boolean;
  white_taken: boolean;
  black_taken: boolean;
}

export interface GameInfo {
  winner: string | null;
  to_move_in_check: boolean;
  in_check_kings: Piece[] | null;
  last_turn: Turn | null;
  state: GameState;
}

export interface PlayerInfo {
  name: string;
  seat: Seat;
}

export interface PlayerList {
  your_seat: Seat;
  you: string;
  players: PlayerInfo[];
}

export interface MovesFrom {
  from: [number, number];
  to: [number, number][];
}

// WebSocket message types
export type ClientResponse =
  | { type: "RoomCreateSuccess"; content: string }
  | { type: "RemovedFromRoom" }
  | { type: "RoomList"; content: RoomInfo[] }
  | { type: "CannotOverwriteRoom" }
  | { type: "NoRoomFound" }
  | { type: "ChatMessage"; content: { from: string; content: string } }
  | { type: "GameInfo"; content: GameInfo }
  | { type: "PlayerList"; content: PlayerList }
  | { type: "MovesFrom"; content: MovesFrom };

// Note: content types are loose to allow for conversion to Rust snake_case format
export type ClientRequest =
  | { type: "ListRooms" }
  | { type: "CreateRoom"; content: { room_name: string | null; is_public: boolean; init_game_state: unknown; seat: Seat } }
  | { type: "JoinRoom"; content: { room_id: string; seat: Seat } }
  | { type: "LeaveRoom" }
  | { type: "SelectSeat"; content: Seat }
  | { type: "ChatMessage"; content: string }
  | { type: "TakeTurn"; content: unknown }
  | { type: "MovesFrom"; content: [number, number] }
  | { type: "ListPlayers" }
  | { type: "GameState" };
