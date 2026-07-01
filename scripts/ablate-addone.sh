#!/usr/bin/env bash
# Add-one-on-floor ablation: floor = exact+graph, then add cluster / grep on top.
# Measures each channel's MARGINAL value above a functional floor (graph needs a seed → exact).
# Deterministic (temp=0). Restores baseline answers at the end.
set -e
cd "$(dirname "$0")/.."

rm -rf logs/answers-baseline-bak
cp -r logs/answers-gemini-mcp-selfloop logs/answers-baseline-bak
echo "=== baseline backed up. add-one floor matrix (hits Gemini) ==="

run() {                       # $1 = tag, $2 = ONLY_CHANNELS value
  echo ">>> ONLY=$2 gen starting ($1)..."
  ONLY_CHANNELS="$2" NODE_OPTIONS="--max-old-space-size=8192" npx tsx src/eval/gen-gemini-mcp-selfloop.ts >/dev/null 2>&1
  npx tsx src/eval/eval-3-mcp-vs-claude.ts >/dev/null 2>&1
  cp logs/reports/eval-3-mcp-agent-vs-claude.md "logs/reports/eval-3-ONLY-$1.md"
  echo ">>> $1 DONE: $(grep -m1 'Auto verdict' logs/reports/eval-3-ONLY-$1.md)"
}

run "exact"          "exact"          # floor
run "exact-cluster"  "exact,cluster"  # floor + cluster
run "exact-grep"     "exact,grep"     # floor + grep

# restore baseline
rm -rf logs/answers-gemini-mcp-selfloop
mv logs/answers-baseline-bak logs/answers-gemini-mcp-selfloop
npx tsx src/eval/eval-3-mcp-vs-claude.ts >/dev/null 2>&1
echo "=== ADD-ONE MATRIX DONE ==="
