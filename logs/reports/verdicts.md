# agents — semantic verdicts (manual, judged by Claude)

**Judged: 2026-07-03** · against the `gen:mcp` run using the **DeepWiki-integrated config**: no hand-authored subsystem map — the agent has `plan`(intent only) + `search`/`graph`/`details` + **`wiki`** (DeepWiki MCP `ask_question`, grounded: cited paths verified against THIS codebase's index). This is the honest, eval-blind config (DeepWiki never saw the eval questions). Re-judge whenever answers regenerate. Quantitative counterpart: `logs/reports/metrics.md`.

> **What this is.** The semantic ground truth: did the agent get the MECHANISM right, regardless of
> which files it cited? Judged by Claude reading each answer in `logs/answers-gemini-mcp-selfloop/`
> against the core spine (`testcases.json` → `groundTruthPath` / `core`), one verdict + one-sentence
> reason per question.
>
> **Frozen criteria (do not tune per run):**
> - **PASS** — the answer names the actual mechanism (entry point, dispatch boundary, key steps)
>   and cites real files for the load-bearing parts. Different-but-correct files still PASS.
> - **PARTIAL** — mechanism partly right: correct subsystem and some real steps, but a load-bearing
>   link is missing or wrong.
> - **FAIL** — wrong mechanism, hallucinated paths, empty/ERROR answer.
>
> **`mode` column (non-PASS only):** `no-pivot` / `wrong-subsystem` / `renamed-wrapper` /
> `dropped-synth` / `gave-up` / `wiki-gap` (DeepWiki has no page for this topic).
>
> **Refresh discipline: re-judge EVERY row whenever answers regenerate.** Single free-tier run.

| id | verdict | mode | reason |
|---|---|---|---|
| tour-04-msg-client | PASS | — | ComposerMessage→onSend→`chat.flows.sendMessage`→flows/sendMessage.ts; client composer chain named. |
| new-19-message-rendering | PASS | — | `parse`@message-parser + `Markup`@gazzodown; correct two-step pipeline (wiki fixed the pre-wiki MarkdownText miss). |
| claude-01-push-notifications | PARTIAL | no-pivot | Names PushNotification + token registration/config, but misses the afterSaveMessage→sendAllNotifications trigger + native apn/fcm. |
| new-09-realtime-streamer | PARTIAL | no-pivot | Send→persist→DDP-broadcast shape right, but misses the notifyOnMessageChange→streamRoomMessage spine. |
| tour-05-msg-server | PARTIAL | renamed-wrapper | functions/sendMessage + insertMessage named; misses the executeSendMessage wrapper + canSendMessageAsync gate. |
| claude-05-call-chain | PARTIAL | renamed-wrapper | method→function sendMessage + validateMessage + Apps hooks; misses executeSendMessage/canSendMessage/afterSaveMessage full spine. |
| new-24-autotranslate | PASS | — | translateMessage + pluggable providers; mechanism matches. |
| new-15-impact-aftersave | PASS | — | afterSaveMessage + accurate blast radius (updateMessage/sendMessage/read-receipts/threads/…). |
| new-16-impact-streamer | PARTIAL | no-pivot | Streamer core + real deps, but blast radius skews to upload/api. |
| claude-08-federation | PASS | — | `FederationMatrix.sendMessage`→handleText/File + federationSDK + inbound; core named. |
| new-18-webhook | PASS | — | POST /hooks/:id/:token → `processWebhookMessage` + payload handling; mechanism named. |
| claude-07-api-endpoints | PASS | — | `API.v1.addRoute`/`APIClass` + typed `.get/.post`; correct registration mechanism. |
| new-25-search | PARTIAL | wrong-subsystem | `messageSearch`→Mongo (direct path) named, but misses the pluggable `SearchProviderService`/`DefaultProvider` architecture. |
| new-27-video-conference | PASS | — | `VideoConfService` (server) + `VideoConfManager` (client) + provider layer; core named. |
| tour-06-endpoint | PASS | — | createApi→`APIClass` `.get/.post`; correct how-to. |
| new-17-slash-commands | PASS | — | `slashCommands.add` + client `processSlashCommand`; both halves. |
| new-11-settings | PASS | — | `SettingsRegistry.add`→Settings model→change propagation→client access. |
| claude-03-file-upload | PASS | — | uploadFiles→rooms.media→`MultipartUploadHandler`→`FileUpload.validateFileUpload`; storage workflow. |
| new-10-apps-engine | PARTIAL | no-pivot | Names `IPostMessageSent`/`executePostMessageSent` hook mechanism, but the `AppListenerManager` dispatcher is unclear. |
| new-20-proxify | PASS | — | `proxify`→Proxy get-trap→`api.call`→broker; mechanism named. |
| tour-07-db-model-create | PASS | — | interface→`IBaseModel`→extend `BaseRaw`→`registerModel` (wiki fixed the pre-wiki zod miss). |
| tour-08-db-model-use | PASS | — | `BaseRaw`/`IBaseModel` + find/findOne query methods. |
| tour-11-new-package | FAIL | wiki-gap | "Unable to find a package-creation process" — DeepWiki has no page for this; agent gave up. |
| tour-10-new-service | PARTIAL | dropped-synth | ServiceClass pattern + registerServiceModels, but drops the proxify()/broker exposure half. |
| new-21-impact-settings | PARTIAL | no-pivot | CachedSettings + cors/metrics dependents; blast radius stays narrow. |
| new-22-2fa | PASS | — | `checkCodeForUser` + TOTP + `EmailCheck`; both methods named. |
| claude-04-e2e-encryption | PASS | — | `E2E.persistKeys`@rocketchat.e2e.ts + `Keychain` + per-room symmetric keys; key management. |
| new-12-ldap-auth | PASS | — | `LDAPManager.login`→`LDAPConnection`→findUser→`syncUserForLogin`; full flow. |
| claude-02-msg-permissions | PASS | — | `validateRoomMessagePermissionsAsync`@canSendMessage.ts; correct validation location. |
| new-14-ee-license | PASS | — | License/`LicenseService` + `hasModule` gating + validation events. |
| new-13-room-creation | PASS | — | createChannel endpoint→method→(createRoom) with permission checks; core chain. |
| new-23-omnichannel | PASS | — | `OmnichannelQueue.execute`@queue.ts→checkQueue + `closeRoom`; queue + close (wiki fixed the pre-wiki give-up). |
| claude-06-livechat-routing | PASS | — | widget/REST → `QueueManager`/`RoutingManager` agent assignment; routing chain named. |
| new-26-team | PASS | — | `TeamService`@server/services/team/service.ts + create/Main-Room; core named. |

> **Summary: PASS 24 / PARTIAL 9 / FAIL 1** (conservative — several borderline PARTIALs could be PASS).
>
> **Context (2026-07-04):** this replaces the old hand-authored-map config (which scored 29/34 but was
> confounded — the map was written knowing the eval, and PASS answers were near-verbatim readbacks of
> its `flow` prose; honest floor with NO map was 11/34). The DeepWiki config is **eval-blind + grounded**:
> DeepWiki (public, precomputed) supplies architecture semantics, and every cited path is verified
> against this codebase's live index. 24/34 honestly re-earns ~13 of the map's +18 with no leakage.
>
> **Notable rescues (no-map floor FAIL → DeepWiki PASS):** new-19 (message-parser vs MarkdownText),
> tour-07 (BaseRaw vs zod), new-23 (OmnichannelQueue), new-27 (VideoConfService).
> **One regression:** tour-11 (DeepWiki has no package-creation page → gave up).
> **Coverage boundary:** where DeepWiki lacks a page (search, some deep chains), verdicts fall back
> toward the no-map floor — those need the agent's own graph navigation + grounding to fill.
