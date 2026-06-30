# How are federation messages sent across different servers in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's federation module (`@rocket.chat/federation`) handles sending messages across different servers primarily using **HTTP/HTTPS POST requests** with a custom JSON-based event format.

Here's a breakdown of how federation messages are sent:

1.  **Event Triggering and Transformation:**
    *   When an event occurs on a local Rocket.Chat server that needs to be federated (e.g., a new message in a federated room, a user profile update, a room creation), the federation module intercepts it.
    *   These local events are then transformed into a standardized **Federation Event** format. This format is a JSON object containing details like the event type, sender, recipient, and the actual payload (e.g., message content, user data).
    *   You can see the definition of these event types and their structures within `packages/federation/src/domain/FederationEvent.ts` and related files.

2.  **Recipient Determination:**
    *   The federation module determines which remote server(s) need to receive this event. For instance, if a message is sent in a federated room, it will identify all remote servers participating in that room.

3.  **HTTP/HTTPS Transport:**
    *   The core mechanism for sending these events is an **HTTP/HTTPS POST request**.
    *   The local server acts as an HTTP client, sending the Federation Event to a specific endpoint on the remote server.
    *   The primary endpoint for receiving federation events on a remote server is typically `/api/v1/federation.events`.

4.  **Security and Authentication:**
    *   **HTTPS:** All communication between federated servers is expected to happen over HTTPS to ensure encryption in transit.
    *   **Request Signing (HMAC):** To ensure the authenticity and integrity of the messages, Rocket.Chat federation uses a shared secret (configured between federated servers) to sign each outgoing request using HMAC (Hash-based Message Authentication Code). The remote server then verifies this signature upon receipt. This prevents unauthorized servers from injecting messages and ensures messages haven't been tampered with.
    *   The signature is typically included in a custom HTTP header.

5.  **Key Code Locations:**

    *   **Federation Services (Triggering Sends):** These services encapsulate the business logic for different types of federated entities (rooms, users) and determine when to send events.
        *   `packages/federation/src/application/RoomService.ts`: Handles sending room-related events (e.g., new messages, room creation/updates).
        *   `packages/federation/src/application/UserService.ts`: Handles sending user-related events (e.g., user profile updates).
        *   `packages/federation/src/application/AbstractFederationService.ts`: Provides a base for these services, often delegating the actual sending to an `IFederationService` implementation.

    *   **HTTP Federation Service (Actual Sending):** This is where the HTTP client logic resides.
        *   `packages/federation/src/infrastructure/http/HttpFederationService.ts`: This class implements the `IFederationService` interface and is responsible for constructing the HTTP requests, signing them, and sending them to the appropriate remote servers. It uses an underlying HTTP client (e.g., `axios` or a similar library).
            *   Look for methods like `sendEvent` or `sendEvents` within this file.

    *   **Federation Event Definition:**
        *   `packages/federation/src/domain/FederationEvent.ts`: Defines the structure and types of the federation events that are sent.

    *   **Receiving Endpoint (on the remote server):**
        *   `packages/federation/src/infrastructure/http/endpoints/events.ts`: This file defines the API endpoint (`/api/v1/federation.events`) that remote servers listen on to receive incoming federation events. It's responsible for validating the request (including the HMAC signature) and then processing the event.

In summary, when a federated event needs to be sent, a specific federation service (e.g., `RoomService`) calls the `HttpFederationService`, which then crafts a signed HTTP POST request containing the JSON-formatted Federation Event and sends it to the `/api/v1/federation.events` endpoint of the target remote server.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,654 |
| Model | gemini-2.5-flash |
| Tools | NONE |
