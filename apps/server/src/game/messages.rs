use serde::{Deserialize, Serialize};
use protochess_common::{GameState, Piece, Turn};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct RoomInfo {
    pub room_id: String,
    pub num_clients: usize,
    pub is_public: bool,
    pub editable: bool,
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
        editable: bool,
        winner: Option<String>,
        to_move_in_check: bool,
        in_check_kings: Option<Vec<Piece>>,
        last_turn: Option<Turn>,
        state: GameState,
    },
    PlayerList {
        player_num: u8,
        you: String,
        names: Vec<String>,
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
        allow_edits: bool,
        is_public: bool,
        init_game_state: GameState,
    },
    JoinRoom(String),
    LeaveRoom,
    ChatMessage(String),
    TakeTurn(Turn),
    MovesFrom(u8, u8),
    ListPlayers,
    SwitchLeader(u8),
    EditGameState(GameState),
    DisableEdits,
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
    pub sender: tokio::sync::mpsc::UnboundedSender<ClientResponse>,
}
