use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::auth::middleware::{AuthUser, OptionalAuthUser};
use crate::AppStateInner;

#[derive(Deserialize)]
pub struct ListVariantsQuery {
    pub q: Option<String>,
    pub sort: Option<String>,
    pub author_id: Option<i64>,
    pub liked_by: Option<i64>,
    pub min_width: Option<i64>,
    pub max_width: Option<i64>,
    pub min_height: Option<i64>,
    pub max_height: Option<i64>,
    pub cursor: Option<String>,
    pub limit: Option<i64>,
}

#[derive(Serialize)]
pub struct VariantSummary {
    pub id: i64,
    pub name: String,
    pub description: String,
    pub author: AuthorInfo,
    pub board_width: i64,
    pub board_height: i64,
    pub piece_count: i64,
    pub like_count: i64,
    pub comment_count: i64,
    pub liked: bool,
    pub game_state: serde_json::Value,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize)]
pub struct AuthorInfo {
    pub id: i64,
    pub username: String,
}

#[derive(Serialize)]
pub struct VariantListResponse {
    pub variants: Vec<VariantSummary>,
    pub next_cursor: Option<String>,
}

#[derive(Deserialize)]
pub struct CreateVariantRequest {
    pub name: String,
    pub description: Option<String>,
    pub game_state: serde_json::Value,
}

#[derive(Deserialize)]
pub struct UpdateVariantRequest {
    pub name: Option<String>,
    pub description: Option<String>,
    pub game_state: Option<serde_json::Value>,
}

fn validate_game_state_json(game_state: &serde_json::Value) -> Result<(i64, i64, i64), String> {
    let json_str = serde_json::to_string(game_state).map_err(|e| e.to_string())?;
    if json_str.len() > 100_000 {
        return Err("Game state too large (max 100KB)".into());
    }

    let gs: protochess_common::GameState =
        serde_json::from_value(game_state.clone()).map_err(|e| format!("Invalid game state: {}", e))?;

    // Validate via the common crate
    protochess_common::validate_gamestate_request(gs.tiles.clone(), gs.pieces.clone(), gs.movement_patterns.clone())
        .ok_or_else(|| "Invalid game state: both players must have kings".to_string())?;

    Ok((gs.width as i64, gs.height as i64, gs.pieces.len() as i64))
}

pub async fn list_variants(
    State(state): State<Arc<AppStateInner>>,
    auth: OptionalAuthUser,
    Query(params): Query<ListVariantsQuery>,
) -> Result<Json<VariantListResponse>, (StatusCode, String)> {
    let limit = params.limit.unwrap_or(20).min(50).max(1);
    let sort = params.sort.as_deref().unwrap_or("newest");

    let (order_col, order_dir) = match sort {
        "popular" => ("v.like_count", "DESC"),
        "most_commented" => ("v.comment_count", "DESC"),
        _ => ("v.created_at", "DESC"),
    };

    // Build dynamic query
    let mut conditions = vec!["1=1".to_string()];
    let mut bind_values: Vec<String> = Vec::new();

    if let Some(ref q) = params.q {
        let search = format!("%{}%", q.trim());
        conditions.push(format!(
            "(v.name LIKE ?{} OR v.description LIKE ?{} OR u.username LIKE ?{})",
            bind_values.len() + 1,
            bind_values.len() + 2,
            bind_values.len() + 3
        ));
        bind_values.push(search.clone());
        bind_values.push(search.clone());
        bind_values.push(search);
    }

    if let Some(author_id) = params.author_id {
        conditions.push(format!("v.author_id = ?{}", bind_values.len() + 1));
        bind_values.push(author_id.to_string());
    }

    if let Some(min_w) = params.min_width {
        conditions.push(format!("v.board_width >= ?{}", bind_values.len() + 1));
        bind_values.push(min_w.to_string());
    }
    if let Some(max_w) = params.max_width {
        conditions.push(format!("v.board_width <= ?{}", bind_values.len() + 1));
        bind_values.push(max_w.to_string());
    }
    if let Some(min_h) = params.min_height {
        conditions.push(format!("v.board_height >= ?{}", bind_values.len() + 1));
        bind_values.push(min_h.to_string());
    }
    if let Some(max_h) = params.max_height {
        conditions.push(format!("v.board_height <= ?{}", bind_values.len() + 1));
        bind_values.push(max_h.to_string());
    }

    // Filter to variants liked by a specific user
    let mut extra_joins = String::new();
    if let Some(liked_by) = params.liked_by {
        extra_joins = format!(
            " JOIN likes l_filter ON v.id = l_filter.variant_id AND l_filter.user_id = ?{}",
            bind_values.len() + 1
        );
        bind_values.push(liked_by.to_string());
    }

    // Cursor-based pagination
    if let Some(ref cursor) = params.cursor {
        let parts: Vec<&str> = cursor.splitn(2, ':').collect();
        if parts.len() == 2 {
            let cursor_val = parts[0];
            let cursor_id = parts[1];
            match sort {
                "popular" => {
                    conditions.push(format!(
                        "({} < ?{} OR ({} = ?{} AND v.id < ?{}))",
                        order_col,
                        bind_values.len() + 1,
                        order_col,
                        bind_values.len() + 2,
                        bind_values.len() + 3,
                    ));
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_id.to_string());
                }
                "most_commented" => {
                    conditions.push(format!(
                        "({} < ?{} OR ({} = ?{} AND v.id < ?{}))",
                        order_col,
                        bind_values.len() + 1,
                        order_col,
                        bind_values.len() + 2,
                        bind_values.len() + 3,
                    ));
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_id.to_string());
                }
                _ => {
                    // newest: cursor_val is created_at
                    conditions.push(format!(
                        "({} < ?{} OR ({} = ?{} AND v.id < ?{}))",
                        order_col,
                        bind_values.len() + 1,
                        order_col,
                        bind_values.len() + 2,
                        bind_values.len() + 3,
                    ));
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_val.to_string());
                    bind_values.push(cursor_id.to_string());
                }
            }
        }
    }

    let where_clause = conditions.join(" AND ");
    let query_str = format!(
        "SELECT v.id, v.name, v.description, v.author_id, u.username as author_username, \
         v.board_width, v.board_height, v.piece_count, v.like_count, v.comment_count, \
         v.game_state_json, v.created_at, v.updated_at \
         FROM variants v JOIN users u ON v.author_id = u.id{} \
         WHERE {} \
         ORDER BY {} {}, v.id DESC \
         LIMIT {}",
        extra_joins, where_clause, order_col, order_dir, limit + 1
    );

    // We need to use a dynamic query approach since sqlx doesn't support fully dynamic bind counts easily
    // Use raw query with manual binding
    let rows = build_and_execute_query(&state.db, &query_str, &bind_values).await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let user_id = auth.0.map(|u| u.user_id);
    let has_more = rows.len() > limit as usize;
    let rows: Vec<_> = rows.into_iter().take(limit as usize).collect();

    // Check likes for authenticated user
    let mut variants = Vec::new();
    for row in &rows {
        let liked = if let Some(uid) = user_id {
            sqlx::query_scalar::<_, i64>(
                "SELECT COUNT(*) FROM likes WHERE user_id = ?1 AND variant_id = ?2",
            )
            .bind(uid)
            .bind(row.id)
            .fetch_one(&state.db)
            .await
            .unwrap_or(0) > 0
        } else {
            false
        };

        let game_state: serde_json::Value =
            serde_json::from_str(&row.game_state_json).unwrap_or(serde_json::Value::Null);

        variants.push(VariantSummary {
            id: row.id,
            name: row.name.clone(),
            description: row.description.clone(),
            author: AuthorInfo {
                id: row.author_id,
                username: row.author_username.clone(),
            },
            board_width: row.board_width,
            board_height: row.board_height,
            piece_count: row.piece_count,
            like_count: row.like_count,
            comment_count: row.comment_count,
            liked,
            game_state,
            created_at: row.created_at.clone(),
            updated_at: row.updated_at.clone(),
        });
    }

    let next_cursor = if has_more {
        rows.last().map(|last| {
            let cursor_val = match sort {
                "popular" => last.like_count.to_string(),
                "most_commented" => last.comment_count.to_string(),
                _ => last.created_at.clone(),
            };
            format!("{}:{}", cursor_val, last.id)
        })
    } else {
        None
    };

    Ok(Json(VariantListResponse {
        variants,
        next_cursor,
    }))
}

#[derive(Debug)]
struct VariantRow {
    id: i64,
    name: String,
    description: String,
    author_id: i64,
    author_username: String,
    board_width: i64,
    board_height: i64,
    piece_count: i64,
    like_count: i64,
    comment_count: i64,
    game_state_json: String,
    created_at: String,
    updated_at: String,
}

async fn build_and_execute_query(
    db: &sqlx::SqlitePool,
    query_str: &str,
    bind_values: &[String],
) -> Result<Vec<VariantRow>, sqlx::Error> {
    // Use sqlx::query with dynamic bindings
    let mut query = sqlx::query_as::<_, (i64, String, String, i64, String, i64, i64, i64, i64, i64, String, String, String)>(query_str);

    for val in bind_values {
        query = query.bind(val.clone());
    }

    let rows = query.fetch_all(db).await?;

    Ok(rows
        .into_iter()
        .map(|r| VariantRow {
            id: r.0,
            name: r.1,
            description: r.2,
            author_id: r.3,
            author_username: r.4,
            board_width: r.5,
            board_height: r.6,
            piece_count: r.7,
            like_count: r.8,
            comment_count: r.9,
            game_state_json: r.10,
            created_at: r.11,
            updated_at: r.12,
        })
        .collect())
}

pub async fn get_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: OptionalAuthUser,
    Path(id): Path<i64>,
) -> Result<Json<VariantSummary>, (StatusCode, String)> {
    let row = sqlx::query_as::<_, (i64, String, String, i64, String, i64, i64, i64, i64, i64, String, String, String)>(
        "SELECT v.id, v.name, v.description, v.author_id, u.username, \
         v.board_width, v.board_height, v.piece_count, v.like_count, v.comment_count, \
         v.game_state_json, v.created_at, v.updated_at \
         FROM variants v JOIN users u ON v.author_id = u.id \
         WHERE v.id = ?1",
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((StatusCode::NOT_FOUND, "Variant not found".into()))?;

    let liked = if let Some(ref user) = auth.0 {
        sqlx::query_scalar::<_, i64>(
            "SELECT COUNT(*) FROM likes WHERE user_id = ?1 AND variant_id = ?2",
        )
        .bind(user.user_id)
        .bind(id)
        .fetch_one(&state.db)
        .await
        .unwrap_or(0) > 0
    } else {
        false
    };

    let game_state: serde_json::Value =
        serde_json::from_str(&row.10).unwrap_or(serde_json::Value::Null);

    Ok(Json(VariantSummary {
        id: row.0,
        name: row.1,
        description: row.2,
        author: AuthorInfo {
            id: row.3,
            username: row.4,
        },
        board_width: row.5,
        board_height: row.6,
        piece_count: row.7,
        like_count: row.8,
        comment_count: row.9,
        liked,
        game_state,
        created_at: row.11,
        updated_at: row.12,
    }))
}

pub async fn create_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Json(body): Json<CreateVariantRequest>,
) -> Result<(StatusCode, Json<VariantSummary>), (StatusCode, String)> {
    let name = body.name.trim().to_string();
    if name.is_empty() || name.len() > 100 {
        return Err((StatusCode::BAD_REQUEST, "Name must be 1-100 characters".into()));
    }

    let description = body.description.unwrap_or_default();
    if description.len() > 2000 {
        return Err((StatusCode::BAD_REQUEST, "Description must be under 2000 characters".into()));
    }

    let (board_width, board_height, piece_count) = validate_game_state_json(&body.game_state)
        .map_err(|e| (StatusCode::BAD_REQUEST, e))?;

    let game_state_json = serde_json::to_string(&body.game_state)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let variant_id = sqlx::query_scalar::<_, i64>(
        "INSERT INTO variants (author_id, name, description, game_state_json, board_width, board_height, piece_count) \
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7) RETURNING id",
    )
    .bind(auth.user_id)
    .bind(&name)
    .bind(&description)
    .bind(&game_state_json)
    .bind(board_width)
    .bind(board_height)
    .bind(piece_count)
    .fetch_one(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let row = sqlx::query_as::<_, (String, String)>(
        "SELECT created_at, updated_at FROM variants WHERE id = ?1",
    )
    .bind(variant_id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok((
        StatusCode::CREATED,
        Json(VariantSummary {
            id: variant_id,
            name,
            description,
            author: AuthorInfo {
                id: auth.user_id,
                username: auth.username,
            },
            board_width,
            board_height,
            piece_count,
            like_count: 0,
            comment_count: 0,
            liked: false,
            game_state: body.game_state,
            created_at: row.0,
            updated_at: row.1,
        }),
    ))
}

pub async fn update_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(id): Path<i64>,
    Json(body): Json<UpdateVariantRequest>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    // Check ownership
    let author_id = sqlx::query_scalar::<_, i64>("SELECT author_id FROM variants WHERE id = ?1")
        .bind(id)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "Variant not found".into()))?;

    if author_id != auth.user_id {
        return Err((StatusCode::FORBIDDEN, "Not the variant owner".into()));
    }

    if let Some(ref name) = body.name {
        let name = name.trim();
        if name.is_empty() || name.len() > 100 {
            return Err((StatusCode::BAD_REQUEST, "Name must be 1-100 characters".into()));
        }
        sqlx::query("UPDATE variants SET name = ?1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?2")
            .bind(name)
            .bind(id)
            .execute(&state.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    }

    if let Some(ref description) = body.description {
        if description.len() > 2000 {
            return Err((StatusCode::BAD_REQUEST, "Description must be under 2000 characters".into()));
        }
        sqlx::query("UPDATE variants SET description = ?1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?2")
            .bind(description)
            .bind(id)
            .execute(&state.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    }

    if let Some(ref game_state) = body.game_state {
        let (bw, bh, pc) = validate_game_state_json(game_state)
            .map_err(|e| (StatusCode::BAD_REQUEST, e))?;

        let gs_json = serde_json::to_string(game_state)
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        sqlx::query(
            "UPDATE variants SET game_state_json = ?1, board_width = ?2, board_height = ?3, \
             piece_count = ?4, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?5",
        )
        .bind(&gs_json)
        .bind(bw)
        .bind(bh)
        .bind(pc)
        .bind(id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    }

    Ok(Json(serde_json::json!({ "success": true })))
}

pub async fn delete_variant(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Path(id): Path<i64>,
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    // Check ownership
    let author_id = sqlx::query_scalar::<_, i64>("SELECT author_id FROM variants WHERE id = ?1")
        .bind(id)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
        .ok_or((StatusCode::NOT_FOUND, "Variant not found".into()))?;

    if author_id != auth.user_id {
        return Err((StatusCode::FORBIDDEN, "Not the variant owner".into()));
    }

    // Delete likes and comments first, then variant
    sqlx::query("DELETE FROM likes WHERE variant_id = ?1")
        .bind(id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    sqlx::query("DELETE FROM comments WHERE variant_id = ?1")
        .bind(id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    sqlx::query("DELETE FROM variants WHERE id = ?1")
        .bind(id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(serde_json::json!({ "success": true })))
}
