use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use protochess_common::{serialize_game_state, Piece, Turn};

use crate::game::messages::{Client, ClientRequest, ClientResponse, PlayerInfo, RoomMessage, Seat};

lazy_static::lazy_static! {
    static ref MOVEGEN: protochess_engine_rs::MoveGenerator = {
        protochess_engine_rs::MoveGenerator::new()
    };
}

pub struct Room {
    pub is_public: bool,
    game: protochess_engine_rs::Game,
    to_move_in_check: bool,
    winner: Option<String>,
    clients: Vec<Arc<Client>>,
    last_turn: Option<Turn>,
    rx: mpsc::UnboundedReceiver<RoomMessage>,
}

const MAX_SPECTATORS: usize = 8;

impl Room {
    pub fn new(rx: mpsc::UnboundedReceiver<RoomMessage>, is_public: bool) -> Room {
        Room {
            game: protochess_engine_rs::Game::default(),
            to_move_in_check: false,
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

    /// Check if a seat is available
    pub fn is_seat_available(&self, seat: Seat) -> bool {
        match seat {
            Seat::White => !self.clients.iter().any(|c| c.seat == Seat::White),
            Seat::Black => !self.clients.iter().any(|c| c.seat == Seat::Black),
            Seat::Spectator => {
                self.clients.iter().filter(|c| c.seat == Seat::Spectator).count() < MAX_SPECTATORS
            }
        }
    }

    /// Get client by seat
    fn get_client_by_seat(&self, seat: Seat) -> Option<&Arc<Client>> {
        self.clients.iter().find(|c| c.seat == seat)
    }

    /// Get mutable client by ID
    fn get_client_index(&self, id: Uuid) -> Option<usize> {
        self.clients.iter().position(|c| c.id == id)
    }

    /// Set the initial game state from validated data
    pub fn set_initial_state(
        &mut self,
        movements: std::collections::HashMap<char, protochess_engine_rs::MovementPatternExternal>,
        valid_squares: Vec<(u8, u8)>,
        pieces: Vec<(u8, u8, u8, char)>,
    ) {
        self.game.set_state(movements, valid_squares, pieces);
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
        let Some(client_idx) = self.get_client_index(requester_id) else {
            tracing::warn!("External room request from unknown client");
            return;
        };

        let requester_client = &self.clients[client_idx];
        let requester_seat = requester_client.seat;

        match request {
            ClientRequest::SelectSeat(new_seat) => {
                // Check if seat is available (or if they already have it)
                if requester_seat == new_seat || self.is_seat_available(new_seat) {
                    // Update the client's seat
                    let mut client = (*self.clients[client_idx]).clone();
                    client.seat = new_seat;
                    self.clients[client_idx] = Arc::new(client);
                    self.broadcast_player_list();
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

                // Check if it's this player's turn based on their seat
                let whos_turn = self.game.get_whos_turn();
                let can_move = (whos_turn == 0 && requester_seat == Seat::White)
                    || (whos_turn == 1 && requester_seat == Seat::Black);

                if can_move {
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
            ClientRequest::ListPlayers => {
                let _ = requester_client.sender.send(ClientResponse::PlayerList {
                    your_seat: requester_seat,
                    you: requester_client.name.clone(),
                    players: self.clients.iter().map(|c| PlayerInfo {
                        name: c.name.clone(),
                        seat: c.seat,
                    }).collect(),
                });
            }
            ClientRequest::MovesFrom(x, y) => {
                // Check if it's this player's turn based on their seat
                let whos_turn = self.game.get_whos_turn();
                let can_move = (whos_turn == 0 && requester_seat == Seat::White)
                    || (whos_turn == 1 && requester_seat == Seat::Black);

                if can_move {
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
        let players: Vec<PlayerInfo> = self.clients.iter().map(|c| PlayerInfo {
            name: c.name.clone(),
            seat: c.seat,
        }).collect();

        for client in self.clients.iter() {
            let _ = client.sender.send(ClientResponse::PlayerList {
                your_seat: client.seat,
                you: client.name.clone(),
                players: players.clone(),
            });
        }
    }
}
