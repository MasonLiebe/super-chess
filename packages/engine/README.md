Yep — here’s a cleaner, more professional README with tighter language, clearer structure, and a bit more narrative flow. I kept your technical tone but made it feel more “open-source ready”:

---

# Custom Chess Engine

This crate implements the core logic for a custom chess engine designed to support arbitrary board sizes and non-standard pieces. It’s built with performance in mind, while remaining flexible enough to experiment with novel chess variants.

## Features

* **Bitboard representation** using 256-bit integers (supports boards up to 16×16)
* **Kindergarten-style move generation** implemented with Rust iterators
* **Zobrist hashing**
* **Transposition tables**
* **Principal Variation Search** with iterative deepening
* **Quiescence search**
* **History heuristic**
* **Killer heuristic**
* **Null-move pruning**
* **Late Move Reductions (LMR)**

## What Makes This Engine Different

Unlike traditional chess engines that rely on static, compile-time piece-square tables, this engine dynamically generates both:

* Piece-square tables
* Material values for *custom* pieces

Material values are derived from each piece’s mobility (number of available move directions), and piece-square tables are computed by summing all legal moves from every square on the board. This allows the engine to adapt automatically to entirely new piece types without manual tuning.

Because of this design, the evaluation function is intentionally generic. It does **not** heavily optimize for standard chess concepts like pawn structure or king safety. Despite that, it still plays classical chess competently.
The primary goal here is flexibility and experimentation rather than peak Elo in orthodox chess.

## Roadmap / Future Improvements

* Multithreading via Lazy SMP (may conflict with WASM integration)
* Time management
