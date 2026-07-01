# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following server-side call chain:

**Call Chain:**
`POST /hooks/:integrationId/:token` → `executeIntegrationRest()` → `getEngine()` → `scriptEngine.processIncomingRequest()` → `processWebhookMessage()` → `sendMessage()`

**Detailed Breakdown:**

1.  **Entry Point (`POST /hooks/:integrationId/:token`)**: An incoming webhook request is received at this REST API endpoint.
2.  **`executeIntegrationRest()`** (located in `apps/meteor/app/integrations/server/api/api.ts`):
    *   This function is the primary handler for incoming webhook requests.
    *   It authenticates the request using the provided `integrationId` and `token`.
    *   It retrieves the integration's configuration, including any custom script.
3.  **`getEngine()`** (located in `apps/meteor/app/integrations/server/api/api.ts`):
    *   Called by `executeIntegrationRest()`, this function obtains the appropriate script engine for the integration.
    *   For incoming webhooks with custom scripts, this typically returns an instance of `IsolatedVMScriptEngine`.
4.  **`scriptEngine.processIncomingRequest()`** (from `IsolatedVMScriptEngine` in `apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`):
    *   If the integration has a custom script, `executeIntegrationRest()` calls this method on the `scriptEngine`.
    *   The integration script is executed within an isolated-vm sandbox for security, processing the incoming webhook payload.
    *   The script can transform the payload before it's passed on for message creation.
5.  **`processWebhookMessage()`** (located in `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`):
    *   After the script execution (or directly if no script is present), `executeIntegrationRest()` calls `processWebhookMessage()`.
    *   This function takes the processed webhook payload and constructs a Rocket.Chat message object.
    *   It handles message validation, channel resolution, and user permissions.
6.  **`sendMessage()`** (called by `processWebhookMessage()`):
    *   Finally, `processWebhookMessage()` calls `sendMessage()` to persist the message in the database and dispatch it to the relevant chat rooms and users.

## Tool Calls (6 calls, 47,558 tokens)

**Step 1:** `search({"query":"incoming webhook","layer":"server"})` → 404 tokens
**Step 2:** `graph({"layer":"server","query":"executeIntegrationRest","direction":"down"})` → 2141 tokens
**Step 3:** `implement({"symbolName":"executeIntegrationRest","filename":"apps/meteor/app/integrations/server/api/api.ts"})` → 1172 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"processWebhookMessage"})` → 1814 tokens
**Step 5:** `search({"query":"getEngine","layer":"server"})` → 391 tokens
**Step 6:** `graph({"layer":"server","file":"apps/meteor/app/integrations/server/api/api.ts","direction":"down","query")` → 57 tokens

## Files Seen In Tool Results (24)

- `apps/meteor/client/views/admin/integrations/incoming/EditIncomingWebhook.tsx`
- `apps/meteor/client/views/admin/integrations/incoming/IncomingWebhookForm.tsx`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/app/mailer/server/api.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/statistics/server/startup/monitor.ts`
- `apps/meteor/app/meteor-accounts-saml/server/lib/settings.ts`
- `apps/meteor/app/utils/server/restrictions.ts`
- `apps/meteor/server/startup/migrations/v298.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `packages/apps-engine/src/server/storage/AppMetadataStorage.ts`
- `packages/apps-engine/src/server/storage/AppLogStorage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `packages/apps-engine/src/server/compiler/AppPackageParser.ts`
- `apps/meteor/app/authorization/server/functions/getUsersInRole.ts`
- `packages/release-action/src/getMetadata.ts`
- `packages/release-action/src/utils.ts`
- `ee/packages/media-calls/src/sip/providers/OutgoingSipCall.ts`
- `packages/models/src/models/Rooms.ts`
- `packages/ui-voip/src/providers/useWidgetExternalControlSignalListener.ts`
- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/Helper.ts`
- `apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`
