use axum::{
    extract::{
        ws::{Message, WebSocket},
        Query, State, WebSocketUpgrade,
    },
    response::Response,
};
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use crate::game::{Client, ClientRequest, ClientResponse, RoomMessage, Seat};
use crate::AppStateInner;

pub type AppState = Arc<AppStateInner>;

#[derive(Deserialize, Default)]
pub struct WsQuery {
    pub token: Option<String>,
}

pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
    Query(query): Query<WsQuery>,
) -> Response {
    // Try to extract username from token if provided
    let username = query.token.and_then(|t| {
        crate::auth::decode_token(&t, &state.jwt_secret)
            .ok()
            .map(|claims| claims.username)
    });
    ws.on_upgrade(|socket| handle_socket(socket, state, username))
}

async fn handle_socket(socket: WebSocket, state: AppState, auth_username: Option<String>) {
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

    // Client properties - use authenticated username if available
    let my_id = Uuid::new_v4();
    let name = auth_username.unwrap_or_else(generate_name);

    // Helper to create client with a given seat
    let make_client = |seat: Seat| Client {
        name: name.clone(),
        id: my_id,
        seat,
        sender: tx.clone(),
    };

    // Default client for lobby (seat doesn't matter until joining a room)
    let lobby_client = make_client(Seat::Spectator);

    // Track which room this client is in
    let mut my_room: Option<(String, mpsc::UnboundedSender<RoomMessage>)> = None;

    // Register client to receive room list updates
    {
        let room_manager = state.room_manager.read().await;
        room_manager.register_broadcast_rooms(lobby_client.clone()).await;
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

        tracing::debug!("Received message from {}: {}", my_id, text);

        let request = match serde_json::from_str::<ClientRequest>(&text) {
            Ok(req) => {
                tracing::debug!("Parsed request: {:?}", req);
                req
            }
            Err(e) => {
                // Invalid JSON - disconnect client
                tracing::error!("Invalid JSON from client {}: {} - Error: {}", my_id, text, e);
                break;
            }
        };

        match request {
            ClientRequest::ListRooms => {
                let room_manager = state.room_manager.read().await;
                let public_rooms = room_manager.get_public_rooms().await;
                let _ = tx.send(ClientResponse::RoomList(public_rooms));
            }

            ClientRequest::CreateRoom {
                room_name,
                is_public,
                init_game_state,
                seat,
            } => {
                if my_room.is_none() {
                    // Use custom name if provided and non-empty, otherwise generate one
                    let room_id = match &room_name {
                        Some(name) if !name.trim().is_empty() => name.trim().to_string(),
                        _ => {
                            let room_manager = state.room_manager.read().await;
                            room_manager.get_new_id().await
                        }
                    };

                    tracing::info!("Creating room: {}", room_id);

                    let room_manager = state.room_manager.read().await;
                    match room_manager
                        .new_room(room_id.clone(), is_public, init_game_state)
                        .await
                    {
                        Ok(_) => {
                            let _ = tx.send(ClientResponse::RoomCreateSuccess(room_id.clone()));

                            // Join the room we just created with the selected seat
                            let client_with_seat = make_client(seat);
                            match room_manager
                                .add_client_to_room(&room_id, client_with_seat)
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

            ClientRequest::JoinRoom { room_id, seat } => {
                tracing::info!("Join room requested: {} with seat {:?}", room_id, seat);

                if my_room.is_none() {
                    let room_manager = state.room_manager.read().await;
                    let client_with_seat = make_client(seat);
                    match room_manager
                        .add_client_to_room(&room_id, client_with_seat)
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
                    let room_manager = state.room_manager.read().await;
                    room_manager.remove_client_from_room(&room_id, &my_id).await;

                    // Re-register for room list updates
                    room_manager.register_broadcast_rooms(lobby_client.clone()).await;
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
        let room_manager = state.room_manager.read().await;
        room_manager.remove_client_from_room(&room_id, &my_id).await;
    }

    let room_manager = state.room_manager.read().await;
    room_manager.unregister_broadcast_rooms(&my_id).await;

    // Abort the send task
    send_task.abort();
}

fn generate_name() -> String {
    let mut generator = adjective_adjective_animal::Generator::default();
    generator.next().unwrap_or_else(|| "Anon".to_string())
}
