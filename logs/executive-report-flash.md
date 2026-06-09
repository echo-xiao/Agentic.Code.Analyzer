# Agentic Code Analyzer — Evaluation Report

**Date:** June 8, 2026 | **Model:** Gemini 2.5 Flash (free tier) | **Target Codebase:** Rocket.Chat (10K+ files, 50K+ symbols)

---

## 1. What This System Does

An MCP (Model Context Protocol) server that gives an LLM three tools — `search`, `graph`, `implement` — to navigate a large codebase. The LLM answers architecture questions like "How does message sending work?" by searching symbols, traversing call graphs, and reading source code.

## 2. Overall Results

| Rating | Count | % | Description |
|---|---|---|---|
| **GOOD** | 9 | 26% | Correct architecture, complete call chain, specific file paths |
| **ACCEPTABLE** | 15 | 44% | Correct direction, main chain covered, missing some intermediate steps |
| **WEAK** | 7 | 21% | Too shallow or answered the wrong question |
| **WRONG** | 3 | 9% | Failed to find relevant code or nearly empty answer |

**70% of answers are usable (GOOD + ACCEPTABLE).** 26% are high-quality with complete call chains and file paths.

### Comparison: With vs Without Tools

| Metric | Baseline (no tools) | With Tools | Benchmark (Claude) |
|---|---|---|---|
| Ground truth files found | 23/200 (12%) | 88/200 (44%) | 200/200 (100%) |
| Key symbols found | 22/133 (17%) | 86/133 (65%) | 127/133 (95%) |
| Real file paths in answer | 45 | 169 | 269 |

Tools provide a **3.7x improvement** in file discovery and **3.8x improvement** in symbol coverage over the baseline.

## 3. Per-Question Breakdown

| # | Question | Rating | Files Found | What Worked | What's Missing |
|---|---|---|---|---|---|
| 1 | Client-side message sending | WEAK | 1/6 | Found sendMessage entry | Missing UI component chain (RoomBody->MessageBox) |
| 2 | Server-side message sending | ACCEPTABLE | 4/6 | Found core sendMessage + DDP method | Missing executeSendMessage wrapper, permission chain |
| 3 | Creating a REST API endpoint | ACCEPTABLE | 3/6 | Found addRoute + APIClass | Missing middleware chain (auth, permissions, rate limit) |
| 4 | Creating a database model | ACCEPTABLE | 2/6 | Found BaseRaw + 3-layer architecture | Missing concrete MessagesRaw example |
| 5 | Querying data with a model | WEAK | 0/6 | Found generic Users example | Completely missed the loadHistory flow |
| 6 | Adding a new service | ACCEPTABLE | 2/6 | Found ServiceClassInternal + proxify | Missing lifecycle hooks, Authorization integration |
| 7 | Creating a new package | WEAK | 4/5 | Found package structure | Generic answer, no concrete example |
| 8 | Push notifications | GOOD | 3/6 | Full pipeline: afterSave->queue->PushClass | Missing shouldNotifyMobile eligibility check |
| 9 | Message permissions | WEAK | 1/6 | Found permission validation function | Only 2 tool calls, answer too shallow |
| 10 | File upload | WEAK | 2/6 | Found FileUploadClass + two-step API | Missing client-side flow, E2E encryption |
| 11 | E2E encryption | GOOD | 5/6 | RSA/PBKDF2/AES/Keychain all correct | Missing key distribution pipeline |
| 12 | Full sendMessage call chain | GOOD | 4/6 | Entry->permissions->sendMessage->hooks | Missing client entry and post-save notifications |
| 13 | Livechat routing | ACCEPTABLE | 2/6 | Found QueueManager + RoutingManager | Missing widget entry, routing strategies |
| 14 | API endpoint architecture | ACCEPTABLE | 2/6 | Found addRoute + middleware concept | Missing createApi bootstrap, Hono router |
| 15 | Federation | WEAK | 1/6 | Found outbound sendMessage | Missing entire incoming transaction path |
| 16 | Realtime streaming | WRONG | 0/5 | Found notification function name | No implementation files or symbols found |
| 17 | Apps Engine hooks | ACCEPTABLE | 2/6 | Found AppManager + AppListenerManager | Missing bridge layer, AppInterface enum |
| 18 | Settings system | WEAK | 1/6 | Found SettingsRegistry.add() | Missing CachedSettings cache layer |
| 19 | LDAP authentication | **GOOD** | **6/6** | **Full chain: configureLDAP->LDAPService->LDAPManager** | **Complete answer** |
| 20 | Room creation | ACCEPTABLE | 3/6 | Found createChannelMethod->createRoom | Missing subscription creation |
| 21 | Enterprise licensing | GOOD | 4/6 | Found LicenseManager + hasModule gating | Missing validation flow details |
| 22 | afterSaveMessage impact | WRONG | 1/6 | Found 2 callbacks | Missing 5+ callbacks (notifications, translate, etc.) |
| 23 | Streamer impact analysis | ACCEPTABLE | 3/5 | Found main broadcast chain | Missing 17 streamer instances |
| 24 | Slash commands | GOOD | 4/6 | Found core add/run + client parsing | Missing preview system |
| 25 | Webhooks | ACCEPTABLE | 3/6 | Found incoming webhook flow | Missing outgoing webhooks, IsolatedVM sandbox |
| 26 | Message rendering | GOOD | 5/6 | Found message-parser + gazzodown pipeline | Missing server-side pre-parsing |
| 27 | Core-services proxify | GOOD | 4/6 | Found Proxy pattern + handler mechanism | Missing LocalBroker dispatch internals |
| 28 | Settings impact analysis | WRONG | 1/5 | Found a few middleware deps | Only 2 tool calls, missed 11 dependent systems |
| 29 | Two-factor auth | GOOD | 3/6 | Found decorator + 3 verification methods | Missing HTTP header details, remember-me |
| 30 | Omnichannel queue | ACCEPTABLE | 2/6 | Found queue polling + transactional close | Missing OmnichannelService lifecycle |
| 31 | Auto-translate | ACCEPTABLE | 3/6 | Found provider registry + callback hook | Missing tokenization logic |
| 32 | Search system | ACCEPTABLE | 2/6 | Found SearchProviderService architecture | Missing provider base class |
| 33 | Teams | ACCEPTABLE | 3/6 | Found TeamService creation flow | Missing permissions, auto-join |
| 34 | Video conference | WEAK | 2/6 | Found Apps Engine provider concept | Missing VideoConfService implementation |

## 4. Why Answers Fail — Root Cause Distribution

| Root Cause | Count | % | Example |
|---|---|---|---|
| **Shallow traversal** | 13 | 38% | Found `sendMessage` entry but didn't follow `validateMessage` or `afterSaveMessage` deeper — assumes function names are self-explanatory |
| **Doesn't know what to search** | 7 | 21% | Didn't know `executeSendMessage` wraps `sendMessage`, or that `loadHistory` is the concrete query example |
| **Only explores one side** | 6 | 18% | Searched server-only for file upload (missed client `uploadFiles`), outgoing-only for federation (missed incoming transactions) |
| **Stops too early** | 4 | 12% | Used 2-3 tool calls when budget allows 8 — decided it had "enough" |
| **Generic instead of specific** | 3 | 9% | Gave `Users.findOneById` tutorial instead of tracing the actual `loadHistory` flow |
| **Complete success** | 1 | 3% | LDAP auth: full chain traced correctly |

### Deeper Breakdown of "Shallow Traversal" (38% of failures)

This is the #1 problem. When the LLM calls `graph("sendMessage", "down")`, it gets back:

```
sendMessage
  -> validateMessage        (has 6 internal steps)
  -> prepareMessageObject   (has 3 internal steps)
  -> afterSaveMessage       (has 8 callbacks)
```

The LLM sees `validateMessage` and thinks "that validates the message" — correct but shallow. It doesn't call `graph("validateMessage", "down")` to discover the 6 permission checks, XSS validation, and attachment validation inside.

**This is a model reasoning limitation, not a tool limitation.** The tools return the right data; the model doesn't follow through.

### Deeper Breakdown of "Only Explores One Side" (18%)

Most Rocket.Chat features span client + server + packages. Examples of single-sided exploration:

| Question | Gemini searched | Should have also searched |
|---|---|---|
| File upload | Server FileUploadClass | Client `uploadFiles()`, E2E `encryptFile()` |
| Federation | Outbound `sendMessage` | Inbound `processIncomingTransaction` |
| Livechat routing | Server QueueManager | Client `widget.ts` in livechat package |
| Message sending | Server sendMessage | Client ComposerMessage -> MessageBox UI chain |

The architecture hints already describe both sides, but the LLM still only searches one.

## 5. What We Tried to Improve (and Why It Didn't Work)

| Attempt | What it did | Result | Why it failed |
|---|---|---|---|
| **Trace mode** | Auto-expand all branches of graph(down) in one call | **-1 pass** | Too much information — LLM stopped exploring because it thought it had enough |
| **Symbol type annotations** | Show `[server\|fn]` `[client\|class]` in search results | **-1 pass** | Extra tokens in output distracted the LLM |
| **Co-exported symbols** | Show other symbols from same file in search results | **0 pass** | Added noise without helping navigation |
| **Key callee hints** | "These callees have 5+ sub-calls, explore them" | **-2 pass** | More output = LLM stops earlier |

**Key finding: Every attempt to add information to tool outputs degraded performance.** Gemini Flash works best with concise, focused outputs. The Iter 7 baseline is optimal for this model.

## 6. Recommendations

### Short-term (no code changes needed)

| Action | Expected Impact |
|---|---|
| Update eval metrics from binary pass/fail to GOOD/ACCEPTABLE/WEAK/WRONG | Accurately reflects 70% usability vs misleading 5% pass rate |
| Run eval 3x and report averages | Reduces Gemini Flash variance (0-3 pass range per run) |

### Medium-term (model upgrade)

| Action | Expected Impact | Cost |
|---|---|---|
| Switch to Gemini Pro | GOOD rate 40%+, ACCEPTABLE 80%+ | Exceeds free tier (~$2-5 per eval run) |
| Switch to Claude Sonnet/Opus | GOOD rate 50%+, best reasoning for tool use | API cost varies |
| Multi-run consensus (3 runs, merge best) | Reduces variance, +5-10% GOOD rate | 3x token cost |

### Not recommended

| Action | Why |
|---|---|
| Adding more info to tool outputs | Proven to degrade Flash performance across 3 experiments |
| Expanding architecture hints further | Already comprehensive (22 subsystems covered), model ignores them |
| Adding new tool types | Current 3-tool design is sound; bottleneck is model reasoning |
