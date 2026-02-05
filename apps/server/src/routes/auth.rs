use axum::{extract::State, http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::auth::middleware::AuthUser;
use crate::email::EmailService;
use crate::AppStateInner;

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String,
    pub email: Option<String>,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserResponse,
}

#[derive(Serialize)]
pub struct UserResponse {
    pub id: i64,
    pub username: String,
}

#[derive(Serialize)]
pub struct MeResponse {
    pub id: i64,
    pub username: String,
    pub created_at: String,
    pub email: Option<String>,
    pub email_verified: bool,
}

#[derive(Serialize)]
pub struct MessageResponse {
    pub message: String,
}

#[derive(Deserialize)]
pub struct SetEmailRequest {
    pub email: String,
}

#[derive(Deserialize)]
pub struct VerifyEmailRequest {
    pub token: String,
}

#[derive(Deserialize)]
pub struct ForgotPasswordRequest {
    pub identifier: String,
}

#[derive(Deserialize)]
pub struct ResetPasswordRequest {
    pub token: String,
    pub password: String,
}

fn validate_email(email: &str) -> bool {
    let email = email.trim();
    if email.len() < 3 || email.len() > 254 {
        return false;
    }
    let at_pos = email.find('@');
    let dot_pos = email.rfind('.');
    match (at_pos, dot_pos) {
        (Some(at), Some(dot)) => at > 0 && dot > at + 1 && dot < email.len() - 1,
        _ => false,
    }
}

pub async fn register(
    State(state): State<Arc<AppStateInner>>,
    Json(body): Json<RegisterRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, String)> {
    let username = body.username.trim().to_string();
    let password = &body.password;
    let email = body.email.as_deref().map(|e| e.trim()).filter(|e| !e.is_empty());

    // Validate username
    if username.len() < 3 || username.len() > 30 {
        return Err((StatusCode::BAD_REQUEST, "Username must be 3-30 characters".into()));
    }
    if !username.chars().all(|c| c.is_alphanumeric() || c == '_') {
        return Err((StatusCode::BAD_REQUEST, "Username must be alphanumeric with underscores only".into()));
    }

    // Validate password
    if password.len() < 8 || password.len() > 128 {
        return Err((StatusCode::BAD_REQUEST, "Password must be 8-128 characters".into()));
    }

    // Validate email if provided
    if let Some(email) = email {
        if !validate_email(email) {
            return Err((StatusCode::BAD_REQUEST, "Invalid email address".into()));
        }
        // Check email uniqueness
        let existing = sqlx::query_scalar::<_, i64>("SELECT id FROM users WHERE email = ?1")
            .bind(email)
            .fetch_optional(&state.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        if existing.is_some() {
            return Err((StatusCode::CONFLICT, "Email already in use".into()));
        }
    }

    // Check if username exists
    let existing = sqlx::query_scalar::<_, i64>("SELECT id FROM users WHERE username = ?1")
        .bind(&username)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if existing.is_some() {
        return Err((StatusCode::CONFLICT, "Username already taken".into()));
    }

    // Hash password
    let password_hash = crate::auth::hash_password(password)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Insert user
    let user_id = sqlx::query_scalar::<_, i64>(
        "INSERT INTO users (username, password_hash, email, email_verified) VALUES (?1, ?2, ?3, 0) RETURNING id",
    )
    .bind(&username)
    .bind(&password_hash)
    .bind(email)
    .fetch_one(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // If email provided, send verification
    if let Some(email) = email {
        let token = EmailService::generate_token();
        let expires_at = EmailService::token_expiry_1h();
        sqlx::query("INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?1, ?2, ?3)")
            .bind(user_id)
            .bind(&token)
            .bind(&expires_at)
            .execute(&state.db)
            .await
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

        if let Err(e) = state.email.send_verification_email(email, &username, &token).await {
            tracing::error!("Failed to send verification email: {}", e);
        }
    }

    // Create token
    let token = crate::auth::create_token(user_id, &username, &state.jwt_secret)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user_id,
            username,
        },
    }))
}

pub async fn login(
    State(state): State<Arc<AppStateInner>>,
    Json(body): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, String)> {
    let username = body.username.trim().to_string();
    let password = &body.password;

    // Find user
    let user = sqlx::query_as::<_, (i64, String, String)>(
        "SELECT id, username, password_hash FROM users WHERE username = ?1",
    )
    .bind(&username)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (user_id, db_username, password_hash) = user
        .ok_or((StatusCode::UNAUTHORIZED, "Invalid username or password".into()))?;

    // Verify password
    if !crate::auth::verify_password(password, &password_hash) {
        return Err((StatusCode::UNAUTHORIZED, "Invalid username or password".into()));
    }

    // Create token
    let token = crate::auth::create_token(user_id, &db_username, &state.jwt_secret)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user_id,
            username: db_username,
        },
    }))
}

pub async fn me(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
) -> Result<Json<MeResponse>, (StatusCode, String)> {
    let user = sqlx::query_as::<_, (i64, String, String, Option<String>, i32)>(
        "SELECT id, username, created_at, email, email_verified FROM users WHERE id = ?1",
    )
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (id, username, created_at, email, email_verified) = user
        .ok_or((StatusCode::NOT_FOUND, "User not found".into()))?;

    Ok(Json(MeResponse {
        id,
        username,
        created_at,
        email,
        email_verified: email_verified != 0,
    }))
}

pub async fn set_email(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
    Json(body): Json<SetEmailRequest>,
) -> Result<Json<MessageResponse>, (StatusCode, String)> {
    let email = body.email.trim().to_string();

    if !validate_email(&email) {
        return Err((StatusCode::BAD_REQUEST, "Invalid email address".into()));
    }

    // Check email not used by another user
    let existing = sqlx::query_scalar::<_, i64>("SELECT id FROM users WHERE email = ?1 AND id != ?2")
        .bind(&email)
        .bind(auth.user_id)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if existing.is_some() {
        return Err((StatusCode::CONFLICT, "Email already in use".into()));
    }

    // Update user email, reset verification
    sqlx::query("UPDATE users SET email = ?1, email_verified = 0 WHERE id = ?2")
        .bind(&email)
        .bind(auth.user_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Delete old verification tokens
    sqlx::query("DELETE FROM email_verification_tokens WHERE user_id = ?1")
        .bind(auth.user_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Create new verification token
    let token = EmailService::generate_token();
    let expires_at = EmailService::token_expiry_1h();
    sqlx::query("INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?1, ?2, ?3)")
        .bind(auth.user_id)
        .bind(&token)
        .bind(&expires_at)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Err(e) = state.email.send_verification_email(&email, &auth.username, &token).await {
        tracing::error!("Failed to send verification email: {}", e);
    }

    Ok(Json(MessageResponse {
        message: "Verification email sent".into(),
    }))
}

pub async fn verify_email(
    State(state): State<Arc<AppStateInner>>,
    Json(body): Json<VerifyEmailRequest>,
) -> Result<Json<MessageResponse>, (StatusCode, String)> {
    let now = chrono::Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string();

    // Look up token
    let row = sqlx::query_as::<_, (i64, i64, String)>(
        "SELECT id, user_id, expires_at FROM email_verification_tokens WHERE token = ?1",
    )
    .bind(&body.token)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (token_id, user_id, expires_at) = row
        .ok_or((StatusCode::BAD_REQUEST, "Invalid or expired token".into()))?;

    if now > expires_at {
        // Clean up expired token
        sqlx::query("DELETE FROM email_verification_tokens WHERE id = ?1")
            .bind(token_id)
            .execute(&state.db)
            .await
            .ok();
        return Err((StatusCode::BAD_REQUEST, "Token has expired".into()));
    }

    // Set email as verified
    sqlx::query("UPDATE users SET email_verified = 1 WHERE id = ?1")
        .bind(user_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Delete the used token
    sqlx::query("DELETE FROM email_verification_tokens WHERE id = ?1")
        .bind(token_id)
        .execute(&state.db)
        .await
        .ok();

    Ok(Json(MessageResponse {
        message: "Email verified".into(),
    }))
}

pub async fn resend_verification(
    State(state): State<Arc<AppStateInner>>,
    auth: AuthUser,
) -> Result<Json<MessageResponse>, (StatusCode, String)> {
    // Get user's email
    let row = sqlx::query_as::<_, (Option<String>, i32)>(
        "SELECT email, email_verified FROM users WHERE id = ?1",
    )
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (email, email_verified) = row
        .ok_or((StatusCode::NOT_FOUND, "User not found".into()))?;

    let email = email
        .ok_or((StatusCode::BAD_REQUEST, "No email set on this account".into()))?;

    if email_verified != 0 {
        return Err((StatusCode::BAD_REQUEST, "Email is already verified".into()));
    }

    // Delete old tokens
    sqlx::query("DELETE FROM email_verification_tokens WHERE user_id = ?1")
        .bind(auth.user_id)
        .execute(&state.db)
        .await
        .ok();

    // Create new token
    let token = EmailService::generate_token();
    let expires_at = EmailService::token_expiry_1h();
    sqlx::query("INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?1, ?2, ?3)")
        .bind(auth.user_id)
        .bind(&token)
        .bind(&expires_at)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Err(e) = state.email.send_verification_email(&email, &auth.username, &token).await {
        tracing::error!("Failed to send verification email: {}", e);
    }

    Ok(Json(MessageResponse {
        message: "Verification email sent".into(),
    }))
}

pub async fn forgot_password(
    State(state): State<Arc<AppStateInner>>,
    Json(body): Json<ForgotPasswordRequest>,
) -> Result<Json<MessageResponse>, (StatusCode, String)> {
    let identifier = body.identifier.trim().to_string();

    // Always return the same message to prevent user enumeration
    let success_msg = MessageResponse {
        message: "If an account with that username/email exists and has a verified email, a reset link has been sent.".into(),
    };

    // Look up user by username or email
    let row = sqlx::query_as::<_, (i64, String, Option<String>, i32)>(
        "SELECT id, username, email, email_verified FROM users WHERE username = ?1 OR email = ?1",
    )
    .bind(&identifier)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let Some((user_id, username, email, email_verified)) = row else {
        return Ok(Json(success_msg));
    };

    let Some(email) = email else {
        return Ok(Json(success_msg));
    };

    if email_verified == 0 {
        return Ok(Json(success_msg));
    }

    // Delete old reset tokens for this user
    sqlx::query("DELETE FROM password_reset_tokens WHERE user_id = ?1")
        .bind(user_id)
        .execute(&state.db)
        .await
        .ok();

    // Create reset token
    let token = EmailService::generate_token();
    let expires_at = EmailService::token_expiry_1h();
    sqlx::query("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?1, ?2, ?3)")
        .bind(user_id)
        .bind(&token)
        .bind(&expires_at)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Err(e) = state.email.send_password_reset_email(&email, &username, &token).await {
        tracing::error!("Failed to send password reset email: {}", e);
    }

    Ok(Json(success_msg))
}

pub async fn reset_password(
    State(state): State<Arc<AppStateInner>>,
    Json(body): Json<ResetPasswordRequest>,
) -> Result<Json<MessageResponse>, (StatusCode, String)> {
    let now = chrono::Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string();

    // Validate new password
    if body.password.len() < 8 || body.password.len() > 128 {
        return Err((StatusCode::BAD_REQUEST, "Password must be 8-128 characters".into()));
    }

    // Look up token
    let row = sqlx::query_as::<_, (i64, i64, String)>(
        "SELECT id, user_id, expires_at FROM password_reset_tokens WHERE token = ?1",
    )
    .bind(&body.token)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let (token_id, user_id, expires_at) = row
        .ok_or((StatusCode::BAD_REQUEST, "Invalid or expired token".into()))?;

    if now > expires_at {
        sqlx::query("DELETE FROM password_reset_tokens WHERE id = ?1")
            .bind(token_id)
            .execute(&state.db)
            .await
            .ok();
        return Err((StatusCode::BAD_REQUEST, "Token has expired".into()));
    }

    // Hash new password
    let password_hash = crate::auth::hash_password(&body.password)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Update password
    sqlx::query("UPDATE users SET password_hash = ?1 WHERE id = ?2")
        .bind(&password_hash)
        .bind(user_id)
        .execute(&state.db)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // Delete all reset tokens for this user
    sqlx::query("DELETE FROM password_reset_tokens WHERE user_id = ?1")
        .bind(user_id)
        .execute(&state.db)
        .await
        .ok();

    Ok(Json(MessageResponse {
        message: "Password reset successful".into(),
    }))
}
