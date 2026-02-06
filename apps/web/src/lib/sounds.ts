// Chess sound effects using Web Audio API
// Creates brief, pleasant sounds without external files

import { useSettingsStore } from '../stores/settingsStore';

function isSoundEnabled(): boolean {
  return useSettingsStore.getState().soundEnabled;
}

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Resume audio context if suspended (browser autoplay policy)
async function ensureAudioContext(): Promise<AudioContext> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  return ctx;
}

/**
 * Play a brief "click" sound for piece movement
 */
export async function playMoveSound(): Promise<void> {
  if (!isSoundEnabled()) return;
  try {
    const ctx = await ensureAudioContext();
    const now = ctx.currentTime;

    // Create oscillator for the main tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Short, woody "tap" sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    // Quick attack and decay
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } catch (e) {
    // Silently fail if audio isn't available
    console.debug('Audio not available:', e);
  }
}

/**
 * Play a sound for capturing a piece (slightly different tone)
 */
export async function playCaptureSound(): Promise<void> {
  if (!isSoundEnabled()) return;
  try {
    const ctx = await ensureAudioContext();
    const now = ctx.currentTime;

    // Create oscillator
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Slightly lower, more "thunk" sound for captures
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    // Slightly louder and longer
    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    oscillator.start(now);
    oscillator.stop(now + 0.15);
  } catch (e) {
    console.debug('Audio not available:', e);
  }
}

/**
 * Play a sound for check
 */
export async function playCheckSound(): Promise<void> {
  if (!isSoundEnabled()) return;
  try {
    const ctx = await ensureAudioContext();
    const now = ctx.currentTime;

    // Two quick beeps for check
    for (let i = 0; i < 2; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now + i * 0.1);

      gainNode.gain.setValueAtTime(0.2, now + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.05);

      oscillator.start(now + i * 0.1);
      oscillator.stop(now + i * 0.1 + 0.08);
    }
  } catch (e) {
    console.debug('Audio not available:', e);
  }
}

/**
 * Play a sound for game over (win or lose)
 */
export async function playGameOverSound(won: boolean): Promise<void> {
  if (!isSoundEnabled()) return;
  try {
    const ctx = await ensureAudioContext();
    const now = ctx.currentTime;

    const frequencies = won
      ? [523, 659, 784, 1047] // C5, E5, G5, C6 - happy ascending
      : [400, 350, 300, 250]; // Descending - sad

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, now + i * 0.15);

      gainNode.gain.setValueAtTime(0.2, now + i * 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.12);

      oscillator.start(now + i * 0.15);
      oscillator.stop(now + i * 0.15 + 0.15);
    });
  } catch (e) {
    console.debug('Audio not available:', e);
  }
}
