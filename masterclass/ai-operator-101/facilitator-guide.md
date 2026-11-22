# Facilitator Guide: AI Operator 101 Live Workshop (90 minutes)
**Moneyway Lab™ · CJ Moneyway Media™** · *For CJ and Moneyway Lab™ instructors · Draft for executive review*

## Expected learning outcomes
By the end, every participant has:
1. Labeled their weekly tasks **SOP** or **END GOAL** and written one SOP with a HUMAN ✅ checkpoint (Move #1).
2. Drafted a **CLAUDE.md** and **facts.md** (Move #2).
3. Filled in a **plan sheet** with a risk level and approval points (Move #3).
4. Written one four-part **goal prompt** (Move #4).

Lessons: `01`–`04` in this folder. Student materials: [`workbook.md`](workbook.md).

## Before the session (checklist)
- [ ] Session date, price, and registration link confirmed by CJ in `brand/facts.md`. **Don't announce until approved.**
- [ ] Workbook printed or shared as PDF (one per participant).
- [ ] **Demo folder** ready: a copy of the fictional *Brick & Bloom Candle Co.* project containing `CLAUDE.md`,
      `brand.md`, `tone-of-voice.md`, `audience.md`, `offer.md`, `story.md`, `facts.md` (copy the examples from Lesson 2).
      **No real customer data in the demo.**
- [ ] Claude Code open in that folder. Confirm which permission modes your app shows (Shift+Tab in the terminal).
- [ ] **Offline backup:** screenshots or a screen recording of each demo (see Fallback plan).
- [ ] Slides styled per `brand/brand.md`. Brand items marked draft there are awaiting approval.
- [ ] Opening: CJ's approved intro or bio. TODO (CJ): supply it. Do **not** improvise biography or book quotes.

## Run of show
| Start | Min | Segment | What happens |
|---|---:|---|---|
| 0:00 | 8 | **Open** | Welcome, CJ intro (approved text only), privacy rule, the four moves on one slide |
| 0:08 | 15 | **Move #1: SOP vs end goal** | Teach 6 · Demo 3 · Exercise 1: 6 |
| 0:23 | 20 | **Move #2: Memory** | Teach 7 · Demo 5 · Exercise 2: 8 |
| 0:43 | 5 | **Break** | |
| 0:48 | 20 | **Move #3: Plan first** | Teach 6 · Demo 7 · Exercise 3: 7 |
| 1:08 | 15 | **Move #4: Goal prompt** | Teach 5 · Demo 4 · Exercise 4: 6 |
| 1:23 | 7 | **Close + assessment** | Exit check, final-assignment brief, next steps |
| | **90** | **Total** | |

---

## 0:00 Open (8 min)
**Talking points**
- "Most people talk to AI. Operators run it. Today you leave with four tools, not just four ideas."
- **Privacy rule, said out loud:** "No real customer names, emails, passwords, or card numbers in your workbook or in any prompt today. Use made-up examples."
- Show the four moves: #1 instruction type · #2 memory · #3 plan first · #4 goal prompt.

**Participation prompt:** "Raise a hand if you've ever had to explain your business to AI twice."

## 0:08 Move #1: SOP vs end goal (15 min)
**Teach (6):** the two kinds of instructions. AI vs TOOL vs HUMAN ✅. When a human must approve: sending, money, personal info, live systems.
**Talking point:** "AI drafts. Your tools send. *You* approve."
**Demo (3):** draw the Brick & Bloom wholesale-inquiry flow. Point to the HUMAN ✅ before each email goes out.
**Exercise 1 (6):** students list 3 tasks, label them, and mark one SOP's steps.
**Participation prompt:** "Who found a step where a human has to approve? What is it?"

## 0:23 Move #2: Memory (20 min)
**Teach (7):** CLAUDE.md loads when Claude Code starts in the folder. It's guidance, not a lock. Project instructions vs personal instructions vs auto memory. Other AI tools handle this differently; the habit carries over.
**Demo (5):**
1. Open the demo folder in Claude Code and show `CLAUDE.md`.
2. Ask: *"Design a market-day flyer for Saturday. Draft only, don't create files yet."*
3. Point out what it read (brand.md, facts.md) and what it skipped.
4. Change the price in `facts.md`. Point out that **the flyer already drafted still shows the old price**. One facts file fixes future work, not past work.
**Exercise 2 (8):** students draft their own CLAUDE.md and 3 facts.
**Participation prompt:** "Where does your main price live right now? How many places?"

## 0:43 Break (5 min)

## 0:48 Move #3: Plan first (20 min)
**Teach (6):** the permission modes (Manual, Accept edits, Plan, Auto if available, Bypass: not for this course). Plan → Build → Review → Test. Low, medium, and high risk.
**Talking point:** "Auto mode means fewer prompts, not guaranteed safety. Money, personal info, and anything sent or posted always gets a human."
**Demo (7):**
1. Switch to **Plan** mode (Shift+Tab, or the app's mode menu).
2. Ask: *"Add a Holiday Bundles page using our prices."*
3. Read the plan aloud. Answer its questions. If it doesn't ask any, ask it: *"What do you need from me before building?"*
4. Choose **keep planning** once to show you can push back, then approve.
**Exercise 3 (7):** plan sheet: risk level, three questions, approval points, review check, test.
**Participation prompt:** "Who rated their project High? What makes it high?"

## 1:08 Move #4: Goal prompt (15 min)
**Teach (5):** GOAL · CONTEXT · LIMITS · DONE LOOKS LIKE (Moneyway Lab™'s own framework).
**Demo (4):** a volunteer reads a weak prompt (fictional details only). Rewrite it live with the four parts.
**Exercise 4 (6):** students rewrite their own weak prompt.
**Participation prompt:** "Read your DONE LOOKS LIKE. Could your neighbor check it with a yes/no?"

## 1:23 Close + assessment (7 min)
**Closing assessment (3 min, show of hands or written):**
1. Name the two kinds of instructions. *(SOP and end goal)*
2. When does Claude Code read CLAUDE.md? *(When a session starts in that folder)*
3. Does changing facts.md update a flyer you already printed? *(No)*
4. Which mode makes a plan without changing your files? *(Plan)*
5. Name the four parts of the goal prompt. *(Goal, context, limits, done looks like)*
6. Name one action that always needs a human. *(Sending, money, personal info, live systems)*

Target: 5 of 6 correct. Note any question most people miss and reteach it next time.

**Final assignment brief (2 min):** the workbook's "AI Operator Kit."
**Next steps (2 min):** point to the workbook's self-assessment. TODO (CJ): approved next-step offer, if any. No pricing or dates unless approved.

---

## Troubleshooting
| Problem | Fix |
|---|---|
| CLAUDE.md doesn't seem to be used | Confirm Claude Code was started **in the demo folder**. Run `/memory` to see loaded files. |
| Plan mode isn't in the menu | Cycle with Shift+Tab in the terminal; mode menus differ by app and version. Or start with `claude --permission-mode plan`. |
| Auto mode is missing | It depends on plan, organization, and version. Teach it as optional; it's not needed for any exercise. |
| AI invents a price or fact | Good teaching moment: add "If missing, ask. Don't guess" to CLAUDE.md and LIMITS. |
| A participant has no laptop | They do all four exercises on paper. Every exercise works without AI. |
| Running long | Cut the Move #2 demo step 4 to a verbal explanation, and shorten Exercise 4 to 4 min. |

## Fallback plan (internet or AI service fails)
1. Switch to the **pre-recorded demos** or screenshots for each move.
2. Keep going. **Every exercise is pen-and-paper by design.**
3. For the Move #3 demo, walk through the completed plan sheet in the workbook instead of a live plan.
4. Offer a follow-up recording of the live demos if appropriate. TODO (CJ): approve whether to offer this.

## Protecting private and confidential information
- Demos use only the fictional Brick & Bloom project. Never open a real customer list, inbox, or payment account on screen.
- Ask volunteers to swap real names and numbers for fictional ones before sharing a prompt.
- Don't paste passwords, API keys, card numbers, or private customer data into any AI tool.
- Turn off screen-sharing notifications. Close email and messaging apps before demos.
- Don't record participants without consent. TODO (CJ): recording and consent policy.

## Facilitator rules
- No promises about income, revenue, or business results.
- No improvised stories, quotes, or book passages attributed to CJ. Use approved material only (`brand/story.md`).
- Tie-ins to *Both Eyes Open and Both Eyes Shut*: TODO (CJ): pick which chapter, if any, pairs with each move.
