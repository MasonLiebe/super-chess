use serde::{Deserialize, Serialize};
use protochess_common::{GameState, Piece, Turn};

/// Seat in a game room
#[derive(Clone, Copy, Serialize, Deserialize, Debug, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Seat {
    White,
    Black,
    Spectator,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct RoomInfo {
    pub room_id: String,
    pub num_clients: usize,
    pub is_public: bool,
    pub white_taken: bool,
    pub black_taken: bool,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct PlayerInfo {
    pub name: String,
    pub seat: Seat,
}

/// Message from the server to client
#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(tag = "type", content = "content")]
pub enum ClientResponse {
    RoomCreateSuccess(String),
    RemovedFromRoom,
    RoomList(Vec<RoomInfo>),
    CannotOverwriteRoom,
    NoRoomFound,
    ChatMessage {
        from: String,
        content: String,
    },
    GameInfo {
        winner: Option<String>,
        to_move_in_check: bool,
        in_check_kings: Option<Vec<Piece>>,
        last_turn: Option<Turn>,
        state: GameState,
    },
    PlayerList {
        your_seat: Seat,
        you: String,
        players: Vec<PlayerInfo>,
    },
    MovesFrom {
        from: (u8, u8),
        to: Vec<(u8, u8)>,
    },
}

/// Message from client to server
#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type", content = "content")]
pub enum ClientRequest {
    ListRooms,
    CreateRoom {
        is_public: bool,
        init_game_state: GameState,
        seat: Seat,
    },
    JoinRoom {
        room_id: String,
        seat: Seat,
    },
    LeaveRoom,
    SelectSeat(Seat),
    ChatMessage(String),
    TakeTurn(Turn),
    MovesFrom(u8, u8),
    ListPlayers,
    GameState,
}

/// Internal message sent to a room task
#[derive(Debug)]
pub enum RoomMessage {
    AddClient(Client),
    RemoveClient(uuid::Uuid),
    ClientMessage {
        client_id: uuid::Uuid,
        request: ClientRequest,
    },
}

/// Client handle for sending messages
#[derive(Debug, Clone)]
pub struct Client {
    pub id: uuid::Uuid,
    pub name: String,
    pub seat: Seat,
    pub sender: tokio::sync::mpsc::UnboundedSender<ClientResponse>,
}
