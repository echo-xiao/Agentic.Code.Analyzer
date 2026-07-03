# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat manages end-to-end (E2E) encryption keys primarily on the client-side within the `apps/meteor/client/lib/e2ee/` directory.

Here's a breakdown of the key management process:

*   **E2E Class (`apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`):** This is the central class for E2E operations.
    *   **Key Generation:** The `createAndLoadKeys()` method within the `E2E` class is responsible for generating an RSA key pair. It uses `Rsa.generate()` to create the keys and then `Rsa.exportPublicKey()` and `Rsa.exportPrivateKey()` to export them.
    *   **Key Persistence:** The `persistKeys()` method handles storing the generated keys. It takes the public and private keys, along with a password.
    *   **Private Key Encryption:** Before storing, the private key is encrypted using the `Keychain` class.

*   **Keychain (`apps/meteor/client/lib/e2ee/keychain.ts`):** This class is responsible for encrypting and decrypting the private key.
    *   **`encryptKey()`:** This method takes the private key and a password. It uses an `EncryptedKeyCodec` to encrypt the private key. The plan indicates that PBKDF2 key derivation is used to derive a key from the password, and then AES-GCM encryption is used to encrypt the private key with this derived key.
    *   **Storage:** The encrypted private key and the public key are then sent to the server via `sdk.rest.post('/v1/e2e.setUserPublicAndPrivateKeys')`.

*   **Per-Room Keys (`apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`):** The `E2ERoom` class (mentioned in the plan) is responsible for managing per-room encryption. It generates an AES session key for each room and encrypts it with each participant's RSA public key using `encryptGroupKeyForParticipant()`.

In summary, the flow for key management is:

1.  **Entry:** `E2E.createAndLoadKeys()` in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` is called to generate an RSA key pair.
2.  **Private Key Encryption:** The private key is then passed to `E2E.persistKeys()` in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`, which in turn uses `Keychain.encryptKey()` in `apps/meteor/client/lib/e2ee/keychain.ts` to encrypt it with a password.
3.  **Storage:** The encrypted private key and the public key are sent to the server.
4.  **Per-Room Key Management:** For individual rooms, `E2ERoom.createGroupKey()` in `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` generates AES session keys, which are then encrypted for each participant using their RSA public key.

## Tool Calls (8 calls, 34,754 tokens)

**Step 1:** `plan({"question":"How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?","intent":"architecture"})` → 249 tokens
**Step 2:** `search({"layer":"client","query":"e2e"})` → 458 tokens
**Step 3:** `graph({"move":"expand","file":"rocketchat.e2e.ts","query":"e2e","depth":2})` → 252 tokens
**Step 4:** `details({"filename":"rocketchat.e2e.ts","symbolName":"E2E"})` → 1112 tokens
**Step 5:** `details({"symbolName":"E2E.createAndLoadKeys","filename":"rocketchat.e2ee.ts"})` → 310 tokens
**Step 6:** `details({"filename":"rocketchat.e2e.ts","symbolName":"E2E.persistKeys"})` → 207 tokens
**Step 7:** `search({"query":"Keychain"})` → 65 tokens
**Step 8:** `details({"filename":"keychain.ts","symbolName":"Keychain"})` → 158 tokens

## Files Seen In Tool Results (23)

- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts`
- `apps/meteor/client/views/room/modals/E2EEModals/ResetKeysE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/EnableE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/DisableE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/BaseDisableE2EEModal.tsx`
- `apps/meteor/client/views/room/hooks/useE2EEState.ts`
- `apps/meteor/client/views/room/hooks/useE2EERoomState.ts`
- `apps/meteor/client/views/room/hooks/useE2EERoom.ts`
- `apps/meteor/client/views/room/hooks/useE2EEResetRoomKey.ts`
- `apps/meteor/client/views/room/Header/RoomHeaderE2EESetup.tsx`
- `apps/meteor/client/views/room/Header/RoomToolbox/RoomToolboxE2EESetup.tsx`
- `apps/meteor/client/views/room/E2EESetup/RoomE2EESetup.tsx`
- `apps/meteor/client/views/room/E2EESetup/RoomE2EENotAllowed.tsx`
- `apps/meteor/client/views/hooks/useResetE2EPasswordMutation.ts`
- `apps/meteor/client/views/e2e/SaveE2EPasswordModal.tsx`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/client/lib/e2ee/E2EEState.ts`
- `packages/message-types/src/registrations/e2ee.ts`
- `packages/models/src/models/Rooms.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/e2ee.ts`
- `apps/meteor/client/lib/e2ee/E2ERoomState.ts`
- `apps/meteor/client/lib/e2ee/keychain.ts`
