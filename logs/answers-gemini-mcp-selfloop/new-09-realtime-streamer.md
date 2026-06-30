# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

When a new message is saved to the database, it appears in real-time on the client through a server-side broadcasting mechanism.

Here's the call chain:

`apps/meteor/app/lib/server/functions/sendMessage.ts` (server) → `notifyOnRoomChangedById` (server) → `api.broadcast` (server) → `LocalBroker.broadcast` (server) → `LocalBroker.broadcastLocal` (server)

1.  **`sendMessage`** in `apps/meteor/app/lib/server/functions/sendMessage.ts`: This function is responsible for saving the message to the database. After the message is saved, it triggers the notification process.
2.  **`notifyOnRoomChangedById`** in `apps/meteor/app/lib/server/lib/notifyListener.ts`: This function is called by `sendMessage`. It retrieves the updated room information and then uses `api.broadcast` to send out a notification.
    
```typescript
    export const notifyOnRoomChangedById = async <T extends IRocketChatRecord>(
    	ids: T['_id'] | T['_id'][],
    	clientAction: ClientAction = 'updated',
    ): Promise<void> => {
    	const eligibleIds = Array.isArray(ids) ? ids : [ids];
    	const items = Rooms.findByIds(eligibleIds);
    	for await (const item of items) {
    		void api.broadcast('watch.rooms', { clientAction, room: item });
    	}
    };
    ```

3.  **`api.broadcast`** in `packages/core-services/src/lib/Api.ts`: This is a wrapper around the actual broker's broadcast method. It ensures that a broker is available before attempting to broadcast the event.
    
```typescript
    async broadcast<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
    		if (!this.broker) {
    			throw new Error(`No broker set to broadcast: ${event}, ${JSON.stringify(args)}`);
    		}

    		return this.broker.broadcast(event, ...args);
    	}
    ```

4.  **`LocalBroker.broadcast`** in `packages/core-services/src/LocalBroker.ts`: This method is responsible for broadcasting the event locally. It calls `broadcastLocal` and also emits a generic 'broadcast' event.
    
```typescript
    async broadcast<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
    		void this.broadcastLocal(event, ...args);

    		this.events.emit('broadcast', event, args);
    	}
    ```

5.  **`LocalBroker.broadcastLocal`** in `packages/core-services/src/LocalBroker.ts`: This is the core method that handles the actual local broadcasting of the event. This event is then picked up by connected clients, allowing the new message to appear in real-time.

## Tool Calls (8 calls, 56,843 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 588 tokens
**Step 2:** `graph({"file":"apps/meteor/app/lib/server/functions/sendMessage.ts","direction":"down","layer":"server","q)` → 2057 tokens
**Step 3:** `implement({"filename":"apps/meteor/server/lib/notifyListener.ts","symbolName":"notifyOnRoomChangedById"})` → 146 tokens
**Step 4:** `search({"query":"api.broadcast","layer":"server"})` → 419 tokens
**Step 5:** `implement({"filename":"packages/ddp-client/src/LocalBroker.ts","symbolName":"broadcast"})` → 140 tokens
**Step 6:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"broadcast"})` → 140 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/lib/Api.ts","symbolName":"Api.broadcast"})` → 115 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker.broadcast"})` → 101 tokens

## Files Seen In Tool Results (34)

- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/hooks/sendToCRM.ts`
- `packages/livechat/src/lib/triggerActions.ts`
- `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`
- `packages/rest-typings/src/v1/chat.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/ee/server/apps/communication/websockets.ts`
- `apps/meteor/app/slashcommands-invite/server/server.ts`
- `apps/meteor/app/slashcommands-inviteall/server/server.ts`
- `apps/meteor/ee/app/license/server/startup.ts`
- `apps/meteor/tests/unit/server/services/calendar/statusEvents/applyStatusChange.ts`
- `apps/meteor/server/services/banner/service.ts`
- `apps/meteor/app/slashcommands-archiveroom/server/server.ts`
- `apps/meteor/app/slashcommands-hide/server/hide.ts`
- `apps/meteor/app/slashcommands-unarchiveroom/server/server.ts`
- `packages/ddp-client/src/LocalBroker.ts`
- `packages/core-services/src/LocalBroker.ts`
- `packages/core-services/src/lib/Api.ts`
- `ee/packages/presence/src/Presence.ts`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `apps/meteor/tests/mocks/server/BrokerMocked.ts`
