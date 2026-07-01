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
| tour-04-msg-client | PARTIAL | Correct send flow MessageBox.handleSendMessage→onSend→flows/sendMessage→process→DDP `sdk.call('sendMessage')`; missed the top component chain (RoomBody→ComposerContainer render). |
| new-19-message-rendering | FAIL | Answered the wrong path — livechat widget `Mrkdwn`/`MarkdownBlock` + legacy `app/markdown/markdown.js`; missed the core `message-parser` (parse→AST) → `gazzodown` `Markup` pipeline entirely. |
| claude-01-push-notifications | PASS | Full pipeline right: afterSaveMessage→sendNotificationsOnMessage→NotificationQueue (120s online delay)→push routing→cloud gateway OR native APN/FCM. Minor slip (`PushNotification` vs `PushClass`/push.ts). |
| new-09-realtime-streamer | PARTIAL | Right concept (post-write api.broadcast→streamer→client), but traced `notifyOnRoomChangedById`/`watch.rooms` instead of `notifyOnMessageChange`/`watch.messages`→ListenersModule→streamRoomMessage; hedged on the client subscription. |
| tour-05-msg-server | PARTIAL | Got the save pipeline (validate→beforeSave→insert→afterSave) + Apps pre/post hooks; missed the Meteor-method/DDP entry, `executeSendMessage`, and the `canSendMessage` permission gate. |
| claude-05-call-chain | PARTIAL | Client→DDP→server spine roughly right, but DDP path is wrong (`LivechatClientImpl`/`RocketchatSDKLegacy`, not the main `sdk.call`); server side is a noisy callee list missing `executeSendMessage`/`canSendMessageAsync`/`afterSaveMessage`. |
| new-24-autotranslate | PASS | Registry + afterSaveMessage hook + `AutoTranslate.translateMessage` + tokenize/deTokenize + concrete Google/MS/DeepL providers + `message.translations` storage — mechanism matches. |
| new-15-impact-aftersave | PASS | Correct callback mechanism + broad, accurate blast radius (notifications, search, slackbridge, threads, federation, autotranslate, integrations, discussion) — notably fuller than the pre-edge run. |
| new-16-impact-streamer | PARTIAL | Identified Streamer + some real dependents (Notifications, Presence, presence-service), but blast radius skewed toward admin-workspace UI / file-upload and under-stated the central "powers all realtime messaging/presence" framing. |
| claude-08-federation | PASS | Correct both directions: outbound FederationMatrix.sendMessage→federationSDK→Matrix HTTP; inbound processIncomingTransaction→event dispatch→persist. Missed the trigger hooks + message.parsers, but the send/receive mechanism matches. |
| new-18-webhook | PASS | Exact chain: POST /hooks/:id/:token → executeIntegrationRest → IsolatedVM script engine → processWebhookMessage → sendMessage. |
| claude-07-api-endpoints | FAIL | Answered the apps-engine path (AppApiManager→ApiBridge→AppApisBridge→express.Router) — how APPS register APIs; missed the core REST mechanism `createApi`→`APIClass.addRoute`→`RocketChatAPIRouter` entirely (wrong subsystem). |
| new-25-search | PARTIAL | Coherent description of the query path (messageSearch method→parseMessageSearchQuery→Messages.find), but missed the pluggable `SearchProviderService`/`DefaultProvider` provider architecture the question centres on. |
| new-27-video-conference | FAIL | Agent gave up — "unable to determine"; returned apps-engine VideoConfProvider fragments, missed the core `VideoConfService.create` service + type routing entirely. |
| tour-06-endpoint | PASS | Correct how-to: `createApi`→`API.v1.addRoute()`/`.get/.post` on `ApiClass`, with options+handlers. Terser than the ref (skips middleware detail) but the pattern is right. |
| new-17-slash-commands | PARTIAL | Described the apps-engine registration (AppSlashCommandManager→CommandBridge); missed the core `slashCommands.add()`/`run()` mechanism + client path, and admits execution is untraced. |
| new-11-settings | PASS | Full chain: `SettingsRegistry.add`→`CachedSettings` (in-memory + watch)→`Settings` model (Mongo)→client via `public/private-settings/get`. Matches. |
| claude-03-file-upload | PASS | Storage workflow right: client→`POST rooms.media/:rid`→`FileUploadClass` validate/insert→UFS `store.write` backend abstraction. Missed the explicit mediaConfirm second step + named backends, but the storage mechanism matches. |
| new-10-apps-engine | PASS | Correctly named `AppManager`+`AppListenerManager` as the register/dispatch mechanism for app event listeners, hooked via `callbacks.run`. Light on the `AppInterface` declaration + execute-pattern detail, but the core listener mechanism is right (better than pre-edge). |
| new-20-proxify | PASS | Exact: `proxify(namespace)`→Proxy `get` trap builds `namespace.prop`→`api.call`→`LocalBroker.call`. |
| tour-07-db-model-create | PASS | Got the core create pattern: extend `BaseRaw`, `super(db, collection, trash)`, CRUD, then register/proxy via index. Thinner on the explicit 3-layer typings (core-typings/model-typings) than the ref. |
| tour-08-db-model-use | PARTIAL | Right general usage (import proxied model from `@rocket.chat/models`, call query methods), but generic — missed the concrete `loadHistory`→`loadMessageHistory`→`findVisibleByRoomId...` example the ref centres on. |
| tour-11-new-package | PASS | Correct package-creation steps: `packages/<name>/` dir + `package.json` (@rocket.chat/name) + config + `src/index.ts`. Matches the how-to. |
| tour-10-new-service | PASS | Correct: extend `ServiceClassInternal`, typed interface, `proxify()`/`LocalBroker` broker access, create service file. Matches. |
| new-21-impact-settings | PARTIAL | Found CachedSettings but blast radius narrow/skewed (API middleware + Wizard storybook); missed the "read by virtually every subsystem" framing that is the point of the impact question. |
| new-22-2fa | PASS | Full chain: `twoFactorRequired`→`checkCodeForUser`→`getMethodByNameOrFirstActiveForUser`→`ICodeCheck.verify` (TOTP/Email)→`TOTP.verify`. Matches. |
| claude-04-e2e-encryption | PASS | RSA identity pair + PBKDF2 master key encrypting the private key + per-room `createGroupKey` encrypted per-participant via RSA + Keychain — mechanism matches (minor AES-GCM vs CBC slip). |
| new-12-ldap-auth | PASS | Full chain: `configureLDAP` registers `registerLoginHandler('ldap')`→`LDAP` proxy→`LDAPService.loginRequest`→`LDAPManager.login`→`LDAPConnection` connect/search/authenticate + user sync. Matches. |
| claude-02-msg-permissions | PASS | Correctly pinpointed `canSendMessage.ts` `validateRoomMessagePermissionsAsync` (via executeSendMessage→canSendMessageAsync) + `hasPermissionAsync` + `canAccessRoomAsync` + the check order. Matches. |
| new-14-ee-license | PASS | `LicenseManager.hasModule` against a `modules` Set populated by license validation (setLicense/validateLicense) — the feature-gating mechanism. Matches (light on the abstract/LicenseImp split). |
| new-13-room-creation | PASS | `createChannel`→`createChannelMethod` (validate + perms)→`createRoom` + subscriptions + before/after callbacks + Apps pre/post room-create hooks. Core chain right (minor wrong hedge on createRoom's file). |
| new-23-omnichannel | PASS | Both halves now: queue (`requestRoom`→`processNewInquiry`→`RoutingManager.delegateInquiry`→`takeInquiry`→`assignAgent` + `OmnichannelQueue.execute` worker) AND `closeRoom()` with MongoDB transaction. Better than pre-edge (which cut off before close). |
| claude-06-livechat-routing | PARTIAL | Server routing chain correct (livechat/room endpoint→`QueueManager.requestRoom`→`RoutingManager.delegateInquiry`→strategy); missed the client `widget`→`LivechatClientImpl`→REST entry half. |
| new-26-team | PASS | `TeamService` (extends ServiceClassInternal) hub + CRUD/membership/room methods + `Team`/`TeamMember` models. Matches. |

> Migrated from the pre-refactor semantic judgment (GENERATOR_VERSION 10 answers, judged 2026-07-01;
> answers unchanged since). Summary: PASS 21 / PARTIAL 10 / FAIL 3.
