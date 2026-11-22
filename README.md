# Moneyway Lab™

Official Moneyway Lab™ platform for practical AI education, workshops, courses, prompt resources, enterprise implementation, and innovation research.

A CJ Moneyway Media™ brand, alongside The CJ Moneyway Show™, the book *Both Eyes Open and Both Eyes Shut*, and CJ Moneyway AI music.

## Map

| Folder | Purpose |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Project instructions and inbox routing rules. Claude Code loads it when a session starts in this repo. |
| [`inbox/`](inbox/) | Drop anything here, then ask Claude to "Process the inbox." (Manual: nothing runs automatically.) |
| [`brand/`](brand/) | Brand, voice, audience, offer, story, and `facts.md` (single source of truth) |
| [`masterclass/`](masterclass/) | Teaching modules. First up: [AI Operator 101](masterclass/ai-operator-101/) |
| [`products/`](products/) | Book, podcast, music, workbooks, workshops |
| [`templates/`](templates/) | CLAUDE.md starter, goal prompt, SOP |
| [`scripts/`](scripts/) | `check_docs.py` (link, timing, and brand checks) · `build_workbook_pdf.sh` |
| [`video/`](video/) | Moneyway Video Lab |

## Working in this repo

1. Open the repository in Claude Code (terminal, desktop app, or claude.ai/code). `CLAUDE.md` loads at session start.
2. Add raw material to `inbox/` and ask Claude to process it, or ask for a specific change.
3. For anything bigger than a quick edit, use Plan mode and approve the plan before changes are made.
4. After editing docs, run `python3 scripts/check_docs.py`.
5. Everything is a draft until CJ approves it. See the [decision register](masterclass/ai-operator-101/decision-register.md).

## Moneyway Video Lab

The existing [`video/`](video/) project is the Moneyway Video Lab: an internal AI-assisted video creation workstream within Moneyway Lab™, not a separate application, repository, or department.

It supports practical experimentation with code-based motion design, reusable video templates, audio-synchronized visuals, horizontal and vertical renders, and human-reviewed creative workflows.

Current prototype: **CJ × MONEYWAY**, built with Remotion.

### Ownership and review

- **Chief AI Innovation & Technology Executive’s office:** platform and technical direction.
- **Software Development & Codex Division:** source code, testing, rendering workflow, and documentation.
- **Video Production:** creative validation and finishing standards.
- **AI Governance, Security & Adoption:** privacy, consent, likeness, copyright, accuracy, and responsible-use review.

### Boundaries

- Use approved authentic photographs for named people. CJ’s likeness must use a real, explicitly approved CJ image.
- Use only owned, licensed, or approved audio, fonts, images, and other assets.
- Keep editable source and instructions in Git. Keep generated renders in ignored output folders or approved media storage rather than accumulating large binaries in repository history.
- AI-assisted output remains a draft until a human reviews the content, identity, rights, accuracy, accessibility, and release context.
- A generated video does not establish a functioning autonomous workflow, production readiness, or permission to publish.
