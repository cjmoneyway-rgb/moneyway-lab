# Move #2: Give AI a memory of who you are

**AI Operator 101 · Moneyway Lab™ · CJ Moneyway Media™**

> **The win:** Stop re-explaining yourself. Write your business down once, in organized files, and every new session starts from it.

## Learning objective
By the end of this lesson you can:
1. Explain what a **CLAUDE.md** file is and when Claude Code reads it.
2. Tell the difference between **project instructions**, **personal instructions**, and **automatic memory**.
3. Organize brand, audience, offer, and fact files so AI reads only what a task needs.
4. Keep facts in one file and know what that does (and doesn't) fix.

## Explanation

### The problem
Each new AI session starts with a blank slate. It doesn't know your name, voice, customers, or prices.
You either retype all of it or get generic output.

### The fix in Claude Code: CLAUDE.md
**CLAUDE.md** is a plain-text instruction file. When you start **Claude Code** in a project folder, it loads
the CLAUDE.md in that folder (and in the folders above it) into the session.

- **`.md` means markdown:** plain text with a few symbols. `#` makes a heading and `-` makes a bullet. Any text editor works.
- Claude treats it as **guidance, not a lock**. Clear, specific, short instructions get followed most consistently.
  Claude Code's documentation suggests keeping each CLAUDE.md under about 200 lines.
- Starter shortcut: in Claude Code, `/init` drafts a CLAUDE.md from your project, and `/memory` shows which memory files are loaded.

### Three kinds of "memory" in Claude Code
| Kind | Where it lives | Who writes it | Shared? | Use it for |
|---|---|---|---|---|
| **Project instructions** | `CLAUDE.md` in the project folder | You | Yes, with anyone who has the folder | Brand, file map, house rules for *this* business |
| **Personal instructions** | `~/.claude/CLAUDE.md` (all your projects) or `CLAUDE.local.md` (this project, just you) | You | No | How *you* like to work: "I use voice-to-text," "explain tech simply" |
| **Auto memory** | Notes Claude Code keeps itself, per project | Claude, from your corrections | No | Small lessons learned along the way. Review it now and then with `/memory`. |

CLAUDE.md files in **subfolders** load only when Claude works with files in that subfolder.

> **Other AI tools work differently.** The Claude apps have their own project and memory features. ChatGPT,
> Gemini, and others each have their own versions, such as custom instructions or project files. The
> **habit** carries over to any of them: keep your business context in organized files and point the AI at
> them. Only the **setup steps** change. Check the current help docs for the tool you use.

### Point, don't paste
CLAUDE.md works best as a **map**. It says which file to read for which kind of job:

```
📁 brick-and-bloom
   ├── CLAUDE.md          ← loaded at the start of each Claude Code session
   ├── brand.md           ← colors, fonts, logo rules
   ├── tone-of-voice.md   ← how we write
   ├── audience.md        ← who buys
   ├── offer.md           ← what we sell
   ├── story.md           ← founder story
   └── facts.md           ← prices, links, dates (the ONLY place they live)
```

```
Task: "Design a flyer"  ──▶  CLAUDE.md says: read brand.md (+ facts.md for the price)
                              It doesn't need audience.md, offer.md, or story.md
```

"Read only when needed" is an **instruction Claude follows**, not a switch. It helps Claude choose what to
read. If a result misses something, tell Claude which file to read.
(Claude Code can also pull a file in on every session with `@filename` inside CLAUDE.md. That costs
context every time, so save it for files that are truly always needed.)

### Facts live in one place, and what that fixes
The trap: the same price typed into five files.

```
menu.md     website.md    prices.md    instagram.md    flyer.md
 $27          $27           $27           $27            $27      ← example price only
```

Raise the price and you have to find and change all five. Miss one and customers see two prices.

**Fix:** put the price in **one** file (`facts.md`). Every other instruction says "get prices from facts.md."

**What this does *not* do:** updating `facts.md` doesn't magically rewrite things you already made.
A flyer you printed or a post you published last week still shows the old price. One facts file means
**everything you create from now on** starts from the right number, and you have **one checklist** for what
to regenerate. Keep a short "where this fact is used" list next to each fact.

## Worked example (completed)
*Fictional business: **Brick & Bloom Candle Co.***

```markdown
# CLAUDE.md: Brick & Bloom Candle Co.

## Who we are
- Small-batch soy candle shop. Online store + two weekend markets. Owner: Jordan Reyes.

## Where things live
- Brand: brand.md · Voice: tone-of-voice.md · Prices, links, dates: facts.md (only there)

## Always
- Read tone-of-voice.md before writing anything customers will see.
- Read brand.md before designing anything.
- Get every price, link, or date from facts.md. If it's missing, ask. Don't guess.

## Read only when needed
- audience.md: sales copy, ads
- offer.md: product pages, bundles
- story.md: About page, bios

## How I work
- I use voice-to-text. Read for what I mean.
- Plan first and ask questions for anything bigger than a quick edit.
- Drafts only. I approve before anything goes to customers.
```

## Exercise
Use the fictional shop above, or a fictional business of your own. **Don't use real customer data.**
1. Write a CLAUDE.md with these five sections: Who we are · Where things live · Always · Read only when needed · How I work.
2. Write a `facts.md` with at least 3 facts (a price, a link, a date) and a "used in" column.
3. Write one task ("Design a market-day flyer") and list which files it needs and which it skips.

Use Workbook Exercise 2 or `templates/CLAUDE-starter.md`.

## Expected output
- A CLAUDE.md of **15–40 lines** with all five sections.
- A facts table where every fact has a value (or `TODO`) and a "used in" list.
- A one-line answer: *Task → files read → files skipped.*

## Completion check
- [ ] I can say when Claude Code loads CLAUDE.md, and that it's guidance, not a guarantee.
- [ ] I can name project instructions vs personal instructions vs auto memory.
- [ ] My CLAUDE.md points to files instead of pasting everything in.
- [ ] Each fact appears in only one file.
- [ ] I know changing facts.md won't update things I've already published.
