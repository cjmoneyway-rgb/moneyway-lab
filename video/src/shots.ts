import footage from "./footage.json";
import { BEAT_SEC, DURATION_FRAMES, FIRST_BEAT_SEC, FPS } from "./timing";

export type Framing = "medium" | "close";
/**
 * performance — CJ performing. Uses supplied performance footage when public/footage has clips
 *               (see `npm run scan-footage`), otherwise the portrait with layered movement.
 * portrait    — graphic moment built on the portrait (intro reveal, verse-2 treatments).
 */
export type ShotSource = "performance" | "portrait";

export type Clip = {
  file: string;
  width: number;
  height: number;
  durationSec: number;
  syncOffsetSec: number;
  face: { x: number; y: number };
  closeZoom: number;
};
export const CLIPS = footage as Clip[];

type ShotDef = { beat: number; framing: Framing; source: ShotSource; clip?: number };

// Cut list, in beats of the track (1 beat ≈ 0.70 s, 4 beats = 1 bar). Every cut lands on a beat.
const SHOT_DEFS: ShotDef[] = [
  // intro — portrait reveal (graphic)
  { beat: 0, framing: "medium", source: "portrait" },
  // verse 1 — a bar on medium, then two-beat cuts between medium and close
  { beat: 8, framing: "medium", source: "performance" },
  { beat: 12, framing: "close", source: "performance" },
  { beat: 16, framing: "medium", source: "performance" },
  { beat: 18, framing: "close", source: "performance" },
  { beat: 20, framing: "medium", source: "performance" },
  { beat: 22, framing: "close", source: "performance" },
  // hook — cuts every two beats
  { beat: 24, framing: "medium", source: "performance" },
  { beat: 26, framing: "close", source: "performance" },
  { beat: 28, framing: "medium", source: "performance" },
  { beat: 30, framing: "close", source: "performance" },
  { beat: 32, framing: "medium", source: "performance" },
  { beat: 34, framing: "close", source: "performance" },
  { beat: 36, framing: "medium", source: "performance" },
  { beat: 38, framing: "close", source: "performance" },
  // verse 2 — portrait graphic treatments over the graffiti wall, one framing per bar
  { beat: 40, framing: "medium", source: "portrait" },
  { beat: 44, framing: "close", source: "portrait" },
  { beat: 48, framing: "medium", source: "portrait" },
  { beat: 52, framing: "close", source: "portrait" },
  // outro
  { beat: 56, framing: "medium", source: "performance" },
  { beat: 60, framing: "close", source: "performance" },
  { beat: 62, framing: "medium", source: "performance" },
];

const beatFrame = (beat: number) => Math.max(0, Math.round((FIRST_BEAT_SEC + beat * BEAT_SEC) * FPS));

export type Shot = ShotDef & { index: number; from: number; to: number };
export const SHOTS: Shot[] = SHOT_DEFS.map((s, i) => ({
  ...s,
  index: i,
  from: i === 0 ? 0 : beatFrame(s.beat),
  to: i + 1 < SHOT_DEFS.length ? beatFrame(SHOT_DEFS[i + 1].beat) : DURATION_FRAMES,
}));

export const shotAt = (frame: number) => SHOTS.find((s) => frame >= s.from && frame < s.to) ?? SHOTS[SHOTS.length - 1];

/** The footage clip to use for a shot at a given frame, or null to fall back to the portrait. */
export const clipFor = (shot: Shot, frame: number): { clip: Clip; clipFrame: number } | null => {
  if (shot.source !== "performance" || CLIPS.length === 0) return null;
  const clip = CLIPS[(shot.clip ?? shot.index) % CLIPS.length];
  const clipFrame = Math.round(frame + clip.syncOffsetSec * FPS);
  if (clipFrame < 0 || clipFrame >= Math.floor(clip.durationSec * FPS) - 1) return null;
  return { clip, clipFrame };
};
