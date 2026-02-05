use axum::{
    routing::{get, post, put, delete},
    Router,
};
use std::sync::Arc;
use tokio::sync::RwLock;
use tower_http::{
    cors::{Any, CorsLayer},
    services::{ServeDir, ServeFile},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod auth;
mod db;
mod email;
mod game;
mod routes;

use game::RoomManager;

pub struct AppStateInner {
    pub room_manager: RwLock<RoomManager>,
    pub db: sqlx::SqlitePool,
    pub jwt_secret: String,
    pub email: email::EmailService,
}

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

    // Initialize database
    let db_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:./data/protochess.db?mode=rwc".to_string());
    let db = db::init_db(&db_url).await;

    // JWT secret
    let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| {
        tracing::warn!("JWT_SECRET not set, generating random secret (tokens won't persist across restarts)");
        use rand::Rng;
        let secret: String = rand::thread_rng()
            .sample_iter(&rand::distributions::Alphanumeric)
            .take(64)
            .map(char::from)
            .collect();
        secret
    });

    // Initialize email service
    let email_service = email::EmailService::from_env();

    // Create shared state
    let room_manager = RoomManager::new();
    let state = Arc::new(AppStateInner {
        room_manager: RwLock::new(room_manager),
        db,
        jwt_secret,
        email: email_service,
    });

    // CORS layer for development
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Static file serving
    let serve_dir = ServeDir::new("../web/dist").not_found_service(ServeFile::new("../web/dist/index.html"));

    // API routes
    let api = Router::new()
        // Auth
        .route("/auth/register", post(routes::auth::register))
        .route("/auth/login", post(routes::auth::login))
        .route("/auth/me", get(routes::auth::me))
        .route("/auth/set-email", post(routes::auth::set_email))
        .route("/auth/verify-email", post(routes::auth::verify_email))
        .route("/auth/resend-verification", post(routes::auth::resend_verification))
        .route("/auth/forgot-password", post(routes::auth::forgot_password))
        .route("/auth/reset-password", post(routes::auth::reset_password))
        // Variants
        .route("/variants", get(routes::variants::list_variants))
        .route("/variants", post(routes::variants::create_variant))
        .route("/variants/:id", get(routes::variants::get_variant))
        .route("/variants/:id", put(routes::variants::update_variant))
        .route("/variants/:id", delete(routes::variants::delete_variant))
        // Likes
        .route("/variants/:id/like", post(routes::likes::like_variant))
        .route("/variants/:id/like", delete(routes::likes::unlike_variant))
        // Comments
        .route("/variants/:id/comments", get(routes::comments::list_comments))
        .route("/variants/:id/comments", post(routes::comments::create_comment))
        .route("/comments/:id", delete(routes::comments::delete_comment));

    // Build router
    let app = Router::new()
        .route("/ws", get(routes::ws_handler))
        .nest("/api", api)
        .fallback_service(serve_dir)
        .layer(cors)
        .with_state(state);

    // Start server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3030").await.unwrap();
    tracing::info!("Server running on http://0.0.0.0:3030");

    axum::serve(listener, app).await.unwrap();
}
