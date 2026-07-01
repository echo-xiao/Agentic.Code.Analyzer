# Semantic Judgment — Gemini+MCP vs Claude reference

Judge: Claude (in-conversation, reads each Gemini answer against the Claude reference).
Criterion: did Gemini get the **mechanism** right? — not file-for-file overlap. A valid
different-but-correct path still passes. Verdict ∈ {PASS, PARTIAL, FAIL} + one-line reason.

_Judged on the new-edges gen run (GENERATOR_VERSION 10)._

## Summary

**Semantic verdict: PASS 21 / PARTIAL 10 / FAIL 3** (n=34).

vs the deterministic file-overlap **auto verdict: PASS 10 / PARTIAL 14 / FAIL 10.**

The semantic judge passes **21 vs 10** — roughly **2× more** — confirming the file-overlap rubric
systematically under-rates: on ~11 cases the agent got the mechanism right but named different/fewer
files than the curated core spine, so the auto rubric scored it PARTIAL/FAIL. Measured capability is
much higher than the auto numbers suggest.

**The 3 real FAILs** (wrong subsystem or gave up, not just file mismatch):
- `new-19-message-rendering` — answered the livechat/legacy-markdown path, missed message-parser→gazzodown.
- `claude-07-api-endpoints` — answered the apps-engine ApiBridge path, missed core `createApi`→`addRoute`.
- `new-27-video-conference` — agent gave up ("unable to determine"), missed `VideoConfService`.

By type: architecture & call-chain skew PARTIAL (chains lose a top/tail segment); locate/pattern/routing
mostly PASS. No 503/empty answers in this run.

| # | id | type | verdict | reason |
|---|---|---|---|---|
| 1 | tour-04-msg-client | architecture | PARTIAL | Correct send flow MessageBox.handleSendMessage→onSend→flows/sendMessage→process→DDP `sdk.call('sendMessage')`; missed the top component chain (RoomBody→ComposerContainer render). |
| 2 | new-19-message-rendering | architecture | FAIL | Answered the wrong path — livechat widget `Mrkdwn`/`MarkdownBlock` + legacy `app/markdown/markdown.js`; missed the core `message-parser` (parse→AST) → `gazzodown` `Markup` pipeline entirely. |
| 3 | claude-01-push-notifications | architecture | PASS | Full pipeline right: afterSaveMessage→sendNotificationsOnMessage→NotificationQueue (120s online delay)→push routing→cloud gateway OR native APN/FCM. Minor slip (`PushNotification` vs `PushClass`/push.ts). |
| 4 | new-09-realtime-streamer | architecture | PARTIAL | Right concept (post-write api.broadcast→streamer→client), but traced `notifyOnRoomChangedById`/`watch.rooms` instead of `notifyOnMessageChange`/`watch.messages`→ListenersModule→streamRoomMessage; hedged on the client subscription. |
| 5 | tour-05-msg-server | call-chain | PARTIAL | Got the save pipeline (validate→beforeSave→insert→afterSave) + Apps pre/post hooks; missed the Meteor-method/DDP entry, `executeSendMessage`, and the `canSendMessage` permission gate. |
| 6 | claude-05-call-chain | call-chain | PARTIAL | Client→DDP→server spine roughly right, but DDP path is wrong (`LivechatClientImpl`/`RocketchatSDKLegacy`, not the main `sdk.call`); server side is a noisy callee list missing `executeSendMessage`/`canSendMessageAsync`/`afterSaveMessage`. |
| 7 | new-24-autotranslate | locate | PASS | Registry + afterSaveMessage hook + `AutoTranslate.translateMessage` + tokenize/deTokenize + concrete Google/MS/DeepL providers + `message.translations` storage — mechanism matches. |
| 8 | new-15-impact-aftersave | impact | PASS | Correct callback mechanism + broad, accurate blast radius (notifications, search, slackbridge, threads, federation, autotranslate, integrations, discussion) — notably fuller than the pre-edge run. |
| 9 | new-16-impact-streamer | impact | PARTIAL | Identified Streamer + some real dependents (Notifications, Presence, presence-service), but blast radius skewed toward admin-workspace UI / file-upload and under-stated the central "powers all realtime messaging/presence" framing. |
| 10 | claude-08-federation | routing | PASS | Correct both directions: outbound FederationMatrix.sendMessage→federationSDK→Matrix HTTP; inbound processIncomingTransaction→event dispatch→persist. Missed the trigger hooks + message.parsers, but the send/receive mechanism matches. |
| 11 | new-18-webhook | routing | PASS | Exact chain: POST /hooks/:id/:token → executeIntegrationRest → IsolatedVM script engine → processWebhookMessage → sendMessage. |
| 12 | claude-07-api-endpoints | locate | FAIL | Answered the apps-engine path (AppApiManager→ApiBridge→AppApisBridge→express.Router) — how APPS register APIs; missed the core REST mechanism `createApi`→`APIClass.addRoute`→`RocketChatAPIRouter` entirely (wrong subsystem). |
| 13 | new-25-search | locate | PARTIAL | Coherent description of the query path (messageSearch method→parseMessageSearchQuery→Messages.find), but missed the pluggable `SearchProviderService`/`DefaultProvider` provider architecture the question centres on. |
| 14 | new-27-video-conference | locate | FAIL | Agent gave up — "unable to determine"; returned apps-engine VideoConfProvider fragments, missed the core `VideoConfService.create` service + type routing entirely. |
| 15 | tour-06-endpoint | pattern | PASS | Correct how-to: `createApi`→`API.v1.addRoute()`/`.get/.post` on `ApiClass`, with options+handlers. Terser than the ref (skips middleware detail) but the pattern is right. |
| 16 | new-17-slash-commands | pattern | PARTIAL | Described the apps-engine registration (AppSlashCommandManager→CommandBridge); missed the core `slashCommands.add()`/`run()` mechanism + client path, and admits execution is untraced. |
| 17 | new-11-settings | architecture | PASS | Full chain: `SettingsRegistry.add`→`CachedSettings` (in-memory + watch)→`Settings` model (Mongo)→client via `public/private-settings/get`. Matches. |
| 18 | claude-03-file-upload | architecture | PASS | Storage workflow right: client→`POST rooms.media/:rid`→`FileUploadClass` validate/insert→UFS `store.write` backend abstraction. Missed the explicit mediaConfirm second step + named backends, but the storage mechanism matches. |
| 19 | new-10-apps-engine | architecture | PASS | Correctly named `AppManager`+`AppListenerManager` as the register/dispatch mechanism for app event listeners, hooked via `callbacks.run`. Light on the `AppInterface` declaration + execute-pattern detail, but the core listener mechanism is right (better than pre-edge). |
| 20 | new-20-proxify | locate | PASS | Exact: `proxify(namespace)`→Proxy `get` trap builds `namespace.prop`→`api.call`→`LocalBroker.call`. |
| 21 | tour-07-db-model-create | pattern | PASS | Got the core create pattern: extend `BaseRaw`, `super(db, collection, trash)`, CRUD, then register/proxy via index. Thinner on the explicit 3-layer typings (core-typings/model-typings) than the ref. |
| 22 | tour-08-db-model-use | pattern | PARTIAL | Right general usage (import proxied model from `@rocket.chat/models`, call query methods), but generic — missed the concrete `loadHistory`→`loadMessageHistory`→`findVisibleByRoomId...` example the ref centres on. |
| 23 | tour-11-new-package | pattern | PASS | Correct package-creation steps: `packages/<name>/` dir + `package.json` (@rocket.chat/name) + config + `src/index.ts`. Matches the how-to. |
| 24 | tour-10-new-service | pattern | PASS | Correct: extend `ServiceClassInternal`, typed interface, `proxify()`/`LocalBroker` broker access, create service file. Matches. |
| 25 | new-21-impact-settings | impact | PARTIAL | Found CachedSettings but blast radius narrow/skewed (API middleware + Wizard storybook); missed the "read by virtually every subsystem" framing that is the point of the impact question. |
| 26 | new-22-2fa | architecture | PASS | Full chain: `twoFactorRequired`→`checkCodeForUser`→`getMethodByNameOrFirstActiveForUser`→`ICodeCheck.verify` (TOTP/Email)→`TOTP.verify`. Matches. |
| 27 | claude-04-e2e-encryption | architecture | PASS | RSA identity pair + PBKDF2 master key encrypting the private key + per-room `createGroupKey` encrypted per-participant via RSA + Keychain — mechanism matches (minor AES-GCM vs CBC slip). |
| 28 | new-12-ldap-auth | routing | PASS | Full chain: `configureLDAP` registers `registerLoginHandler('ldap')`→`LDAP` proxy→`LDAPService.loginRequest`→`LDAPManager.login`→`LDAPConnection` connect/search/authenticate + user sync. Matches. |
| 29 | claude-02-msg-permissions | locate | PASS | Correctly pinpointed `canSendMessage.ts` `validateRoomMessagePermissionsAsync` (via executeSendMessage→canSendMessageAsync) + `hasPermissionAsync` + `canAccessRoomAsync` + the check order. Matches. |
| 30 | new-14-ee-license | locate | PASS | `LicenseManager.hasModule` against a `modules` Set populated by license validation (setLicense/validateLicense) — the feature-gating mechanism. Matches (light on the abstract/LicenseImp split). |
| 31 | new-13-room-creation | call-chain | PASS | `createChannel`→`createChannelMethod` (validate + perms)→`createRoom` + subscriptions + before/after callbacks + Apps pre/post room-create hooks. Core chain right (minor wrong hedge on createRoom's file). |
| 32 | new-23-omnichannel | call-chain | PASS | Both halves now: queue (`requestRoom`→`processNewInquiry`→`RoutingManager.delegateInquiry`→`takeInquiry`→`assignAgent` + `OmnichannelQueue.execute` worker) AND `closeRoom()` with MongoDB transaction. Better than pre-edge (which cut off before close). |
| 33 | claude-06-livechat-routing | routing | PARTIAL | Server routing chain correct (livechat/room endpoint→`QueueManager.requestRoom`→`RoutingManager.delegateInquiry`→strategy); missed the client `widget`→`LivechatClientImpl`→REST entry half. |
| 34 | new-26-team | locate | PASS | `TeamService` (extends ServiceClassInternal) hub + CRUD/membership/room methods + `Team`/`TeamMember` models. Matches. |
