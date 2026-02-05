use lettre::{
    message::header::ContentType,
    transport::smtp::authentication::Credentials,
    AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor,
};
use rand::Rng;

pub struct EmailService {
    mailer: Option<AsyncSmtpTransport<Tokio1Executor>>,
    from_address: String,
    app_url: String,
}

impl EmailService {
    pub fn from_env() -> Self {
        let smtp_host = std::env::var("SMTP_HOST").ok();
        let smtp_port = std::env::var("SMTP_PORT")
            .ok()
            .and_then(|p| p.parse::<u16>().ok())
            .unwrap_or(587);
        let smtp_username = std::env::var("SMTP_USERNAME").ok();
        let smtp_password = std::env::var("SMTP_PASSWORD").ok();
        let from_address = std::env::var("SMTP_FROM")
            .unwrap_or_else(|_| "noreply@protochess.local".to_string());
        let app_url = std::env::var("APP_URL")
            .unwrap_or_else(|_| "http://localhost:5173".to_string());

        let mailer = match (smtp_host, smtp_username, smtp_password) {
            (Some(host), Some(username), Some(password)) => {
                let creds = Credentials::new(username, password);
                match AsyncSmtpTransport::<Tokio1Executor>::starttls_relay(&host) {
                    Ok(builder) => {
                        let transport = builder
                            .port(smtp_port)
                            .credentials(creds)
                            .build();
                        tracing::info!("SMTP email service configured (host: {}:{})", host, smtp_port);
                        Some(transport)
                    }
                    Err(e) => {
                        tracing::warn!("Failed to configure SMTP: {}. Emails will be logged to console.", e);
                        None
                    }
                }
            }
            _ => {
                tracing::info!("SMTP not configured. Emails will be logged to console.");
                None
            }
        };

        Self {
            mailer,
            from_address,
            app_url,
        }
    }

    pub fn generate_token() -> String {
        let mut rng = rand::thread_rng();
        let bytes: Vec<u8> = (0..32).map(|_| rng.gen()).collect();
        hex::encode(&bytes)
    }

    pub fn token_expiry_1h() -> String {
        let expiry = chrono::Utc::now() + chrono::Duration::hours(1);
        expiry.format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string()
    }

    pub async fn send_verification_email(
        &self,
        to: &str,
        username: &str,
        token: &str,
    ) -> Result<(), String> {
        let link = format!("{}/verify-email?token={}", self.app_url, token);
        let subject = "Verify your Protochess email";
        let body = format!(
            "Hi {},\n\nPlease verify your email by clicking this link:\n{}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, you can ignore this email.",
            username, link
        );

        self.send_email(to, subject, &body).await
    }

    pub async fn send_password_reset_email(
        &self,
        to: &str,
        username: &str,
        token: &str,
    ) -> Result<(), String> {
        let link = format!("{}/reset-password?token={}", self.app_url, token);
        let subject = "Reset your Protochess password";
        let body = format!(
            "Hi {},\n\nYou requested a password reset. Click this link to set a new password:\n{}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, you can ignore this email.",
            username, link
        );

        self.send_email(to, subject, &body).await
    }

    async fn send_email(&self, to: &str, subject: &str, body: &str) -> Result<(), String> {
        let email = Message::builder()
            .from(self.from_address.parse().map_err(|e| format!("Invalid from address: {}", e))?)
            .to(to.parse().map_err(|e| format!("Invalid to address: {}", e))?)
            .subject(subject)
            .header(ContentType::TEXT_PLAIN)
            .body(body.to_string())
            .map_err(|e| format!("Failed to build email: {}", e))?;

        match &self.mailer {
            Some(mailer) => {
                mailer.send(email).await.map_err(|e| format!("Failed to send email: {}", e))?;
                tracing::info!("Email sent to {}: {}", to, subject);
            }
            None => {
                tracing::info!("=== EMAIL (console mode) ===");
                tracing::info!("To: {}", to);
                tracing::info!("Subject: {}", subject);
                tracing::info!("Body:\n{}", body);
                tracing::info!("=== END EMAIL ===");
            }
        }

        Ok(())
    }
}

// Tiny hex encoding to avoid adding a dependency
mod hex {
    pub fn encode(bytes: &[u8]) -> String {
        bytes.iter().map(|b| format!("{:02x}", b)).collect()
    }
}
