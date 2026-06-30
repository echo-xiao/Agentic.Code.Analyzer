# How are federation messages sent across different servers in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat leverages the **Matrix protocol** for its federation capabilities, allowing secure, decentralized communication between different Rocket.Chat servers, as well as with other Matrix-compatible homeservers (like Synapse). The primary implementation for this is located within the `federation-v2` module.

Here's a breakdown of how federation messages are sent across different servers in Rocket.Chat:

### 1. Matrix Protocol Foundation

At its core, Rocket.Chat's federation module acts as a Matrix client and a partial homeserver for its own domain. When a message needs to be sent to another federated server, Rocket.Chat constructs a Matrix event and sends it using the Matrix federation API.

### 2. The Sending Process

When a user sends a message in a federated Rocket.Chat room, the process generally follows these steps:

1.  **User Sends Message (Rocket.Chat side):** A user types and sends a message in a Rocket.Chat room. This action triggers the standard Rocket.Chat message handling flow, typically through `Meteor.call('sendMessage', ...)` or directly via the REST API.

2.  **Message Hooks and Federation Check:**
    *   Rocket.Chat's core message sending mechanism (e.g., the function called by `Meteor.methods.sendMessage` or `insertMessage`) triggers various server-side hooks.
    *   The `federation-v2` module registers an `afterSaveMessage` hook. This hook is crucial for intercepting messages in federated rooms.
    *   Inside this hook, Rocket.Chat checks if the room where the message was sent is a federated room (i.e., it has a `federation.matrixId` or `federation.origin` property) and if the sender is a local user.

3.  **Message Transformation:**
    *   If the room is federated and the message originates from a local user, the Rocket.Chat message object is transformed into a standard **Matrix event object**, specifically an `m.room.message` event.
    *   This transformation involves mapping the sender's user ID, message content, timestamps, and any attachments (which are typically uploaded to the Matrix media repository and linked in the event).

4.  **Event Signing and Sending:**
    *   The constructed Matrix event is then signed cryptographically by the Rocket.Chat server (acting as a Matrix homeserver for its domain) to ensure authenticity and integrity.
    *   The `MatrixBridge` (part of the `federation-v2` module) then uses its internal Matrix client implementation to send this signed event to the remote Matrix homeserver responsible for the federated room.
    *   This typically involves an HTTP POST request to the remote server's federation API endpoint, specifically `/_matrix/federation/v1/send/<transactionId>`, where `<transactionId>` is a unique ID for the transaction. The request body contains the signed Matrix event.

5.  **Remote Server Reception:** The remote Matrix homeserver receives the incoming event, validates its signature, event ID, and room ID, and then processes it. If valid, the message is stored and delivered to the relevant users on that remote server, regardless of whether they are Rocket.Chat users or users of another Matrix client.

### Key Components and File Paths

The core logic for sending federation messages resides within the `ee/app/federation-v2/server/` directory:

*   **Main Federation Module Entry Point:**
    *   `apps/meteor/ee/app/federation-v2/server/federation-v2.ts`: The main entry point for the federation module, responsible for starting the Matrix bridge and registering hooks.

*   **Matrix Bridge and Event Handling:**
    *   `apps/meteor/ee/app/federation-v2/server/startup/bridge.ts`: This file contains the `MatrixBridge` class initialization, which is central to handling both incoming and outgoing Matrix events. It registers the `afterSaveMessage` hook.
    *   `apps/meteor/ee/app/federation-v2/server/lib/matrix.ts`: This file likely contains the low-level Matrix client implementation, responsible for making HTTP requests to remote Matrix homeservers, signing events, and handling communication protocols.
    *   `apps/meteor/ee/app/federation-v2/server/lib/message.ts`: Contains functions for transforming Rocket.Chat messages into Matrix events and initiating the sending process. For example, `sendMessage` here would be responsible for mapping fields and calling the Matrix client to send.

*   **Event Hooks:**
    *   The `afterSaveMessage` hook (registered by the `MatrixBridge` in `startup/bridge.ts`) is the primary mechanism for intercepting Rocket.Chat messages and routing them to the federation module if the room is federated.

*   **Models for Federated Entities:**
    *   `apps/meteor/ee/app/federation-v2/server/model/rooms.ts`: Defines the schema and helpers for federated rooms, including storing their Matrix IDs.
    *   `apps/meteor/ee/app/federation-v2/server/model/users.ts`: Defines the schema and helpers for federated users, mapping Rocket.Chat user IDs to Matrix user IDs.

In summary, Rocket.Chat's federation relies on a dedicated module (`federation-v2`) that intercepts local messages in federated rooms, transforms them into Matrix events, signs them, and then uses a Matrix client implementation to send them to the appropriate remote Matrix homeserver via HTTP.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,674 |
| Model | gemini-2.5-flash |
| Tools | NONE |
