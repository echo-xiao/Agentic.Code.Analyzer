# eval-3 — How good is the agent?  (Gemini + MCP vs Claude reference)

6/30/2026, 9:07:06 AM | 34 testcases

**Hard** = % of files Claude cites that Gemini also mentions. **Semantic** (verdict) = Claude's per-pair judgment.

**Hard: Gemini covers 26% of Claude's cited files (avg).**

**Semantic (Claude per-pair judgment, re-judged this run): PASS 17 / PARTIAL 17 / FAIL 0.**


> Semantic verdict column: filled by Claude (reads each Gemini vs Claude answer). With ANTHROPIC_API_KEY an API judge can fill it automatically.

| # | id | type | hard (Claude files) | missed Claude files | verdict | reason (Gemini vs Claude) |
|---|---|---|---:|---|---|---|
| 1 | tour-04-msg-client | architecture | 2/7 (29%) | RoomBody.tsx, ComposerContainer.tsx, ComposerMessage.tsx, ChatAPI.ts, processSlashCommand.ts | PARTIAL | Got MessageBox→ComposerMessage→flows/sendMessage middle chain; missed RoomBody/ComposerContainer top and wrongly terminated via LivechatClientImpl instead of sdk.call DDP |
| 2 | new-19-message-rendering | architecture | 1/10 (10%) | Markup.tsx, RoomMessageContent.tsx, ThreadMessageContent.tsx, definitions.ts, ParagraphBlock.tsx, HeadingBlock.tsx +3 | PASS | Correct pipeline message-parser parse → gazzodown Markup (recovered; baseline had wrong UIKit surface) |
| 3 | claude-01-push-notifications | architecture | 1/8 (13%) | sendMessage.ts, mobile.js, NotificationQueue.ts, push.ts, apn.ts, fcm.ts +1 | PASS | Full afterSaveMessage→sendAllNotifications→shouldNotifyMobile→NotificationQueue→PushNotification.send→gateway/APN/FCM |
| 4 | new-09-realtime-streamer | architecture | 0/5 (0%) | notifyListener.ts, listeners.module.ts, notifications.module.ts, streamer.module.ts, streamer.ts | PARTIAL | Right concept (post-write broadcast bus) but wrong path via insertMessage→LocalBroker; misses notifyOnMessageChange→watch.messages→ListenersModule→streamer |
| 5 | tour-05-msg-server | call-chain | 3/6 (50%) | canSendMessage.ts, ChatAPI.ts, ChatMessages.ts | PARTIAL | method→functions/sendMessage but vague; misses executeSendMessage→canSendMessage layer; mixes in video-conf/media-call noise |
| 6 | claude-05-call-chain | call-chain | 3/9 (33%) | chat.ts, afterSaveMessage.ts, canSendMessage.ts, sendNotificationsOnMessage.ts, notifyListener.ts, NotificationQueue.ts | PARTIAL | Solid spine client→method→function→validate→save→afterSave; misses executeSendMessage/canSendMessageAsync naming and REST entry path |
| 7 | new-24-autotranslate | locate | 1/8 (13%) | autotranslate.ts, msTranslate.ts, deeplTranslate.ts, index.ts, translateMessage.ts, getSupportedLanguages.ts +1 | PASS | Registry pattern + provider.translateMessage + GoogleAutoTranslate + afterSaveMessage hook, matches |
| 8 | new-15-impact-aftersave | impact | 5/8 (63%) | mentionUserNotInChannel.ts, notifyUsersOnMessage.ts, notifyListener.ts | PARTIAL | Good blast-radius caller list; frames as triggers not registered handlers; thin on notifications/realtime handler side |
| 9 | new-16-impact-streamer | impact | 1/5 (20%) | notifications.module.ts, listeners.module.ts, types.ts, Presence.ts | PARTIAL | Finds streamer.module but blast radius mostly wrong (admin-workspace UI noise); misses presence/notifications/all streams |
| 10 | claude-08-federation | routing | 1/11 (9%) | message.parsers.ts, transactions.ts, message.ts, reaction.ts, invite.ts, service.ts +4 | PARTIAL | Correct entry FederationMatrix.sendMessage + right EE package; thin downstream (misses parsers/transactions/federation-sdk) |
| 11 | new-18-webhook | routing | 2/8 (25%) | isolated-vm.ts, triggerHandler.ts, updateHistory.ts, outgoingEvents.ts, addOutgoingIntegration.ts, deleteOutgoingIntegration.ts | PASS | executeIntegrationRest→script engine→processWebhookMessage→sendMessage, accurate |
| 12 | claude-07-api-endpoints | locate | 0/10 (0%) | index.ts, api.ts, ApiClass.ts, authenticationHono.ts, permissions.ts, license.ts +4 | PARTIAL | Answered the apps-engine API bridge (registerApis/ApiBridge); missing core createApi→APIClass→addRoute mechanism |
| 13 | new-25-search | locate | 1/8 (13%) | SearchProviderService.ts, SearchProvider.ts, DefaultProvider.ts, ISearchResult.ts, Settings.ts, index.ts +1 | PARTIAL | Answered messageSearch query path; misses SearchProviderService/DefaultProvider provider architecture (different facet) |
| 14 | new-27-video-conference | locate | 1/11 (9%) | service.ts, videoConfProviders.ts, updateStatsCounter.ts, IVideoConfService.ts, VideoConference.ts, videoConfTypes.ts +4 | PARTIAL | Focused on apps-engine provider integration; misses core VideoConfService service.ts (regression vs baseline) |
| 15 | tour-06-endpoint | pattern | 1/9 (11%) | api.ts, chat.ts, index.ts, router.ts, authenticationHono.ts, permissions.ts +2 | PASS | Got APIClass + addRoute pattern (meandered via ExtractRoutesFromAPI type but core correct) |
| 16 | new-17-slash-commands | pattern | 4/6 (67%) | processSlashCommand.ts, sendMessage.ts | PASS | slashCommands.add registration + client detection via sdk.call + run execution, matches |
| 17 | new-11-settings | architecture | 2/7 (29%) | CachedSettings.ts, getSettingDefaults.ts, overrideSetting.ts, overwriteSetting.ts, validateSetting.ts | PASS | SettingsRegistry.add → CachedSettings → model → public-settings/get, full chain |
| 18 | claude-03-file-upload | architecture | 1/9 (11%) | uploadFiles.ts, rooms.ts, GridFS.ts, server.ts, Webdav.ts, service.ts +2 | PASS | Two-step rooms.media/mediaConfirm + FileUpload + pluggable backends; misses client uploadFiles entry |
| 19 | new-10-apps-engine | architecture | 0/9 (0%) | AppInterface.ts, AppManager.ts, AppListenerManager.ts, bridges.js, listeners.ts, orchestrator.js +3 | PARTIAL | Got callbacks.run/add system but apps-engine listener mechanism (AppListenerManager/executeListener/AppInterface) only inferred |
| 20 | new-20-proxify | locate | 1/8 (13%) | LocalBroker.ts, ServiceClass.ts, index.ts, service.ts, IBroker.ts, Events.ts +1 | PASS | proxify→Proxy get trap→api.call(namespace.prop), exact match |
| 21 | tour-07-db-model-create | pattern | 3/7 (43%) | Messages.ts, models.ts, IMessage.ts, IMessagesModel.ts | PASS | 3-layer typings→BaseRaw impl→registerModel, matches |
| 22 | tour-08-db-model-use | pattern | 2/6 (33%) | loadHistory.ts, loadMessageHistory.ts, normalizeMessagesForUser.ts, getHiddenSystemMessages.ts | PARTIAL | Right import+query pattern but generic Users example, not Claude loadHistory→loadMessageHistory specifics |
| 23 | tour-11-new-package | pattern | 4/9 (44%) | authentication.ts, package.js, tsconfig.js, package.js, authenticationHono.ts | PASS | Correct package-creation process (dir/package.json/tsconfig/src); recovered from baseline empty answer |
| 24 | tour-10-new-service | pattern | 1/9 (11%) | service.ts, startRocketChat.ts, index.ts, service.ts, IRoomService.ts, createRoom.ts +2 | PASS | ServiceClassInternal + api.registerService in registerServices, matches |
| 25 | new-21-impact-settings | impact | 1/5 (20%) | index.ts, SettingsRegistry.ts, index.ts, cached.ts | PARTIAL | Gives a blast radius but narrow + Wizard/storybook noise; misses widest-radius-across-every-subsystem framing |
| 26 | new-22-2fa | architecture | 3/8 (38%) | index.ts, ICodeCheck.ts, PasswordCheckFallback.ts, totp.ts, loginHandler.ts | PASS | twoFactorRequired→checkCodeForUser→getSecondFactorMethod→TOTP/Email verify, full chain |
| 27 | claude-04-e2e-encryption | architecture | 5/7 (71%) | keychain.ts, helper.ts | PASS | RSA/PBKDF2/AES/Keychain/group-key model matches (minor AES-GCM vs CBC for master key) |
| 28 | new-12-ldap-auth | routing | 2/6 (33%) | ldap.ts, service.ts, UserConverter.ts, Logger.ts | PARTIAL | Ran out of tool calls; right files (Connection/Manager/service) but hedged/incomplete, misses configureLDAP entry + service proxy chain |
| 29 | claude-02-msg-permissions | locate | 4/7 (57%) | sendMessage.ts, validateCustomMessageFields.ts, chat.ts | PASS | executeSendMessage→canSendMessageAsync→validateRoomMessagePermissionsAsync + hasPermission, pinpointed |
| 30 | new-14-ee-license | locate | 2/9 (22%) | licenseImp.ts, listeners.ts, emitter.ts, runValidation.ts, validateFormat.ts, token.ts +1 | PARTIAL | Right LicenseManager + license-set flow but answers setLicense more than the hasModule/feature-gating asked |
| 31 | new-13-room-creation | call-chain | 2/8 (25%) | service.ts, createDirectRoom.ts, beforeCreateRoomCallback.ts, beforeAddUserToRoom.ts, getValidRoomName.ts, notifyListener.ts | PASS | createChannel→createChannelMethod→createRoom + checks/callbacks; misses explicit RoomService link |
| 32 | new-23-omnichannel | call-chain | 1/9 (11%) | service.ts, closeRoom.ts, RoutingManager.ts, Helper.ts, inquiries.ts, settings.ts +2 | PARTIAL | Got queue processing (execute→checkQueue→processWaitingQueue→delegateInquiry); misses the closeRoom half the question asked |
| 33 | claude-06-livechat-routing | routing | 2/11 (18%) | widget.ts, api.ts, room.ts, RoutingManager.ts, AutoSelection.ts, ManualSelection.ts +3 | PARTIAL | Server routing chain (requestRoom→delegateInquiry→takeInquiry) correct; misses client widget→api half |
| 34 | new-26-team | locate | 3/7 (43%) | ITeamService.ts, ITeam.ts, addUserToRoom.ts, removeUserFromRoom.ts | PASS | TeamService.create hub + creation lifecycle, thorough |
