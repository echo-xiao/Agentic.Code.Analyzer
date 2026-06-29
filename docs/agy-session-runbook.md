# agy Free-tier Session Runbook (Track B — real harness)

Goal: prove that **a related-question session can be answered within one free-tier budget**, using the real agy client (not the self-loop).

## 1. Generate transcript templates

```bash
npx tsx src/eval/agy-session-eval.ts --init
```

Writes one `logs/agy-sessions/<groupId>.json` per group (5 groups: `messaging`,
`api-integrations`, `platform`, `auth-security`, `rooms-livechat`), each pre-filled
with that group's questions **in order**.

## 2. Run each group as ONE agy session

For each group, start a single interactive agy session and ask its questions in order
(context accumulates across questions — that's the point):

```bash
cd Agentic.Code.Analyzer
agy            # flash (free tier); already set in package.json
```

After the **last** question in the group, read cumulative usage:

```
> /context
```

Note the token figure (e.g. `48.2k / 1.0M`). `/stats` is broken in agy — use `/context`.
For real quota consumed, optionally check a quota monitor (e.g. `antigravity-usage`,
`AG_Insights`) before/after and take the delta.

## 3. Fill in the transcript

Edit `logs/agy-sessions/<groupId>.json`:

```jsonc
{
  "groupId": "messaging",
  "contextTokensFinal": 48200,   // the number /context showed after the last question
  "quotaUsed": 12000,            // optional, from a quota monitor delta
  "answers": [
    { "id": "tour-04-msg-client", "answer": "<paste agy's answer>" },
    { "id": "new-19-message-rendering", "answer": "..." }
  ]
}
```

## 4. Score

```bash
export ANTHROPIC_API_KEY=...        # Claude judges Gemini's answers
# optional: export JUDGE_MODEL=claude-sonnet-4-6
# optional: export FREE_TIER_BUDGET=1000000   # the binding free-tier limit you care about
npx tsx src/eval/agy-session-eval.ts
```

Produces `logs/agy-session-eval.md`:

- per session: judge PASS count, cumulative context tokens, **≤ budget?**, **completed?**
- per question: judge verdict + overall + one-line reasoning

## 5. Simplified calibration (do it here, zero extra work)

While reading these answers you're already eyeballing them. For ~10 of them, note
whether you agree with the judge's verdict (agree/disagree) and report the agreement
rate. No κ math needed — that's enough to show the judge is trustworthy.

## Notes / gotchas

- **agy `-p` headless can't give tokens** and silently drops stdout under a non-TTY —
  that's why this harness is interactive + manual transcript capture.
- This (real agy) is the **headline** for accuracy + free-tier cost. The self-loop
  (`npm run eval:agent`) is the fast proxy for daily iteration; its numbers are not
  guaranteed equal to agy's.
- Set the **budget** (`FREE_TIER_BUDGET`) to whichever free-tier limit actually binds
  your sessions (context window, daily token cap, etc.).
