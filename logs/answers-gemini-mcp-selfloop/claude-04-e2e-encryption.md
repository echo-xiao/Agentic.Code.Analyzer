# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

Rocket.Chat manages end-to-end (E2E) encryption keys primarily on the client-side within the `apps/meteor/client/lib/e2ee/` directory.

Here's a breakdown of the key management process:

**Call Chain:**
`apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` (E2E class) → `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts` (PBKDF2) → `apps/meteor/client/lib/e2ee/crypto/aes.ts` (AES-GCM) → `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` (E2ERoom) → `apps/meteor/client/lib/e2ee/crypto/rsa.ts` (RSA) → `apps/meteor/client/lib/e2ee/keychain.ts` (Keychain)

**Key Management Steps:**

1.  **User Key Pair Generation**:
    *   The `E2E` class, located in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`, uses the `createAndLoadKeys()` method to generate an RSA key pair for the user.
2.  **Private Key Encryption**:
    *   The generated RSA private key is then encrypted. This involves two steps:
        *   A derived key is generated from the user's password using PBKDF2 (Password-Based Key Derivation Function 2), implemented in `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts`.
        *   This derived key is subsequently used to encrypt the private key with AES-GCM (Advanced Encryption Standard - Galois/Counter Mode), found in `apps/meteor/client/lib/e2ee/crypto/aes.ts`.
3.  **Per-Room Session Key Generation**:
    *   For each E2E-enabled room, the `E2ERoom` class (in `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`) generates an AES session key using `createGroupKey()`.
4.  **Session Key Distribution**:
    *   This AES session key is then encrypted for each participant in the room using their respective RSA public keys. This process is handled by `encryptGroupKeyForParticipant()` within `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`, leveraging RSA operations from `apps/meteor/client/lib/e2ee/crypto/rsa.ts`.
5.  **Key Storage**:
    *   The `Keychain` component, likely in `apps/meteor/client/lib/e2ee/keychain.ts`, is responsible for managing the storage of these encrypted keys using an `EncryptedKeyCodec`.
6.  **Server-Side Enforcement**:
    *   The server plays a role in enforcing E2E encryption through settings like `E2E_Enable` and `E2E_Allow_Unencrypted_Messages`.

## Tool Calls (8 calls, 51,126 tokens)

**Step 1:** `search({"query":"e2e encryption key management"})` → 18 tokens
**Step 2:** `search({"query":"e2e encryption"})` → 386 tokens
**Step 3:** `graph({"query":"createAndLoadKeys","direction":"down","layer":"client"})` → 2347 tokens
**Step 4:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"createAndLoadKeys"})` → 57 tokens
**Step 5:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/e2ee/rocketchat.e2e.ts)` → 67 tokens
**Step 6:** `search({"query":"E2E class","layer":"client"})` → 13 tokens
**Step 7:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/e2ee/rocketchat.e2e.ts)` → 71 tokens
**Step 8:** `implement({"symbolName":"rocketchat","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/)` → 16 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts`
- `apps/meteor/app/mentions/lib/MentionsParser.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/views/room/hooks/useE2EEState.ts`
- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
