# CJ × MONEYWAY — Music Video (Remotion)

An urban music video built in code with [Remotion](https://remotion.dev), starring **CJ** as the lead vocalist/rapper,
with the original soundtrack (`public/soundtrack.wav`, 47 s) as the audio.

## Outputs
| Composition | Size | Command |
|---|---|---|
| `CJMoneyway` | 1920×1080 (YouTube) | `npm run render` → `out/cj-moneyway-16x9.mp4` |
| `CJMoneywayVertical` | 1080×1920 (Reels/TikTok/Shorts) | `npm run render:vertical` → `out/cj-moneyway-9x16.mp4` |

Live preview and editing: `npm install && npm run studio`.

## Structure (synced to the track: ~86 BPM, bar-aligned)
| Time | Section | Visuals |
|---|---|---|
| 0:00–0:05 | Intro | Crown draws on, "MONEYWAY PRESENTS", CJ rises over a night skyline with a giant outlined "CJ" |
| 0:05–0:17 | Verse 1 | Phrases slam in on each bar, "CJ — Lead Vocals" name strap, beat bounce and glitches on the kicks |
| 0:17–0:28 | Hook | Scrolling "MONEYWAY" wall, light beams, strobes, echo trails, camera shake |
| 0:28–0:39 | Verse 2 | Brick wall with graffiti, colour treatments that change each bar (full colour / B&W / red) |
| 0:39–0:47 | Outro | Crown and title over the skyline, then the "CJ × MONEYWAY" end card |

The motion is audio-reactive: the equalizer, CJ's pulse, the moon and the glow follow the real spectrum (`@remotion/media-utils`),
and the cuts follow the detected beat grid and kick hits (`src/analysis.json`).

## Customising
- **Text** — `src/copy.ts` (phrases per bar, name, role, end card).
- **Timing/sections** — `src/timing.ts`.
- **Photo** — replace `public/cj.png` (transparent PNG works best).
- **Fonts** — bundled in `public/fonts` (Anton, Bebas Neue, Permanent Marker; SIL OFL).

If Remotion can't download its headless Chrome, point it at a local one:
`REMOTION_CHROME=/path/to/chrome-headless-shell npm run render`.
