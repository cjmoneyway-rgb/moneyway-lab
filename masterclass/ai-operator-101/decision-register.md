# Executive Decision Register: AI Operator 101
**Moneyway Lab™ · CJ Moneyway Media™** · Prepared 2026-11-22 for CJ's review

Every item below needs CJ's judgment. Nothing listed here has been decided by the development team.
Status key: **OPEN** = awaiting CJ · **DEFAULT** = a working placeholder is in place until CJ decides.

## A. Branding conflicts and approvals
| # | Decision | Current state in repo | Status |
|---|---|---|---|
| A1 | Approve or replace the **color palette** (red `#E10600`, deep red, black, silver, gold) | Taken from the Video Lab prototype; labeled DRAFT in `brand/brand.md`; used in the workbook PDF styling | DEFAULT |
| A2 | Approve or replace the **fonts** (Anton, Bebas Neue, Permanent Marker) | Labeled DRAFT in `brand/brand.md` | DEFAULT |
| A3 | **Video-prototype slogans** ("Crown on. Stay ready.", "No days off.", "Built different.", "From the block to the boardroom."): approve, retire, or restrict to music content | Removed from all course materials; listed as NOT APPROVED in `brand/tone-of-voice.md`. "Built different" may conflict with **Built For Purpose™**. | OPEN |
| A4 | Is **CJ × MONEYWAY** an official lockup? | Labeled DRAFT | OPEN |
| A5 | Course copy line **"Most people talk to AI. Operators run it."** (workbook welcome, facilitator opening) | In use as course copy; not a protected mark | OPEN |
| A6 | Approve the course name **"AI Operator 101: Four Moves to Make AI Work for You"** | In use; recorded in `brand/facts.md` | OPEN |
| A7 | **Lesson titles** for Moves #2–#4 closely follow the outside tutorial's slide wording ("Give it a memory…", "Make it plan before it builds", "Brief it with a goal prompt"). Keep them, or rename to fully original titles? | Kept (short descriptive phrases, low risk). Attribution in `masterclass/sources/`. | OPEN |
| A8 | Confirm the **protected-marks list** is complete and correctly styled (e.g. "Built For Purpose™" capitalization; "Faith • Vision • Legacy™" bullet character) | Recorded exactly as given in the 2026-11-22 directive | OPEN |
| A9 | Where the brand principles may appear in course materials | Only **Build It Brick by Brick™** is used (workbook closing line) | OPEN |
| A10 | Brand voice description ("Real talk, built for action") and word swaps | Labeled DRAFT in `brand/tone-of-voice.md` | DEFAULT |

## B. Factual gaps (CJ must supply; nothing invented)
| # | Needed | Where it goes |
|---|---|---|
| B1 | Origin story, short bio (50 words), long bio (150 words) | `brand/story.md` |
| B2 | Core message of *Both Eyes Open and Both Eyes Shut*; chapter outline | `brand/story.md`, `products/book/outline.md` |
| B3 | Which book chapter (if any) pairs with each move | `facilitator-guide.md` |
| B4 | 5–10 real phrases from The CJ Moneyway Show™ | `brand/tone-of-voice.md` |
| B5 | Confirm the target audience description | `brand/audience.md` |
| B6 | Confirm the product ladder (free → book → workbooks → workshops) | `brand/offer.md` |
| B7 | Official links: book, podcast, website, social | `brand/facts.md` |
| B8 | Approved opening intro for the facilitator | `facilitator-guide.md` (Open segment) |

## C. Pricing, publishing, and commercial decisions
| # | Decision | Status |
|---|---|---|
| C1 | Prices for workbook and workshop (the $27 in Lesson 2 is an illustration only) | OPEN. No price is set anywhere. |
| C2 | First workshop date | OPEN. Not scheduled or announced. |
| C3 | Whether, where, and when to publish or sell the course (channel, checkout) | OPEN. Nothing published, no payments activated. |
| C4 | Session recording and participant-consent policy | OPEN |
| C5 | Whether to offer a follow-up recording if a live demo fails | OPEN |
| C6 | Next-step offer, if any, at the end of the workshop | OPEN |
| C7 | Legal/IP review before sale (outside-source attribution, fictional business name, platform trademarks such as "Claude" and "Claude Code") | OPEN. Recommended before publication. |

## D. Scope and repository decisions
| # | Decision | Current state | Status |
|---|---|---|---|
| D1 | Accept the new `scripts/` folder (doc checks + PDF build): a documented addition to the repo structure | Added in this pass | OPEN |
| D2 | Distribution of the PDF: it's built locally and git-ignored (`dist/`), not committed | DEFAULT | OPEN |
| D3 | Owner for **re-verifying Claude Code details** (modes, memory) before each delivery; the platform changes often | Verified 2026-11-22 only | OPEN |
| D4 | Merge the pull request into `main` | Requires explicit CEO authorization | OPEN |
| D5 | A live dry-run of the 90-minute workshop before first delivery | Not done. Timing validated on paper only. | OPEN |
