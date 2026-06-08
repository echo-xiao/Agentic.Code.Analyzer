# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

Rocket.Chat manages E2E encryption keys primarily on the client-side within the `apps/meteor/client/lib/e2ee/` directory.

The key management process is as follows:

1.  **Key Generation:** The `createAndLoadKeys()` method within `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` generates an RSA key pair for the user.
2.  **Private Key Encryption:** The generated private key is then encrypted using a two-step process:
    *   A derived key is generated from the user's password using PBKDF2 (Password-Based Key Derivation Function 2).
    *   This derived key is then used with AES-GCM (Advanced Encryption Standard – Galois/Counter Mode) to encrypt the private RSA key.
3.  **Key Storage Management:** The `Keychain` class, located in `apps/meteor/client/lib/e2ee/keychain.ts`, is responsible for managing the storage of these encrypted keys. It utilizes an `EncryptedKeyCodec` for this purpose.
    *   The `Keychain` class has methods like `decryptKey()` and `encryptKey()` to handle the secure storage and retrieval of the private key.
4.  **Per-Room Session Keys:** For individual rooms, `E2ERoom.createGroupKey()` generates an AES session key. This session key is then encrypted for each participant in the room using their respective RSA public keys via `encryptGroupKeyForParticipant()`.
5.  **Cryptographic Primitives:** The core cryptographic operations (RSA, AES, PBKDF2) are implemented in files within the `apps/meteor/client/lib/e2ee/crypto/` directory, specifically `rsa.ts`, `aes.ts`, and `pbkdf2.ts`.
6.  **Server-Side Enforcement:** The server-side enforces E2E encryption through settings such as `E2E_Enable` and `E2E_Allow_Unencrypted_Messages`, as seen in `apps/meteor/app/discussion/server/methods/createDiscussion.ts`.

**Call Chain for Key Management:**

*   `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` (E2E class, `createAndLoadKeys()`)
*   `apps/meteor/client/lib/e2ee/keychain.ts` (Keychain class, `decryptKey()`, `encryptKey()`, `EncryptedKeyCodec`)
*   `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts` (PBKDF2 for key derivation)
*   `apps/meteor/client/lib/e2ee/crypto/aes.ts` (AES-GCM for private key encryption)
*   `apps/meteor/client/lib/e2ee/crypto/rsa.ts` (RSA for key pair generation and public key encryption of session keys)

## Tool Calls (8 calls, 35,946 tokens)

**Step 1:** `search({"query":"e2e encryption key management"})` → 18 tokens
**Step 2:** `search({"query":"e2e encryption"})` → 278 tokens
**Step 3:** `graph({"direction":"down","query":"createAndLoadKeys","layer":"client"})` → 1036 tokens
**Step 4:** `search({"query":"Keychain"})` → 206 tokens
**Step 5:** `graph({"query":"Keychain","direction":"down","layer":"client"})` → 185 tokens
**Step 6:** `graph({"layer":"client","direction":"up","query":"Keychain"})` → 217 tokens
**Step 7:** `implement({"symbolName":"Keychain","filename":"apps/meteor/client/lib/e2ee/keychain.ts"})` → 162 tokens
**Step 8:** `search({"query":"EncryptedKeyCodec"})` → 62 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 3/6 |
| Tool calls | 8 |
| Total tokens | 35,946 |
| Pass | NO |
