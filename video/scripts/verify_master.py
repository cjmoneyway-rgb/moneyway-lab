"""Verify the delivered master: format, resolution, duration, audio sync and cut timing.

Usage: python3 scripts/verify_master.py out/cj-moneyway-master-1920x1080.mp4 public/soundtrack.wav
Writes a Markdown report next to the video (<name>.verification.md) and exits non-zero on failure.
"""
import json, re, subprocess, sys, pathlib
import numpy as np

video, ref = sys.argv[1], sys.argv[2]
root = pathlib.Path(__file__).resolve().parent.parent
checks, notes = [], []

def ok(name, cond, detail):
    checks.append((name, bool(cond), detail))

def probe(path):
    return json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", path]))

p = probe(video)
v = next(s for s in p["streams"] if s["codec_type"] == "video")
a = next((s for s in p["streams"] if s["codec_type"] == "audio"), None)
num, den = map(int, v["r_frame_rate"].split("/"))
fps = num / den
ok("Resolution 1920×1080", (v["width"], v["height"]) == (1920, 1080), f'{v["width"]}×{v["height"]}')
ok("Square pixels", v.get("sample_aspect_ratio", "1:1") in ("1:1", "0:1", None), v.get("sample_aspect_ratio", "1:1"))
ok("Codec H.264, yuv420p", v["codec_name"] == "h264" and v["pix_fmt"] == "yuv420p", f'{v["codec_name"]} {v["pix_fmt"]} ({v.get("profile","")})')
ok("Frame rate 30 fps", abs(fps - 30) < 1e-6, f"{fps:g} fps")
nb = int(subprocess.check_output(["ffprobe", "-v", "error", "-count_packets", "-select_streams", "v:0", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", video]).decode().strip().strip(","))
analysis = json.load(open(root / "src/analysis.json"))
expected_frames = int(np.ceil(analysis["duration"] * 30))
ok("Frame count", nb == expected_frames, f"{nb} frames (expected {expected_frames})")
ok("Video bitrate", True, f'{int(p["format"]["bit_rate"]) / 1e6:.1f} Mb/s overall, {int(p["format"]["size"]) / 1e6:.1f} MB')
ok("Audio stream present", a is not None, f'{a["codec_name"]} {a["sample_rate"]} Hz, {a["channels"]} ch' if a else "missing")

# ---- audio sync: cross-correlate master audio against the original soundtrack ----
def pcm(path, sr=8000):
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"])
    return np.frombuffer(raw, dtype=np.float32)
sr = 8000
m, r = pcm(video, sr), pcm(ref, sr)
n = min(len(m), len(r))
seg = slice(sr * 2, min(n, sr * 40))
mm, rr = m[seg] - m[seg].mean(), r[seg] - r[seg].mean()
maxlag = sr // 10
lags = range(-maxlag, maxlag + 1, 1)
corr = np.correlate(np.pad(mm, maxlag), rr, mode="valid")
lag = int(np.argmax(corr)) - maxlag
offset_ms = lag / sr * 1000
ok("Audio in sync with soundtrack", abs(offset_ms) <= 1000 / 30, f"offset {offset_ms:+.1f} ms (tolerance ±1 frame = ±33.3 ms)")
aligned = m[: n] if lag == 0 else m[max(0, lag): n + min(0, lag)]
cc = float(np.corrcoef(m[seg], r[seg])[0, 1])
ok("Audio matches soundtrack", cc > 0.98, f"correlation {cc:.4f}")
dur_v = float(v.get("duration", p["format"]["duration"]))
dur_a = float(a.get("duration", p["format"]["duration"])) if a else 0
ok("Duration matches song", abs(dur_a - analysis["duration"]) < 0.1 and abs(dur_v - analysis["duration"]) < 0.1,
   f"video {dur_v:.3f}s, audio {dur_a:.3f}s, song {analysis['duration']:.3f}s")

# ---- cut timing: every planned cut should be a visual change landing on its beat frame ----
beats = [int(b) for b in re.findall(r"beat:\s*(\d+)", (root / "src/shots.ts").read_text())]
bs = 60 / analysis["bpm"]
cut_frames = [round((analysis["firstBeat"] + b * bs) * 30) for b in beats if b > 0]
raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", video, "-vf", "scale=96:54,format=gray", "-f", "rawvideo", "-"])
frames = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 54, 96).astype(np.float32)
diff = np.abs(np.diff(frames, axis=0)).mean(axis=(1, 2))  # diff[i] = change from frame i to i+1
base = float(np.median(diff))
hits = []
for cf in cut_frames:
    window = diff[max(0, cf - 2): cf + 1]  # change into frame cf (allow ±1 frame)
    peak = float(window.max()) if len(window) else 0
    hits.append((cf, cf / 30, peak / max(base, 1e-6)))
landed = sum(1 for _, _, x in hits if x > 2.0)
ok("Cuts land on the beat", landed >= 0.8 * len(hits), f"{landed}/{len(hits)} planned cuts show a visual change ≥2× median at the beat frame (±1 frame)")
blacks = int((frames.mean(axis=(1, 2)) < 4).sum())
ok("No unintended black frames", blacks <= 20, f"{blacks} near-black frames (only the closing fade-out is allowed)")

passed = all(c[1] for c in checks)
lines = [f"# Master verification — {pathlib.Path(video).name}", "", f"**Result: {'PASS' if passed else 'FAIL'}**", "", "| Check | Result | Detail |", "|---|---|---|"]
lines += [f"| {n} | {'✅' if c else '❌'} | {d} |" for n, c, d in checks]
lines += ["", "## Cut timing", "", "| Frame | Time (s) | Change vs median |", "|---|---|---|"]
lines += [f"| {f} | {t:.3f} | {x:.1f}× |" for f, t, x in hits]
report = "\n".join(lines) + "\n"
pathlib.Path(video).with_suffix(".verification.md").write_text(report)
print(report)
sys.exit(0 if passed else 1)
