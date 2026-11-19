# #2 Give it a memory of who you are

> **The win:** Stop re-explaining yourself every time. Explain it once, save it, and every new session starts out knowing you.

## The problem
Every new AI session starts as a stranger. It doesn't know your name, your brand, your voice, or your prices.
So you either retype it all or get generic output.

## The fix: CLAUDE.md
A file called **CLAUDE.md** sits in your project folder. Every time you start a new session, Claude reads it first.

- **`.md` = markdown.** Plain text with a few symbols: `#` for headings, `-` for bullet points. Any notes app can write it.
- It lives in your project folder, next to your other files:

```
📁 moneyway-lab
   ├── CLAUDE.md          ← loaded every new session
   ├── brand/
   ├── products/
   └── masterclass/
```

## Keep it short: point, don't paste
CLAUDE.md is a **map**, not an encyclopedia. It tells AI *which file to read when*.

```
Task: "Design a flyer"  ──▶  reads only brand.md
                              (skips tone-of-voice.md, audience.md, offer.md, story.md)
```

AI pulls only what the job needs. Less noise means better output.

### What a good CLAUDE.md has
```markdown
## Where my notes live
- Everything is in this folder. Start from the README.

## My voice
- Read tone-of-voice.md before writing anything in my name.

## My design style
- Read brand.md before designing anything.

## Read only when needed
- audience.md
- offer.md
- story.md

## How I communicate
- I use voice-to-text. Read for what I mean.
```

See this lab's real one: `/CLAUDE.md`. Starter: `templates/CLAUDE-starter.md`.

## Facts live in one place
The trap: your workbook price ($27 here is just an example) shows up in five files.

```
menu.md     website.md    prices.md    instagram.md    flyer.md
 $27          $27           $27           $27            $27
```

Raise the price and you have to change five files. Miss one and your flyer says $27 while the site says $37.

**Fix:** put the price in **one** file (`facts.md`) and have every other file point to it.
Change it once and everything stays right.

## Your move
Write your own CLAUDE.md with 5 sections. → Workbook, Exercise 2.
