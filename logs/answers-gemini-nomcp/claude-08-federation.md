# How are federation messages sent across different servers in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's federation mechanism, often referred to as "Federation V1" or "Matrix Bridge," operates with a central **Federation Bridge** server. This bridge acts as a hub, orchestrating message exchange between participating Rocket.Chat instances. Messages are **not** sent directly from one Rocket.Chat instance to another.

Here's a breakdown of how federation messages are sent across different servers:

### Key Architectural Components

1.  **Rocket.Chat Instance (Client to Bridge):** Each Rocket.Chat server that participates in federation acts as a "client" to the central Federation Bridge. It has a built-in federation SDK.
2.  **Federation Bridge (Hub Server):** A separate Rocket.Chat instance running specific federation-bus packages. This server is responsible for receiving messages from one instance, determining destination instances, and forwarding the messages.
3.  **Custom Protocol over HTTPS/WebSockets:** Communication between instances and the Bridge uses a custom JSON-based protocol over standard web protocols.
4.  **Cryptographic Signing:** Messages are signed by the originating instance (and sometimes by the Bridge) to ensure authenticity and integrity.

### Step-by-Step Flow of Sending a Federated Message

Let's assume a user on `Instance A` sends a message in a federated room that includes users from `Instance B` and `Instance C`.

#### 1. Message Originates on `Instance A` (Originating Server)

*   **User Action:** A user sends a message in a federated room (e.g., `#federated-room`).
*   **Server-Side Interception:** The core Rocket.Chat message sending logic (located around `app/lib/server/methods/sendMessage.ts` and related event hooks) identifies that the room is federated. This is typically done by checking the `federation.enabled` and `federation.origin` properties on the room document in the database.
*   **Federation Hook Trigger:** A specific hook, `onFederatedRoomMessage`, is triggered within the `packages/federation` module.
    *   **File:** `packages/federation/src/server/hooks/onFederatedRoomMessage.ts`
*   **Message Preparation:** The message payload is prepared for federation. This includes:
    *   The message content, sender details, timestamp, room ID.
    *   Crucially, it includes a signature generated using `Instance A`'s private key. This signature proves that the message genuinely originated from `Instance A`.
*   **Sending to Bridge:** The `packages/federation/src/client/FederationClient.ts` component is invoked. It makes an outbound HTTPS POST request to the configured Federation Bridge's API endpoint (e.g., `https://my-federation-bridge.com/api/v1/federation/messages`).
    *   **File:** `packages/federation/src/client/FederationClient.ts`
    *   **Method:** `sendRoomMessage(payload: FederationRoomMessageDto)`
    *   **Data Transfer Object (DTO):** The message is encapsulated in a DTO like `FederationRoomMessageDto` or `FederationMessageDto` (defined in `packages/federation/src/domain/FederationMessage.ts`).

#### 2. Message Processed by the Federation Bridge (Hub Server)

*   **Bridge API Endpoint:** The Federation Bridge, running the `packages/federation-bus` module, exposes API endpoints to receive these messages.
    *   **File:** `packages/federation-bus/src/server/sdk/v1/bridge.endpoints.ts` (specifically, handling `/v1/federation/messages`).
*   **Message Reception:** The Bridge receives the signed message payload from `Instance A`.
*   **Signature Verification:** The Bridge verifies the message's signature using `Instance A`'s public key (which it has stored). This confirms the message's authenticity and integrity.
    *   **File:** `packages/federation-bus/src/server/application/AbstractFederationApplicationService.ts` (base for verification logic).
*   **Destination Determination:** The Bridge looks up the federated room in its own database to identify all participating Rocket.Chat instances (e.g., `Instance B` and `Instance C`).
*   **Message Forwarding:** For each destination instance, the Bridge prepares a new (or modified) message payload. It then initiates an outbound HTTPS POST request to *each* of the destination instances.
    *   **File:** `packages/federation-bus/src/server/application/ForwardRoomMessageService.ts` contains the core logic for this.
    *   The Bridge might also add its own signature or specific metadata to the message before forwarding.

#### 3. Message Received by `Instance B` and `Instance C` (Receiving Servers)

*   **Instance API Endpoint:** `Instance B` and `Instance C` (also running the `packages/federation` module) expose their own federation API endpoints to receive incoming messages from the Bridge.
    *   **File:** `packages/federation/src/server/sdk/v1/endpoints.ts` (specifically, handling `/v1/federation/messages`).
*   **Message Reception:** `Instance B` and `Instance C` receive the forwarded message payload from the Federation Bridge.
*   **Verification:** They verify the message's authenticity (e.g., checking the Bridge's signature, or the original instance's if passed through).
*   **Message Insertion:** If valid, the message is inserted into the local database of `Instance B` and `Instance C`.
*   **Real-time Update:** The message becomes visible to users on `Instance B` and `Instance C` in real-time through standard Rocket.Chat publication mechanisms (e.g., DDP/MongoDB change streams).

### Summary of the Flow:

`User on Instance A` -> `Instance A` (federation client SDK) -> `Federation Bridge` (API endpoint) -> `Federation Bridge` (forwarding logic) -> `Instance B` (federation API) / `Instance C` (federation API) -> `Local Database Insertion`.

This hub-and-spoke model simplifies routing and ensures a central point for policy enforcement and troubleshooting, though it makes the Federation Bridge a single point of failure and a potential performance bottleneck.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,140 |
| Model | gemini-2.5-flash |
| Tools | NONE |
