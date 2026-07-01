# agents — semantic verdicts (manual, judged by Claude)

> **What this is.** The semantic ground truth: did the agent get the MECHANISM right, regardless of
> which files it cited? Automated file-overlap rubrics misjudge "right mechanism, different files"
> as FAIL, so this table is judged by Claude reading each answer in
> `logs/answers-gemini-mcp-selfloop/` against the core spine (`testcases.json` →
> `groundTruthPath` / `core`), one verdict + one-sentence reason per question.
>
> **Frozen criteria (do not tune per run):**
> - **PASS** — the answer names the actual mechanism (entry point, dispatch boundary, key steps)
>   and cites real files for the load-bearing parts. Different-but-correct files still PASS.
> - **PARTIAL** — mechanism partly right: correct subsystem and some real steps, but a load-bearing
>   link is missing or wrong.
> - **FAIL** — wrong mechanism, hallucinated paths, empty/ERROR answer.
>
> **Refresh discipline: re-judge EVERY row whenever answers regenerate (`npm run gen:mcp`).**
> Stale verdicts against new answers are worse than no verdicts. Single-run PASS counts on the free
> Gemini tier are noisy even at temperature 0 — treat trends, not single-run deltas, as signal.
>
> `report.ts` parses this table (rows joined by id).

| id | verdict | reason |
|---|---|---|
