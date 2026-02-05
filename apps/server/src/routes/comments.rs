use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::auth::middleware::AuthUser;
use crate::AppStateInner;

#[derive(Serialize)]
pub struct CommentResponse {
    pub id: i64,
    pub author: CommentAuthor,
    pub content: String,
    pub created_at: String,
}

#[derive(Serialize)]
pub struct CommentAuthor {
    pub id: i64,
    pub username: String,
}

#[derive(Serialize)]
pub struct CommentListResponse {
    pub comments: Vec<CommentResponse>,
    pub next_cursor: Option<String>,
}

#[derive(Deserialize)]
pub struct ListCommentsQuery {
    pub cursor: Option<String>,
    pub limit: Option<i64>,
}

#[derive(Deserialize)]
pub struct CreateCommentRequest {
    pub content: String,
}

pub async fn list_comments(
    State(state): State<Arc<AppStateInner>>,
    Path(variant_id): Path<i64>,
    Query(params): Query<ListCommentsQuery>,
) -> Result<Json<CommentListResponse>, (StatusCode, String)> {
    let limit = params.limit.unwrap_or(20).min(50).max(1);

    let comments = if let Some(ref cursor) = params.cursor {
        // cursor is "created_at:id"
        let parts: Vec<&str> = cursor.splitn(2, ':').collect();
        if parts.len() == 2 {
            sqlx::query_as::<_, (i64, i64, String, String, String)>(
                "SELECT c.id, c.user_id, u.username, c.content, c.created_at \
                 FROM comments c JOIN users u ON c.user_id = u.id \
                 WHERE c.variant_id = ?1 AND (c.created_at < ?2 OR (c.created_at = ?2 AND c.id < ?3)) \
                 ORDER BY c.created_at DESC, c.id DESC \
                 LIMIT ?4",
            )
            .bind(variant_id)
            .bind(parts[0])
            .bind(parts[1])
            .bind(limit + 1)
            .fetch_all(&state.db)
            .await
        } else {
            sqlx::query_as::<_, (i64, i64, String, String, String)>(
                "SELECT c.id, c.user_id, u.username, c.content, c.created_at \
                 FROM comments c JOIN users u ON c.user_id = u.id \
                 WHERE c.variant_id = ?1 \
                 ORDER BY c.created_at DESC, c.id DESC \
                 LIMIT ?2",
            )
            .bind(variant_id)
            .bind(limit + 1)
            .fetch_all(&state.db)
            .await
        }
    } else {
        sqlx::query_as::<_, (i64, i64, String, String, String)>(
            "SELECT c.id, c.user_id, u.username, c.content, c.created_at \
             FROM comments c JOIN users u ON c.user_id = u.id \
             WHERE c.variant_id = ?1 \
             ORDER BY c.created_at DESC, c.id DESC \
             LIMIT ?2",
        )
        .bind(variant_id)
        .bind(limit + 1)
        .fetch_all(&state.db)
        .await
    }
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let has_more = comments.len() > limit as usize;
    let comments: Vec<_> = comments.into_iter().take(limit as usize).collect();

    let next_cursor = if has_more {
        comments.last().map(|c| format!("{}:{}", c.4, c.0))
    } else {
        None
    };

    let comments = comments
        .into_iter()
        .map(|(id, user_id, username, content, created_at)| CommentResponse {
            id,
            author: CommentAuthor {
                id: user_id,
                username,
            },
            content,
            created_at,
        })
        .collect();

    Ok(Json(CommentListResponse {
        comments,
        next_cursor,
    }))
}

pub async fn create_comment(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(variant_id): Path<i64>,
    Json(body): Json<CreateCommentRequest>,
) -> Result<(StatusCode, Json<CommentResponse>), (StatusCode, String)> {
    let content = body.content.trim().to_string();
    if content.is_empty() || content.len() > 1000 {
        return Err((StatusCode::BAD_REQUEST, "Comment must be 1-1000 characters".into()));
    }

    // Check variant exists
    let exists = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM variants WHERE id = ?1")
        .bind(variant_id)
        .fetch_one(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if exists == 0 {
        return Err((StatusCode::NOT_FOUND, "Variant not found".into()));
    }

    let comment_id = sqlx::query_scalar::<_, i64>(
        "INSERT INTO comments (user_id, variant_id, content) VALUES (?1, ?2, ?3) RETURNING id",
    )
    .bind(auth.user_id)
    .bind(variant_id)
    .bind(&content)
    .fetch_one(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Update denormalized count
    sqlx::query(
        "UPDATE variants SET comment_count = (SELECT COUNT(*) FROM comments WHERE variant_id = ?1) WHERE id = ?1",
    )
    .bind(variant_id)
    .execute(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let created_at = sqlx::query_scalar::<_, String>(
        "SELECT created_at FROM comments WHERE id = ?1",
    )
    .bind(comment_id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((
        StatusCode::CREATED,
        Json(CommentResponse {
            id: comment_id,
            author: CommentAuthor {
                id: auth.user_id,
                username: auth.username,
            },
            content,
            created_at,
        }),
    ))
}

pub async fn delete_comment(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(comment_id): Path<i64>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    // Get comment to check ownership and get variant_id
    let comment = sqlx::query_as::<_, (i64, i64)>(
        "SELECT user_id, variant_id FROM comments WHERE id = ?1",
    )
    .bind(comment_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((StatusCode::NOT_FOUND, "Comment not found".into()))?;

    if comment.0 != auth.user_id {
        return Err((StatusCode::FORBIDDEN, "Not the comment author".into()));
    }

    let variant_id = comment.1;

    sqlx::query("DELETE FROM comments WHERE id = ?1")
        .bind(comment_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Update denormalized count
    sqlx::query(
        "UPDATE variants SET comment_count = (SELECT COUNT(*) FROM comments WHERE variant_id = ?1) WHERE id = ?1",
    )
    .bind(variant_id)
    .execute(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(serde_json::json!({ "success": true })))
}
