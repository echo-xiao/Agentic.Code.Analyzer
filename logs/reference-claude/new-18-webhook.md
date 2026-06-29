# How does incoming webhook processing work?

## Answer

Rocket.Chat's webhook system supports both **incoming** webhooks (external services POST to RC) and **outgoing** webhooks (RC fires HTTP requests on events). Incoming webhooks flow through REST route validation, optional script execution, and message processing. Outgoing webhooks are event-driven with retry logic.

### 1. Incoming Webhook: REST Endpoint

**`apps/meteor/app/integrations/server/api/api.ts`:**

Incoming webhooks are handled via a REST route matching `POST /hooks/:integrationId/:token`. The route handler calls `executeIntegrationRest()`.

**`executeIntegrationRest()` (line 156):**
```ts
async function executeIntegrationRest(this: IntegrationThis): Promise<...> {
    incomingLogger.info({ msg: 'Post integration:', integration: this.request.integration.name });
```

The flow:
1. **Checks enabled status** (line 167): If `this.request.integration.enabled !== true`, returns `503 Service Unavailable`.
2. **Extracts defaults** (lines 171-176): `channel`, `alias`, `avatar`, `emoji` from the integration config.
3. **Parses body** via `getBodyParams()` (line 182): Handles Slack/GitHub-style `application/x-www-form-urlencoded` with `payload=JSON` format (lines 125-154).
4. **Runs script engine** (lines 190-226): If the integration has a valid script, creates a request context and calls `scriptEngine.processIncomingRequest({ integration, request })` using the `IsolatedVMScriptEngine` (line 29: `const ivmEngine = new IsolatedVMScriptEngine(true)`).
5. **Processes webhook message** via `processWebhookMessage()` (from `app/lib/server/functions/processWebhookMessage.ts`), which sends the message content to the configured channels.

### 2. processWebhookMessage()

**`apps/meteor/app/lib/server/functions/processWebhookMessage.ts`:**

This function takes the webhook payload (text, channel, attachments, etc.) and:
1. Resolves the target room(s) from channel names/IDs
2. Resolves the sending user (integration user or impersonated user)
3. Calls `sendMessage()` for each target channel
4. Returns an array of `WebhookResponseItem` objects

### 3. Script Engine: IsolatedVM

**`apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`:**

The `IsolatedVMScriptEngine` executes user-defined scripts in a sandboxed V8 isolate. Scripts can transform incoming data, filter requests, or generate custom responses. The engine provides:
- `processIncomingRequest({ integration, request })` -- for incoming webhooks
- `processOutgoingResponse({ integration, request, response })` -- for outgoing webhook responses

### 4. Outgoing Webhook: TriggerHandler

**`apps/meteor/app/integrations/server/lib/triggerHandler.ts`, line 58:**
```ts
class RocketChatIntegrationHandler {
    private successResults: number[];
    private triggers: Trigger;
    private ivmEngine: IsolatedVMScriptEngine<false>;
```

The trigger handler manages outgoing integrations.

**Registration: `addIntegration(record)` (line 71):**
Maps integration records to channels. Integrations can listen on:
- Specific channels
- `__any` (no channel dependency)
- `all_public_channels` (when channel list is empty)

**`sendMessage()` (line 116):**
Finds the target room, resolves the user (impersonated or integration username), constructs the message with bot metadata, and delegates to `processWebhookMessage()`.

**Event triggering:**
Outgoing integrations listen to events defined in `outgoingEvents`:
- `sendMessage` -- triggered on new messages
- `roomCreated` -- triggered on room creation
- `roomArchived` / `roomUnarchived`
- `userCreated` / `userJoinedChannel` / `userLeftChannel`
- etc.

When an event occurs, the handler:
1. Finds matching triggers by channel and event
2. Constructs the `IntegrationData` payload with token, user info, message, channel info
3. Calls `executeTriggerUrl()` which fires HTTP POST to configured URLs
4. Handles retry logic with exponential backoff on failure
5. Records execution history via `updateHistory()`
6. If the response contains a message, calls `sendMessage()` to post it back to RC

### 5. Integration CRUD

**Hooks API routes (same file):**
- `POST /api/v1/integrations.hooks` -- creates/removes integrations dynamically
- Routes validated via `isIntegrationsHooksAddSchema` / `isIntegrationsHooksRemoveSchema`
- `createIntegration()` (line 53) handles `newMessageOnChannel` and `newMessageToUser` events
- `removeIntegration()` (line 106) finds and deletes by target URL

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/integrations/server/api/api.ts` | REST route handler, `executeIntegrationRest()`, integration CRUD |
| `apps/meteor/app/lib/server/functions/processWebhookMessage.ts` | Processes webhook payload into RC messages |
| `apps/meteor/app/integrations/server/lib/triggerHandler.ts` | `RocketChatIntegrationHandler` for outgoing webhooks |
| `apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts` | `IsolatedVMScriptEngine` for script execution |
| `apps/meteor/app/integrations/server/lib/updateHistory.ts` | Records integration execution history |
| `apps/meteor/app/integrations/lib/outgoingEvents.ts` | Outgoing event definitions |
| `apps/meteor/app/integrations/server/methods/outgoing/addOutgoingIntegration.ts` | Create outgoing integration |
| `apps/meteor/app/integrations/server/methods/outgoing/deleteOutgoingIntegration.ts` | Delete outgoing integration |

### Key Symbols
- `executeIntegrationRest()` -- main incoming webhook handler
- `processWebhookMessage()` -- converts webhook payload to RC messages
- `RocketChatIntegrationHandler` -- manages outgoing integration triggers
- `addIntegration(record)` -- registers an outgoing integration trigger
- `removeIntegration(record)` -- removes an outgoing integration trigger
- `sendMessage()` (on handler) -- sends outgoing webhook response back to RC
- `IsolatedVMScriptEngine` -- sandboxed script execution for integrations
- `getBodyParams()` -- parses webhook body, handles Slack `payload=JSON` format
- `outgoingEvents` -- event type definitions for outgoing webhooks
- `executeTriggerUrl()` -- fires HTTP POST with retry logic
