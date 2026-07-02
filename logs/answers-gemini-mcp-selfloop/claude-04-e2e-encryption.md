# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

Rocket.Chat manages end-to-end (E2E) encryption keys primarily on the client-side within the `apps/meteor/client/lib/e2ee/` directory.

Here's a breakdown of the key management process:

**1. User Key Generation and Storage:**

*   **RSA Key Pair Generation:** The `E2E.createAndLoadKeys()` method in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` is responsible for generating an RSA key pair (public and private keys) for the user.
*   **Private Key Encryption:** The private key is then encrypted using a derived key from PBKDF2 (Password-Based Key Derivation Function 2) and AES-GCM encryption. This ensures that the private key is protected even if stored locally.
*   **Key Storage:** Both the public and encrypted private keys are stored locally using `Accounts.storageLocation.setItem()`.

**2. Room Key Management:**

*   **AES Session Key Generation:** For each E2E encrypted room, `E2ERoom.createGroupKey()` in `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` generates an AES session key. This session key is used for encrypting and decrypting messages within that specific room.
*   **Session Key Encryption for Participants:** The generated AES session key is then encrypted for each participant in the room using their respective RSA public keys via `encryptGroupKeyForParticipant()`. This ensures that only authorized members of the room can decrypt the session key and, consequently, the room's messages.
*   **Server Interaction:** The encrypted room key and its ID are sent to the server using `sdk.call('e2e.setRoomKeyID')` and `sdk.rest.post('/v1/e2e.updateGroupKey')`. The server, however, does not have access to the unencrypted keys; it merely stores and distributes the encrypted keys.

**3. Cryptographic Primitives:**

*   The `crypto/` directory contains the implementations for the cryptographic algorithms used, including `rsa.ts` for RSA operations, `aes.ts` for AES encryption, and `pbkdf2.ts` for key derivation.

**4. Server-Side Settings:**

*   The server enforces E2E encryption settings such as `E2E_Enable` and `E2E_Allow_Unencrypted_Messages`, but it does not directly manage the encryption keys themselves.

**Key Files and Their Roles:**

*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`**: Contains the `E2E` class, responsible for generating and managing the user's RSA key pair, including the encryption of the private key.
*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`**: Contains the `E2ERoom` class, which handles the generation and distribution of AES session keys for individual rooms, encrypting them for each participant.
*   **`apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts`**: A client-side hook related to E2E encryption.
*   **`apps/meteor/client/views/room/hooks/useE2EEState.ts`**: Another client-side hook related to E2E encryption state within a room.

In summary, Rocket.Chat's E2E key management is a client-side process where users generate their own RSA key pairs, and room-specific AES session keys are created and encrypted for each participant using their public keys. The server acts as a secure intermediary for distributing these encrypted keys without ever having access to the unencrypted cryptographic material.

## Tool Calls (8 calls, 15,527 tokens)

**Step 1:** `plan({"question":"How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?","intent":"arc)` → 85 tokens
**Step 2:** `search({"query":"E2E encryption keys"})` → 27 tokens
**Step 3:** `search({"query":"e2e encryption"})` → 248 tokens
**Step 4:** `graph({"move":"expand","depth":2,"query":"e2e encryption"})` → 348 tokens
**Step 5:** `details({"symbolName":"createAndLoadKeys","filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts"})` → 57 tokens
**Step 6:** `details({"symbolName":"createGroupKey","filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts"})` → 59 tokens
**Step 7:** `details({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E.createAndLoadKeys"})` → 310 tokens
**Step 8:** `details({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts","symbolName":"E2ERoom.createGroupKe)` → 145 tokens

## Files Seen In Tool Results (8)

- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
- `apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `apps/meteor/app/mentions/lib/MentionsParser.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/views/room/hooks/useE2EEState.ts`
- `apps/meteor/client/router/index.tsx`
