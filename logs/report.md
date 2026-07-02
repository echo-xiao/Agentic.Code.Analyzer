# Unified report — verdicts · token · funnel · attribution

7/1/2026, 11:59:59 PM | 34 testcases | joined from tools/token sidecars + answers + verdicts.md (deterministic)

## 1. Headline — semantic verdicts (manual, verdicts.md)

**PASS 22 / PARTIAL 9 / FAIL 3** (34/34 judged)

## 2. Token efficiency — is the graph worth its tokens? (token)

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14% | 12% | 45% |
| Avg tokens / question | 5,013 | ~23,135 | 23,135 |

## 3. Agent behavior diagnosis — agent-fault vs engine-fault

**22/34 PASS · of the 12 non-PASS: 10 agent-fault (fix prompt/plan/loop) · 2 engine-fault (fix ranking).**

| failure mode | fault | # | testcases | fix-lever |
|---|---|---:|---|---|
| no-pivot | agent | 5 | new-09-realtime-streamer, tour-05-msg-server, new-16-impact-streamer, new-10-apps-engine, new-21-impact-settings | graph expand/down/up depth+direction |
| engine-unrankable | engine | 2 | tour-04-msg-client, new-25-search | ENGINE: retrieval ranking (not agent) |
| wrong-subsystem | agent | 2 | new-27-video-conference, tour-07-db-model-create | plan strategy / architecture.json hint |
| sloppy-source | agent | 1 | claude-05-call-chain | gen prompt (cite real load-bearing files) |
| gave-up | agent | 1 | tour-08-db-model-use | gen prompt (don't stop early) |
| dropped-synth | agent | 1 | tour-10-new-service | gen prompt (write what you saw) |

## 4. The agent funnel — of the same 124 core files, how many the agent surfaces then writes

> Pooled per-file fractions from the ACTUAL multi-turn agent run (seen-log → written). This is the agent's real path — a single-query ranking probe (R@k) is NOT a stage the agent flows through; it lives in §5 (search tool-capability).

```
INDEX (floor)
  indexed & graph-reachable    100%  ██████████████████████████████ 
AGENT surfaced — seen across the multi-turn loop
  surfaced by agent loop        51%  ███████████████░░░░░░░░░░░░░░░ <- 49% never surfaced
AGENT written — synthesised into the answer
  written into the answer       40%  ████████████░░░░░░░░░░░░░░░░░░ <- synth 78% of surfaced, drops 14
```

**Two agent stages, sized** (all ÷ 124):
- **not surfaced: 49%** — 61 core files the agent never pulled into a tool result. The single-query probe (§5) splits this: ~45% never rank even in top-50 (**tool ceiling / engine**) vs ~4% rank but the loop skipped them (**agent**).
- **surfaced-but-not-written: 11%** — 14 files seen but not written (**agent / synthesis**).

> Floor: file 99% / sym 100% / graph 100% reachable. Seen-log under-counts retrieval on `*` rows → 51% surfaced is a lower bound.

## 5. Stage contribution — real, end-to-end (no isolation experiments)

> Real numbers from the ACTUAL multi-turn run — NOT isolated per-tool capability (that needs ablation/oracle, deliberately not run). search & graph aren't separable end-to-end, so they're one row.

**Do the tools help? Coverage no-MCP 14% → naive 12% → MCP 45%** — the agent's navigation adds **+31 pts over pure LLM, +33 over same-budget keyword dump.**

| stage | real metric (this run) | leak (real) | fix-lever |
|---|---|---|---|
| plan (route) | intent = question type in 21/34 | misroute cost unmeasured (needs oracle) | intent.ts / architecture.json |
| retrieval (search+graph) | surfaced 51% of core · R@50 ceiling 55% (probe) · chain-order 79% | 49% never surfaced | seeds / ranking / graph depth |
| synth (write) | wrote 78% of what it surfaced | dropped 14 files | gen prompt |
| details | fetch — negligible leak | — | — |

Where each non-PASS is blocked (semantic binding stage): graph 8 · search 2 · synth 2.

## 6. Detail — every testcase × every stage

Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. route ✓/✗ = plan intent vs question type. `*` on gather = seen-log under-counts. binding = first leaking stage (route→search→graph→synth).

| # | id | type | route | R@10·diag | gather | synth | end cov | mode | verdict | binding | reason |
|---|---|---|:-:|---|---:|---:|---:|---|---|---|---|
| 1 | tour-04-msg-client | arch | ✗ | 17% rm | 17% | 100% | 1/6 17% | engine-unrankable | PARTIAL | search | Correct core client flow flows/sendMessage→process→`sdk.call('sendMessage')` DDP→server method; still misses the top of the chain (MessageBox.handleSendMessage→onSend, RoomBody→ComposerContainer render) — those top files never rank (R@10 recall-miss). |
| 2 | new-19-message-rendering | arch | ✓ | 0% mx | 100% | 100% | 2/2 100% | — | PASS | ok | ▲ Now nails the core pipeline: raw `message.msg`→message-parser `parse()`→AST→gazzodown `<Markup>`→React components; fixes the pre-edit livechat-widget/legacy-markdown miss. |
| 3 | claude-01-push-notifications | arch | ✓ | 17% rm | 50% | 100% | 3/6 50% | — | PASS | ok | Full pipeline: afterSaveMessage→sendNotificationsOnMessage→NotificationQueue (120s online delay)→PushNotification.send→PushClass gateway OR native APN/FCM; minor naming slip (PushNotification vs PushClass). |
| 4 | new-09-realtime-streamer | arch | ✗ | 20% rm | 20% | 100% | 1/5 20% | no-pivot | PARTIAL | graph | Gets the api.broadcast concept + right files (notifyListener.ts / Api.ts) but still traces notifyOnRoomChangedById→`'watch.rooms'` instead of the message path (watch.messages→ListenersModule→streamRoomMessage), and misses the client-subscription half. |
| 5 | tour-05-msg-server | chain | ✓ | 20% mx | 60% | 100% | 3/5 60% | no-pivot | PARTIAL | graph | Save pipeline correct (validate→Apps pre-hooks→beforeSave→insert/update→Apps post-hooks→afterSaveMessage→notifyListener) and now includes the DDP-method entry; still misses the executeSendMessage wrapper + canSendMessage permission gate. |
| 6 | claude-05-call-chain | chain | ✓ | 38% mx | 88% | 57% | 4/8 50% | sloppy-source | PARTIAL | synth | Server spine now correct+complete (methods/sendMessage→functions/sendMessage→validate→beforeSave→insert→afterSaveMessage→notifyListener), fixing the pre-edit wrong-DDP+missing-afterSave; still cites a test helper as client entry (not client/lib/chats/flows/sendMessage) and omits executeSendMessage + canSendMessage. |
| 7 | new-24-autotranslate | loc | ✗ | 67% rm | 100% | 100% | 3/3 100% | — | PASS | ok | afterSaveMessage callback→TranslationProviderRegistry→provider.translateMessage (base AutoTranslate class, Google/MS/DeepL)→`message.translations` storage; mechanism matches (lighter on tokenize/deTokenize). |
| 8 | new-15-impact-aftersave | imp | ✓ | 33% rl | 100% | 100% | 3/3 100% | — | PASS | ok | Correct callback system (afterSaveMessage.ts) + triggers (sendMessage/updateMessage) + broad accurate blast radius (notifications, search, slackbridge, threads, federation, autotranslate, integrations, discussion, read-receipt, omnichannel, irc). |
| 9 | new-16-impact-streamer | imp | ✓ | 67% mx | 33% | 100% | 1/3 33% | no-pivot | PARTIAL | graph | Identifies Streamer + real core dependents (ddp-streamer Streamer, Notifications, MinimalDDPClient/DDPDispatcher), but blast radius skews to admin-workspace UI / team modals / file-upload and under-states the "powers all realtime messaging & presence" framing. |
| 10 | claude-08-federation | rout | ✗ | 50% rm | 50% | 100% | 2/4 50% | — | PASS | ok | Both directions right: outbound FederationMatrix.sendMessage→federationSDK→Matrix HTTP; inbound `PUT /_matrix/federation/v1/send/:txnId`→processIncomingTransaction→event dispatch→persist. |
| 11 | new-18-webhook | rout | ✗ | 33% rl | 67% | 100% | 2/3 67% | — | PASS | ok | Exact chain: `POST /hooks/:id/:token`→executeIntegrationRest (isolated script)→processWebhookMessage (buildMessage + perms)→sendMessage→beforeSave/persist/afterSave/notify. |
| 12 | claude-07-api-endpoints | loc | ✗ | 14% mx | 43% | 100% | 3/7 43% | — | PASS | ok | ▲ Now nails the core REST mechanism: createApi→ApiClass.addRoute/typed `.get/.post` + full Hono middleware chain (auth→permissions→license→handler)→APIActionContext; fixes the pre-edit apps-engine wrong-subsystem answer. |
| 13 | new-25-search | loc | ✗ | 33% rm | 0% | 100% | 0/3 0% | engine-unrankable | PARTIAL | search | Coherent query path (messageSearch→parseMessageSearchQuery→Messages.find with rm/hidden filters) but still misses the pluggable SearchProviderService/DefaultProvider provider architecture the question centres on (those files never surface — R@10 recall-miss, gather 0%). |
| 14 | new-27-video-conference | loc | ✗ | 100% ok | 100% | 0% | 0/1 0% | wrong-subsystem | FAIL | graph | Still wrong subsystem: coherently describes the apps-engine IVideoConfProvider + AppVideoConfProviderManager plugin layer (no longer a give-up) but misses the core VideoConfService.create + provider-type routing that orchestrates conferences. |
| 15 | tour-06-endpoint | patt | ✓ | 50% rm | 100% | 50% | 1/2 50% | — | PASS | ok | Correct how-to: createApi→`API.v1.addRoute`/`.get/.post` on ApiClass with options+handlers + concrete channels.ts example; terser than ref (skips middleware) but the pattern is right. |
| 16 | new-17-slash-commands | patt | ✗ | 25% rm | 75% | 100% | 3/4 75% | — | PASS | ok | ▲ Now covers both halves of the core mechanism: server slashCommands.add()/run() (utils/server/slashCommand.ts) + client processSlashCommand→`sdk.call('slashCommand')` DDP, plus apps-engine ISlashCommandsExtend; fixes the pre-edit missing core + client path. |
| 17 | new-11-settings | arch | ✓ | 33% mx | 67% | 100% | 2/3 67% | — | PASS | ok | Full chain: SettingsRegistry.add→CachedSettings (in-memory + watch/Emitter)→Settings Mongo model→client via public/private-settings/get; minor wrong path for the Settings model file. |
| 18 | claude-03-file-upload | arch | ✓ | 33% mx | 33% | 100% | 1/3 33% | — | PASS | ok | Full two-step storage workflow: client uploadFiles→`POST rooms.media` (MultipartUploadHandler)→rooms.mediaConfirm→FileUploadClass + named backends (GridFS/S3/WebDAV/FS)→Uploads collection→sendFileMessage; now includes the mediaConfirm step + backends it missed pre-edit. |
| 19 | new-10-apps-engine | arch | ✓ | 60% mx | 0% | 100% | 0/5 0% | no-pivot | PARTIAL | graph | Gets the callbacks.add/run hook mechanism + apps-engine bridge concept, but names AppsEngineService/AppsEngineRuntime instead of the actual AppListenerManager dispatcher and hedges heavily ("highly probable"/"likely"). |
| 20 | new-20-proxify | loc | ✗ | 33% rm | 33% | 100% | 1/3 33% | — | PASS | ok | Exact: proxify(namespace)→Proxy `get` trap builds `namespace.prop`→api.call→LocalBroker.call→target service bound method. |
| 21 | tour-07-db-model-create | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | wrong-subsystem | FAIL | graph | Regression: answered zod-schema definition (IBanner typing) + an "inferred" Mongo.Collection path; missed the actual model-creation pattern entirely (extend BaseRaw, `super(db, collection, trash)`, register via `@rocket.chat/models`). Wrong mechanism. |
| 22 | tour-08-db-model-use | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | gave-up | FAIL | graph | Regression to a give-up: "unable to find" how models are queried; no `@rocket.chat/models` proxy usage, no loadHistory/findVisibleByRoomId example — effectively empty. |
| 23 | tour-11-new-package | patt | ✓ | 100% ok | 100% | 0% | 0/1 0% | — | PASS | ok | Despite an "unable to find a tool" preamble, gives the correct manual steps: create `packages/<name>/` + package.json (@rocket.chat/name) + src/index.ts + tsconfig + workspace integration. |
| 24 | tour-10-new-service | patt | ✓ | 100% ok | 100% | 0% | 0/4 0% | dropped-synth | PARTIAL | synth | Correct base pattern (extend ServiceClass + lifecycle created/started/stopped + onEvent/onSettingChanged) with real files (surfaced them), but drops the proxify()/LocalBroker exposure + service-registration half from the written answer and hedges ("full example not provided"). |
| 25 | new-21-impact-settings | imp | ✓ | 67% rm | 33% | 100% | 1/3 33% | no-pivot | PARTIAL | graph | Finds CachedSettings but blast radius stays narrow/skewed (API metrics/cors middleware + Wizard storybook); misses the "read by virtually every subsystem" framing that is the point of the impact question. |
| 26 | new-22-2fa | arch | ✓ | 100% rl | 25% | 100% | 1/4 25% | — | PASS | ok | Full chain: twoFactorRequired middleware→checkCodeForUser (prioritized methods)→TOTPCheck.verify→TOTP.verify (speakeasy + backup codes)→Email/Password fallback. |
| 27 | claude-04-e2e-encryption | arch | ✓ | 60% mx | 40% | 100% | 2/5 40% | — | PASS | ok | RSA identity pair + PBKDF2-derived key encrypting the private key + per-room E2ERoom.createGroupKey AES session key encrypted per-participant via RSA + server stores only ciphertext; mechanism matches (minor AES-GCM vs CBC slip). |
| 28 | new-12-ldap-auth | rout | ✗ | 50% rm | 75% | 67% | 2/4 50% | — | PASS | ok | Full chain: configureLDAP registers `registerLoginHandler('ldap')`→LDAP proxy→LDAPService.loginRequest→LDAPManager.login→LDAPConnection connect/search/authenticate + user sync + fallback. |
| 29 | claude-02-msg-permissions | loc | ✓ | 25% rl | 100% | 50% | 2/4 50% | — | PASS | ok | Correctly pinpoints `canSendMessage.ts` canSendMessageAsync→validateRoomMessagePermissionsAsync (the right validation entry+delegation); much terser than before (drops hasPermissionAsync/canAccessRoomAsync/check-order detail) but file+mechanism correct. |
| 30 | new-14-ee-license | loc | ✗ | 67% rl | 67% | 100% | 2/3 67% | — | PASS | ok | Full mechanism: LicenseManager/LicenseImp (licenseImp.ts) + hasModule (modules.ts) checking a `modules` Set populated by license validation + api-enterprise license middleware gating; now covers the LicenseManager/LicenseImp split it was light on pre-edit. |
| 31 | new-13-room-creation | chain | ✓ | 67% mx | 67% | 50% | 1/3 33% | — | PASS | ok | createChannel (DDP method)→createChannelMethod (perms via hasPermissionAsync)→createRoom→Rooms.createWithFullRoomData→notifyOnRoomChanged + afterCreate* callbacks + IPostRoomCreate; core chain right, minor wrong hedge (createRoom "from livechatBridge.ts"). |
| 32 | new-23-omnichannel | chain | ✓ | 33% mx | 0% | 100% | 0/3 0% | — | PASS | ok | Both halves correct: queue (requestRoom→processNewInquiry→delegateInquiry→takeInquiry→assignAgent + OmnichannelQueue.execute worker) AND closeRoom (Mongo txn: close + remove inquiry/subs)→afterRoomClosed; all key symbols right, weakness = admits it couldn't cite exact file paths. |
| 33 | claude-06-livechat-routing | rout | ✓ | 0% rm | 17% | 100% | 1/6 17% | — | PASS | ok | ▲ Server routing chain fully correct: QueueManager.requestRoom→processNewInquiry→RoutingManager.delegateInquiry (READY/QUEUED)→strategy→takeInquiry→assignAgent + OmnichannelQueue worker; now also names the client entry (LivechatClientImpl) it missed pre-edit, though hedged (calls it websockets). |
| 34 | new-26-team | loc | ✗ | 100% ok | 100% | 100% | 1/1 100% | — | PASS | ok | TeamService (extends ServiceClassInternal) hub + CRUD/membership/room methods + Team (ITeam) / TeamMember models + ITeamService interface; matches. |

**Binding-tool distribution:** ok 22 · graph 8 · search 2 · synth 2.

### By question type

| type | n | avg R@10 | end cov | binding |
|---|---:|---:|---:|---|
| architecture | 9 | 38% | 39% | ok×6, graph×2, search |
| call-chain | 4 | 39% | 36% | ok×2, graph, synth |
| locate | 8 | 55% | 49% | ok×6, search, graph |
| pattern | 6 | 79% | 21% | ok×3, graph×2, synth |
| routing | 4 | 33% | 46% | ok×4 |
| impact | 3 | 56% | 56% | graph×2, ok |
