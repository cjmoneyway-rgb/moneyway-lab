# Moneyway Video Lab — CJ × MONEYWAY Prototype

Moneyway Video Lab is an internal AI-assisted video creation workstream within the existing Moneyway Lab™ repository. It is not a separate Lab, application, repository, or department.

This first prototype is an urban music video built in code with [Remotion](https://remotion.dev). It uses an approved CJ image as the lead visual and the project soundtrack (`public/soundtrack.wav`, approximately 47 seconds) as audio.

## Status

**Prototype / human review required.**

The project demonstrates code-based motion design and repeatable rendering. It does not by itself establish publication approval, participant outcomes, production readiness, autonomous video creation, or rights clearance for future assets.

## Outputs

| Composition | Size | Command |
|---|---:|---|
| `CJMoneyway` | 1920×1080 (YouTube) | `npm run render` → `out/cj-moneyway-16x9.mp4` |
| `CJMoneywayVertical` | 1080×1920 (Reels/TikTok/Shorts) | `npm run render:vertical` → `out/cj-moneyway-9x16.mp4` |

Live preview and editing:

```bash
npm install
npm run studio
```

## Structure

| Time | Section | Visual treatment |
|---|---|---|
| 0:00–0:05 | Intro | Crown draw-on, “MONEYWAY PRESENTS,” CJ over a night skyline |
| 0:05–0:17 | Verse 1 | Bar-synchronized phrases, name strap, beat bounce and kick glitches |
| 0:17–0:28 | Hook | Scrolling MONEYWAY wall, beams, strobes, echo trails and camera motion |
| 0:28–0:39 | Verse 2 | Brick-wall scene with bar-based color treatments |
| 0:39–0:47 | Outro | Crown and title over skyline, followed by the CJ × MONEYWAY end card |

The equalizer, visual pulse, moon and glow use the audio spectrum through `@remotion/media-utils`. Cuts follow the analyzed beat grid and kick references in `src/analysis.json`.

## Customize

- **Text:** `src/copy.ts`
- **Timing and sections:** `src/timing.ts`
- **Approved photo:** `public/cj.png`
- **Audio:** `public/soundtrack.wav`
- **Fonts:** `public/fonts/`
- **Compositions:** `src/Root.tsx`
- **Main visual system:** `src/MusicVideo.tsx`

If Remotion cannot download its headless Chrome, set:

```bash
REMOTION_CHROME=/path/to/chrome-headless-shell npm run render
```

## Responsible-use requirements

1. Use an authentic, explicitly approved photograph for CJ or any other named person. Never generate or substitute a false likeness.
2. Confirm ownership or licensing for audio, fonts, photographs and other source material before public release.
3. Minimize personal or confidential information in prompts, filenames, metadata and project assets.
4. Treat generated captions, timing, claims and visual context as drafts requiring human review.
5. Check accessibility, legibility, mobile framing, audio balance and platform requirements before release.
6. Do not publish, message, upload, connect external accounts, or purchase services automatically.
7. Store generated renders in `out/` or approved media storage. The output directory is intentionally excluded from Git.
8. Record whether a deliverable is **draft**, **human-reviewed**, or **release-approved**. Rendering alone does not advance its approval state.

## Ownership

- Technical implementation: Software Development & Codex Division
- Creative validation and finishing: Video Production
- Privacy, consent, likeness, copyright and responsible use: AI Governance, Security & Adoption
- Final public release authority: designated human content owner
