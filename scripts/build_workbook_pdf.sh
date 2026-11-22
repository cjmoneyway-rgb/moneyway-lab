#!/usr/bin/env bash
# Build a print-ready PDF of the AI Operator 101 workbook.
# Requires: pandoc, Node.js with the `playwright` package and its Chromium.
# Output: masterclass/ai-operator-101/dist/workbook.pdf (git-ignored; do not commit renders).
# Styling uses DRAFT brand colors/fonts from brand/brand.md (pending CJ approval).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/masterclass/ai-operator-101/workbook.md"
OUT_DIR="$ROOT/masterclass/ai-operator-101/dist"
mkdir -p "$OUT_DIR"

cat > "$OUT_DIR/workbook.css" <<'CSS'
@page { size: Letter; margin: 0.7in 0.75in; }
body { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111; }
h1, h2, h3 { font-family: "Bebas Neue", Impact, "Arial Narrow", sans-serif; letter-spacing: .02em; }
h1 { color: #E10600; font-size: 30pt; margin: 0 0 4pt; }
h2 { color: #fff; background: #120000; padding: 6pt 10pt; font-size: 18pt; border-left: 8pt solid #E10600; break-after: avoid; }
h3 { color: #7A0000; font-size: 14pt; break-after: avoid; }
hr { border: 0; break-after: page; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; break-inside: avoid; }
th { background: #E10600; color: #fff; text-align: left; }
th, td { border: 1px solid #999; padding: 5pt 7pt; vertical-align: top; height: 20pt; }
td:empty::after { content: "\00a0"; }
pre { background: #f4f1ef; border-left: 4pt solid #E10600; padding: 8pt; font-size: 9pt; white-space: pre-wrap; break-inside: avoid; }
code { font-family: Menlo, Consolas, monospace; }
blockquote { border-left: 4pt solid #7A0000; margin: 6pt 0; padding: 2pt 10pt; color: #333; min-height: 28pt; }
ul.task-list, li.task-list-item { list-style: none; }
p:has(+ table), p:has(+ pre) { break-after: avoid; }
footer.mw { position: fixed; bottom: 0; font-size: 8pt; color: #777; }
CSS

pandoc "$SRC" --from gfm --to html5 --standalone --no-highlight \
  --metadata title="AI Operator 101 Workbook" \
  --css workbook.css -o "$OUT_DIR/workbook.html"

# Pandoc's standalone template prints a title block; drop it (the workbook has its own H1).
sed -i '/<header id="title-block-header">/,/<\/header>/d' "$OUT_DIR/workbook.html"

OUT_DIR="$OUT_DIR" node -e '
const { chromium } = require("playwright");
(async () => {
  const dir = process.env.OUT_DIR;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + dir + "/workbook.html");
  await page.pdf({
    path: dir + "/workbook.pdf", format: "Letter", printBackground: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: "<div style=\"font-size:8px;width:100%;text-align:center;color:#777\">Moneyway Lab™ · AI Operator 101 · Draft for executive review · <span class=pageNumber></span>/<span class=totalPages></span></div>",
    margin: { top: "0.6in", bottom: "0.7in", left: "0.7in", right: "0.7in" },
  });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
'
echo "Built $OUT_DIR/workbook.pdf"
