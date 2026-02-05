use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub password_hash: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Variant {
    pub id: i64,
    pub author_id: i64,
    pub name: String,
    pub description: String,
    pub game_state_json: String,
    pub board_width: i64,
    pub board_height: i64,
    pub piece_count: i64,
    pub like_count: i64,
    pub comment_count: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Like {
    pub user_id: i64,
    pub variant_id: i64,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Comment {
    pub id: i64,
    pub user_id: i64,
    pub variant_id: i64,
    pub content: String,
    pub created_at: String,
}
