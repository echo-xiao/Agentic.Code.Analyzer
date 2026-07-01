# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

7/1/2026, 10:49:15 AM | 34 testcases | deterministic (no key, frozen rubric)

**Hard: Gemini covers 25% of Claude's cited files (avg).**

**Synthesis split (core spine): retrieval-recall 50% (tools surfaced it) → synthesis-recall 86% (agent then wrote it).**

**Auto verdict (frozen rubric): PASS 11 / PARTIAL 12 / FAIL 11.**

> Frozen rubric — verdict is a pure function of measured signals (reproducible, no hand-judging).
> Gated on **core-spine coverage** (must-find files), not Claude's full citation list (Claude over-cites):
> - **FAIL** if the answer is empty/ERROR, **or** core coverage < 25% (the spine was missed).
> - **PASS** if core coverage ≥ 50% **and** both chain endpoints (entry + terminal symbol) appear.
> - **PARTIAL** otherwise.

> Semantic verdict (right mechanism, different files) is judged by Claude in `logs/reports/eval-3-mcp-agent-vs-claude-semantic-judgment.md`.

| # | id | type | core cov (gate) | hard (Claude files) | retr→synth (core) | auto verdict |
|---|---|---|---:|---:|---|---|
| 1 | tour-04-msg-client | architecture | 1/6 (17%) | 1/7 (14%) | 17% → 100% | FAIL |
| 2 | new-19-message-rendering | architecture | 2/2 (100%) | 2/10 (20%) | 100% → 100% | PASS |
| 3 | claude-01-push-notifications | architecture | 3/6 (50%) | 3/8 (38%) | 50% → 100% | PARTIAL |
| 4 | new-09-realtime-streamer | architecture | 1/5 (20%) | 1/5 (20%) | 40% → 50% | FAIL |
| 5 | tour-05-msg-server | call-chain | 1/5 (20%) | 1/6 (17%) | 60% → 33% | FAIL |
| 6 | claude-05-call-chain | call-chain | 4/8 (50%) | 3/9 (33%) | 75% → 67% | PARTIAL |
| 7 | new-24-autotranslate | locate | 3/3 (100%) | 4/8 (50%) | 100% → 100% | PASS |
| 8 | new-15-impact-aftersave | impact | 2/3 (67%) | 6/8 (75%) | 100% → 67% | PASS |
| 9 | new-16-impact-streamer | impact | 1/3 (33%) | 2/5 (40%) | 33% → 100% | PARTIAL |
| 10 | claude-08-federation | routing | 0/4 (0%) | 0/11 (0%) | 0% → 100% | FAIL |
| 11 | new-18-webhook | routing | 2/3 (67%) | 2/8 (25%) | 67% → 100% | PASS |
| 12 | claude-07-api-endpoints | locate | 3/7 (43%) | 1/10 (10%) | 43% → 100% | PARTIAL |
| 13 | new-25-search | locate | 0/3 (0%) | 1/8 (13%) | 0% → 100% | FAIL |
| 14 | new-27-video-conference | locate | 1/1 (100%) | 1/11 (9%) | 100% → 100% | PASS |
| 15 | tour-06-endpoint | pattern | 1/2 (50%) | 1/9 (11%) | 50% → 100% | PARTIAL |
| 16 | new-17-slash-commands | pattern | 2/4 (50%) | 2/6 (33%) | 50% → 100% | PASS |
| 17 | new-11-settings | architecture | 2/3 (67%) | 2/7 (29%) | 67% → 100% | PASS |
| 18 | claude-03-file-upload | architecture | 1/3 (33%) | 1/9 (11%) | 33% → 100% | PARTIAL |
| 19 | new-10-apps-engine | architecture | 0/5 (0%) | 0/9 (0%) | 0% → 100% | FAIL |
| 20 | new-20-proxify | locate | 1/3 (33%) | 1/8 (13%) | 67% → 50% | PARTIAL |
| 21 | tour-07-db-model-create | pattern | 0/2 (0%) | 2/7 (29%) | 0% → 100% | FAIL |
| 22 | tour-08-db-model-use | pattern | 0/2 (0%) | 2/6 (33%) | 0% → 100% | FAIL |
| 23 | tour-11-new-package | pattern | 1/1 (100%) | 4/9 (44%) | 100% → 100% | PASS |
| 24 | tour-10-new-service | pattern | 0/4 (0%) | 0/9 (0%) | 0% → 100% | FAIL |
| 25 | new-21-impact-settings | impact | 1/3 (33%) | 1/5 (20%) | 33% → 100% | PARTIAL |
| 26 | new-22-2fa | architecture | 1/4 (25%) | 1/8 (13%) | 50% → 50% | PARTIAL |
| 27 | claude-04-e2e-encryption | architecture | 3/5 (60%) | 3/7 (43%) | 60% → 100% | PARTIAL |
| 28 | new-12-ldap-auth | routing | 4/4 (100%) | 4/6 (67%) | 100% → 100% | PASS |
| 29 | claude-02-msg-permissions | locate | 2/4 (50%) | 3/7 (43%) | 50% → 100% | PARTIAL |
| 30 | new-14-ee-license | locate | 0/3 (0%) | 1/9 (11%) | 33% → 0% | FAIL |
| 31 | new-13-room-creation | call-chain | 1/3 (33%) | 1/8 (13%) | 33% → 100% | PARTIAL |
| 32 | new-23-omnichannel | call-chain | 2/3 (67%) | 3/9 (33%) | 67% → 100% | PASS |
| 33 | claude-06-livechat-routing | routing | 1/6 (17%) | 1/11 (9%) | 17% → 100% | FAIL |
| 34 | new-26-team | locate | 1/1 (100%) | 3/7 (43%) | 100% → 100% | PASS |
