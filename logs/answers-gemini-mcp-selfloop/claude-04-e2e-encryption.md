# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat's End-to-End Encryption (E2EE) system manages keys through a combination of user key pairs and per-room symmetric keys.

**Key Management Flow:**

1.  **User Key Pair Generation:** Each user generates an asymmetric public/private key pair.
2.  **Private Key Encryption (Client-side):** The user's private key is encrypted client-side using their E2EE password. This encrypted private key is never sent to the server in its unencrypted form. The `E2E.persistKeys` method in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` handles this encryption using the `Keychain` class.
3.  **Key Storage (Server-side):** The encrypted private key and the public key are then sent to the server and stored in the `Users` collection. This is done via the `e2e.setUserPublicAndPrivateKeys` method, which is called by the client-side `E2E.persistKeys` function. The server-side implementation of this method is found in `apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`.
4.  **Room Key Generation:** Each encrypted room has a symmetric room key.
5.  **Room Key Encryption and Distribution:** When a new room key is created, it is encrypted with each member's public key. These encrypted room keys are then stored in the respective users' `Subscriptions` collection.
6.  **Key Retrieval:** Users can fetch their keys using the `e2e.fetchMyKeys` endpoint.
7.  **Key Rotation:** Room key rotation is handled by the `resetRoomKey` function, which moves the current `E2EKey` to an `oldRoomKeys` array in the `Subscriptions` collection, retaining up to 10 historical keys for message decryption.
8.  **Key Distribution for New Members:** When a user joins an encrypted room, the `usersWaitingForE2EKeys` queue manages key distribution. Existing members with the room key encrypt it with the new user's public key and provide it via `e2e.provideUsersSuggestedGroupKeys`.

**Core Files and Their Roles:**

*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`**: This file contains the client-side `E2E` class, which is responsible for managing the E2EE state, including loading and persisting keys, handling key generation, and interacting with the server-side E2EE endpoints. The `E2E.persistKeys` method within this file is crucial for encrypting the private key and sending it to the server.
*   **`apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`**: This file defines the server-side method `e2e.setUserPublicAndPrivateKeys`, which receives and stores the user's public and encrypted private keys in the `Users` collection.
*   **`apps/meteor/app/api/server/v1/e2e.ts`**: This file exposes the `/v1/e2e.setUserPublicAndPrivateKeys` API endpoint that the client uses to send the keys to the server.
*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`**: This file likely contains the `E2ERoom` class, which manages the E2E state for individual rooms, including importing and creating group keys.
*   **`packages/rest-typings/src/v1/e2e.ts`**: This file defines the TypeScript typings for the E2EE-related REST API endpoints, including `e2e.setUserPublicAndPrivateKeys`.

In summary, Rocket.Chat employs a hybrid key management system where user key pairs are generated client-side, with the private key encrypted before being stored on the server. Room keys are symmetric and encrypted for each participant using their public key, ensuring secure communication within encrypted rooms.

## Tool Calls (8 calls, 27,509 tokens)

**Step 1:** `wiki({"question":"How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?"})` → 636 tokens
**Step 2:** `search({"query":"e2e.setUserPublicAndPrivateKeys"})` → 224 tokens
**Step 3:** `search({"query":"e2e.persistKeys","layer":"client"})` → 26 tokens
**Step 4:** `search({"query":"e2e.setUserPublicAndPrivateKeys","layer":"client"})` → 96 tokens
**Step 5:** `details({"symbolName":"e2e","filename":"rocketchat.e2e.ts"})` → 47 tokens
**Step 6:** `search({"layer":"client","query":"class E2E"})` → 104 tokens
**Step 7:** `details({"filename":"rocketchat.e2e.ts","symbolName":"E2E"})` → 1112 tokens
**Step 8:** `details({"filename":"rocketchat.e2e.ts","symbolName":"E2E.persistKeys"})` → 207 tokens

## Files Seen In Tool Results (6)

- `apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`
- `apps/meteor/tests/end-to-end/api/users.ts`
- `apps/meteor/app/api/server/v1/e2e.ts`
- `packages/rest-typings/src/v1/e2e.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
