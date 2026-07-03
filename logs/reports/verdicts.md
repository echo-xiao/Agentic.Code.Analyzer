# agents — semantic verdicts (manual, judged by Claude)

**Judged: 2026-07-02** · against the `gen:mcp` run of that date (post architecture-layer change: hint+seedSymbols now delivered by `plan`, concept-matching routing). Re-judge whenever answers regenerate. The quantitative counterpart is `logs/reports/metrics.md`.

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
> `sloppy-source` (agent fault) · `engine-unrankable` (engine fault).
>
> **Refresh discipline: re-judge EVERY row whenever answers regenerate (`npm run gen:mcp`).**
> Single-run PASS counts on the free Gemini tier are noisy even at temperature 0 — treat trends.

| id | verdict | mode | reason |
|---|---|---|---|
| tour-04-msg-client | PASS | — | ▲ Now names the client send chain: `ComposerMessage`→`onSend`→`chat.flows.sendMessage`→`sdk.call('sendMessage')` DDP (via ChatContext); fixes pre-edit engine-unrankable (only had flows/sendMessage). Lighter on RoomBody/ComposerContainer conditional, but the load-bearing path is right. |
| new-19-message-rendering | PASS | — | raw `message.msg`→message-parser `parse()`→AST→gazzodown `<Markup>` (switch on token type)→block components. Correct pipeline. |
| claude-01-push-notifications | PASS | — | afterSaveMessage→`sendAllNotifications`→`sendMessageNotifications`→`sendNotification` (desktop/mobile/email); correct pipeline. |
| new-09-realtime-streamer | PASS | — | ▲ RIGHT branch now: `notifyOnMessageChange`→`api.broadcast('watch.messages')`→ListenersModule→`streamRoomMessage`; fixes pre-edit watch.rooms wrong-branch. Still hedges on the client `Streamer.receive()` half. |
| tour-05-msg-server | PARTIAL | no-pivot | Now includes `validateMessage`+`prepareMessageObject` (were missing), but still enters at function `sendMessage` and misses the `executeSendMessage` wrapper + `canSendMessageAsync` permission gate (renamed-wrapper/guard blind spot). |
| claude-05-call-chain | PARTIAL | sloppy-source | ▲ Client entry now correct (`client/lib/chats/flows/sendMessage`, not a test helper) + DDP; still omits `executeSendMessage` + `canSendMessageAsync` on the server half (renamed-wrapper blind spot). |
| new-24-autotranslate | PASS | — | `TranslationProviderRegistry.registerCallbacks` afterSaveMessage→`provider.translateMessage` (Google/MS/DeepL); mechanism matches. |
| new-15-impact-aftersave | PASS | — | afterSaveMessage callback + triggers (updateMessage/sendMessage) + broad accurate blast radius (notifications, search, slackbridge, threads, federation, …). |
| new-16-impact-streamer | PARTIAL | no-pivot | Names Streamer + real core dependents (ddp-streamer, Notifications) but blast radius still skews to UI/upload — up-traversal ranking unchanged (engine untouched). |
| claude-08-federation | PASS | — | `FederationMatrix.sendMessage`→handleTextMessage→`federationSDK.sendMessage` (Matrix HTTP); outbound named (inbound processIncomingTransaction seed delivered). |
| new-18-webhook | PASS | — | `POST /hooks/:id/:token`→`executeIntegrationRest`→isolated-vm script→`processWebhookMessage`→sendMessage. Exact. |
| claude-07-api-endpoints | PASS | — | `createApi`→`APIClass.addRoute`/typed `.get/.post`; correct REST registration mechanism. |
| new-25-search | PASS | — | ▲ Now nails the pluggable provider architecture: `SearchProviderService` (hub — register/use/start)→`DefaultProvider.search` (Mongo text); fixes pre-edit engine-unrankable miss. |
| new-27-video-conference | PASS | — | ▲▲ Now names the core `VideoConfService` orchestrator (`server/services/video-conference/service.ts`) + client VideoConfManager + AppVideoConfProviderManager plugin layer; fixes pre-edit wrong-subsystem (had only the apps-engine plugin). |
| tour-06-endpoint | PASS | — | `createApi`→`APIClass` `.get/.post` with options+handler+APIActionContext; correct how-to. |
| new-17-slash-commands | PASS | — | server `slashCommands.add` + client `processSlashCommand`→`sdk.call('slashCommand')` DDP; both halves. |
| new-11-settings | PASS | — | `SettingsRegistry.add`→Settings model→CachedSettings→client API; full chain. |
| claude-03-file-upload | PASS | — | two-step REST: `MultipartUploadHandler`→`sendFileMessage`→`executeSendMessage` (attachment); names the storage workflow. |
| new-10-apps-engine | PASS | — | ▲ Now names the actual dispatcher `AppListenerManager` (`packages/apps-engine/.../AppListenerManager.ts`) hooking afterSaveMessage via callbacks; fixes pre-edit no-pivot (had AppsEngineService/Runtime). |
| new-20-proxify | PASS | — | `proxify(namespace)`→Proxy get trap→`api.call`→`LocalBroker.call` bound method; exact. |
| tour-07-db-model-create | PASS | — | ▲▲ Now the correct pattern: document interface→`IBaseModel` interface→extend `BaseRaw`→`registerModel`; fixes pre-edit wrong-subsystem (answered zod schema). |
| tour-08-db-model-use | PASS | — | ▲▲ Now correct: `import { Messages } from '@rocket.chat/models'` proxy→BaseRaw query methods (find/findVisibleByRoomId); fixes pre-edit gave-up. |
| tour-11-new-package | PASS | — | create `packages/<name>/` + package.json (@rocket.chat/name) + src/index.ts + workspace; correct manual steps. |
| tour-10-new-service | PARTIAL | dropped-synth | Correct base pattern (extend ServiceClassInternal + registerService + concrete example) but drops the `proxify()`/`LocalBroker` exposure half from the written answer. |
| new-21-impact-settings | PARTIAL | no-pivot | Finds CachedSettings but blast radius stays narrow/skewed (metrics/cors/loadAPI); misses the "read by ~every subsystem" framing — up-traversal ranking unchanged. |
| new-22-2fa | PASS | — | `twoFactorRequired` middleware→`checkCodeForUser`→TOTPCheck→EmailCheck→PasswordCheckFallback (ICodeCheck); full chain. |
| claude-04-e2e-encryption | PASS | — | `E2E.createAndLoadKeys` (RSA) + `Keychain` encrypts the private key + per-room group key; mechanism matches. |
| new-12-ldap-auth | PASS | — | `configureLDAP` registers `registerLoginHandler('ldap')`→`LDAPService.loginRequest`→`LDAPManager.login`→connect/search/authenticate; full chain. |
| claude-02-msg-permissions | PASS | — | `canSendMessageAsync`→`validateRoomMessagePermissionsAsync` (room/access/mute) + `validateMessage`; correct validation entry + delegation. |
| new-14-ee-license | PASS | — | `LicenseManager`/`LicenseImp` + `hasModule` gating + `onValidateLicense` events; correct. |
| new-13-room-creation | PASS | — | `createChannelMethod`→`createRoom`→prepareCreateRoomCallback→Apps pre-hooks→beforeCreateRoomCallback→`Rooms.createWithFullRoomData`; core chain. |
| new-23-omnichannel | PASS | — | queue (requestRoom→processNewInquiry→delegateInquiry→takeInquiry + OmnichannelQueue worker) + close; both halves. |
| claude-06-livechat-routing | PASS | — | client `handleTakeInquiry`→REST `API.v1.addRoute` (inquiries.ts)→server `takeInquiry`; routing chain named. |
| new-26-team | PASS | — | `TeamService` (extends ServiceClassInternal) + Team/TeamMember models; matches. |

> Re-judged 2026-07-02 against the post-architecture-change `gen:mcp` run.
> **Summary: PASS 29 / PARTIAL 5 / FAIL 0** — was **22 / 9 / 3** pre-change. **+7 rows flipped up, 0 down:**
> - PARTIAL→PASS: **tour-04** (client composer chain), **new-09** (right watch.messages branch), **new-25**
>   (SearchProviderService architecture), **new-10** (AppListenerManager dispatcher).
> - FAIL→PASS: **new-27** (VideoConfService core), **tour-07** (BaseRaw model pattern), **tour-08** (@rocket.chat/models proxy).
>
> **All 7 flips are the concept-shaped questions the architecture routing targeted** — the agent now
> searches the right symbol from `plan`'s seedSymbols (e.g. tour-07 searched `IBaseModel` instead of "schema").
> The **5 remaining PARTIALs are exactly the un-addressed buckets**, all engine/synthesis (this change was
> plan-only): renamed-wrapper/guard `executeSendMessage`+`canSendMessageAsync` (tour-05, claude-05 — needs the
> B2 edge fix), up-traversal blast-radius ranking (new-16, new-21 — needs B3), dropped-synth (tour-10).
>
> **Honest caveats:** (1) single free-tier run — but the flips are all on targeted questions, not random, so
> consistent with the mechanism, not noise. (2) **Concept-authoring confound:** the `concepts` were hand-written
> knowing the eval, so routing accuracy is partly authored (the delivered symbols are code-grounded / agent-verified;
> the answer improvements are real given correct routing). To claim deployable: automate concept-gen + held-out
> questions + multi-run trend. (3) Mechanical corroboration: `eval:tools` gate unchanged at **19/34** (engine
> untouched) and `metrics.md` §1 MCP coverage **45%→49% (+4pt)**. (4) Token cost went **23k→27k** — the flow-prose
> delivery cost more tokens; "accuracy up" realized, "token down" did NOT.
