# Move #1: Know your instruction type (SOP vs end goal)

**AI Operator 101 · Moneyway Lab™ · CJ Moneyway Media™**

> **The win:** Stop getting the wrong thing back. A lot of weak AI output comes from mixing up two kinds of instructions.

## Learning objective
By the end of this lesson you can:
1. Tell whether a task needs an **SOP** (fixed steps) or an **end goal** (a defined outcome).
2. Write a short SOP with at least one decision point and one **human approval checkpoint**.
3. Say which steps AI can do by itself and which need a person or an authorized tool.

## Explanation

### Two kinds of instructions
```
                 Two kinds of instructions
                 ┌───────────┴───────────┐
               SOP                    END GOAL
  Standard Operating Procedure    Where you want to end up
     "Follow these steps."         "Get me there. Propose how."
```

| | SOP | End goal |
|---|---|---|
| You know… | the steps | the destination |
| You want… | the same result every time | the best route, maybe a new idea |
| Good for | repeat work: sorting inquiries, formatting show notes, a weekly report | new or creative work: a workshop outline, a sales-page draft, a product idea |
| Risk if you pick wrong | Steps on creative work give a stiff, robotic result | A vague goal on repeat work gives a different result every time |

**Rule of thumb:** if you've done the task more than three times the same way, write it as an SOP.
If you can describe "done" but not the steps, give an end goal (Move #4 shows how).

### What AI does vs. what tools do
An AI assistant **drafts, sorts, summarizes, and recommends**. It can only *send an email, update a CRM
(customer list), charge a card, or post online* if someone has connected it to those systems with
proper permission, and even then a person should approve anything that leaves the building.

So every SOP should mark each step:
- **AI** — AI can do it (draft, classify, summarize).
- **TOOL** — An automation or software tool does it (form, CRM, email platform), set up and authorized by you.
- **HUMAN ✅** — A person reviews or approves before it continues.

### When a human must approve
Always put a **HUMAN ✅** checkpoint before any step that:
- sends a message to a customer or the public,
- involves money (prices, refunds, invoices, payments),
- uses personal information (names, emails, phone numbers, addresses),
- changes a live system (website, store, CRM records, accounts).

## Worked example (completed)
*Fictional business: **Brick & Bloom Candle Co.**, a small online candle shop.*

**Task:** Answer wholesale inquiries from the website contact form. → **SOP** (same steps every time).

```
[Contact form]──▶[CRM: status "New"]──▶[AI: sort the inquiry]──▶< Qualified? >
     TOOL             TOOL                    AI                    AI suggests
                                                                    │
                     ┌────────────── Yes (store, 20+ units) ────────┤
                     ▼                                              └── No ──┐
     [AI drafts Email A: "Let's book a call"]          [AI drafts Email B: "Here's our free guide"]
                     ▼                                              ▼
             [HUMAN ✅ review + send]                    [HUMAN ✅ review + send]
                     ▼                                              ▼
             [CRM: "Contacted"] TOOL                    [CRM: "Contacted"] TOOL
```

**The SOP written out:**
1. **TOOL:** Contact form saves the inquiry to the CRM with status *New*.
2. **AI:** Read the inquiry. Mark it *Qualified* if the sender is a store or event planner asking about 20+ units; otherwise *Not yet*.
3. **AI:** Draft Email A (book a call) for *Qualified*, or Email B (free guide) for *Not yet*, using the templates in `emails/`.
4. **HUMAN ✅:** Owner reads the draft, fixes anything wrong, and sends it from the business email.
5. **TOOL / HUMAN:** Update the CRM status to *Contacted*.

**Same business, end-goal version:**
> "I want wholesale to be 30% of next year's orders. Suggest three ways to find more store buyers. Don't contact anyone; give me ideas to review."

Same company, different instruction type, because one task repeats and the other is new.

## Exercise
1. List three tasks you do every week.
2. Label each **SOP** or **END GOAL**, with one sentence on why.
3. Pick one SOP and write it as 4–6 numbered steps.
4. Mark every step **AI**, **TOOL**, or **HUMAN ✅**.
5. Add at least one decision ("Qualified?", "Over budget?", "Returning customer?").

Use Workbook Exercise 1 or `templates/sop.md`.

## Expected output
- A three-row table of tasks, each labeled SOP or END GOAL.
- One written SOP (4–6 steps) with a decision point and at least one HUMAN ✅ checkpoint before anything external, financial, or personal.

## Completion check
- [ ] I can explain the difference between an SOP and an end goal in one sentence.
- [ ] My SOP has a decision point.
- [ ] Every step that sends, spends, or changes something live has a HUMAN ✅.
- [ ] I didn't assume AI can send or update anything without a connected, authorized tool.
