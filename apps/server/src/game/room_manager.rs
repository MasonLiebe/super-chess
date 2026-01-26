use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::{mpsc, RwLock};
use uuid::Uuid;

use protochess_common::{validate_gamestate_request, GameState};

use crate::game::messages::{Client, ClientResponse, RoomInfo, RoomMessage};
use crate::game::room::Room;

struct RoomHandle {
    room_info: RoomInfo,
    room_tx: mpsc::UnboundedSender<RoomMessage>,
}

struct RoomDeletionMsg(String);

type BroadcastClients = Arc<RwLock<HashMap<Uuid, Client>>>;
type Rooms = Arc<RwLock<HashMap<String, RoomHandle>>>;

/// Controls the creation/deletion/running of each room
pub struct RoomManager {
    broadcast_clients: BroadcastClients,
    rooms: Rooms,
    room_manager_tx: mpsc::UnboundedSender<RoomDeletionMsg>,
}

impl RoomManager {
    pub fn new() -> RoomManager {
        let rooms: Rooms = Arc::new(RwLock::new(HashMap::new()));
        let broadcast_clients: BroadcastClients = Arc::new(RwLock::new(HashMap::new()));

        let (tx, mut rx): (
            mpsc::UnboundedSender<RoomDeletionMsg>,
            mpsc::UnboundedReceiver<RoomDeletionMsg>,
        ) = mpsc::unbounded_channel();

        // Spawn a process responsible for listening to room deletions
        let room_copy = rooms.clone();
        let bc = broadcast_clients.clone();
        tokio::spawn(async move {
            while let Some(room_delete_msg) = rx.recv().await {
                tracing::info!("Removing room: {}", room_delete_msg.0);
                let mut rms = room_copy.write().await;
                rms.remove(&room_delete_msg.0);

                // Generate new list of rooms
                let room_list: Vec<RoomInfo> = rms
                    .iter()
                    .filter(|(_, h)| h.room_info.is_public)
                    .map(|(_, h)| h.room_info.clone())
                    .collect();

                // Broadcast removal to lobby clients
                let bcs = bc.read().await;
                for client in bcs.values() {
                    let _ = client.sender.send(ClientResponse::RoomList(room_list.clone()));
                }
            }
        });

        RoomManager {
            broadcast_clients,
            rooms,
            room_manager_tx: tx,
        }
    }

    /// Registers a client to receive updates on room lists
    pub async fn register_broadcast_rooms(&self, client: Client) {
        let rooms = self.get_public_rooms().await;
        let _ = client.sender.send(ClientResponse::RoomList(rooms));
        self.broadcast_clients.write().await.insert(client.id, client);
    }

    /// Unregisters a client from room list updates
    pub async fn unregister_broadcast_rooms(&self, id: &Uuid) {
        self.broadcast_clients.write().await.remove(id);
    }

    /// Creates a new room and returns the sender for it
    pub async fn new_room(
        &self,
        room_id: String,
        is_public: bool,
        init_gamestate: GameState,
    ) -> Result<mpsc::UnboundedSender<RoomMessage>, ()> {
        // Check if room already exists
        if self.rooms.read().await.contains_key(&room_id) {
            return Err(());
        }

        // Validate the initial game state
        let Some((movements, valid_squares, valid_pieces)) = validate_gamestate_request(
            init_gamestate.tiles,
            init_gamestate.pieces,
            init_gamestate.movement_patterns,
        ) else {
            return Err(());
        };

        let (room_tx, room_rx) = mpsc::unbounded_channel();
        let mut new_room = Room::new(room_rx, is_public);

        // Set the initial game state
        new_room.set_initial_state(movements, valid_squares, valid_pieces);

        let room_id_clone = room_id.clone();
        let rmtx = self.room_manager_tx.clone();

        tokio::spawn(async move {
            tracing::info!("New room running: {}", room_id_clone);
            new_room.run().await;
            tracing::info!("Room closing: {}", room_id_clone);
            let _ = rmtx.send(RoomDeletionMsg(room_id_clone));
        });

        // Store the room handle
        self.rooms.write().await.insert(
            room_id.clone(),
            RoomHandle {
                room_info: RoomInfo {
                    room_id,
                    num_clients: 0,
                    is_public,
                    white_taken: false,
                    black_taken: false,
                },
                room_tx: room_tx.clone(),
            },
        );

        // Broadcast room list change to lobby clients
        self.broadcast_rooms().await;

        Ok(room_tx)
    }

    /// Adds a client to an existing room
    pub async fn add_client_to_room(
        &self,
        room_id: &str,
        client: Client,
    ) -> Result<mpsc::UnboundedSender<RoomMessage>, ()> {
        let result = {
            let mut rooms = self.rooms.write().await;
            match rooms.get_mut(room_id) {
                Some(room_handle) => {
                    room_handle.room_info.num_clients += 1;
                    if room_handle
                        .room_tx
                        .send(RoomMessage::AddClient(client))
                        .is_err()
                    {
                        tracing::error!("Error sending to room");
                        return Err(());
                    }
                    Ok(room_handle.room_tx.clone())
                }
                None => {
                    tracing::warn!("Tried to access room that doesn't exist: {}", room_id);
                    Err(())
                }
            }
        };

        // Update lobby clients with new room info
        self.broadcast_rooms().await;
        result
    }

    /// Removes a client from a room
    pub async fn remove_client_from_room(&self, room_id: &str, client_id: &Uuid) {
        let changed = {
            let mut rooms = self.rooms.write().await;
            if let Some(room_handle) = rooms.get_mut(room_id) {
                room_handle.room_info.num_clients = room_handle.room_info.num_clients.saturating_sub(1);
                let _ = room_handle
                    .room_tx
                    .send(RoomMessage::RemoveClient(*client_id));
                true
            } else {
                false
            }
        };

        if changed {
            self.broadcast_rooms().await;
        }
    }

    /// Returns a list of public rooms
    pub async fn get_public_rooms(&self) -> Vec<RoomInfo> {
        self.rooms
            .read()
            .await
            .values()
            .filter(|h| h.room_info.is_public)
            .map(|h| h.room_info.clone())
            .collect()
    }

    /// Returns a random new ID that is not yet taken
    pub async fn get_new_id(&self) -> String {
        let mut generator = adjective_adjective_animal::Generator::default();
        let rooms = self.rooms.read().await;
        loop {
            let id = generator.next().unwrap();
            if !rooms.contains_key(&id) {
                return id;
            }
        }
    }

    /// Broadcasts public rooms to lobby listeners
    async fn broadcast_rooms(&self) {
        let rooms = self.get_public_rooms().await;
        let clients = self.broadcast_clients.read().await;
        for client in clients.values() {
            let _ = client.sender.send(ClientResponse::RoomList(rooms.clone()));
        }
    }
}

impl Default for RoomManager {
    fn default() -> Self {
        Self::new()
    }
}
