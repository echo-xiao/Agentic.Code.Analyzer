# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

6/29/2026, 6:55:42 PM | 34 testcases | verdicts filled manually by Claude (no ANTHROPIC_API_KEY)

**Hard** = % of files Claude cites that Gemini also mentions. **Semantic** (verdict) = Claude's per-pair judgment.

**Hard: Gemini covers 19% of Claude's cited files (avg).**

## Semantic summary (vs baseline)

| | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|
| baseline | 21 | 9 | **4** |
| **this run** | 20 | 13 | **1** |

- **All 4 baseline FAILs → PARTIAL** (the cut-targeted weak spots: claude-08 federation, new-10 apps-engine, new-16 impact-streamer, new-21 impact-settings). new-27 PARTIAL→PASS; new-15 improved within PARTIAL (notifications now in the blast radius).
- The **2 PASS→lower** drops (new-19 wrong pipeline, tour-11 empty answer) are on **cut-untouched** questions = single-run Gemini variance, not regressions.
- Excluding those 2 variance drops: **PASS 22 / PARTIAL 12 / FAIL 0**.
- Accuracy fixes (the 4 cuts) landed; answer *thickness* on federation/apps-engine is still limited (the token/loop workstream, not yet done).

| # | id | type | hard (Claude files) | verdict | reason (Gemini vs Claude) |
|---|---|---|---:|---|---|
| 1 | tour-04-msg-client | architecture | 1/7 (14%) | PARTIAL (0.45) | Only flows/sendMessage→process→DDP; misses the RoomBody→Composer→MessageBox→ChatAPI UI chain Claude details |
| 2 | new-19-message-rendering | architecture | 0/10 (0%) | PARTIAL (0.40) ⬇ | Wrong pipeline: answered the UIKit surface renderer; Claude's is message-parser→gazzodown Markup (run variance, baseline was PASS 0.95) |
| 3 | claude-01-push-notifications | architecture | 2/8 (25%) | PASS (0.82) | Full queue→PushNotification.send→push.ts→gateway/APN/FCM chain; missed mobile.js + apn/fcm filenames |
| 4 | new-09-realtime-streamer | architecture | 1/5 (20%) | PARTIAL (0.45) | Reaches notifyListener→LocalBroker.broadcast then stops; misses streamer/notifications/listeners modules |
| 5 | tour-05-msg-server | call-chain | 1/6 (17%) | PARTIAL (0.50) | Got functions/sendMessage internals; missed the method→executeSendMessage→canSendMessage layer above |
| 6 | claude-05-call-chain | call-chain | 3/9 (33%) | PARTIAL (0.55) ⬆ | This time picks the right spine (functions/sendMessage) but stays shallow downstream (canSend/afterSave/notifications) |
| 7 | new-24-autotranslate | locate | 2/8 (25%) | PASS (0.80) | Registry→translateMessage→provider._translateMessage model matches; didn't name googleTranslate.ts |
| 8 | new-15-impact-aftersave | impact | 1/8 (13%) | PARTIAL (0.70) ⬆ | Cut 4: now lists Notifications (+autotranslate/slack/apps) — the previously-missed biggest dependent — but only area names, no file-level detail |
| 9 | new-16-impact-streamer | impact | 2/5 (40%) | PARTIAL (0.45) ⬆ | Reaches server streamer.module + Presence(notifications), but still mixes in admin-workspace UI noise (baseline FAIL 0.30) |
| 10 | claude-08-federation | routing | 1/11 (9%) | PARTIAL (0.45) ⬆ | Cut 2: no longer gives up — gives FederationMatrix.sendMessage chain; still thin (misses transactions/events/parsers). Baseline FAIL 0.10 |
| 11 | new-18-webhook | routing | 2/8 (25%) | PASS (0.80) | executeIntegrationRest→isolated-vm script→processWebhookMessage, accurate |
| 12 | claude-07-api-endpoints | locate | 2/10 (20%) | PASS (0.85) | createApi→addRoute + auth/permissions/license middleware chain, close match |
| 13 | new-25-search | locate | 1/8 (13%) | PARTIAL (0.50) | Answered messageSearch query path; Claude describes the SearchProvider service architecture (different facet) |
| 14 | new-27-video-conference | locate | 1/11 (9%) | PASS (0.78) ⬆ | Cut 3: now reaches the core video-conference/service.ts + REST API + provider integration (baseline PARTIAL 0.50) |
| 15 | tour-06-endpoint | pattern | 1/9 (11%) | PASS (0.80) | addRoute/get pattern + middleware chain + handler example, correct |
| 16 | new-17-slash-commands | pattern | 1/6 (17%) | PASS (0.80) | register(add)→run two-phase + client detection via sdk.call, matches |
| 17 | new-11-settings | architecture | 1/7 (14%) | PASS (0.82) | SettingsRegistry.add→CachedSettings→public-settings/get |
| 18 | claude-03-file-upload | architecture | 1/9 (11%) | PASS (0.85) | uploadFiles→rooms.media (2-step)→FileUpload + pluggable stores + sendFileMessage |
| 19 | new-10-apps-engine | architecture | 2/9 (22%) | PARTIAL (0.50) ⬆ | Now names AppManager + orchestrator + callbacks.add registration mechanism; still misses AppListenerManager/executeListener. Baseline FAIL 0.30 |
| 20 | new-20-proxify | locate | 1/8 (13%) | PASS (0.85) | proxify→Proxy handler→api.call→LocalBroker→bound service method, precise |
| 21 | tour-07-db-model-create | pattern | 1/7 (14%) | PASS (0.80) | BaseRaw + registerModel + core-typings/model-typings layering |
| 22 | tour-08-db-model-use | pattern | 1/6 (17%) | PARTIAL (0.60) | Right find/findOne pattern but a different example (Users), not Claude's loadHistory |
| 23 | tour-11-new-package | pattern | 0/9 (0%) | FAIL (0.0) ⬇ | Gemini answer is empty (generation failure / run variance; baseline was PASS 0.90) |
| 24 | tour-10-new-service | pattern | 1/9 (11%) | PASS (0.85) | ServiceClassInternal pattern + registerServices + RoomService example |
| 25 | new-21-impact-settings | impact | 1/5 (20%) | PARTIAL (0.50) ⬆ | Cut 1: no longer quits after 2 calls — blast radius expands (middlewares→startRestAPI→main.ts); but mixes in Wizard/storybook noise. Baseline FAIL 0.35 |
| 26 | new-22-2fa | architecture | 2/8 (25%) | PASS (0.90) | twoFactorRequired→checkCodeForUser→getSecondFactorMethod→TOTP/Email/PasswordFallback, full chain |
| 27 | claude-04-e2e-encryption | architecture | 2/7 (29%) | PASS (0.85) | RSA/PBKDF2/AES-GCM/keychain/group-key model matches (one suspect file path for generateKeyPair) |
| 28 | new-12-ldap-auth | routing | 3/6 (50%) | PASS (0.88) | configure→LDAPService→LDAPManager→LDAPConnection chain, precise |
| 29 | claude-02-msg-permissions | locate | 4/7 (57%) | PASS (0.85) | Pinpoints validateRoomMessagePermissionsAsync + hasPermission/canAccessRoom helpers |
| 30 | new-14-ee-license | locate | 0/9 (0%) | PASS (0.80) | LicenseManager/hasModule/onValidateLicense gating (hard 0% but semantically correct) |
| 31 | new-13-room-creation | call-chain | 2/8 (25%) | PASS (0.80) | createChannel→createChannelMethod→createRoom + callback chain; missed explicit RoomService link |
| 32 | new-23-omnichannel | call-chain | 1/9 (11%) | PASS (0.80) | Both halves: queue-process (requestRoom→delegateInquiry) + closeRoom |
| 33 | claude-06-livechat-routing | routing | 0/11 (0%) | PARTIAL (0.60) | Server routing (QueueManager→RoutingManager→takeInquiry) matches; misses the client widget→api half |
| 34 | new-26-team | locate | 3/7 (43%) | PASS (0.85) | TeamService hub + creation lifecycle, thorough |
