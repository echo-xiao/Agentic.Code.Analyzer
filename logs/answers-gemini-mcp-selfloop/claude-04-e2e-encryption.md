# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

Rocket.Chat manages end-to-end (E2E) encryption keys primarily on the client-side within the `apps/meteor/client/lib/e2ee/` directory.

Here's a breakdown of the key management process:

**1. Key Generation and Initial Storage:**

*   The `E2E` class, located in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`, is responsible for generating the RSA key pair.
*   The `createAndLoadKeys()` method within the `E2E` class uses `Rsa.generate()` to create a new RSA key pair.
*   The public key is then exported using `Rsa.exportPublicKey()` and stored in `Accounts.storageLocation` (likely local storage) as `public_key`.
*   Similarly, the private key is exported using `Rsa.exportPrivateKey()` and stored in `Accounts.storageLocation` as `private_key`.

**2. Private Key Encryption and Persistence:**

*   The `persistKeys()` method in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` handles the encryption and server-side persistence of the keys.
*   It takes the `public_key`, `private_key`, and a `password` as input.
*   The `Keychain` class (defined in `apps/meteor/client/lib/e2ee/keychain.ts`) is used to encrypt the private key. Specifically, `this.keychain.encryptKey(private_key, password)` performs this encryption.
*   The architecture description indicates that this encryption uses PBKDF2 for key derivation from the password and AES-GCM for encrypting the private key.
*   Finally, the encrypted private key (along with the public key) is sent to the server via a REST API endpoint: `sdk.rest.post('/v1/e2e.setUserPublicAndPrivateKeys')`.

**3. Per-Room Session Keys:**

*   For per-room encryption, the `E2ERoom.createGroupKey()` method (in `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`) generates an AES session key.
*   This session key is then encrypted for each participant in the room using their respective RSA public keys via `encryptGroupKeyForParticipant()`.

**Key Files and Their Roles:**

*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`**: Contains the main `E2E` class, responsible for generating, loading, and persisting user's RSA key pairs.
*   **`apps/meteor/client/lib/e2ee/keychain.ts`**: Manages the encryption and decryption of the private key using PBKDF2 and AES-GCM.
*   **`apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`**: Handles the generation and distribution of per-room AES session keys.
*   **`apps/meteor/client/lib/e2ee/crypto/rsa.ts`**: Provides RSA key generation and export functionalities.
*   **`apps/meteor/client/lib/e2ee/crypto/aes.ts`**: Likely contains AES encryption/decryption utilities.
*   **`apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts`**: Implements the PBKDF2 key derivation function.

**Call Chain:**

1.  **`E2E.createAndLoadKeys()`** (in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`): Generates RSA key pair and stores them locally.
2.  **`E2E.persistKeys()`** (in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`): Encrypts the private key and sends both public and encrypted private keys to the server.
3.  **`Keychain.encryptKey()`** (in `apps/meteor/client/lib/e2ee/keychain.ts`): Performs the actual encryption of the private key using PBKDF2 and AES-GCM.
4.  **`sdk.rest.post('/v1/e2e.setUserPublicAndPrivateKeys')`**: Sends the keys to the server.

## Tool Calls (8 calls, 39,636 tokens)

**Step 1:** `search({"query":"e2e encryption key management"})` → 18 tokens
**Step 2:** `search({"query":"e2e encryption"})` → 386 tokens
**Step 3:** `graph({"query":"E2E.createAndLoadKeys","direction":"down","layer":"client"})` → 15 tokens
**Step 4:** `search({"query":"E2E","layer":"client"})` → 778 tokens
**Step 5:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E"})` → 1114 tokens
**Step 6:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E.createAndLoadKeys"})` → 315 tokens
**Step 7:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E.persistKeys"})` → 211 tokens
**Step 8:** `search({"layer":"client","query":"Keychain"})` → 253 tokens

## Files Seen In Tool Results (29)

- `apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts`
- `packages/core-typings/src/IMessage/IMessage.ts`
- `apps/meteor/app/mentions/lib/MentionsParser.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/views/room/hooks/useE2EEState.ts`
- `apps/meteor/app/discussion/server/methods/createDiscussion.ts`
- `apps/meteor/client/lib/e2ee/E2EEState.ts`
- `apps/meteor/client/views/room/hooks/useE2EERoom.ts`
- `packages/message-types/src/registrations/e2ee.ts`
- `packages/models/src/models/Rooms.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/e2ee.ts`
- `apps/meteor/client/views/room/hooks/useE2EERoomState.ts`
- `apps/meteor/client/views/room/modals/E2EEModals/ResetKeysE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/EnableE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/DisableE2EEModal.tsx`
- `apps/meteor/client/views/room/modals/E2EEModals/BaseDisableE2EEModal.tsx`
- `apps/meteor/client/views/room/hooks/useE2EEResetRoomKey.ts`
- `apps/meteor/client/views/room/Header/RoomHeaderE2EESetup.tsx`
- `apps/meteor/client/views/room/Header/RoomToolbox/RoomToolboxE2EESetup.tsx`
- `apps/meteor/client/views/room/E2EESetup/RoomE2EESetup.tsx`
- `apps/meteor/client/views/room/E2EESetup/RoomE2EENotAllowed.tsx`
- `apps/meteor/client/views/hooks/useResetE2EPasswordMutation.ts`
- `apps/meteor/client/views/e2e/SaveE2EPasswordModal.tsx`
- `apps/meteor/client/views/e2e/EnterE2EPasswordModal/index.ts`
- `apps/meteor/client/views/e2e/EnterE2EPasswordModal/EnterE2EPasswordModal.stories.tsx`
- `apps/meteor/client/views/e2e/EnterE2EPasswordModal/EnterE2EPasswordModal.tsx`
- `apps/meteor/client/lib/e2ee/keychain.ts`
- `apps/meteor/client/lib/e2ee/logger.ts`
