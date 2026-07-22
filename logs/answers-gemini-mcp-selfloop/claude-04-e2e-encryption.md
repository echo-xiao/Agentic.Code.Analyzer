# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat manages end-to-end (E2E) encryption keys primarily through the `Keychain` class, located in `apps/meteor/client/lib/e2ee/keychain.ts`. This class is responsible for encrypting and decrypting user private keys using a password-based key derivation function (PBKDF2) and symmetric encryption (AES-CBC or AES-GCM).

Here's a breakdown of the key management process:

**1. Key Encryption (Flow: Raw Private Key → Encrypted Stored Key)**

*   **Input:** A raw private key and the user's password.
*   **Salt Generation:** A unique salt is generated for each encryption operation, incorporating the user's ID (e.g., `v2:${this.userId}:${randomUUID()}`).
*   **Key Derivation:** The user's password, the generated salt, and a fixed number of iterations (100,000) are used with PBKDF2 (from `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts`) to derive a strong symmetric encryption key.
*   **Encryption:** The raw private key content is then encrypted using the derived symmetric key and the AES-GCM algorithm.
*   **Encoding for Storage:** The encrypted content, along with the salt and iterations used, are encoded into a specific format (`IStoredKeyV2`) by a codec (likely defined in `apps/meteor/client/lib/e2ee/codec.ts`) for secure storage.

**2. Key Decryption (Flow: Encrypted Stored Key → Raw Private Key)**

*   **Input:** An encrypted private key (in `IStoredKeyV2` format) and the user's password.
*   **Decoding:** The stored encrypted private key is first decoded by the codec to extract the encrypted content, the salt, and the iterations used during encryption.
*   **Key Derivation:** The user's password, the extracted salt, and iterations are used with PBKDF2 to re-derive the same symmetric encryption key that was used for encryption.
*   **Decryption:** The encrypted private key content is then decrypted using the re-derived symmetric key and the appropriate AES algorithm (AES-CBC or AES-GCM, determined by the IV length).
*   **Output:** The raw private key is returned.

**Core Files Involved:**

*   **`apps/meteor/client/lib/e2ee/keychain.ts`**: This file contains the `Keychain` class, which implements the `encryptKey` and `decryptKey` methods for managing the user's private keys.
*   **`apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts`**: This file provides the PBKDF2 implementation used for key derivation, as well as the underlying encryption and decryption functions (e.g., `Pbkdf2.importBaseKey`, `Pbkdf2.derive`, `Pbkdf2.importKey`, `Pbkdf2.encrypt`, `Pbkdf2.decrypt`).
*   **`apps/meteor/client/lib/e2ee/codec.ts`**: (Inferred) This file likely defines the `EncryptedKeyCodec` or a similar interface used by `Keychain` to encode and decode the `IStoredKeyV2` format for private keys.
*   **`apps/meteor/client/lib/e2ee/crypto/shared.ts`**: (Inferred) This file likely contains utility functions like `Binary.decode` and `Binary.encode` used for handling binary data during cryptographic operations.

## Tool Calls (4 calls, 13,274 tokens)

**Step 1:** `wiki({"question":"How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?"})` → 2295 tokens
**Step 2:** `search({"query":"Keychain","layer":"client"})` → 65 tokens
**Step 3:** `details({"filename":"keychain.ts","symbolName":"Keychain.decryptKey"})` → 201 tokens
**Step 4:** `details({"symbolName":"Keychain.encryptKey","filename":"keychain.ts"})` → 204 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `apps/meteor/client/lib/e2ee/keychain.ts`
- `packages/omni-core/src/hooks/applyDepartmentRestrictions.ts`
- `packages/omni-core/src/isDepartmentCreationAvailable.ts`
- `ee/packages/omni-core-ee/src/isDepartmentCreationAvailable.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/app/livechat/server/api/lib/inquiries.ts`
