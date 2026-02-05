#!/bin/bash
set -e

echo "=== CustomChess VPS Build Script ==="

# Install Rust if not present
if ! command -v cargo &> /dev/null; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
fi

# Install wasm-pack if not present
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    cargo install wasm-pack
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Build WASM engine
echo "Building WASM engine..."
cd packages/engine-wasm
wasm-pack build --target web
cd ../..

# Build frontend
echo "Building frontend..."
cd apps/web
npm install
npm run build
cd ../..

# Build server
echo "Building server (release)..."
cd apps/server
cargo build --release
cd ../..

# Create deployment folder
echo "Creating deployment folder..."
mkdir -p /var/www/customchess/data
cp apps/server/target/release/protochess-server /var/www/customchess/
cp -r apps/web/dist /var/www/customchess/web

echo ""
echo "=== Build complete! ==="
echo "Binary: /var/www/customchess/protochess-server"
echo "Frontend: /var/www/customchess/web/"
echo ""
echo "Next steps:"
echo "1. Create /var/www/customchess/.env with your secrets"
echo "2. Set up systemd service (see README.md)"
echo "3. Configure nginx reverse proxy"
echo "4. Enable SSL with certbot"
