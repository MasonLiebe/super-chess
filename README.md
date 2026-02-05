# CustomChess

A chess variant engine supporting arbitrary board dimensions (up to 16x16), custom piece movement patterns, and configurable tile layouts with disableable squares. Play against an AI opponent, create multiplayer rooms, or design your own variants in the board editor. 

Playable at [customchess.io](https://customchess.io)


## Architecture

```
protochess-v2/
├── apps/
│   ├── web/            # React 19 frontend (Vite 7, TypeScript, Tailwind CSS 4)
│   └── server/         # Async Rust server (Axum 0.7, Tokio)
├── packages/
│   ├── engine/         # Rust chess engine
│   ├── engine-wasm/    # WASM bindings (wasm-bindgen)
│   └── common/         # Shared types and validation (serde)
```

## Chess Engine (Rust / WebAssembly)

The core engine is written in Rust and compiled to WebAssembly via `wasm-bindgen`, running move generation, validation, and AI search entirely in the browser.

### Board Representation

- **256-bit bitboards** using `numext-fixed-uint::U256` to support up to 16x16 boards (256 squares)
- Square indexing: `index = 16 * y + x`
- Per-player `PieceSet` with separate bitboards for each piece type (K, Q, R, B, N, P) plus a `Vec<Piece>` for custom pieces
- Supports up to 4 players via `ArrayVec<[PieceSet; 4]>`

### Search

- **Negamax with alpha-beta pruning** and **principal variation search (PVS)**
- **Iterative deepening** with both fixed-depth and time-bounded modes (timeout checked every 1024 nodes)
- **Null move pruning** (R=3): applied when depth > 3, sufficient material, and not in check
- **Late move reductions (LMR)**: quiet moves after 4+ searched reduced by 2-3 plies at depth >= 5
- **Quiescence search**: capture-only extension to prevent horizon-effect blunders

### Move Ordering

1. **Transposition table** hash moves (priority: `usize::MAX`)
2. **Killer moves**: 2 slots per ply, up to 64 plies deep (score: 9000)
3. **History heuristic**: `[256][256]` from/to table, incremented by depth on cutoff
4. **Static exchange evaluation (SEE)** for captures: `KING_SCORE + victim - attacker`

### Transposition Table

- **1.5 million clusters**, 4 entries per cluster (4-way associative)
- **Zobrist hashing** with a deterministically seeded `StdRng` (seed: `5435651169991665628`)
- Keys cover per-player/per-piece/per-square, en-passant files, castling rights, and side to move
- Replacement: prefer overwriting ancient entries, then lowest-depth entries
- Entry flags: `EXACT`, `ALPHA` (upper bound), `BETA` (lower bound)

### Evaluation

- **Material values** (centipawns): K=9999, Q=900, R=500, B=350, N=300, P=100
- **Piece-square tables** generated dynamically from per-square mobility (reachable moves on an empty board), mean-centered, scaled by PST_MULTIPLIER=5
- **Endgame detection**: total material < 2*K + 2*Q + 2*R (23,698 cp) triggers king centralization (inverted PST sign for king)
- **Custom piece scoring**: +60 per sliding direction, +18 per jump/slide delta; cached in `HashMap<PieceType, isize>`
- **Castling bonus**: 400 cp in the middlegame

### Move Generation

- **Pre-computed attack tables** for knights and kings (256 entries each)
- **Rank-based slider attacks** for rooks, bishops, and queens: `Vec<Vec<u16>>` lookup indexed by rank and occupancy
- Pseudo-legal generation with post-hoc legality check (`is_move_legal` verifies no self-check)
- Special moves: castling (path-clear + rights validation), en passant, promotion (4 variants)

### WASM Interface

Exposed via `#[wasm_bindgen]` on a `CustomChess` struct wrapping the engine:

| Method | Description |
|--------|-------------|
| `make_move(x1, y1, x2, y2)` | Execute a move, returns success |
| `play_best_move(depth)` | AI plays at fixed depth |
| `play_best_move_timeout(time_ms)` | AI plays within time budget |
| `get_state()` / `set_state(val)` | Serialize/deserialize `GameState` via serde JSON |
| `moves_from(x, y)` | Legal destinations from a square |
| `to_move_in_check()` | Check detection |

Build profile: `opt-level = "s"`, wasm-opt `-O4 --enable-mutable-globals`.

## Frontend

- **React 19** with TypeScript, bundled by **Vite 7** using `vite-plugin-wasm` and `vite-plugin-top-level-await` for async WASM initialization
- **Board rendering**: absolutely-positioned DOM `div` elements with SVG piece images (85% tile size with drop-shadow); tile size computed as `floor(560 / max(width, height))`
- **Interactions**: click-to-move and HTML5 drag-and-drop with `DataTransfer` JSON payloads; valid destinations pre-fetched via `moves_from()` and highlighted
- **State management**: two Zustand stores -- `gameStore` (connection, room, game state, player list, chat) and `editorStore` (board dimensions, tiles, pieces, movement patterns, tool selection)
- **Styling**: Tailwind CSS 4 with a neobrutalist design system (4px borders, offset box-shadows, bold typography)

## Multiplayer

- **Server**: async Rust built on **Axum 0.7** with **Tokio**, serving WebSocket connections at `/ws`
- **Room management**: each room runs as an independent `tokio::spawn` task, receiving messages via `mpsc::UnboundedReceiver<RoomMessage>`; rooms are stored in `Arc<RwLock<RoomManager>>` with a `HashMap<String, RoomHandle>`
- **Protocol**: JSON over WebSocket using serde tagged unions (`#[serde(tag = "type", content = "content")]`); message types include `CreateRoom`, `JoinRoom`, `TakeTurn`, `MovesFrom`, `ChatMessage`, `GameInfo`, `PlayerList`, `RoomList`
- **Room IDs**: human-readable names via `adjective_adjective_animal` crate
- **Client reconnection**: 2-second retry with outbound message buffering via a queue flushed on reconnect
- **Spectators**: up to 8 per room, plus white and black seats
- **Deployment**: multi-stage Docker build (node:20-alpine for frontend, rust:1.75-alpine for server, alpine:latest runtime), exposed on port 3030

## Board Editor

- Configurable board dimensions from **4x4 to 16x16** with per-tile enable/disable toggling (tile types: `w`, `b`, `x`)
- Up to **9 custom piece types** (chars: `a, c, d, e, f, g, u, y, z`) with fully configurable movement patterns
- Movement patterns define independent **attack** and **translate** capabilities:
  - **8 sliding directions** (N, S, E, W, NE, NW, SE, SW) with per-direction attack/move toggles
  - **Arbitrary jump deltas** on a configurable 5x5 to 15x15 grid
  - **Slide deltas** for custom sliding directions
- Board configurations serializable as JSON `GameState` objects for export/import
- **6 prebuilt variants**: Standard (8x8), Mini (6x6), Micro (4x5), Big (10x10), Holy (8x8 with disabled tiles), Pawn Storm (kings + pawns only)

## Running Locally

```bash
# Frontend dev server
cd apps/web
npm install
npm run dev          # http://localhost:5173

# Backend server (requires Rust toolchain)
cd apps/server
cargo run            # ws://localhost:3030/ws

# Docker (full stack)
docker compose up    # http://localhost:3030
```
