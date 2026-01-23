// Types mirroring protochess-common Rust types

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

export interface RoomInfo {
  room_id: string;
  num_clients: number;
  is_public: boolean;
  editable: boolean;
}

export interface GameInfo {
  editable: boolean;
  winner: string | null;
  to_move_in_check: boolean;
  in_check_kings: Piece[] | null;
  last_turn: Turn | null;
  state: GameState;
}

export interface PlayerList {
  player_num: number;
  you: string;
  names: string[];
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

export type ClientRequest =
  | { type: "ListRooms" }
  | { type: "CreateRoom"; content: { allow_edits: boolean; is_public: boolean; init_game_state: GameState } }
  | { type: "JoinRoom"; content: string }
  | { type: "LeaveRoom" }
  | { type: "ChatMessage"; content: string }
  | { type: "TakeTurn"; content: Turn }
  | { type: "MovesFrom"; content: [number, number] }
  | { type: "ListPlayers" }
  | { type: "SwitchLeader"; content: number }
  | { type: "EditGameState"; content: GameState }
  | { type: "DisableEdits" }
  | { type: "GameState" };
