# Stage 1: Build frontend
FROM node:20-alpine AS frontend
WORKDIR /app

# Copy package files
COPY apps/web/package*.json ./apps/web/
WORKDIR /app/apps/web
RUN npm ci

# Copy source and build
WORKDIR /app
COPY apps/web ./apps/web
COPY packages ./packages
WORKDIR /app/apps/web
RUN npm run build

# Stage 2: Build backend
FROM rust:1.75-alpine AS backend
RUN apk add --no-cache musl-dev

WORKDIR /app

# Copy Cargo files first for dependency caching
COPY apps/server/Cargo.toml ./apps/server/
COPY packages/engine/Cargo.toml ./packages/engine/
COPY packages/engine-wasm/Cargo.toml ./packages/engine-wasm/
COPY packages/common/Cargo.toml ./packages/common/

# Create dummy source files for dependency caching
RUN mkdir -p apps/server/src packages/engine/src packages/engine-wasm/src packages/common/src \
    && echo "fn main() {}" > apps/server/src/main.rs \
    && echo "" > packages/engine/src/lib.rs \
    && echo "" > packages/engine-wasm/src/lib.rs \
    && echo "" > packages/common/src/lib.rs

# Build dependencies
WORKDIR /app/apps/server
RUN cargo build --release || true

# Copy actual source
WORKDIR /app
COPY packages ./packages
COPY apps/server ./apps/server

# Build server
WORKDIR /app/apps/server
RUN cargo build --release

# Stage 3: Runtime
FROM alpine:latest

# Install runtime dependencies
RUN apk add --no-cache ca-certificates

# Copy built artifacts
COPY --from=backend /app/apps/server/target/release/protochess-server /usr/local/bin/
COPY --from=frontend /app/apps/web/dist /srv/dist

WORKDIR /srv

# Set environment variables
ENV RUST_LOG=info

# Expose port
EXPOSE 3030

# Run server
CMD ["protochess-server"]
