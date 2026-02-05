use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde::Serialize;
use std::sync::Arc;

use crate::auth::middleware::AuthUser;
use crate::AppStateInner;

#[derive(Serialize)]
pub struct LikeResponse {
    pub like_count: i64,
    pub liked: bool,
}

pub async fn like_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(variant_id): Path<i64>,
) -> Result<Json<LikeResponse>, (StatusCode, String)> {
    // Check variant exists
    let exists = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM variants WHERE id = ?1")
        .bind(variant_id)
        .fetch_one(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if exists == 0 {
        return Err((StatusCode::NOT_FOUND, "Variant not found".into()));
    }

    // Insert like (idempotent)
    sqlx::query("INSERT OR IGNORE INTO likes (user_id, variant_id) VALUES (?1, ?2)")
        .bind(auth.user_id)
        .bind(variant_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Update denormalized count
    sqlx::query(
        "UPDATE variants SET like_count = (SELECT COUNT(*) FROM likes WHERE variant_id = ?1) WHERE id = ?1",
    )
    .bind(variant_id)
    .execute(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let like_count = sqlx::query_scalar::<_, i64>("SELECT like_count FROM variants WHERE id = ?1")
        .bind(variant_id)
        .fetch_one(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(LikeResponse {
        like_count,
        liked: true,
    }))
}

pub async fn unlike_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(variant_id): Path<i64>,
) -> Result<Json<LikeResponse>, (StatusCode, String)> {
    sqlx::query("DELETE FROM likes WHERE user_id = ?1 AND variant_id = ?2")
        .bind(auth.user_id)
        .bind(variant_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Update denormalized count
    sqlx::query(
        "UPDATE variants SET like_count = (SELECT COUNT(*) FROM likes WHERE variant_id = ?1) WHERE id = ?1",
    )
    .bind(variant_id)
    .execute(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let like_count = sqlx::query_scalar::<_, i64>("SELECT like_count FROM variants WHERE id = ?1")
        .bind(variant_id)
        .fetch_one(&state.db)
        .await
        .unwrap_or(0);

    Ok(Json(LikeResponse {
        like_count,
        liked: false,
    }))
}
