# How are federation messages sent across different servers in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers primarily through the Matrix protocol. The process is initiated by the `afterSaveMessage` hook, which is a general hook for handling messages after they are saved.

The flow for sending federated messages is as follows:

1.  **Message Saving**: A message is saved in Rocket.Chat, triggering the `afterSaveMessage` hook.
    *   File: `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
2.  **Federation Hook**: The `afterSaveMessage` hook, when dealing with federated rooms, will eventually lead to a call to `FederationMatrix.sendMessage`.
    *   File: `apps/meteor/ee/server/hooks/federation/index.ts` (This file contains the call to `FederationMatrix.sendMessage`)
3.  **Matrix Protocol Handling**: The `FederationMatrix.sendMessage` function, which is a proxified service for `IFederationMatrixService`, is responsible for sending the message using the Matrix protocol.
    *   File: `packages/core-services/src/index.ts` (This file defines `FederationMatrix` as a proxified service).

In essence, the `afterSaveMessage` hook acts as the entry point, and if the message is part of a federated room, it delegates the actual sending of the message to the `FederationMatrix` service, which then uses the Matrix protocol for inter-server communication.

## Tool Calls (8 calls, 42,647 tokens)

**Step 1:** `wiki({"question":"How does federation work in Rocket.Chat?"})` → 1174 tokens
**Step 2:** `plan({"question":"How are federation messages sent across different servers in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 3:** `search({"query":"afterSaveMessage"})` → 152 tokens
**Step 4:** `search({"query":"FederationMatrix.sendMessage"})` → 94 tokens
**Step 5:** `graph({"query":"afterSaveMessage","move":"down","file":"afterSaveMessage.ts","depth":5})` → 2859 tokens
**Step 6:** `graph({"move":"up","query":"FederationMatrix.sendMessage","depth":5,"file":"index.ts"})` → 17 tokens
**Step 7:** `graph({"depth":5,"query":"FederationMatrix.sendMessage","move":"up","file":"index.ts"})` → 17 tokens
**Step 8:** `details({"symbolName":"FederationMatrix","filename":"index.ts"})` → 62 tokens

## Files Seen In Tool Results (7)

- `packages/i18n/src/locales/en.i18n.js`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `packages/core-services/src/index.ts`
