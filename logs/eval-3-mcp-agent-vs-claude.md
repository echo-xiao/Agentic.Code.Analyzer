# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

6/29/2026 | 34 testcases

## Takeaway

Gemini + MCP answers are mostly **correct but thinner than Claude's** (62% semantic PASS) — not wrong. Real weak spots: **impact analysis** (graph traversal hits the wrong/shallow symbols) and **occasional give-ups before the tool budget is spent** (federation, apps-engine, impact-settings). File overlap (the "hard" column) is low across the board because Claude cites far more files — so **hard% understates quality; the semantic verdict is the real signal** (e.g. claude-07 = 20% files matched but PASS).

**Semantic: PASS 21 / PARTIAL 9 / FAIL 4 (62%)**  |  **Hard: Gemini mentions 24% of Claude's cited files (avg)**

Column meanings:
- **Claude files matched (hard)** — of the files Claude's reference answer cites, how many Gemini's answer also mentions (deterministic string match; low is normal since Claude is verbose).
- **quality verdict (semantic)** — Claude judging whether Gemini's answer is as good as Claude's: PASS ≥0.8 / PARTIAL 0.4–0.79 / FAIL <0.4.

> Re-running `npm run eval:3` regenerates the hard column and resets the verdict to _TBD_ (no key → Claude refills it; or set ANTHROPIC_API_KEY for an automatic judge).

| # | id | type | Claude files matched (hard) | quality verdict (semantic) | why (Gemini vs Claude) |
|---|---|---|---:|---|---|
| 1 | tour-04-msg-client | architecture | 1/7 (14%) | PARTIAL (0.40) | Claude gives the full UI chain (RoomBody→Composer→MessageBox→ChatAPI→flow); Gemini only reaches flows/sendMessage + DDP |
| 2 | new-19-message-rendering | architecture | 2/10 (20%) | PASS (0.95) | same parse→Markup pipeline as Claude; thinner on inline/emoji detail but core correct |
| 3 | claude-01-push-notifications | architecture | 2/8 (25%) | PASS (0.80) | matches Claude queue→PushClass→gateway/native; missed mobile.js eligibility + apn/fcm file names |
| 4 | new-09-realtime-streamer | architecture | 1/5 (20%) | PARTIAL (0.40) | collapsed to api.broadcast('watch.rooms'); missed the streamer modules Claude details |
| 5 | tour-05-msg-server | call-chain | 1/6 (17%) | PARTIAL (0.50) | got function internals; missed the method→executeSendMessage layer + invented a few paths |
| 6 | claude-05-call-chain | call-chain | 3/9 (33%) | PARTIAL (0.45) | chose the livechat method as the spine; Claude's spine is method/REST→executeSendMessage→canSendMessage |
| 7 | new-24-autotranslate | locate | 2/8 (25%) | PASS (0.80) | matches Claude Registry/AutoTranslate/provider model; didn't name googleTranslate.ts |
| 8 | new-15-impact-aftersave | impact | 0/8 (0%) | PARTIAL (0.50) | named only slack/search consumers; missed notifications, the biggest dependent |
| 9 | new-16-impact-streamer | impact | 1/5 (20%) | FAIL (0.30) | traced the wrong Streamer (admin deploy UI); Claude radius is notifications/listeners modules |
| 10 | claude-08-federation | routing | 0/11 (0%) | FAIL (0.10) | gave up; Claude covers FederationMatrix/transactions/events, Gemini reached none |
| 11 | new-18-webhook | routing | 2/8 (25%) | PASS (0.78) | matches Claude executeIntegrationRest→processWebhookMessage; missed triggerHandler hop |
| 12 | claude-07-api-endpoints | locate | 2/10 (20%) | PASS (0.85) | matches Claude createApi/addRoute + middleware chain closely |
| 13 | new-25-search | locate | 1/8 (13%) | PARTIAL (0.50) | answered the messageSearch query path; Claude describes the SearchProvider service architecture |
| 14 | new-27-video-conference | locate | 0/11 (0%) | PARTIAL (0.50) | listed periphery; missed the core video-conference/service.ts |
| 15 | tour-06-endpoint | pattern | 1/9 (11%) | PASS (0.82) | matches Claude addRoute pattern + working code example |
| 16 | new-17-slash-commands | pattern | 2/6 (33%) | PASS (0.82) | matches Claude register→run two-phase; missed flows/sendMessage integration |
| 17 | new-11-settings | architecture | 2/7 (29%) | PASS (0.85) | matches Claude Registry→Cached→public-settings/get |
| 18 | claude-03-file-upload | architecture | 1/9 (11%) | PASS (0.88) | matches Claude uploadFiles→rooms.media→FileUpload + pluggable stores |
| 19 | new-10-apps-engine | architecture | 0/9 (0%) | FAIL (0.30) | gave generic callbacks; missed AppManager/AppListenerManager/executeListener machinery |
| 20 | new-20-proxify | locate | 2/8 (25%) | PASS (0.85) | matches Claude proxify→LocalBroker→bound service method precisely |
| 21 | tour-07-db-model-create | pattern | 2/7 (29%) | PASS (0.80) | matches Claude BaseRaw + registerModel pattern (minor registerModel location slip) |
| 22 | tour-08-db-model-use | pattern | 0/6 (0%) | PARTIAL (0.55) | right find/findOne pattern but a different example (smarsh), not Claude's loadHistory |
| 23 | tour-11-new-package | pattern | 4/9 (44%) | PASS (0.90) | complete package-creation steps, matches Claude |
| 24 | tour-10-new-service | pattern | 2/9 (22%) | PASS (0.88) | matches Claude ServiceClassInternal pattern + example |
| 25 | new-21-impact-settings | impact | 1/5 (20%) | FAIL (0.35) | quit after 2 calls; shallow/off blast radius vs Claude's far broader one |
| 26 | new-22-2fa | architecture | 5/8 (63%) | PASS (0.92) | matches Claude twoFactorRequired→checkCodeForUser→TOTP/Email chain |
| 27 | claude-04-e2e-encryption | architecture | 6/7 (86%) | PASS (0.90) | matches Claude key-management model (e2e/keychain/rsa/aes) |
| 28 | new-12-ldap-auth | routing | 4/6 (67%) | PASS (0.92) | matches Claude configure→Service→Manager→Connection chain exactly |
| 29 | claude-02-msg-permissions | locate | 3/7 (43%) | PASS (0.85) | matches Claude; pinpoints validateRoomMessagePermissionsAsync |
| 30 | new-14-ee-license | locate | 0/9 (0%) | PASS (0.80) | matches Claude LicenseManager/hasModule/onValidateLicense gating |
| 31 | new-13-room-creation | call-chain | 2/8 (25%) | PASS (0.80) | matches Claude createChannel→createRoom flow; missed RoomService link |
| 32 | new-23-omnichannel | call-chain | 2/9 (22%) | PASS (0.82) | matches Claude queue-process + closeRoom, both halves |
| 33 | claude-06-livechat-routing | routing | 2/11 (18%) | PARTIAL (0.60) | server routing matches Claude; missed the client widget→api→endpoint half |
| 34 | new-26-team | locate | 3/7 (43%) | PASS (0.88) | matches Claude TeamService hub + creation lifecycle |
