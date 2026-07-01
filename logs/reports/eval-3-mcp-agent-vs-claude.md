# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

6/30/2026, 11:48:42 PM | 34 testcases | deterministic (no key, frozen rubric)

**Hard: Gemini covers 31% of Claude's cited files (avg).**

**Synthesis split (core spine): retrieval-recall 57% (tools surfaced it) → synthesis-recall 82% (agent then wrote it).**

**Auto verdict (frozen rubric): PASS 10 / PARTIAL 14 / FAIL 10.**

> Frozen rubric — verdict is a pure function of measured signals (reproducible, no hand-judging).
> Gated on **core-spine coverage** (must-find files), not Claude's full citation list (Claude over-cites):
> - **FAIL** if the answer is empty/ERROR, **or** core coverage < 25% (the spine was missed).
> - **PASS** if core coverage ≥ 50% **and** both chain endpoints (entry + terminal symbol) appear.
> - **PARTIAL** otherwise.

**Manual verdict (Claude hand-judged, no API): 1/34 judged, 33 STALE (answer changed → re-judge). Agrees with auto rubric on 0/1.**
> Hand-written semantic reads in `logs/semantic-verdicts.json` — catch "right mechanism, different files" cases the file-overlap rubric can't see. Blank = not yet judged.

| # | id | type | core cov (gate) | hard (Claude files) | retr→synth (core) | auto verdict | manual verdict | manual reason |
|---|---|---|---:|---:|---|---|---|---|
| 1 | tour-04-msg-client | architecture | 2/6 (33%) | 2/7 (29%) | 33% → 100% | PARTIAL | PARTIAL ⚠️stale | Got MessageBox→ComposerMessage→flows/sendMessage middle; wrongly ends at LivechatClientImpl REST (should be sdk.call DDP), missed RoomBody/ComposerContainer top. |
| 2 | new-19-message-rendering | architecture | 0/2 (0%) | 0/10 (0%) | 50% → 0% | FAIL | FAIL ⚠️stale | Answered UIKit/Fuselage surface-renderer + markdown.js path; missed the core message-parser(parse→AST)→gazzodown Markup pipeline entirely. |
| 3 | claude-01-push-notifications | architecture | 4/6 (67%) | 4/8 (50%) | 83% → 80% | PARTIAL | FAIL ⚠️stale | No answer — Gemini errored (503 timeout). |
| 4 | new-09-realtime-streamer | architecture | 2/5 (40%) | 2/5 (40%) | 40% → 100% | PARTIAL | PARTIAL ⚠️stale | Right concept (post-write api.broadcast bus) but traced watch.rooms/notifyOnRoomChangedById; missed notifyOnMessageChange→ListenersModule→streamRoomMessage. |
| 5 | tour-05-msg-server | call-chain | 1/5 (20%) | 1/6 (17%) | 60% → 33% | FAIL | PARTIAL ⚠️stale | Save half right (validate→beforeSave→insert→afterSave); missed method/DDP entry, executeSendMessage, and the canSendMessage permission gate. |
| 6 | claude-05-call-chain | call-chain | 3/8 (38%) | 3/9 (33%) | 88% → 43% | PARTIAL | PARTIAL ⚠️stale | Good client→DDP→method→functions/sendMessage spine; server detail is a noisy callee list, missed executeSendMessage/canSendMessageAsync naming + REST entry. |
| 7 | new-24-autotranslate | locate | 3/3 (100%) | 4/8 (50%) | 100% → 100% | PASS | PASS ⚠️stale | Registry + afterSaveMessage hook + provider.translateMessage + Google/MS/DeepL providers — mechanism matches. |
| 8 | new-15-impact-aftersave | impact | 2/3 (67%) | 6/8 (75%) | 100% → 67% | PASS | PARTIAL ⚠️stale | Right mechanism (callbacks.run/add) but thin blast radius — only slackbridge+search; missed notifications/realtime/apps-engine consumers. |
| 9 | new-16-impact-streamer | impact | 1/3 (33%) | 2/5 (40%) | 33% → 100% | PARTIAL | FAIL ⚠️stale | Blast radius wrong — followed `instances` into admin-workspace UI; missed that Streamer powers all realtime messaging/presence/notifications. |
| 10 | claude-08-federation | routing | 2/4 (50%) | 3/11 (27%) | 50% → 100% | PARTIAL | PARTIAL ⚠️stale | Correct entry FederationMatrix.sendMessage→federationSDK→Matrix; thin/uncertain on files, missed parsers/transactions/inbound. |
| 11 | new-18-webhook | routing | 2/3 (67%) | 3/8 (38%) | 100% → 67% | PASS | PASS ⚠️stale | executeIntegrationRest→script engine→processWebhookMessage→sendMessage — accurate full chain. |
| 12 | claude-07-api-endpoints | locate | 0/7 (0%) | 0/10 (0%) | 0% → 100% | FAIL | PARTIAL ⚠️stale | Named ApiClass.addRoute but diluted with apps-engine ApiBridge; missed createApi→bootstrap→middleware core. |
| 13 | new-25-search | locate | 0/3 (0%) | 1/8 (13%) | 0% → 100% | FAIL | PARTIAL ⚠️stale | Answered the message-search query path (method→Messages.find); missed the SearchProviderService/DefaultProvider provider architecture asked. |
| 14 | new-27-video-conference | locate | 1/1 (100%) | 2/11 (18%) | 100% → 100% | PASS | FAIL ⚠️stale | No answer — Gemini errored (503 timeout). |
| 15 | tour-06-endpoint | pattern | 0/2 (0%) | 1/9 (11%) | 0% → 100% | FAIL | PASS ⚠️stale | API.v1.addRoute pattern with options/handlers + example — correct and practical for the how-to. |
| 16 | new-17-slash-commands | pattern | 0/4 (0%) | 0/6 (0%) | 0% → 100% | FAIL | PARTIAL ⚠️stale | Answered apps-engine AppSlashCommandManager registration; missed the core slashCommands.add/run mechanism + client path; execution vague. |
| 17 | new-11-settings | architecture | 2/3 (67%) | 2/7 (29%) | 67% → 100% | PASS | PASS ⚠️stale | SettingsRegistry.add→CachedSettings→Settings model→public/private-settings/get — full chain. |
| 18 | claude-03-file-upload | architecture | 1/3 (33%) | 2/9 (22%) | 33% → 100% | PARTIAL | PASS ⚠️stale | Two-step rooms.media/mediaConfirm + UFS storage backends; mentions uploadFiles entry — matches. |
| 19 | new-10-apps-engine | architecture | 1/5 (20%) | 1/9 (11%) | 20% → 100% | FAIL | PARTIAL ⚠️stale | Got callbacks.run(afterSaveMessage) trigger but missed the apps-engine listener mechanism (AppListenerManager/AppInterface/bridges); admits the gap. |
| 20 | new-20-proxify | locate | 2/3 (67%) | 2/8 (25%) | 67% → 100% | PARTIAL | PASS ⚠️stale | proxify→Proxy get trap→api.call(namespace.prop)→LocalBroker — exact. |
| 21 | tour-07-db-model-create | pattern | 0/2 (0%) | 2/7 (29%) | 100% → 0% | FAIL | PASS ⚠️stale | 3-layer typings→BaseRaw impl→registerModel — matches. |
| 22 | tour-08-db-model-use | pattern | 0/2 (0%) | 2/6 (33%) | 0% → 100% | FAIL | PARTIAL ⚠️stale | Right import + BaseRaw query pattern but generic; missed the loadHistory→loadMessageHistory→findVisibleByRoomId... specifics. |
| 23 | tour-11-new-package | pattern | 1/1 (100%) | 5/9 (56%) | 100% → 100% | PASS | PASS ⚠️stale | Correct package-creation steps (dir/package.json/tsconfig/src) incl. ee/packages — matches. |
| 24 | tour-10-new-service | pattern | 0/4 (0%) | 0/9 (0%) | 100% → 0% | FAIL | PASS ⚠️stale | ServiceClassInternal + Api.registerService→LocalBroker registration — matches (registerService facet). |
| 25 | new-21-impact-settings | impact | 1/3 (33%) | 1/5 (20%) | 33% → 100% | PARTIAL | PARTIAL ⚠️stale | Found CachedSettings but blast radius narrow/noisy (API middleware + Wizard storybook); missed widest-across-every-subsystem framing. |
| 26 | new-22-2fa | architecture | 3/4 (75%) | 4/8 (50%) | 100% → 75% | PASS | PASS ⚠️stale | twoFactorRequired→checkCodeForUser→getSecondFactorMethod→TOTP/Email — full chain. |
| 27 | claude-04-e2e-encryption | architecture | 5/5 (100%) | 6/7 (86%) | 60% → 100% | PARTIAL | PASS ⚠️stale | RSA + PBKDF2/AES + per-room createGroupKey + Keychain — matches; minor slip (AES-GCM vs CBC for master key). |
| 28 | new-12-ldap-auth | routing | 4/4 (100%) | 4/6 (67%) | 100% → 100% | PASS | PASS ⚠️stale | configureLDAP handler→LDAP service→LDAPManager.login→connection/search/auth + fallback — full chain. |
| 29 | claude-02-msg-permissions | locate | 2/4 (50%) | 3/7 (43%) | 50% → 100% | PARTIAL | PASS ⚠️stale | Pinpointed canSendMessage.ts validateRoomMessagePermissionsAsync + hasPermission + canAccessRoom — correct location. |
| 30 | new-14-ee-license | locate | 1/3 (33%) | 2/9 (22%) | 33% → 100% | PARTIAL | PASS ⚠️stale | LicenseManager.hasModule against modules Set, populated by license validation — the feature-gating mechanism. |
| 31 | new-13-room-creation | call-chain | 1/3 (33%) | 1/8 (13%) | 33% → 100% | PARTIAL | PASS ⚠️stale | createChannelMethod→createRoom + perms/federation/callbacks — core chain right (missed explicit RoomService link). |
| 32 | new-23-omnichannel | call-chain | 2/3 (67%) | 3/9 (33%) | 67% → 100% | PASS | **PARTIAL** (≠auto) | Queue processing right (requestRoom→delegateInquiry→take→assign + queue loop); answer cut off, missed the closeRoom half asked. |
| 33 | claude-06-livechat-routing | routing | 2/6 (33%) | 3/11 (27%) | 33% → 100% | PARTIAL | PARTIAL ⚠️stale | Server routing chain (requestRoom→delegateInquiry→takeInquiry→assign) correct; missed client widget→api→endpoint entry half. |
| 34 | new-26-team | locate | 1/1 (100%) | 3/7 (43%) | 100% → 100% | PASS | PASS ⚠️stale | TeamService hub + Team/TeamMember models + REST API — matches. |
