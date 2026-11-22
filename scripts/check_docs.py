#!/usr/bin/env python3
"""Moneyway Lab™ documentation checks (standard library only).

Run from anywhere:  python3 scripts/check_docs.py
Exit code 0 = all checks passed; 1 = at least one failure. Warnings never fail the run.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MODULE = ROOT / "masterclass" / "ai-operator-101"
SKIP_DIRS = {".git", "node_modules", "dist", "out"}
REVIEW_DOCS = {"qa-report.md", "decision-register.md"}  # these discuss defects by name

failures: list[str] = []
warnings: list[str] = []


def md_files() -> list[Path]:
    return sorted(
        p for p in ROOT.rglob("*.md")
        if not any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts)
    )


def rel(p: Path) -> str:
    return str(p.relative_to(ROOT))


def strip_code(text: str) -> str:
    """Remove fenced code blocks and inline code so examples aren't checked as links/marks."""
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    return re.sub(r"`[^`\n]*`", "", text)


# 1. Relative links resolve -------------------------------------------------
def check_links() -> int:
    count = 0
    for f in md_files():
        for target in re.findall(r"\]\(([^)\s]+)\)", strip_code(f.read_text())):
            if re.match(r"^(https?:|mailto:|#)", target):
                continue
            count += 1
            path = (f.parent / target.split("#")[0]).resolve()
            if not path.exists():
                failures.append(f"broken link in {rel(f)} -> {target}")
    return count


# 2. Facilitator guide totals 90 minutes and segment splits add up -----------
def check_timing() -> None:
    text = (MODULE / "facilitator-guide.md").read_text()
    rows = re.findall(r"^\| (\d:\d\d) \| (\d+) \| \*\*(.+?)\*\* \|\s*(.*?)\s*\|$", text, flags=re.M)
    if not rows:
        failures.append("facilitator-guide: no run-of-show rows found")
        return
    total = sum(int(m) for _, m, _, _ in rows)
    if total != 90:
        failures.append(f"facilitator-guide: run of show totals {total} min, expected 90")
    clock = 0
    for start, minutes, name, detail in rows:
        h, m = start.split(":")
        if int(h) * 60 + int(m) != clock:
            failures.append(f"facilitator-guide: '{name}' starts at {start}, expected minute {clock}")
        clock += int(minutes)
        parts = [int(x) for x in re.findall(r"(?:Teach|Demo|Exercise \d:) (\d+)", detail)]
        if parts and sum(parts) != int(minutes):
            failures.append(f"facilitator-guide: '{name}' splits sum to {sum(parts)}, row says {minutes}")
        # Section heading must match the row's length
        hm = re.search(rf"^## {start} .*\((\d+) min\)", text, flags=re.M)
        if not hm:
            failures.append(f"facilitator-guide: no section heading for {start}")
        elif int(hm.group(1)) != int(minutes):
            failures.append(f"facilitator-guide: heading {start} says {hm.group(1)} min, table says {minutes}")
    print(f"  timing: {len(rows)} segments, total {total} min")


# 3. Every lesson has the required parts ------------------------------------
LESSON_PARTS = ["Learning objective", "Explanation", "Worked example", "Exercise",
                "Expected output", "Completion check"]


def check_lessons() -> None:
    lessons = sorted(MODULE.glob("0[1-4]-*.md"))
    if len(lessons) != 4:
        failures.append(f"expected 4 lessons, found {len(lessons)}")
    for f in lessons:
        headings = re.findall(r"^## (.+)$", f.read_text(), flags=re.M)
        for part in LESSON_PARTS:
            if not any(h.startswith(part) for h in headings):
                failures.append(f"{rel(f)}: missing section '{part}'")


# 4. Workbook has the required components ------------------------------------
WORKBOOK_PARTS = ["Welcome", "Exercise 1", "Exercise 2", "Exercise 3", "Exercise 4",
                  "Reusable templates", "Final assignment", "Self-assessment checklist"]


def check_workbook() -> None:
    text = (MODULE / "workbook.md").read_text()
    headings = re.findall(r"^#{2,3} (.+)$", text, flags=re.M)
    for part in WORKBOOK_PARTS:
        if not any(h.startswith(part) for h in headings):
            failures.append(f"workbook: missing section '{part}'")
    for sub in ["A. Project-context template", "B. SOP worksheet", "C. Four-part goal prompt"]:
        if sub not in text:
            failures.append(f"workbook: missing template '{sub}'")
    sa = text.split("## Self-assessment checklist", 1)[-1]
    boxes = len(re.findall(r"^- \[ \]", sa, flags=re.M))
    m = re.search(r"/ (\d+)\.", sa)
    if not m or int(m.group(1)) != boxes:
        failures.append(f"workbook: self-assessment has {boxes} items but score says /{m.group(1) if m else '?'}")
    print(f"  workbook: self-assessment items = {boxes}")


# 5. Goal-prompt framework is consistent everywhere --------------------------
def check_goal_prompt() -> None:
    labels = ["GOAL", "CONTEXT", "LIMITS", "DONE LOOKS LIKE"]
    for f in [MODULE / "04-goal-prompt.md", MODULE / "workbook.md",
              MODULE / "facilitator-guide.md", ROOT / "templates" / "goal-prompt.md"]:
        t = f.read_text()
        for label in labels:
            if label not in t:
                failures.append(f"{rel(f)}: goal-prompt label '{label}' missing")
    for f in md_files():
        if f.name in REVIEW_DOCS:
            continue
        if re.search(r"DONE\s*=", f.read_text()):
            failures.append(f"{rel(f)}: outdated label 'DONE =' (use DONE LOOKS LIKE)")


# 6. Protected marks carry ™ (outside code) -----------------------------------
MARKS = {
    "CJ Moneyway Media": "CJ Moneyway Media™",
    "Moneyway Lab": "Moneyway Lab™",
    "CJ Moneyway Show": "CJ Moneyway Show™",
    "Built For Purpose": "Built For Purpose™",
    "Build It Brick by Brick": "Build It Brick by Brick™",
    "Legacy Over Likes": "Legacy Over Likes™",
}


def check_marks() -> None:
    for f in md_files():
        if f.is_relative_to(ROOT / "video"):
            continue
        text = strip_code(f.read_text())
        for bare, marked in MARKS.items():
            for m in re.finditer(re.escape(bare), text):
                if not text[m.start():].startswith(marked):
                    line = text[:m.start()].count("\n") + 1
                    failures.append(f"{rel(f)}:{line}: '{bare}' without ™")


# 7. Unapproved draft slogans stay out of student/instructor materials --------
DRAFT_SLOGANS = ["crown on", "stay ready", "no days off", "built different", "block to the boardroom"]


def check_slogans() -> None:
    targets = list(MODULE.glob("*.md")) + list((ROOT / "templates").glob("*.md"))
    for f in targets:
        if f.name in REVIEW_DOCS:
            continue
        low = f.read_text().lower()
        for s in DRAFT_SLOGANS:
            if s in low:
                failures.append(f"{rel(f)}: unapproved draft slogan '{s}'")


# 8. No real prices set; flag dollar amounts and risky claims for review -----
def check_claims() -> None:
    facts = (ROOT / "brand" / "facts.md").read_text()
    for line in facts.splitlines():
        if line.startswith("|") and re.search(r"\$\d", line):
            failures.append(f"brand/facts.md: price set without approval: {line.strip()}")
    risky = re.compile(r"guarantee|passive income|10x|get rich|overnight|make \$\d", re.I)
    for f in md_files():
        if f.is_relative_to(ROOT / "video") or f.name in REVIEW_DOCS:
            continue
        for i, line in enumerate(f.read_text().splitlines(), 1):
            if risky.search(line) and not re.search(r"\b(no|not|doesn't|don't|never)\b", line, re.I):
                failures.append(f"{rel(f)}:{i}: possible unsupported claim: {line.strip()[:80]}")
            for amt in sorted(set(re.findall(r"\$\d+", line))):
                if f.is_relative_to(MODULE):
                    warnings.append(f"{rel(f)}:{i}: dollar amount {amt} (confirm it is a labeled example)")


# 9. Tables must not directly follow a paragraph line (they render as raw text) --
def check_tables() -> None:
    for f in md_files():
        lines = f.read_text().splitlines()
        fence = False
        for i, line in enumerate(lines):
            if line.startswith("```"):
                fence = not fence
                continue
            if fence or i == 0 or i + 1 >= len(lines):
                continue
            prev = lines[i - 1].strip()
            is_table_start = line.startswith("|") and re.match(r"^\|[\s:|-]+\|$", lines[i + 1])
            if is_table_start and prev and not prev.startswith(("|", "#")):
                failures.append(f"{rel(f)}:{i + 1}: table needs a blank line above it")


# 10. TODO (CJ) inventory ------------------------------------------------------
def count_todos() -> int:
    return sum(f.read_text().count("TODO (CJ)") for f in md_files() if f.name not in REVIEW_DOCS)


def main() -> int:
    print("Moneyway Lab™ doc checks")
    n_links = check_links()
    print(f"  links: {n_links} relative links checked")
    check_timing()
    check_lessons()
    check_workbook()
    check_goal_prompt()
    check_marks()
    check_slogans()
    check_claims()
    check_tables()
    print(f"  TODO (CJ) markers: {count_todos()}")
    for w in warnings:
        print(f"WARN  {w}")
    for f in failures:
        print(f"FAIL  {f}")
    print("RESULT:", "PASS" if not failures else f"FAIL ({len(failures)})")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
