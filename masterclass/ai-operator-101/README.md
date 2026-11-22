# AI Operator 101: Four Moves to Make AI Work for You
**Moneyway Lab™ masterclass · CJ Moneyway Media™**

**Status: complete draft for executive review. Not approved for sale, publication, or scheduling.**

Most people open an AI app, type a question, get something generic, and start over tomorrow.
This module teaches four moves that turn AI into a teammate that knows your business, plans before it acts,
and delivers what you asked for, with a human approving anything that matters.

## The four moves
| # | Move | Takeaway | Lesson |
|---|---|---|---|
| **#1** | Know your instruction type | Give fixed steps (SOP) or a defined outcome (end goal), and mark where a human approves. | [01-sop-vs-end-goal.md](01-sop-vs-end-goal.md) |
| **#2** | Give AI a memory | A short CLAUDE.md plus organized files load your business into each Claude Code session. | [02-give-it-a-memory.md](02-give-it-a-memory.md) |
| **#3** | Plan before it builds | Plan → Build → Review → Test, with oversight matched to risk. | [03-plan-before-it-builds.md](03-plan-before-it-builds.md) |
| **#4** | Brief it with a goal prompt | GOAL · CONTEXT · LIMITS · DONE LOOKS LIKE (Moneyway Lab™ original). | [04-goal-prompt.md](04-goal-prompt.md) |

Every lesson has the same parts: learning objective → explanation → worked example → exercise → expected output → completion check.

## Files
| File | Audience | Purpose |
|---|---|---|
| Lessons `01`–`04` | Students | Teach in order |
| [workbook.md](workbook.md) | Students | Exercises, completed examples, templates, final assignment, self-assessment |
| [facilitator-guide.md](facilitator-guide.md) | Instructors | 90-minute live workshop plan |
| [qa-report.md](qa-report.md) | CJ / reviewers | What was reviewed, changed, tested, and left open |
| [decision-register.md](decision-register.md) | CJ | Every item that needs executive approval |
| [`../../templates/`](../../templates/) | Students | CLAUDE.md starter, SOP worksheet, goal prompt |
| [`../sources/claude-code-four-moves.md`](../sources/claude-code-four-moves.md) | Reviewers | Outside-source attribution |

## Examples and data
All worked examples use a **fictional** business, *Brick & Bloom Candle Co.* No real customer data is used.
Dollar amounts in the examples are illustrative, not Moneyway prices. Real prices: `brand/facts.md` (pending approval).

## Platform accuracy
Claude Code details (CLAUDE.md loading, memory types, permission modes) were checked against the Claude Code
documentation in November 2026. Re-check before each delivery; see `qa-report.md`.

## Build the PDF (optional)
```bash
python3 scripts/check_docs.py                 # validation checks
bash scripts/build_workbook_pdf.sh            # → masterclass/ai-operator-101/dist/workbook.pdf (git-ignored)
```
Requires `pandoc` and Node `playwright` with Chromium.
