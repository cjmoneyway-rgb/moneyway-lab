# CLAUDE.md — Moneyway Lab™ / CJ Moneyway Media™

Project instructions for this repository. Claude Code loads this file when a session starts in this repo.
It is guidance, not enforcement. Keep it short (under ~200 lines). It points to other files; it does not repeat them.

## Who this is
- **CJ Moneyway**: author, host, AI music creator, founder of Moneyway Lab™.
- **CJ Moneyway Media™**: the brand umbrella. Moneyway Lab™ is its education arm. The podcast is The CJ Moneyway Show™.
- We don't start from zero. We turn what already exists (the book, the podcast,
  the music) into digital products: **workbooks first, then workshops**.

## Where things live
| Folder | What goes there |
|---|---|
| `inbox/` | Drop zone. Raw screenshots, notes, voice memos, links, ideas. Unsorted. |
| `brand/` | Who we are and how we sound. Read before creating anything public. |
| `brand/facts.md` | **Single source of truth** for prices, links, titles, dates. |
| `products/` | One folder per product line: book, podcast, music, workbooks, workshops. |
| `masterclass/` | Moneyway Lab™ teaching modules (lessons, workbook, facilitator guide). Drafts until CJ approves. |
| `masterclass/sources/` | Notes on outside material a module was built from, with credit. |
| `templates/` | Reusable blanks: CLAUDE.md starter, goal prompt, SOP. |
| `scripts/` | Doc validation and workbook PDF build. |
| `video/` | Moneyway Video Lab (Remotion). Has its own README. |

## Inbox routing (manual: when the user asks, e.g. "process the inbox", or shares material in chat)
Nothing is routed automatically. When asked:
1. **Identify it**: lesson material, brand asset, product content, fact (price/link/date), or idea.
2. **Route it** using the table below. Rewrite outside material in our own words;
   never copy someone else's slides, scripts, or likeness into a product.
3. **Log the source** in `masterclass/sources/` if it came from someone else.
4. **Tell the user** what you filed, where it went, and anything they still need to supply.
5. Leave the original in `inbox/` until the user says it can be deleted.

| If it's… | It goes to… |
|---|---|
| A how-to, tutorial, or video notes | New or existing module in `masterclass/` |
| A price, link, title, or launch date | `brand/facts.md` (and nowhere else) |
| Voice, slogans, colors, fonts | `brand/tone-of-voice.md` or `brand/brand.md` |
| Book chapters or excerpts | `products/book/` |
| Podcast episode notes or transcripts | `products/podcast/` |
| Song lyrics, prompts, or AI music assets | `products/music/` |
| Exercises or worksheets | `products/workbooks/` or the module's `workbook.md` |
| Workshop agendas or run sheets | `products/workshops/` or the module's `facilitator-guide.md` |
| Not sure | Ask the user, with your best guess as the first option. |

## Always read
- `brand/tone-of-voice.md` before writing anything in CJ's name.
- `brand/brand.md` before designing anything. Respect its APPROVED vs DRAFT labels; never present DRAFT items as approved standards.

## Read only when needed
- `brand/audience.md`: who we're talking to (sales pages, workshop invites).
- `brand/offer.md`: what we sell and how products ladder up.
- `brand/story.md`: CJ's story (bios, intros, about pages).
- `brand/facts.md`: whenever a number, price, link, or title appears.

## How CJ communicates
- CJ often uses voice-to-text and photos of screens. Read for what CJ means, not the exact words.
- For anything bigger than a quick edit, plan first and ask the questions that matter before building.

## Rules
- Never invent book content, quotes, testimonials, sales numbers, or results. Use `TODO (CJ):` and ask.
- Facts live in one place (`brand/facts.md`). Reference them; don't copy them around.
- AI output is a draft until CJ reviews it.
- Do not publish, launch, set prices, announce dates, contact customers, or deploy anything without explicit CJ approval.
- Open approvals are tracked in `masterclass/ai-operator-101/decision-register.md`.
- Run `python3 scripts/check_docs.py` after editing docs.
