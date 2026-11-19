// Scans public/footage for performance clips and writes src/footage.json.
// Existing per-clip settings (syncOffsetSec, framing) are preserved on re-scan.
// Usage: npm run scan-footage
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("public/footage");
const out = path.resolve("src/footage.json");
const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : [];
const byFile = Object.fromEntries(prev.map((c) => [c.file, c]));

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(mp4|mov|m4v|webm|mkv)$/i.test(f))
  .sort();

const clips = files.map((file) => {
  const probe = JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", path.join(dir, file)]).toString(),
  );
  const { width, height } = probe.streams[0];
  const durationSec = Number(probe.format.duration);
  const old = byFile[file] ?? {};
  return {
    file,
    width,
    height,
    durationSec,
    // Time (seconds) in this clip at which the song starts. If CJ performed to playback and the
    // clip begins exactly at the song's first sample, this is 0.
    syncOffsetSec: old.syncOffsetSec ?? 0,
    // Where CJ's face is in the clip, as fractions of the frame (used for close framing).
    face: old.face ?? { x: 0.5, y: 0.35 },
    // Zoom used for close framing (1 = full frame).
    closeZoom: old.closeZoom ?? 1.7,
  };
});

fs.writeFileSync(out, JSON.stringify(clips, null, 2) + "\n");
console.log(`Found ${clips.length} clip(s):`);
for (const c of clips) console.log(`  ${c.file}  ${c.width}x${c.height}  ${c.durationSec.toFixed(2)}s  sync=${c.syncOffsetSec}s`);
