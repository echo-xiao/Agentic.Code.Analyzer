# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

The keys for end-to-end (E2E) encryption in Rocket.Chat are managed through a robust client-side architecture, with the `E2E` class in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` serving as the central orchestrator. This class handles the generation, storage, and exchange of both individual user keys (RSA key pairs) and room-specific group keys.

Here's a detailed breakdown of the key management process:

**Entry Point:** The E2E encryption process begins with the `E2E` class in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`.

**I. User Key Management (RSA Key Pairs):**

1.  **Key Generation:**
    *   When a user enables E2E encryption, the `startClient()` method is invoked.
    *   If no public and private keys are found locally or retrieved from the server, a new RSA key pair is generated client-side using `Rsa.generate()`.
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

2.  **Local Storage:**
    *   The newly generated public and private keys are stored in the client's local storage:
        *   `Accounts.storageLocation.setItem('public_key', JSON.stringify(publicKey))`
        *   `Accounts.storageLocation.setItem('private_key', JSON.stringify(privateKey))`
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

3.  **Server-Side Persistence (Encrypted):**
    *   The `persistKeys()` method is responsible for securely storing the user's keys on the Rocket.Chat server.
    *   The private key is first encrypted using a user-provided or randomly generated password via `this.keychain.encryptKey()`.
    *   Both the public key and the *encrypted* private key are then sent to the server using a REST API call:
        `sdk.rest.post('/v1/e2e.setUserPublicAndPrivateKeys', { public_key, private_key: JSON.stringify(encodedPrivateKey), force })`
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

4.  **Key Loading and Decryption:**
    *   The `loadKeysFromDB()` method fetches the public and encrypted private keys from the server via `sdk.rest.get('/v1/e2e.fetchMyKeys')`.
    *   To decrypt the private key, the `decodePrivateKey()` or `decodePrivateKeyFlow()` methods prompt the user for their E2E password.
    *   The `this.keychain.decryptKey()` method uses this password to decrypt the private key.
    *   Finally, the `loadKeys()` method imports the decrypted private key into an `Rsa` object and sets `this.publicKey` and `this.privateKey` for use in cryptographic operations.
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

**II. Room Key Management (Group Keys for Conversations):**

1.  **`E2ERoom` Instances:**
    *   For each E2E-enabled room, an `E2ERoom` instance is created (`this.instancesByRoomId[rid] = new E2ERoom(this.userId, room)`). These instances are dedicated to managing the specific group keys used for encrypting and decrypting messages within that room.
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` (and presumably `E2ERoom`'s definition)

2.  **Suggested Group Key Exchange:**
    *   When a user's subscription to an E2E room changes (e.g., joining a new room), the `onSubscriptionChanged()` method is triggered. It checks for a `sub.E2ESuggestedKey` in the subscription data.
    *   If a suggested key is present, the `e2eRoom.importGroupKey()` method attempts to import it.
    *   The client then communicates the success or failure of the key import back to the server using REST API calls:
        *   `sdk.rest.post('/v1/e2e.acceptSuggestedGroupKey', { rid })`
        *   `sdk.rest.post('/v1/e2e.rejectSuggestedGroupKey', { rid })`
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

3.  **Key Distribution to New Participants:**
    *   The `initiateKeyDistribution()` method periodically runs a process to distribute group keys to users who have joined E2E rooms and are waiting for their keys.
    *   It first fetches a list of users waiting for keys for specific rooms from the server via `sdk.rest.get('/v1/e2e.fetchUsersWaitingForGroupKey', { roomIds: sampleIds })`.
    *   For each room, `e2eRoom.encryptGroupKeyForParticipantsWaitingForTheKeys()` (which would reside within the `E2ERoom` class) encrypts the room's group key using the public keys of the waiting participants.
    *   These encrypted group keys are then sent back to the server via `sdk.rest.post('/v1/e2e.provideUsersSuggestedGroupKeys', { usersSuggestedGroupKeys: userKeysWithRooms })`, allowing the server to deliver them to the respective participants.
    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`

**III. User Password and Security:**

*   The user's E2E password is critical for security, as it encrypts their private key before server storage. This design ensures that the server never possesses the unencrypted private key, maintaining end-to-end security.
*   User interface components like `SaveE2EPasswordModal` and `EnterE2EPasswordModal` (`SaveE2EPasswordModal` and `EnterE2EPasswordModal` are referenced in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` but are likely defined in `apps/meteor/client/views/e2e/SaveE2EPasswordModal.tsx` and similar files based on the `search` results) are used to manage the user's E2E password.

**Call Chain:**

`E2E` (apps/meteor/client/lib/e2ee/rocketchat.e2e.ts)
  ↓
  `startClient()`
    ↓
    `loadKeysFromDB()` → `sdk.rest.get('/v1/e2e.fetchMyKeys')`
    ↓
    `decodePrivateKey()` / `decodePrivateKeyFlow()` (interacts with `Keychain` and user modals)
    ↓
    `loadKeys()` / `createAndLoadKeys()`
    ↓
    `persistKeys()` → `sdk.rest.post('/v1/e2e.setUserPublicAndPrivateKeys')`
  ↓
  `onSubscriptionChanged()`
    ↓
    `getInstanceByRoomId()`
    ↓
    `e2eRoom.importGroupKey()` (within `E2ERoom`)
    ↓
    `acceptSuggestedKey()` / `rejectSuggestedKey()` → `sdk.rest.post('/v1/e2e.acceptSuggestedGroupKey')` / `sdk.rest.post('/v1/e2e.rejectSuggestedGroupKey')`
  ↓
  `initiateKeyDistribution()`
    ↓
    `sdk.rest.get('/v1/e2e.fetchUsersWaitingForGroupKey')`
    ↓
    `e2eRoom.encryptGroupKeyForParticipantsWaitingForTheKeys()` (within `E2ERoom`)
    ↓
    `sdk.rest.post('/v1/e2e.provideUsersSuggestedGroupKeys')`

This architecture ensures secure and decentralized key management, empowering users with control over their encryption keys.

## Tool Calls (5 calls, 33,960 tokens)

**Step 1:** `search({"query":"Rocketchate2e","layer":"client"})` → 14 tokens
**Step 2:** `search({"query":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","layer":"client"})` → 25 tokens
**Step 3:** `implement({"symbolName":"default","filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts"})` → 15 tokens
**Step 4:** `search({"query":"E2E","layer":"client"})` → 421 tokens
**Step 5:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E"})` → 5552 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/6 |
| Tool calls | 5 |
| Total tokens | 33,960 |
