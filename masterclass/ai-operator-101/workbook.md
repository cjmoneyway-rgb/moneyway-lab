# AI Operator 101: Student Workbook
### Four Moves to Make AI Work for You
**Moneyway Lab™ · CJ Moneyway Media™** · *Draft for executive review*

Name: ______________________________  Date: ______________

---

## Welcome
Most people *talk* to AI. Operators **run** it. This workbook walks you through four moves that turn
AI from a chatbot that forgets you into a teammate that knows your business, plans before it acts, and
delivers what you asked for, while **you stay in charge** of anything that matters.

**No coding needed.** If you can write a text message, you can do this.

### By the end of this workbook you will have
1. A list of your weekly tasks, each labeled **SOP** or **END GOAL**, and one written SOP with approval checkpoints.
2. Your own **CLAUDE.md** project-context file and a **facts.md** file.
3. A **plan sheet** for a real project, with a risk level and approval points.
4. A four-part **goal prompt** you can reuse.
5. A finished **final assignment** that uses all four moves together.

### How to use it
- Each exercise has: **Steps** → **Completed example** → **Your turn**.
- The completed examples use a **fictional** business, *Brick & Bloom Candle Co.* Copy its structure, not its details.
- **Privacy rule:** don't write real customer names, emails, phone numbers, passwords, or card numbers in this workbook or in any AI prompt. Use made-up examples.

---

## Exercise 1: SOP or end goal? (Move #1)
**Goal:** know which kind of instruction a task needs, and where a human must approve.

### Steps
1. List three tasks you do every week.
2. Circle **SOP** (same steps every time) or **END GOAL** (you know the finish line, not the steps).
3. Pick one SOP and write it in 4–6 steps.
4. Mark each step **AI** (drafts/sorts), **TOOL** (software you've set up), or **HUMAN ✅** (a person approves).
5. Add one decision point (a yes/no question).

### Completed example: Brick & Bloom Candle Co. (fictional)
| Task | Type | Why |
|---|---|---|
| Answer wholesale inquiries | **SOP** | Same steps every time |
| Weekly sales summary | **SOP** | Same report format each week |
| Plan a holiday pop-up | **END GOAL** | New each year; I know the goal, not the steps |

**SOP: Answer wholesale inquiries**
1. **TOOL:** Contact form saves the inquiry to the CRM as *New*.
2. **AI:** Sort it. *Qualified* = a store or event planner asking about 20+ units.
3. **AI:** Draft Email A (book a call) or Email B (free guide).
4. **HUMAN ✅:** Owner reviews, edits, and sends from the business email.
5. **TOOL/HUMAN:** CRM status → *Contacted*.

Decision point: *Qualified?* Human checkpoint: step 4, before anything goes to a customer.

### Your turn
| Task | Type (circle) | Why |
|---|---|---|
| 1. | SOP / END GOAL | |
| 2. | SOP / END GOAL | |
| 3. | SOP / END GOAL | |

**My SOP:** ______________________________

| # | Step | AI / TOOL / HUMAN ✅ |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |

My decision point: ______________________________
My human checkpoint is before: ______________________________

---

## Exercise 2: Give AI a memory (Move #2)
**Goal:** write the files that let Claude Code start every session already knowing your business.

### Steps
1. Make a project folder for your business (or the fictional one).
2. Write a **CLAUDE.md** with five sections: Who we are · Where things live · Always · Read only when needed · How I work.
3. Write a **facts.md** with at least three facts (price, link, date) and where each is used.
4. Pick one task and list which files it needs and which it can skip.

### Completed example: Brick & Bloom Candle Co. (fictional)
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

**facts.md (fictional)**

| Fact | Value | Used in |
|---|---|---|
| 8 oz candle price | $18 | website, market sign, price sheet |
| Online store link | brickandbloom.example | flyers, Instagram bio |
| Next market date | Sat, Dec 5 | flyer, newsletter |

**Task check:** "Design a market-day flyer" → reads `brand.md` + `facts.md` → skips `audience.md`, `offer.md`, `story.md`.

> Remember: changing facts.md updates **future** work only. If the price changes, use the "Used in" column as
> your checklist to redo the website, sign, and price sheet.

### Your turn
```markdown
# CLAUDE.md: ______________________

## Who we are
- 

## Where things live
- 

## Always
- 
- 

## Read only when needed
- 
- 

## How I work
- 
```

| Fact | Value | Used in |
|---|---|---|
| | | |
| | | |
| | | |

**Task check:** "______________________" → reads ______________ → skips ______________

---

## Exercise 3: Plan before it builds (Move #3)
**Goal:** plan, rate the risk, and decide where you approve, before AI changes anything.

### Steps
1. Choose a project that would take you an hour or more by hand.
2. Rate the risk: **Low** (drafting) · **Medium** (changing your files) · **High** (money, personal info, sending or posting, live systems).
3. Write the request you'll give Claude in **Plan mode**.
4. List three questions Claude should ask you. If you can, run it and record the questions it actually asks.
5. Mark the human approval point(s).
6. Write one review check and one test.

### Completed example: Brick & Bloom Candle Co. (fictional)
| | |
|---|---|
| **Project** | Add a Holiday Bundles page to the website |
| **Risk** | Medium (website files), plus **high** for prices |
| **Plan-mode request** | "Add a Holiday Bundles page to our website using our prices. Plan first; don't edit yet." |
| **Questions** | 1. Which bundles and what's in them? 2. The 3-candle bundle price isn't in facts.md. What is it? 3. Should it go in the main menu? |
| **Approval points** | Approve the plan; owner confirms every price; owner publishes the live site |
| **Review check** | Every price matches facts.md; copy matches tone-of-voice.md |
| **Test** | Open on a phone; click the menu link; one friend reads it |

**Plan time:** 15 min (target 10–20).

### Your turn
| | |
|---|---|
| **Project** | |
| **Risk** (Low / Medium / High) + why | |
| **Plan-mode request** | |
| **Question 1** | |
| **Question 2** | |
| **Question 3** | |
| **Approval points** | |
| **Review check** | |
| **Test** | |

**Plan time:** ____ min

---

## Exercise 4: The goal prompt (Move #4)
**Goal:** turn a weak request into a brief AI can deliver on, and you can check.

### Steps
1. Write down a weak prompt you've used (or use: "Write a newsletter").
2. Rewrite it with **GOAL · CONTEXT · LIMITS · DONE LOOKS LIKE**.
3. Check: could someone else verify "done" with a yes/no?
4. If it's bigger than a quick draft, add "Plan first and ask me questions before you build."

### Completed example: Brick & Bloom Candle Co. (fictional)
**Weak:** "Make a wholesale price sheet."
```
GOAL:            A one-page wholesale price sheet for boutique owners, so they can
                 place a first order without a phone call.
CONTEXT:         Read brand.md, tone-of-voice.md, offer.md, and facts.md.
LIMITS:          Prices and minimums only from facts.md; write TODO if missing.
                 Don't invent product names. Printable on letter paper.
DONE LOOKS LIKE: wholesale/price-sheet.md with a header, a product table
                 (name · scent · case size · price), the minimum order, how to
                 order, and contact info. Draft for my review.

Plan first and ask me questions before you build.
```

### Your turn
**My weak prompt:**
> 

| Part | My version |
|---|---|
| **GOAL** (what, for whom, why) | |
| **CONTEXT** (files to read) | |
| **LIMITS** (musts and nevers) | |
| **DONE LOOKS LIKE** (checkable output) | |

---

## Reusable templates
Copy these into any project. Editable versions are in the repository's `templates/` folder.

### A. Project-context template (CLAUDE.md)
```markdown
# CLAUDE.md: [Business name]

## Who we are
- [One line: what you do, for whom]

## Where things live
- [file: what it holds]; prices, links, dates: facts.md (only there)

## Always
- Read tone-of-voice.md before writing anything customers will see.
- Read brand.md before designing anything.
- Get facts from facts.md. If missing, ask. Don't guess.

## Read only when needed
- [file]: [when]

## How I work
- [Your preferences]
- Plan first for anything bigger than a quick edit. Drafts only until I approve.
```

### B. SOP worksheet
| Field | Fill in |
|---|---|
| SOP name | |
| Runs when (trigger) | |
| Owner | |
| Step 1 (AI / TOOL / HUMAN ✅) | |
| Step 2 | |
| Step 3: decision? Yes → / No → | |
| Step 4 | |
| Human approval before | |
| Done when | |
| Facts used (from facts.md) | |

### C. Four-part goal prompt
```
GOAL:            [What are we making, for whom, and why?]
CONTEXT:         [Files to read first]
LIMITS:          [Length, format, musts, nevers]
DONE LOOKS LIKE: [File name/location, required parts, how we'll check it]

Plan first and ask me questions before you build.
```

---

## Final assignment: put all four moves together
**Deliverable:** a one-page "AI Operator Kit" for one real (or fictional) project.

1. **Move #1:** Name the project and say whether it's an SOP or an END GOAL. If it's an SOP, attach your step list with AI / TOOL / HUMAN ✅ marks.
2. **Move #2:** Attach your CLAUDE.md and facts.md. Circle the files this project will read.
3. **Move #3:** Attach your plan sheet with its risk level, approval points, review check, and test.
4. **Move #4:** Attach the four-part goal prompt you'll paste into Claude.
5. **Run it (optional):** if you have Claude Code access, run the prompt in Plan mode. Write down the questions it asked and one thing you changed in the plan before approving.

**You're done when** all four parts are attached, nothing private or real-customer is included, and a
classmate could pick up your kit and understand what AI will do and where you approve.

My project: ______________________________  SOP / END GOAL (circle)

What I changed in the plan before approving: ______________________________

---

## Self-assessment checklist
Check each one you can do **without looking back**.

**Move #1: Instruction type**
- [ ] Explain SOP vs end goal in one sentence
- [ ] Write an SOP with a decision point
- [ ] Put a HUMAN ✅ before anything that sends, spends, or touches personal data

**Move #2: Memory**
- [ ] Say when Claude Code loads CLAUDE.md
- [ ] Explain project instructions vs personal instructions vs auto memory
- [ ] Keep each fact in one file, and know that this doesn't update work already published

**Move #3: Plan**
- [ ] Name the permission modes and why Bypass isn't for beginners
- [ ] Use Plan mode and approve (or reject) a plan
- [ ] Rate a project's risk and choose approval points

**Move #4: Goal prompt**
- [ ] Write all four parts from memory
- [ ] Write a DONE LOOKS LIKE someone else can check

**Score:** ____ / 11. Nine or more: you're operating. Fewer than nine: redo the exercise for any unchecked move.

---

The system I'll set up this week: ______________________________
I'll know it works when: ______________________________

**Build It Brick by Brick™.**
