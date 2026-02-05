use axum::{
    extract::FromRequestParts,
    http::{header, request::Parts, StatusCode},
};
use std::sync::Arc;

use crate::AppStateInner;

#[derive(Debug, Clone)]
pub struct AuthUser {
    pub user_id: i64,
    pub username: String,
}

#[derive(Debug, Clone)]
pub struct OptionalAuthUser(pub Option<AuthUser>);

impl FromRequestParts<Arc<AppStateInner>> for AuthUser {
    type Rejection = (StatusCode, &'static str);

    fn from_request_parts<'life0, 'life1, 'async_trait>(
        parts: &'life0 mut Parts,
        state: &'life1 Arc<AppStateInner>,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Result<Self, Self::Rejection>> + Send + 'async_trait>>
    where
        'life0: 'async_trait,
        'life1: 'async_trait,
        Self: 'async_trait,
    {
        let jwt_secret = state.jwt_secret.clone();
        let token = extract_token(parts);

        Box::pin(async move {
            let token = token
                .ok_or((StatusCode::UNAUTHORIZED, "Missing authorization header"))?;

            let claims = super::decode_token(&token, &jwt_secret)
                .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid or expired token"))?;

            Ok(AuthUser {
                user_id: claims.sub,
                username: claims.username,
            })
        })
    }
}

impl FromRequestParts<Arc<AppStateInner>> for OptionalAuthUser {
    type Rejection = std::convert::Infallible;

    fn from_request_parts<'life0, 'life1, 'async_trait>(
        parts: &'life0 mut Parts,
        state: &'life1 Arc<AppStateInner>,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Result<Self, Self::Rejection>> + Send + 'async_trait>>
    where
        'life0: 'async_trait,
        'life1: 'async_trait,
        Self: 'async_trait,
    {
        let jwt_secret = state.jwt_secret.clone();
        let token = extract_token(parts);

        Box::pin(async move {
            let auth = match token {
                Some(token) => super::decode_token(&token, &jwt_secret)
                    .ok()
                    .map(|claims| AuthUser {
                        user_id: claims.sub,
                        username: claims.username,
                    }),
                None => None,
            };
            Ok(OptionalAuthUser(auth))
        })
    }
}

fn extract_token(parts: &Parts) -> Option<String> {
    let header = parts.headers.get(header::AUTHORIZATION)?;
    let value = header.to_str().ok()?;
    let token = value.strip_prefix("Bearer ")?;
    Some(token.to_string())
}
