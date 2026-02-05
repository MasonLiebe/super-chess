pub mod models;

use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::SqlitePool;
use std::str::FromStr;

pub async fn init_db(database_url: &str) -> SqlitePool {
    // Ensure the parent directory exists for the database file
    if let Some(path) = database_url
        .strip_prefix("sqlite:")
        .and_then(|s| s.split('?').next())
    {
        if let Some(parent) = std::path::Path::new(path).parent() {
            std::fs::create_dir_all(parent).ok();
        }
    }

    let options = SqliteConnectOptions::from_str(database_url)
        .expect("Invalid DATABASE_URL")
        .create_if_missing(true)
        .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal);

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await
        .expect("Failed to connect to database");

    // Run migrations - use raw_execute to handle multiple statements
    let migrations: &[&str] = &[
        include_str!("../../migrations/001_initial.sql"),
        include_str!("../../migrations/002_email.sql"),
    ];
    for migration_sql in migrations {
        for statement in migration_sql.split(';') {
            let stmt = statement.trim();
            if !stmt.is_empty() {
                sqlx::query(stmt).execute(&pool).await.ok();
            }
        }
    }

    pool
}
