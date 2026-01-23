use axum::{
    extract::{
        ws::{Message, WebSocket},
        State, WebSocketUpgrade,
    },
    response::Response,
};
use futures_util::{SinkExt, StreamExt};
use std::sync::Arc;
use tokio::sync::{mpsc, RwLock};
use uuid::Uuid;

use crate::game::{Client, ClientRequest, ClientResponse, RoomManager, RoomMessage};

pub type AppState = Arc<RwLock<RoomManager>>;

pub async fn ws_handler(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}

async fn handle_socket(socket: WebSocket, rooms: AppState) {
    let (mut ws_sender, mut ws_receiver) = socket.split();

    // Create channel for sending messages to this client
    let (tx, mut rx) = mpsc::unbounded_channel::<ClientResponse>();

    // Spawn task to forward messages from channel to WebSocket
    let send_task = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            if let Ok(json) = serde_json::to_string(&msg) {
                if ws_sender.send(Message::Text(json.into())).await.is_err() {
                    break;
                }
            }
        }
    });

    // Client properties
    let my_id = Uuid::new_v4();
    let name = generate_name();
    let my_client = Client {
        name,
        id: my_id,
        sender: tx.clone(),
    };

    // Track which room this client is in
    let mut my_room: Option<(String, mpsc::UnboundedSender<RoomMessage>)> = None;

    // Register client to receive room list updates
    {
        let room_manager = rooms.read().await;
        room_manager.register_broadcast_rooms(my_client.clone()).await;
    }

    // Main message loop
    while let Some(result) = ws_receiver.next().await {
        let msg = match result {
            Ok(msg) => msg,
            Err(e) => {
                tracing::error!("WebSocket error (uid={}): {}", my_id, e);
                break;
            }
        };

        // Handle pong messages for heartbeat
        if let Message::Pong(_) = msg {
            continue;
        }

        // Handle close message
        if let Message::Close(_) = msg {
            break;
        }

        // Handle text messages
        let Message::Text(text) = msg else {
            continue;
        };

        let Ok(request) = serde_json::from_str::<ClientRequest>(&text) else {
            // Invalid JSON - disconnect client
            tracing::warn!("Invalid JSON from client {}: {}", my_id, text);
            break;
        };

        match request {
            ClientRequest::ListRooms => {
                let room_manager = rooms.read().await;
                let public_rooms = room_manager.get_public_rooms().await;
                let _ = tx.send(ClientResponse::RoomList(public_rooms));
            }

            ClientRequest::CreateRoom {
                allow_edits,
                is_public,
                init_game_state,
            } => {
                if my_room.is_none() {
                    let room_id = {
                        let room_manager = rooms.read().await;
                        room_manager.get_new_id().await
                    };

                    tracing::info!("Creating room: {}", room_id);

                    let room_manager = rooms.read().await;
                    match room_manager
                        .new_room(room_id.clone(), is_public, allow_edits, init_game_state)
                        .await
                    {
                        Ok(_) => {
                            let _ = tx.send(ClientResponse::RoomCreateSuccess(room_id.clone()));

                            // Join the room we just created
                            match room_manager
                                .add_client_to_room(&room_id, my_client.clone())
                                .await
                            {
                                Ok(room_tx) => {
                                    my_room = Some((room_id, room_tx));
                                    // Stop receiving room list updates
                                    room_manager.unregister_broadcast_rooms(&my_id).await;
                                }
                                Err(_) => {
                                    let _ = tx.send(ClientResponse::NoRoomFound);
                                }
                            }
                        }
                        Err(_) => {
                            let _ = tx.send(ClientResponse::CannotOverwriteRoom);
                        }
                    }
                }
            }

            ClientRequest::JoinRoom(room_id) => {
                tracing::info!("Join room requested: {}", room_id);

                if my_room.is_none() {
                    let room_manager = rooms.read().await;
                    match room_manager
                        .add_client_to_room(&room_id, my_client.clone())
                        .await
                    {
                        Ok(room_tx) => {
                            my_room = Some((room_id, room_tx));
                            // Stop receiving room list updates
                            room_manager.unregister_broadcast_rooms(&my_id).await;
                        }
                        Err(_) => {
                            let _ = tx.send(ClientResponse::NoRoomFound);
                        }
                    }
                }
            }

            ClientRequest::LeaveRoom => {
                if let Some((room_id, _)) = my_room.take() {
                    let room_manager = rooms.read().await;
                    room_manager.remove_client_from_room(&room_id, &my_id).await;

                    // Re-register for room list updates
                    room_manager.register_broadcast_rooms(my_client.clone()).await;
                }
                let _ = tx.send(ClientResponse::RemovedFromRoom);
            }

            // Forward any other request to the room
            other => {
                if let Some((_, ref room_tx)) = my_room {
                    let _ = room_tx.send(RoomMessage::ClientMessage {
                        client_id: my_id,
                        request: other,
                    });
                }
            }
        }
    }

    // Client disconnected - cleanup
    tracing::info!("Client disconnected: {}", my_id);

    if let Some((room_id, _)) = my_room {
        let room_manager = rooms.read().await;
        room_manager.remove_client_from_room(&room_id, &my_id).await;
    }

    let room_manager = rooms.read().await;
    room_manager.unregister_broadcast_rooms(&my_id).await;

    // Abort the send task
    send_task.abort();
}

fn generate_name() -> String {
    let mut generator = adjective_adjective_animal::Generator::default();
    generator.next().unwrap_or_else(|| "Anon".to_string())
}
