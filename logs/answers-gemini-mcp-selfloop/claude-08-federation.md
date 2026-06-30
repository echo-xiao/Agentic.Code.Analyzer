# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages are sent across different servers in Rocket.Chat through the following architecture:

**Outgoing Federation Message Flow:**

1.  **Entry Point:** The process begins with a call to `FederationMatrix.sendMessage()`. This symbol is likely defined within `packages/core-services/src/index.ts` or a related file in the `ee/packages/federation-matrix/` directory.
2.  **SDK Interaction:** `FederationMatrix.sendMessage()` then calls `federationSDK.sendMessage()`.
3.  **External Communication:** Finally, `federationSDK.sendMessage()` interacts with the remote server using the Matrix protocol HTTP API.

**Call Chain:**
`FederationMatrix.sendMessage()` (packages/core-services/src/index.ts or ee/packages/federation-matrix/) → `federationSDK.sendMessage()` → Matrix protocol HTTP API to remote server.

## Tool Calls (8 calls, 52,454 tokens)

**Step 1:** `search({"query":"federation message send","layer":"server"})` → 326 tokens
**Step 2:** `graph({"direction":"down","query":"findLatestFederationThreadMessageByTmid","layer":"server","file":"packa)` → 324 tokens
**Step 3:** `search({"query":"sendFederatedMessage","layer":"server"})` → 16 tokens
**Step 4:** `search({"layer":"server","query":"federation message"})` → 317 tokens
**Step 5:** `graph({"layer":"server","file":"apps/meteor/app/lib/server/methods/sendMessage.ts","query":"executeSendMes)` → 2942 tokens
**Step 6:** `search({"layer":"server","query":"federation dispatch"})` → 16 tokens
**Step 7:** `search({"layer":"server","query":"federation afterSave"})` → 16 tokens
**Step 8:** `search({"layer":"server","query":"federation"})` → 671 tokens

## Files Seen In Tool Results (41)

- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/ee/server/models/raw/LivechatUnit.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/lib/server/functions/deleteMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/mentions/server/Mentions.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/setPredictedVisitorAbandonmentTime.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-flextab-dm-member.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `apps/meteor/app/utils/server/lib/normalizeMessagesForUser.ts`
- `apps/meteor/server/ufs/ufs-store.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `apps/meteor/ee/server/api/federation.ts`
- `packages/apps-engine/src/server/managers/AppSignatureManager.ts`
- `packages/core-typings/src/federation/v1/FederationKey.ts`
- `packages/core-services/src/index.ts`
- `packages/models/src/index.ts`
- `apps/meteor/ee/server/startup/federation.ts`
- `apps/meteor/tests/e2e/federation/page-objects/channel.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-sidenav.ts`
- `apps/meteor/server/services/federation/utils.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `packages/apps-engine/src/server/bridges/IInternalFederationBridge.ts`
- `apps/meteor/tests/unit/server/services/room/hooks/FederationActions.tests.ts`
- `apps/meteor/server/settings/federation.ts`
- `apps/meteor/server/settings/federation-service.ts`
- `apps/meteor/server/services/room/hooks/BeforeFederationActions.ts`
- `apps/meteor/server/services/messages/hooks/BeforeFederationActions.ts`
- `apps/meteor/server/services/federation/Settings.ts`
- `apps/meteor/server/services/federation/infrastructure/rocket-chat/adapters/Statistics.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/app/lib/server/methods/checkFederationConfiguration.ts`
- `apps/meteor/app/apps/server/bridges/internalFederation.ts`
