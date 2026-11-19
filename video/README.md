# CJ × MONEYWAY — Music Video (Remotion)

Urban music video built in code with [Remotion](https://remotion.dev). It stars **CJ** as lead vocalist and rapper over the
original soundtrack (`public/soundtrack.wav`, 47.36 s). Everything here is editable: shots, cuts, text, colours and timing.

## Deliverables
| Output | Spec | Command |
|---|---|---|
| **Master** — `out/cj-moneyway-master-1920x1080.mp4` | 1920×1080, 30 fps, H.264 yuv420p CRF 18, AAC 48 kHz stereo | `npm run render` |
| Verification report — `out/cj-moneyway-master-1920x1080.verification.md` | format, frame count, audio sync, cut timing | `npm run verify` |
| Vertical cut (optional) — `out/cj-moneyway-9x16.mp4` | 1080×1920 | `npm run render:vertical` |

The master is rendered natively at 1920×1080 (scale 1) from the original assets. Do not use the preview proxies
(`*-preview.mp4`) as masters, because they are deliberately downscaled.

Setup: `npm install`, then `npm run studio` for a live editable preview. If Remotion can't download its headless Chrome:
`REMOTION_CHROME=/path/to/chrome-headless-shell npm run render`.

## Structure — locked to the track (≈86 BPM, 1 beat ≈ 0.70 s, cuts on beats)
| Time | Section | Framing / cuts | Graphics |
|---|---|---|---|
| 0:00–0:05 | Intro | Portrait reveal (graphic moment) | Crown draw-on, "MONEYWAY PRESENTS", giant outlined "CJ" |
| 0:05–0:17 | Verse 1 | Medium (1 bar) → close → then medium/close every 2 beats | Phrase per bar, "CJ — Lead Vocals" strap |
| 0:17–0:28 | Hook | Medium/close every 2 beats | Scrolling "MONEYWAY" wall, beams, strobe, echo trails |
| 0:28–0:39 | Verse 2 | Portrait graphic treatments, medium/close per bar | Graffiti wall, colour / B&W / red treatments |
| 0:39–0:47 | Outro | Medium → close → medium | Crown + title, then "CJ × MONEYWAY" end card |

The full cut list is in **`src/shots.ts`**. Change a shot's `beat`, `framing` (`medium` | `close`) or `source`
(`performance` | `portrait`) and the edit, transitions and verification all follow.

## Performance footage (drop-in)
1. Put CJ's performance clips in `public/footage/` (mp4/mov/webm; ideally 1080p or higher, shot to playback of this song).
2. Run `npm run scan-footage`. This writes `src/footage.json` with each clip's size and duration.
3. In `src/footage.json`, set for each clip:
   - `syncOffsetSec` — the time in the clip where the song's first sample lands (clap/slate or waveform match). This keeps CJ's lip-sync and gestures locked to the master audio.
   - `face` — where CJ's face sits in the frame (0–1 fractions). Close framing zooms there.
   - `closeZoom` — how tight the close shot is (default 1.7).
4. Re-render. Every `performance` shot now cuts to the footage, rotating through clips (or pin one with `clip: <index>`).
   Clip audio is muted, and the grade is pushed into the red/black look. Portrait `graphic` shots (intro, verse 2) stay as designed.
   When no footage covers a moment, that shot falls back to the portrait automatically.

### Photo-only rules (current state)
Only a single portrait was supplied, so the performance shots use **layered movement and depth**: a parallax background,
rack-focus blur on close shots, out-of-focus foreground bokeh, slow push-ins and lateral drift, and beat-timed cut punches.
CJ's photo is always moved as one rigid layer. **No facial expressions, mouth movements or gestures are synthesised.**
Glitch slices only touch the chest/arms and keep the original colours, so his face, cap logo and hoodie branding stay consistent.

## Customising
- **Text** — `src/copy.ts` · **Section/beat timing** — `src/timing.ts` (from `src/analysis.json`) · **Cuts** — `src/shots.ts`
- **Portrait** — `public/cj.png` (transparent PNG, 1152×1366 supplied; close shots enlarge it about 1.4×, so a higher-res original will be sharper)
- **Fonts** — bundled in `public/fonts` (Anton, Bebas Neue, Permanent Marker; SIL OFL)
