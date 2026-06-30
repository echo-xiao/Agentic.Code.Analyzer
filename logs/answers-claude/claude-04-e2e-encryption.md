# E2E encryption key management?

## Answer

End-to-end encryption (E2E) in Rocket.Chat uses a hierarchical key system: a user-level RSA key pair for identity, an AES master key for encrypting the private key at rest, per-room AES group keys for encrypting messages, and PBKDF2 key derivation from the user's password. The client-side implementation centers on `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`.

The `E2E` class (line 45) extends `Emitter` and manages the entire E2E lifecycle. When a user enables E2E encryption, `createAndLoadKeys()` (line 479) is called. This method generates:

1. **RSA Key Pair** — via `Rsa.generate()` from `apps/meteor/client/lib/e2ee/crypto/rsa.ts`. This creates a 2048-bit RSA-OAEP key pair using the Web Crypto API. The public key is stored on the server (in the user record). The private key is encrypted with the user's AES master key before storage.

2. **AES Master Key** — derived from the user's password using PBKDF2 (`apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts`). The derivation uses `crypto.subtle.deriveKey()` with SHA-256, producing an AES-CBC key. This key encrypts/decrypts the RSA private key. A random passphrase can also be generated via `generatePassphrase()` as a recovery mechanism.

The `Keychain` class (`apps/meteor/client/lib/e2ee/keychain.ts`) manages persistent storage of encrypted keys, using the user's server-side record to store the encrypted private key and public key.

Per-room encryption uses the `E2ERoom` class (`apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`). When a user enters an encrypted room, `createGroupKey()` generates a random AES-CBC key for the room. This group key is encrypted with each room member's RSA public key, so each member has their own encrypted copy. Messages are encrypted/decrypted with the room's group key.

Key distribution is handled by `initiateKeyDistribution()` which runs on an interval (`keyDistributionInterval`). It processes rooms in batches (`ROOM_KEY_EXCHANGE_SIZE = 10`), distributing encrypted group keys to new room members by encrypting the room key with their RSA public key.

On the server side, several methods support E2E operations:
- `resetRoomKey()` — resets a room's encryption key when membership changes require it
- `provideUsersSuggestedGroupKeys()` — server endpoint for distributing group keys to users
- `resetUserE2EEncriptionKey()` — resets a user's E2E keys (admin operation)

The server never has access to plaintext keys — it only stores encrypted versions. The RSA private key is encrypted with the PBKDF2-derived key, and room group keys are encrypted with users' RSA public keys.

### Call Chain
```
User enables E2E:
E2E.createAndLoadKeys() (rocketchat.e2e.ts:479)
→ Rsa.generate() (crypto/rsa.ts) — RSA-OAEP 2048-bit key pair
→ PBKDF2 derive key from password (crypto/pbkdf2.ts) — AES master key
→ Encrypt RSA private key with AES master key
→ Store encrypted private key + public key via Keychain (keychain.ts)
→ Upload public key to server

Per-room:
E2ERoom.createGroupKey() (rocketchat.e2e.room.ts)
→ generateAESKey() (crypto/aes.ts) — random AES-CBC room key
→ Encrypt room key with each member's RSA public key
→ Store encrypted room keys on server

Message encrypt/decrypt:
E2ERoom.encrypt(message) → AES-CBC encrypt with room group key
E2ERoom.decrypt(message) → AES-CBC decrypt with room group key

Key distribution:
E2E.initiateKeyDistribution() → interval-based
→ process rooms in batches of 10
→ encrypt room key with new members' RSA public keys
→ server: provideUsersSuggestedGroupKeys()
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` | `E2E` class — `createAndLoadKeys()`, `initiateKeyDistribution()`, lifecycle |
| `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` | `E2ERoom` — `createGroupKey()`, per-room encrypt/decrypt |
| `apps/meteor/client/lib/e2ee/crypto/rsa.ts` | `generateRSAKey()` — RSA-OAEP key pair generation |
| `apps/meteor/client/lib/e2ee/crypto/aes.ts` | `generateAESKey()` — AES-CBC key generation |
| `apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts` | PBKDF2 key derivation from password |
| `apps/meteor/client/lib/e2ee/keychain.ts` | `Keychain` — encrypted key storage and retrieval |
| `apps/meteor/client/lib/e2ee/helper.ts` | `generatePassphrase()` — recovery passphrase generation |

### Key Symbols
E2E, E2ERoom, Keychain, createAndLoadKeys, createGroupKey, generateRSAKey, generateAESKey, PBKDF2, initiateKeyDistribution, encryptFile, decryptFile, encrypt, decrypt, provideUsersSuggestedGroupKeys, resetRoomKey, resetUserE2EEncriptionKey, ROOM_KEY_EXCHANGE_SIZE, keyDistributionInterval
