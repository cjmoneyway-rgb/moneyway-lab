import analysis from "./analysis.json";

export const FPS = 30;
export const DURATION_SEC = analysis.duration;
export const DURATION_FRAMES = Math.ceil(DURATION_SEC * FPS);

// Tempo detected from the soundtrack (≈86 BPM, first downbeat at ~0.14s)
export const BPM = analysis.bpm;
export const BEAT_SEC = 60 / BPM;
export const FIRST_BEAT_SEC = analysis.firstBeat;
export const BAR_SEC = BEAT_SEC * 4;

export const barTime = (bar: number) => FIRST_BEAT_SEC + bar * BAR_SEC;
export const barFrame = (bar: number) => Math.round(barTime(bar) * FPS);

export type SectionName = "intro" | "verse1" | "hook" | "verse2" | "outro";

// Song structure, aligned to bar boundaries.
export const SECTIONS: { name: SectionName; from: number; to: number }[] = [
  { name: "intro", from: 0, to: barFrame(2) },
  { name: "verse1", from: barFrame(2), to: barFrame(6) },
  { name: "hook", from: barFrame(6), to: barFrame(10) },
  { name: "verse2", from: barFrame(10), to: barFrame(14) },
  { name: "outro", from: barFrame(14), to: DURATION_FRAMES },
];

export const sectionAt = (frame: number) =>
  SECTIONS.find((s) => frame >= s.from && frame < s.to) ?? SECTIONS[SECTIONS.length - 1];

export const beatInfo = (frame: number) => {
  const t = (frame / FPS - FIRST_BEAT_SEC) / BEAT_SEC;
  const beat = Math.floor(t);
  const phase = t - beat;
  const active = t >= 0;
  return {
    beat,
    phase,
    bar: Math.floor(beat / 4),
    beatInBar: ((beat % 4) + 4) % 4,
    // sharp attack, exponential decay on every beat
    pulse: active ? Math.exp(-phase * 6) : 0,
  };
};

const KICK_FRAMES = analysis.kicks.map((k) => Math.round(k * FPS));
/** 1 right on a detected kick/onset, decaying to 0 over a few frames. */
export const kickHit = (frame: number, decayFrames = 6) => {
  let v = 0;
  for (const k of KICK_FRAMES) {
    const d = frame - k;
    if (d >= 0 && d < decayFrames) v = Math.max(v, 1 - d / decayFrames);
  }
  return v;
};
