# Move #3: Make it plan before it builds

**AI Operator 101 · Moneyway Lab™ · CJ Moneyway Media™**

> **The win:** Ten to twenty minutes of planning beats an hour of "that's not what I meant," and catches risky steps before they happen.

## Learning objective
By the end of this lesson you can:
1. Describe Claude Code's permission modes and pick a safe one for the job.
2. Use **Plan mode** to get a plan you can review *before* any file changes.
3. Run the four-stage loop: **Plan → Build → Review → Test**.
4. Sort a task as **low**, **medium**, or **high risk** and decide where a human must approve.

## Explanation

### Permission modes: who's driving?
Claude Code has permission modes that control what it can do without asking you first.
*Checked against Claude Code's permission-modes documentation in November 2026. Names and options change,
so confirm in your version.*

| Mode (as shown in the app) | What happens | Good for |
|---|---|---|
| **Manual** (`default`) | Reads files freely; asks before edits and most commands | Learning, sensitive work |
| **Accept edits** | Edits files and runs common file commands without asking each time | You trust the plan and want speed |
| **Plan** | Researches and writes a plan; **no edits to your files until you approve** | Anything new or bigger than a quick fix |
| **Auto** | A separate safety check reviews each action in the background instead of asking you | Everyday work, *if your plan or organization offers it* |
| **Bypass permissions** | Doesn't ask | **Not for this course.** Only for isolated test machines. It offers no protection if something goes wrong. |

(A mode called `dontAsk`, which refuses anything that would need approval, exists for automated setups. You won't need it here.)

**How to switch:** in the terminal, press **Shift+Tab** to cycle modes, or start with `claude --permission-mode plan`.
In the desktop and web apps, use the mode menu by the message box.
The modes that appear depend on your app, plan, and settings.

**Important:** Auto mode cuts down on prompts but **doesn't guarantee safety**. Even in Auto, keep a human
approval step for the high-risk actions below.

### What Plan mode does
1. Claude reads your files and looks around. It **doesn't change your files**.
2. It writes a plan: what it will change, in which files, and in what order.
3. It may ask questions when something is unclear. If it doesn't, ask: *"What do you need to know from me before building?"*
4. You choose: **approve** (and pick how it continues), or **keep planning** and give feedback.
5. Only after you approve does it build.

What a good planning question looks like (Brick & Bloom, fictional):
> *"I couldn't find product photos for the bundles. What should I use?"*
> ◉ Labeled placeholder boxes you swap later (recommended) · ○ You'll add photos to an `images/` folder · ○ Licensed stock photos (you confirm the license) · ○ Something else

Answering questions like this is where generic output becomes **yours**.

### The four-stage loop
```
 1 PLAN     10–20 min   Plan mode. Answer questions. Fix the plan.
 2 BUILD    AI works    Switch to Manual or Accept edits and approve the plan.
 3 REVIEW   you         Read every change. Check facts against facts.md. Check voice.
 4 TEST     you         Does it work? Click every link, open the file on your phone,
                        and show it to one other person before it goes public.
```
Skipping Plan doesn't save time. Fixing a bad build costs more.

### Risk levels: how much human oversight?
| Risk | Examples | Rule |
|---|---|---|
| **Low**: drafting | Brainstorm, outline, first-draft copy, a summary of your own notes | Plan optional. Review before using. |
| **Medium**: changing your files | Editing your website files, reorganizing folders, building a workbook | Plan mode first. Review every change. Keep a backup or use version control. |
| **High**: money, personal info, outside communication, live systems | Prices and payments, customer emails or lists, sending messages, posting publicly, changing your live store or accounts | Plan mode first. **A human approves each action.** Never use Bypass. Don't paste passwords, card numbers, or private customer data into a prompt. |

## Worked example (completed)
*Fictional business: **Brick & Bloom Candle Co.***

**Request (in Plan mode):** "Add a Holiday Bundles page to our website using our prices."

**Risk:** Medium (website files), with a high-risk piece: prices.

**Plan Claude proposes (summary):**
1. Read `brand.md`, `tone-of-voice.md`, `offer.md`, `facts.md`.
2. Create `holiday-bundles.html` from the existing product-page layout.
3. Pull the three bundle prices from `facts.md`.
4. Add a link in the site menu.
5. **Question:** "`facts.md` has no price for the 3-candle bundle. What is it?"

**Owner's response:** answers the price question, adds the price to `facts.md`, and approves the plan.
**Review:** checks each price against facts.md and reads the copy aloud.
**Test:** opens the page on a phone and clicks the menu link. Publishing the live site is a separate step the owner does after checking.

## Exercise
1. Pick one real-sized project (a flyer, a one-page site, a workbook chapter). Use fictional details if it involves customers.
2. Rate its risk: Low, Medium, or High. Write why.
3. Write the request you'd give Claude in Plan mode.
4. List 3 questions you *expect* Claude should ask. If you can, run it in Plan mode and record the questions it actually asks.
5. Mark where a human must approve.
6. Write one review check and one test for after it builds.

Use Workbook Exercise 3.

## Expected output
A one-page plan sheet: project, risk level and reason, Plan-mode request, 3 questions, approval point(s), review check, test.

## Completion check
- [ ] I can name the modes and say why Bypass isn't for this course.
- [ ] I know Plan mode doesn't change my files until I approve.
- [ ] My project has a risk level and at least one human approval point.
- [ ] I've written a review step *and* a test step, not just "build it."
