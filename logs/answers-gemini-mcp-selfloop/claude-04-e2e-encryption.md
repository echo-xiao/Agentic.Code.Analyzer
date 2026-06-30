# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

Rocket.Chat manages E2E encryption keys primarily on the client-side, within the `apps/meteor/client/lib/e2ee/` directory.

Here's a breakdown of the key management process:

**1. Key Generation:**
   - The `E2E.createAndLoadKeys()` method, found in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`, is responsible for generating an RSA key pair.
   - This method utilizes `generateKeyPair` from `apps/meteor/client/lib/e2ee/crypto/shared.ts` to perform the actual RSA key pair generation.

**2. Private Key Encryption:**
   - The generated RSA private key is encrypted using a two-step process:
     - **PBKDF2 Key Derivation:** A derived key is generated from the user's password using PBKDF2.
     - **AES-GCM Encryption:** The derived key is then used to encrypt the private key using AES-GCM encryption.

**3. Per-Room Session Keys:**
   - For each room, `E2ERoom.createGroupKey()` generates an AES session key.
   - This AES session key is then encrypted for each participant in the room using their respective RSA public keys, via the `encryptGroupKeyForParticipant()` method.

**4. Key Storage and Management:**
   - The `Keychain` component, implemented in `apps/meteor/client/lib/e2ee/keychain.ts`, is responsible for managing the encrypted key storage.
   - The `EncryptedKeyCodec` class within `apps/meteor/client/lib/e2ee/keychain.ts` handles the encoding and decoding of encrypted keys for storage.
   - The `encode` method of `EncryptedKeyCodec` takes an `EncryptedKey` object and converts it into a `IStoredKeyV2` format for storage. Conversely, the `decode` method reconstructs the `EncryptedKey` from its stored representation.

**5. Cryptographic Primitives:**
   - The core cryptographic operations (RSA, AES, PBKDF2) are implemented in `apps/meteor/client/lib/e2ee/crypto/rsa.ts`, `apps/meteor/client/lib/e2ee/crypto/aes.ts`, and `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts` respectively.

**Call Chain:**
`E2E.createAndLoadKeys()` (apps/meteor/client/lib/e2ee/rocketchat.e2e.ts) → `generateKeyPair()` (apps/meteor/client/lib/e2ee/crypto/shared.ts) → (Internal encryption logic involving PBKDF2 and AES-GCM) → `EncryptedKeyCodec.encode()` (apps/meteor/client/lib/e2ee/keychain.ts) for storing the encrypted private key.

## Tool Calls (8 calls, 56,644 tokens)

**Step 1:** `search({"query":"E2E encryption keys"})` → 16 tokens
**Step 2:** `search({"query":"E2E encryption"})` → 541 tokens
**Step 3:** `graph({"file":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","direction":"down","query":"E2E.createAndLoa)` → 15 tokens
**Step 4:** `search({"query":"createAndLoadKeys","layer":"client"})` → 304 tokens
**Step 5:** `graph({"file":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","query":"createAndLoadKeys","direction":"dow)` → 3771 tokens
**Step 6:** `implement({"filename":"packages/rocketchat-e2e/shared.ts","symbolName":"generateKeyPair"})` → 149 tokens
**Step 7:** `search({"query":"EncryptedKeyCodec"})` → 245 tokens
**Step 8:** `implement({"filename":"apps/meteor/client/lib/e2ee/keychain.ts","symbolName":"EncryptedKeyCodec"})` → 151 tokens
