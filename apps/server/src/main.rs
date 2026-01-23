use axum::{
    routing::get,
    Router,
};
use std::sync::Arc;
use tokio::sync::RwLock;
use tower_http::{
    cors::{Any, CorsLayer},
    services::{ServeDir, ServeFile},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod game;
mod routes;

use game::RoomManager;
use routes::{ws_handler, AppState};

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "protochess_server=info,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Create shared state
    let room_manager = RoomManager::new();
    let state: AppState = Arc::new(RwLock::new(room_manager));

    // CORS layer for development
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Static file serving
    let serve_dir = ServeDir::new("../web/dist").not_found_service(ServeFile::new("../web/dist/index.html"));

    // Build router
    let app = Router::new()
        .route("/ws", get(ws_handler))
        .nest_service("/", serve_dir)
        .layer(cors)
        .with_state(state);

    // Start server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3030").await.unwrap();
    tracing::info!("Server running on http://0.0.0.0:3030");

    axum::serve(listener, app).await.unwrap();
}
