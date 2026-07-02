# agents — semantic verdicts (manual, judged by Claude)

**Judged: 2026-07-01** · against the `gen:mcp` run of that date (786,582 tokens). Re-judge whenever answers regenerate — see the refresh discipline below. The quantitative counterpart is `logs/reports/metrics.md`.

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
> **`mode` column (agent failure mode; non-PASS only, PASS → `—`):**
> `misrouted` / `weak-query` / `no-pivot` / `gave-up` / `wrong-subsystem` / `dropped-synth` /
> `sloppy-source` (these = **agent fault**, fix prompt/plan/loop) · `engine-unrankable` (= **engine
> fault**, core never ranks in top-50 — fix ranking). `report.ts` §3 aggregates this into the
> agent-behavior diagnosis + agent/engine split.
>
> **Refresh discipline: re-judge EVERY row whenever answers regenerate (`npm run gen:mcp`).**
> Stale verdicts against new answers are worse than no verdicts. Single-run PASS counts on the free
> Gemini tier are noisy even at temperature 0 — treat trends, not single-run deltas, as signal.
>
> `report.ts` parses this table (rows joined by id).

| id | verdict | mode | reason |
|---|---|---|---|
| tour-04-msg-client | PARTIAL | engine-unrankable | Correct core client flow flows/sendMessage→process→`sdk.call('sendMessage')` DDP→server method; still misses the top of the chain (MessageBox.handleSendMessage→onSend, RoomBody→ComposerContainer render) — those top files never rank (R@10 recall-miss). |
| new-19-message-rendering | PASS | — | ▲ Now nails the core pipeline: raw `message.msg`→message-parser `parse()`→AST→gazzodown `<Markup>`→React components; fixes the pre-edit livechat-widget/legacy-markdown miss. |
| claude-01-push-notifications | PASS | — | Full pipeline: afterSaveMessage→sendNotificationsOnMessage→NotificationQueue (120s online delay)→PushNotification.send→PushClass gateway OR native APN/FCM; minor naming slip (PushNotification vs PushClass). |
| new-09-realtime-streamer | PARTIAL | no-pivot | Gets the api.broadcast concept + right files (notifyListener.ts / Api.ts) but still traces notifyOnRoomChangedById→`'watch.rooms'` instead of the message path (watch.messages→ListenersModule→streamRoomMessage), and misses the client-subscription half. |
| tour-05-msg-server | PARTIAL | no-pivot | Save pipeline correct (validate→Apps pre-hooks→beforeSave→insert/update→Apps post-hooks→afterSaveMessage→notifyListener) and now includes the DDP-method entry; still misses the executeSendMessage wrapper + canSendMessage permission gate. |
| claude-05-call-chain | PARTIAL | sloppy-source | Server spine now correct+complete (methods/sendMessage→functions/sendMessage→validate→beforeSave→insert→afterSaveMessage→notifyListener), fixing the pre-edit wrong-DDP+missing-afterSave; still cites a test helper as client entry (not client/lib/chats/flows/sendMessage) and omits executeSendMessage + canSendMessage. |
| new-24-autotranslate | PASS | — | afterSaveMessage callback→TranslationProviderRegistry→provider.translateMessage (base AutoTranslate class, Google/MS/DeepL)→`message.translations` storage; mechanism matches (lighter on tokenize/deTokenize). |
| new-15-impact-aftersave | PASS | — | Correct callback system (afterSaveMessage.ts) + triggers (sendMessage/updateMessage) + broad accurate blast radius (notifications, search, slackbridge, threads, federation, autotranslate, integrations, discussion, read-receipt, omnichannel, irc). |
| new-16-impact-streamer | PARTIAL | no-pivot | Identifies Streamer + real core dependents (ddp-streamer Streamer, Notifications, MinimalDDPClient/DDPDispatcher), but blast radius skews to admin-workspace UI / team modals / file-upload and under-states the "powers all realtime messaging & presence" framing. |
| claude-08-federation | PASS | — | Both directions right: outbound FederationMatrix.sendMessage→federationSDK→Matrix HTTP; inbound `PUT /_matrix/federation/v1/send/:txnId`→processIncomingTransaction→event dispatch→persist. |
| new-18-webhook | PASS | — | Exact chain: `POST /hooks/:id/:token`→executeIntegrationRest (isolated script)→processWebhookMessage (buildMessage + perms)→sendMessage→beforeSave/persist/afterSave/notify. |
| claude-07-api-endpoints | PASS | — | ▲ Now nails the core REST mechanism: createApi→ApiClass.addRoute/typed `.get/.post` + full Hono middleware chain (auth→permissions→license→handler)→APIActionContext; fixes the pre-edit apps-engine wrong-subsystem answer. |
| new-25-search | PARTIAL | engine-unrankable | Coherent query path (messageSearch→parseMessageSearchQuery→Messages.find with rm/hidden filters) but still misses the pluggable SearchProviderService/DefaultProvider provider architecture the question centres on (those files never surface — R@10 recall-miss, gather 0%). |
| new-27-video-conference | FAIL | wrong-subsystem | Still wrong subsystem: coherently describes the apps-engine IVideoConfProvider + AppVideoConfProviderManager plugin layer (no longer a give-up) but misses the core VideoConfService.create + provider-type routing that orchestrates conferences. |
| tour-06-endpoint | PASS | — | Correct how-to: createApi→`API.v1.addRoute`/`.get/.post` on ApiClass with options+handlers + concrete channels.ts example; terser than ref (skips middleware) but the pattern is right. |
| new-17-slash-commands | PASS | — | ▲ Now covers both halves of the core mechanism: server slashCommands.add()/run() (utils/server/slashCommand.ts) + client processSlashCommand→`sdk.call('slashCommand')` DDP, plus apps-engine ISlashCommandsExtend; fixes the pre-edit missing core + client path. |
| new-11-settings | PASS | — | Full chain: SettingsRegistry.add→CachedSettings (in-memory + watch/Emitter)→Settings Mongo model→client via public/private-settings/get; minor wrong path for the Settings model file. |
| claude-03-file-upload | PASS | — | Full two-step storage workflow: client uploadFiles→`POST rooms.media` (MultipartUploadHandler)→rooms.mediaConfirm→FileUploadClass + named backends (GridFS/S3/WebDAV/FS)→Uploads collection→sendFileMessage; now includes the mediaConfirm step + backends it missed pre-edit. |
| new-10-apps-engine | PARTIAL | no-pivot | Gets the callbacks.add/run hook mechanism + apps-engine bridge concept, but names AppsEngineService/AppsEngineRuntime instead of the actual AppListenerManager dispatcher and hedges heavily ("highly probable"/"likely"). |
| new-20-proxify | PASS | — | Exact: proxify(namespace)→Proxy `get` trap builds `namespace.prop`→api.call→LocalBroker.call→target service bound method. |
| tour-07-db-model-create | FAIL | wrong-subsystem | Regression: answered zod-schema definition (IBanner typing) + an "inferred" Mongo.Collection path; missed the actual model-creation pattern entirely (extend BaseRaw, `super(db, collection, trash)`, register via `@rocket.chat/models`). Wrong mechanism. |
| tour-08-db-model-use | FAIL | gave-up | Regression to a give-up: "unable to find" how models are queried; no `@rocket.chat/models` proxy usage, no loadHistory/findVisibleByRoomId example — effectively empty. |
| tour-11-new-package | PASS | — | Despite an "unable to find a tool" preamble, gives the correct manual steps: create `packages/<name>/` + package.json (@rocket.chat/name) + src/index.ts + tsconfig + workspace integration. |
| tour-10-new-service | PARTIAL | dropped-synth | Correct base pattern (extend ServiceClass + lifecycle created/started/stopped + onEvent/onSettingChanged) with real files (surfaced them), but drops the proxify()/LocalBroker exposure + service-registration half from the written answer and hedges ("full example not provided"). |
| new-21-impact-settings | PARTIAL | no-pivot | Finds CachedSettings but blast radius stays narrow/skewed (API metrics/cors middleware + Wizard storybook); misses the "read by virtually every subsystem" framing that is the point of the impact question. |
| new-22-2fa | PASS | — | Full chain: twoFactorRequired middleware→checkCodeForUser (prioritized methods)→TOTPCheck.verify→TOTP.verify (speakeasy + backup codes)→Email/Password fallback. |
| claude-04-e2e-encryption | PASS | — | RSA identity pair + PBKDF2-derived key encrypting the private key + per-room E2ERoom.createGroupKey AES session key encrypted per-participant via RSA + server stores only ciphertext; mechanism matches (minor AES-GCM vs CBC slip). |
| new-12-ldap-auth | PASS | — | Full chain: configureLDAP registers `registerLoginHandler('ldap')`→LDAP proxy→LDAPService.loginRequest→LDAPManager.login→LDAPConnection connect/search/authenticate + user sync + fallback. |
| claude-02-msg-permissions | PASS | — | Correctly pinpoints `canSendMessage.ts` canSendMessageAsync→validateRoomMessagePermissionsAsync (the right validation entry+delegation); much terser than before (drops hasPermissionAsync/canAccessRoomAsync/check-order detail) but file+mechanism correct. |
| new-14-ee-license | PASS | — | Full mechanism: LicenseManager/LicenseImp (licenseImp.ts) + hasModule (modules.ts) checking a `modules` Set populated by license validation + api-enterprise license middleware gating; now covers the LicenseManager/LicenseImp split it was light on pre-edit. |
| new-13-room-creation | PASS | — | createChannel (DDP method)→createChannelMethod (perms via hasPermissionAsync)→createRoom→Rooms.createWithFullRoomData→notifyOnRoomChanged + afterCreate* callbacks + IPostRoomCreate; core chain right, minor wrong hedge (createRoom "from livechatBridge.ts"). |
| new-23-omnichannel | PASS | — | Both halves correct: queue (requestRoom→processNewInquiry→delegateInquiry→takeInquiry→assignAgent + OmnichannelQueue.execute worker) AND closeRoom (Mongo txn: close + remove inquiry/subs)→afterRoomClosed; all key symbols right, weakness = admits it couldn't cite exact file paths. |
| claude-06-livechat-routing | PASS | — | ▲ Server routing chain fully correct: QueueManager.requestRoom→processNewInquiry→RoutingManager.delegateInquiry (READY/QUEUED)→strategy→takeInquiry→assignAgent + OmnichannelQueue worker; now also names the client entry (LivechatClientImpl) it missed pre-edit, though hedged (calls it websockets). |
| new-26-team | PASS | — | TeamService (extends ServiceClassInternal) hub + CRUD/membership/room methods + Team (ITeam) / TeamMember models + ITeamService interface; matches. |

> Re-judged 2026-07-01 against fresh `gen:mcp` answers (GENERATOR_VERSION unchanged, 786,582 total tokens).
> Summary: **PASS 22 / PARTIAL 9 / FAIL 3** — was 21 / 10 / 3 pre-run. Headline ~flat (+1P / −1p) but
> **8 / 34 rows flipped**: 4 up (claude-06, claude-07, new-17, new-19) · 4 down (tour-07, tour-08, tour-10,
> new-10). Consistent with the known free-tier noise: single-run PASS counts move within noise — only the
> churn pattern + multi-run trends are signal. The two db-model rows (tour-07/08) regressing to FAIL and
> claude-07/new-19 recovering to PASS are the movements worth watching across runs.
>
> **Failure-mode split (non-PASS = 12):** agent-fault 10 (no-pivot 5 · wrong-subsystem 2 · sloppy-source 1
> · dropped-synth 1 · gave-up 1) · engine-fault 2 (engine-unrankable: tour-04, new-25). i.e. most non-PASS
> is agent behavior (fixable via prompt/plan/loop), not the ranking engine.
