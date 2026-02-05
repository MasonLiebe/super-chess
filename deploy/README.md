# CustomChess Deployment

## Files
- `protochess-server` — The compiled server binary (Linux x86_64)
- `web/` — Static frontend files
- `.env.example` — Environment variables template

## Setup on Hostinger VPS

### 1. Upload files
Upload this entire `deploy/` folder to your VPS, e.g., to `/var/www/customchess/`

### 2. Create .env file
```bash
cd /var/www/customchess
cp .env.example .env
nano .env
```

Fill in your values:
```
JWT_SECRET=<generate-a-long-random-string>
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USERNAME=hello@customchess.io
SMTP_PASSWORD=<your-password>
SMTP_FROM=hello@customchess.io
APP_URL=https://customchess.io
```

Generate a JWT secret:
```bash
openssl rand -hex 32
```

### 3. Create data directory
```bash
mkdir -p /var/www/customchess/data
```

### 4. Make binary executable
```bash
chmod +x protochess-server
```

### 5. Create systemd service
```bash
sudo nano /etc/systemd/system/customchess.service
```

Paste:
```ini
[Unit]
Description=CustomChess Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/customchess
EnvironmentFile=/var/www/customchess/.env
ExecStart=/var/www/customchess/protochess-server
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable customchess
sudo systemctl start customchess
sudo systemctl status customchess
```

### 6. Configure Nginx reverse proxy
```bash
sudo nano /etc/nginx/sites-available/customchess
```

Paste:
```nginx
server {
    listen 80;
    server_name customchess.io www.customchess.io;

    location / {
        proxy_pass http://127.0.0.1:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/customchess /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Setup SSL with Certbot
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d customchess.io -d www.customchess.io
```

### 8. View logs
```bash
sudo journalctl -u customchess -f
```

## Notes
- The server runs on port 3030 by default
- Database is stored at `./data/protochess.db`
- Frontend is served from `./web/` directory
