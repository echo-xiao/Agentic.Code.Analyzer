# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

7/1/2026, 12:11:17 PM | 34 testcases | deterministic (no key, frozen rubric)

**Hard: Gemini covers 21% of Claude's cited files (avg).**

**Synthesis split (core spine): retrieval-recall 42% (tools surfaced it) → synthesis-recall 85% (agent then wrote it).**

**Auto verdict (frozen rubric): PASS 7 / PARTIAL 14 / FAIL 13.**

> Frozen rubric — verdict is a pure function of measured signals (reproducible, no hand-judging).
> Gated on **core-spine coverage** (must-find files), not Claude's full citation list (Claude over-cites):
> - **FAIL** if the answer is empty/ERROR, **or** core coverage < 25% (the spine was missed).
> - **PASS** if core coverage ≥ 50% **and** both chain endpoints (entry + terminal symbol) appear.
> - **PARTIAL** otherwise.

> Semantic verdict (right mechanism, different files) is judged by Claude in `logs/reports/eval-3-mcp-agent-vs-claude-semantic-judgment.md`.

| # | id | type | core cov (gate) | hard (Claude files) | retr→synth (core) | auto verdict |
|---|---|---|---:|---:|---|---|
| 1 | tour-04-msg-client | architecture | 2/6 (33%) | 2/7 (29%) | 33% → 100% | PARTIAL |
| 2 | new-19-message-rendering | architecture | 0/2 (0%) | 0/10 (0%) | 0% → 100% | FAIL |
| 3 | claude-01-push-notifications | architecture | 2/6 (33%) | 2/8 (25%) | 33% → 100% | PARTIAL |
| 4 | new-09-realtime-streamer | architecture | 1/5 (20%) | 1/5 (20%) | 60% → 33% | FAIL |
| 5 | tour-05-msg-server | call-chain | 1/5 (20%) | 1/6 (17%) | 20% → 100% | FAIL |
| 6 | claude-05-call-chain | call-chain | 2/8 (25%) | 1/9 (11%) | 38% → 67% | PARTIAL |
| 7 | new-24-autotranslate | locate | 3/3 (100%) | 4/8 (50%) | 100% → 100% | PASS |
| 8 | new-15-impact-aftersave | impact | 3/3 (100%) | 7/8 (88%) | 100% → 100% | PASS |
| 9 | new-16-impact-streamer | impact | 1/3 (33%) | 1/5 (20%) | 33% → 100% | PARTIAL |
| 10 | claude-08-federation | routing | 2/4 (50%) | 1/11 (9%) | 75% → 67% | PARTIAL |
| 11 | new-18-webhook | routing | 2/3 (67%) | 2/8 (25%) | 67% → 100% | PASS |
| 12 | claude-07-api-endpoints | locate | 0/7 (0%) | 0/10 (0%) | 43% → 0% | FAIL |
| 13 | new-25-search | locate | 0/3 (0%) | 1/8 (13%) | 0% → 100% | FAIL |
| 14 | new-27-video-conference | locate | 0/1 (0%) | 1/11 (9%) | 0% → 100% | FAIL |
| 15 | tour-06-endpoint | pattern | 0/2 (0%) | 1/9 (11%) | 0% → 100% | FAIL |
| 16 | new-17-slash-commands | pattern | 2/4 (50%) | 2/6 (33%) | 50% → 100% | PASS |
| 17 | new-11-settings | architecture | 1/3 (33%) | 1/7 (14%) | 33% → 100% | PARTIAL |
| 18 | claude-03-file-upload | architecture | 1/3 (33%) | 2/9 (22%) | 67% → 50% | PARTIAL |
| 19 | new-10-apps-engine | architecture | 0/5 (0%) | 0/9 (0%) | 0% → 100% | FAIL |
| 20 | new-20-proxify | locate | 0/3 (0%) | 0/8 (0%) | 0% → 100% | FAIL |
| 21 | tour-07-db-model-create | pattern | 0/2 (0%) | 0/7 (0%) | 0% → 100% | FAIL |
| 22 | tour-08-db-model-use | pattern | 0/2 (0%) | 1/6 (17%) | 0% → 100% | FAIL |
| 23 | tour-11-new-package | pattern | 0/1 (0%) | 0/9 (0%) | 0% → 100% | FAIL |
| 24 | tour-10-new-service | pattern | 4/4 (100%) | 1/9 (11%) | 100% → 100% | PARTIAL |
| 25 | new-21-impact-settings | impact | 1/3 (33%) | 1/5 (20%) | 67% → 50% | PARTIAL |
| 26 | new-22-2fa | architecture | 4/4 (100%) | 6/8 (75%) | 100% → 100% | PASS |
| 27 | claude-04-e2e-encryption | architecture | 3/5 (60%) | 3/7 (43%) | 60% → 100% | PARTIAL |
| 28 | new-12-ldap-auth | routing | 2/4 (50%) | 2/6 (33%) | 75% → 67% | PASS |
| 29 | claude-02-msg-permissions | locate | 2/4 (50%) | 3/7 (43%) | 50% → 100% | PARTIAL |
| 30 | new-14-ee-license | locate | 0/3 (0%) | 0/9 (0%) | 0% → 100% | FAIL |
| 31 | new-13-room-creation | call-chain | 2/3 (67%) | 2/8 (25%) | 67% → 100% | PARTIAL |
| 32 | new-23-omnichannel | call-chain | 1/3 (33%) | 1/9 (11%) | 33% → 100% | PARTIAL |
| 33 | claude-06-livechat-routing | routing | 4/6 (67%) | 3/11 (27%) | 33% → 100% | PARTIAL |
| 34 | new-26-team | locate | 1/1 (100%) | 2/7 (29%) | 100% → 100% | PASS |
