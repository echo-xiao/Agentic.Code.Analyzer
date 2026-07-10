"""Report writer: metrics.md (aggregate) + verdicts.md (per-question)."""
import os
import collections


def write_reports(results, out_dir):
    """Write metrics.md and verdicts.md into out_dir.

    Args:
        results: list of score dicts from score_question.
        out_dir:  destination directory (created if missing).
    """
    os.makedirs(out_dir, exist_ok=True)
    n = len(results) or 1
    passed = sum(1 for r in results if r["verdict"] == "pass")

    by_type = collections.defaultdict(lambda: [0, 0])
    for r in results:
        by_type[r["questionType"]][0] += 1
        by_type[r["questionType"]][1] += 1 if r["verdict"] == "pass" else 0

    # ---- metrics.md ----
    with open(os.path.join(out_dir, "metrics.md"), "w", encoding="utf-8") as fh:
        fh.write("# Eval metrics\n\n")
        fh.write(f"- questions scored: {len(results)}\n")
        fh.write(
            f"- **overall pass rate: {passed}/{len(results)} = {passed/n:.2f}**\n"
        )
        fh.write(
            f"- mean score: {sum(r['score'] for r in results)/n:.3f}\n\n"
        )
        fh.write("| questionType | pass | total | pass-rate |\n|---|---|---|---|\n")
        for t, (tot, pas) in sorted(by_type.items()):
            fh.write(f"| {t} | {pas} | {tot} | {pas/(tot or 1):.2f} |\n")

    # ---- verdicts.md ----
    with open(os.path.join(out_dir, "verdicts.md"), "w", encoding="utf-8") as fh:
        fh.write("# Per-question verdicts (semantic / machine)\n\n")
        for r in results:
            d = r["detail"]
            mark = "✅" if r["verdict"] == "pass" else "❌"
            fh.write(
                f"## {mark} {r['id']} ({r['questionType']}) — {r['verdict']}"
                f" (score {r['score']:.2f})\n"
            )
            fh.write(f"**Q:** {d.get('question', '')}\n\n")
            if "reason" in d:
                fh.write(
                    f"**Judge reason:** {d['reason']}"
                    f" (facts {d.get('fact_hits', '?')}/{d.get('fact_total', '?')})\n\n"
                )
            if "matched" in d:
                fh.write(
                    f"**Matched files:** {d.get('matched')}  "
                    f"**Missed:** {d.get('missed')}\n\n"
                )
            fh.write(f"**Citations:** {d.get('citations')}\n\n")
            fh.write(f"**Answer:** {d.get('answer', '')[:500]}\n\n---\n\n")
