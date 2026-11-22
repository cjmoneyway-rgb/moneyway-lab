# Quality Assurance Report: AI Operator 101 (Draft v1 → Complete Draft)
**Moneyway Lab™ · CJ Moneyway Media™** · Review date 2026-11-22

**Bottom line:** the curriculum, workbook, facilitator guide, and templates are complete as an
**executive-review draft**. They are not approved for sale, publication, or scheduling. Open approvals: [decision-register.md](decision-register.md).

## 1. Scope reviewed
- Root: `README.md`, `CLAUDE.md`
- `brand/` (all six files), `inbox/README.md`, `products/README.md`
- `masterclass/ai-operator-101/` (README, four lessons, workbook, facilitator guide)
- `masterclass/sources/claude-code-four-moves.md`
- `templates/` (three files)
- Branch compared with `main`: the starting branch added only the Draft v1 files. **`video/` (Moneyway Video Lab) was not modified.**

## 2. Technical accuracy: verified against primary sources
Checked on 2026-11-22 against the Claude Code documentation (code.claude.com/docs: `memory`,
`permission-modes`, `common-workflows`). Two of those pages were long; part of their content was read through a summary,
so items marked † below should be re-confirmed by hand before delivery.

| Topic | Draft v1 said | Corrected to |
|---|---|---|
| CLAUDE.md loading | "Claude reads it every session" | Loaded when a Claude Code session starts in that folder (and parent folders); subfolder CLAUDE.md files load on demand; guidance, not enforcement; aim for under ~200 lines |
| Memory types | Not distinguished | Project CLAUDE.md vs personal (`~/.claude/CLAUDE.md`, `CLAUDE.local.md`) vs auto memory; `/memory`† and `/init` |
| Other platforms | Not mentioned | Lesson 2 says other AI tools handle context differently; the habit transfers, the setup doesn't |
| Permission modes | Five modes, simplified | Manual (`default`), Accept edits, Plan, Auto (availability varies; "doesn't guarantee safety"), Bypass (isolated machines only), plus a note on `dontAsk`; Shift+Tab and `--permission-mode` |
| Plan mode | Implied it always asks clarifying questions | Researches and plans with no edits until approved; *may* ask questions, and students are taught to prompt for them |
| Facts file | "Change it once and everything stays right" | Updates future work only; already-published items must be regenerated (with a "Used in" checklist) |
| Automation | Lead-machine flow implied AI sends email and updates the CRM | Every step marked AI / TOOL / HUMAN ✅; sending, money, personal data, and live systems need a human and an authorized integration |
| Inbox | Implied routing happens automatically | Routing is manual, on request ("process the inbox") |

## 3. Changes made
- **Lessons 1–4:** rewritten to one structure (learning objective → explanation → worked example → exercise → expected output → completion check). Single fictional business (*Brick & Bloom Candle Co.*) throughout. Lesson 3 adds a risk-tier table and the Plan → Build → Review → Test loop. Lesson 4 is labeled Moneyway Lab™ original, with entrepreneur, creator, and small-business examples. The goal-prompt label was standardized to **DONE LOOKS LIKE**.
- **Workbook:** welcome, outcomes, privacy rule, four step-by-step exercises with completed fictional examples and response space, three reusable templates, a final "AI Operator Kit" assignment, and an 11-item self-assessment.
- **Facilitator guide:** outcomes, prep checklist, a 90-minute run of show with Teach/Demo/Exercise splits, talking points, demo scripts, participation prompts, a 6-question closing assessment, troubleshooting, an offline fallback, and privacy guidance.
- **Templates:** aligned with the lessons (AI/TOOL/HUMAN ✅ in the SOP; DONE LOOKS LIKE plus a pre-send checklist in the goal prompt; HTML-comment notes in the CLAUDE.md starter, which Claude Code strips before reading).
- **Brand governance:** protected marks added with ™; video-derived colors, fonts, and slogans labeled DRAFT; draft slogans removed from course materials; prices confirmed unset.
- **Repository docs:** README "Working in this repo" setup steps; CLAUDE.md and inbox wording corrected (no automation claims); new `scripts/` folder.
- **IP:** a near-verbatim on-screen question from the tutorial (Lesson 3) was replaced with an original example; the source log was updated to show what was adapted and what is original.

## 4. Tests actually executed
| Check | Command | Result |
|---|---|---|
| Doc validation (links, 90-min timing incl. segment splits and headings, lesson sections, workbook sections and templates, goal-prompt labels, ™ marks, draft slogans, unset prices, risky claims, table formatting) | `python3 scripts/check_docs.py` | **PASS** (0 failures; 2 warnings for labeled example prices $27 and $18) |
| Checker catches real defects | Ran on a scratch copy with 9 injected defects (timing +1 min, missing section, draft slogan, price set, missing ™, "passive income" claim, `DONE =` label, broken link, malformed table) | **All 9 detected** |
| Workbook PDF renders | `bash scripts/build_workbook_pdf.sh` | Built; 15 Letter pages, rasterized and visually inspected |
| Visual inspection | Page images reviewed | Found and fixed: a table rendering as raw text (missing blank line, also broken on GitHub), odd code indentation, and an orphaned label |

**Not tested:** a live rehearsal of the workshop with participants; running the demos in Claude Code on the
facilitator's own machine; Markdown rendering on GitHub itself (the checker covers the known table issue);
accessibility review of the PDF (contrast was eyeballed, not measured).

During testing, a mistake in my own command briefly ran the defect-injection edits on the real working tree
instead of the scratch copy. All six edits were reverted and checked line by line before anything was committed.

## 5. Red-team findings
| # | Area | Finding | Resolution |
|---|---|---|---|
| 1 | Technical | Platform details change often (auto mode availability, mode names, AGENTS.md support) | Dated "checked" note in Lesson 3; re-verify before delivery (decision D3) |
| 2 | Unsupported claims | No income or results promises found; the checker blocks common phrasing | Resolved |
| 3 | Invented facts | No biography, quotes, book content, or prices invented; 22 `TODO (CJ)` markers remain | Open: section B of the register |
| 4 | IP | Concepts adapted from an outside tutorial (credited); some lesson titles echo its wording | Decision A7; legal review C7 |
| 5 | IP | "Brick & Bloom Candle Co." is believed fictional, but **no trademark search was run** | C7 |
| 6 | Instructions | Every exercise has steps, a completed example, response space, an expected output, and a completion check | Resolved |
| 7 | Terminology | "DONE =" vs "DONE LOOKS LIKE", "SOP" definitions, and mode names are now consistent; enforced by the checker | Resolved |
| 8 | Links | All 23 relative links resolve | Resolved (checker) |
| 9 | Contradictions | Lessons, workbook, facilitator guide, and templates use the same examples, labels, and rules | Resolved |
| 10 | Automation promises | Removed; AI vs TOOL vs HUMAN distinction taught | Resolved |
| 11 | Privacy and security | Privacy rule in the workbook and facilitator guide; no real data in examples; Bypass excluded; recording consent | Policy pending (C4) |
| 12 | Learning outcomes | Each lesson has measurable outputs; closing assessment target 5/6; self-assessment 9/11 | Resolved. Not yet validated with real learners. |
| 13 | Brand | Draft colors, fonts, and slogans could be mistaken for standards | Labeled DRAFT; decisions A1–A10 |
| 14 | Accessibility | Red/white headers; emoji ✅ in tables; PDF not tagged for screen readers | Open, recommended next pass |

## 6. Known limitations
- Brand visuals in the PDF use DRAFT colors, and fonts fall back to system fonts (brand fonts aren't installed for PDF rendering).
- The facilitator guide's 90 minutes is validated arithmetically, not by rehearsal.
- No slides were produced (out of scope for this pass).
