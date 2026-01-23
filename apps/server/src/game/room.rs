use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use protochess_common::{serialize_game_state, validate_gamestate_request, Piece, Turn};

use crate::game::messages::{Client, ClientRequest, ClientResponse, RoomMessage};

lazy_static::lazy_static! {
    static ref MOVEGEN: protochess_engine_rs::MoveGenerator = {
        protochess_engine_rs::MoveGenerator::new()
    };
}

pub struct Room {
    pub editable: bool,
    pub is_public: bool,
    game: protochess_engine_rs::Game,
    to_move_in_check: bool,
    winner: Option<String>,
    clients: Vec<Arc<Client>>,
    last_turn: Option<Turn>,
    rx: mpsc::UnboundedReceiver<RoomMessage>,
}

impl Room {
    pub fn new(rx: mpsc::UnboundedReceiver<RoomMessage>, is_public: bool, editable: bool) -> Room {
        Room {
            game: protochess_engine_rs::Game::default(),
            to_move_in_check: false,
            editable,
            is_public,
            winner: None,
            clients: Vec::new(),
            last_turn: None,
            rx,
        }
    }

    pub fn client_count(&self) -> usize {
        self.clients.len()
    }

    pub async fn run(&mut self) {
        while let Some(message) = self.rx.recv().await {
            match message {
                RoomMessage::AddClient(client) => {
                    let _ = client.sender.send(self.serialize_game());
                    self.clients.push(Arc::new(client));
                    self.broadcast_player_list();
                }
                RoomMessage::RemoveClient(id) => {
                    if let Some(index) = self.clients.iter().position(|x| x.id == id) {
                        self.clients.remove(index);
                        self.broadcast_player_list();
                    } else {
                        tracing::warn!("No user found at id {:?}", id);
                    }
                }
                RoomMessage::ClientMessage { client_id, request } => {
                    self.handle_client_message(client_id, request);
                }
            }

            // Exit if room is empty
            if self.clients.is_empty() {
                break;
            }
        }
    }

    fn handle_client_message(&mut self, requester_id: Uuid, request: ClientRequest) {
        let Some(player_num) = self.clients.iter().position(|x| x.id == requester_id) else {
            tracing::warn!("External room request from unknown client");
            return;
        };

        let requester_client = &self.clients[player_num];

        match request {
            ClientRequest::DisableEdits => {
                if player_num == 0 {
                    self.editable = false;
                    self.broadcast_game_update();
                }
            }
            ClientRequest::ChatMessage(m) => {
                self.broadcast_except(
                    ClientResponse::ChatMessage {
                        from: requester_client.name.clone(),
                        content: m,
                    },
                    requester_id,
                );
            }
            ClientRequest::TakeTurn(turn) => {
                let from = turn.from;
                let to = turn.to;

                // Check if it's this player's turn
                if player_num as u8 == self.game.get_whos_turn() {
                    let (x1, y1) = from;
                    let (x2, y2) = to;
                    let move_gen: &protochess_engine_rs::MoveGenerator = &MOVEGEN;

                    if self.game.make_move(move_gen, x1, y1, x2, y2) {
                        self.last_turn = Some(Turn {
                            promote_to: turn.promote_to,
                            from,
                            to,
                        });

                        // Calculate if the position is in check after this move
                        self.to_move_in_check = move_gen.in_check(&mut self.game.current_position);
                        if self.to_move_in_check
                            && move_gen.count_legal_moves(&mut self.game.current_position) == 0
                        {
                            // Checkmate - we have a winner!
                            self.winner = Some(requester_client.name.clone());
                        }

                        self.broadcast_game_update();
                    }
                }
            }
            ClientRequest::GameState => {
                let _ = requester_client.sender.send(self.serialize_game());
            }
            ClientRequest::EditGameState(request_game_state) => {
                if self.editable && player_num < 2 {
                    if let Some((movements, valid_squares, valid_pieces)) =
                        validate_gamestate_request(
                            request_game_state.tiles,
                            request_game_state.pieces,
                            request_game_state.movement_patterns,
                        )
                    {
                        self.game.set_state(movements, valid_squares, valid_pieces);
                        self.broadcast_game_update();
                    }
                }
            }
            ClientRequest::SwitchLeader(new_leader) => {
                if player_num == 0 && (new_leader as usize) < self.clients.len() {
                    self.clients.swap(0, new_leader as usize);
                    self.broadcast_player_list();
                }
            }
            ClientRequest::ListPlayers => {
                let _ = requester_client.sender.send(ClientResponse::PlayerList {
                    player_num: player_num as u8,
                    you: requester_client.name.clone(),
                    names: self.clients.iter().map(|x| x.name.clone()).collect(),
                });
            }
            ClientRequest::MovesFrom(x, y) => {
                if player_num as u8 == self.game.get_whos_turn() {
                    let mut possible_moves = Vec::new();
                    let move_gen: &protochess_engine_rs::MoveGenerator = &MOVEGEN;

                    for (from, to) in
                        move_gen.get_legal_moves_as_tuples(&mut self.game.current_position)
                    {
                        if from == (x, y) {
                            possible_moves.push(to);
                        }
                    }

                    let _ = requester_client.sender.send(ClientResponse::MovesFrom {
                        from: (x, y),
                        to: possible_moves,
                    });
                }
            }
            _ => {}
        }
    }

    fn broadcast_game_update(&mut self) {
        self.broadcast(self.serialize_game());
    }

    fn serialize_game(&self) -> ClientResponse {
        let to_move = self.game.get_whos_turn();
        let to_move_in_check = self.to_move_in_check;

        let in_check_kings = if to_move_in_check {
            Some(
                self.game
                    .current_position
                    .pieces_as_tuples()
                    .into_iter()
                    .filter(|(owner, _x, _y, piece_type)| *owner == to_move && *piece_type == 'k')
                    .map(|(owner, x, y, piece_type)| Piece {
                        owner,
                        x,
                        y,
                        piece_type,
                    })
                    .collect(),
            )
        } else {
            None
        };

        ClientResponse::GameInfo {
            editable: self.editable,
            winner: self.winner.clone(),
            last_turn: self.last_turn.clone(),
            to_move_in_check,
            in_check_kings,
            state: serialize_game_state(&self.game.current_position),
        }
    }

    fn broadcast_except(&self, cr: ClientResponse, except_id: Uuid) {
        for client in &self.clients {
            if client.id != except_id {
                let _ = client.sender.send(cr.clone());
            }
        }
    }

    fn broadcast(&self, cr: ClientResponse) {
        for client in &self.clients {
            let _ = client.sender.send(cr.clone());
        }
    }

    fn broadcast_player_list(&self) {
        for (i, client) in self.clients.iter().enumerate() {
            let _ = client.sender.send(ClientResponse::PlayerList {
                player_num: i as u8,
                you: client.name.clone(),
                names: self.clients.iter().map(|x| x.name.clone()).collect(),
            });
        }
    }
}
