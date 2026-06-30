# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's End-to-End (E2E) encryption leverages the robust cryptographic libraries developed by the Matrix.org project: **Olm** (for 1:1 secure sessions) and **Megolm** (for scalable group encryption). The key management follows a hybrid cryptosystem approach, combining asymmetric (public/private key pairs) for secure key exchange and symmetric encryption for actual message content.

Crucially, Rocket.Chat's E2E architecture ensures that **all private keys remain exclusively on the user's device**, protected by a user-provided passphrase. The Rocket.Chat server only ever sees encrypted data and public key material.

Here's a detailed breakdown of how keys are managed:

### 1. User Key Generation and Storage

*   **Initial Setup:** When a user enables E2E encryption for the first time on a specific device, or adds a new device, a new set of cryptographic keys is generated locally on that device.
    *   **Olm Identity Key Pair:** This is a long-term asymmetric key pair (Ed25519 signing key and Curve25519 key for Diffie-Hellman) unique to the user *on that specific device*. The public part is uploaded to the server, associated with the user and device. The private part never leaves the device.
    *   **Olm Pre-Keys:** These are short-lived Curve25519 key pairs that are also generated locally. The public parts are uploaded to the server to facilitate initial secure sessions without requiring the recipient to be online simultaneously. They are typically rotated after being used or after a certain period.
*   **Local Storage:** The generated private keys (Olm identity private key, pre-key private keys, and session keys) are encrypted locally on the client device using a **user-provided passphrase**. This passphrase is *never* sent to the server.
    *   **Web/Desktop Clients:** Keys are typically stored in the browser's `IndexedDB` or the application's secure local storage.
    *   **Mobile Clients:** Keys are stored in secure storage specific to the mobile OS (e.g., iOS Keychain, Android Keystore).
*   **Relevant Files:**
    *   `app/e2e/client/lib/e2e.ts`: Contains core E2E logic, including key generation and setup.
    *   `app/e2e/client/lib/OlmStorage.ts`: Manages the storage and retrieval of Olm-related data (including encrypted private keys) from IndexedDB.
    *   `app/e2e/client/lib/decryptPassphrase.ts`: Handles the decryption/encryption of the stored key blob using the user's passphrase.

### 2. Key Exchange (Olm for 1:1, Megolm for Group)

*   **1:1 Messaging (Olm Sessions):**
    1.  When User A wants to send an E2E message to User B, User A's client fetches User B's public Olm identity key and a one-time pre-key from the Rocket.Chat server.
    2.  User A's client performs an ephemeral Diffie-Hellman key exchange with User B's public keys to derive a shared symmetric session key. This is a one-time key derivation for establishing the secure session.
    3.  Messages exchanged within this 1:1 session are encrypted using this symmetric session key.
    4.  Forward secrecy is maintained as each message uses a derived key, meaning compromise of a long-term key doesn't compromise past messages.
*   **Group Messaging (Megolm Sessions):**
    1.  For group chats, one of the participating devices (typically the first sender or a designated device) generates a **Megolm session key** (a symmetric key).
    2.  This Megolm session key is then securely shared with every other participant in the group chat. The sharing is done using individual **Olm sessions** between the sender's device and each recipient's device. This means the Megolm key is individually encrypted for each recipient using their respective Olm session keys.
    3.  All participants then use this shared Megolm session key to encrypt and decrypt messages within that specific group session.
    4.  To provide forward secrecy and resist long-term compromise, the Megolm session key is periodically rotated (a new one is generated and re-shared). This means a new "session" is established for the group, typically after a certain number of messages or a time interval.
*   **Server's Role in Key Exchange:** The server acts as a secure relay. It receives encrypted Olm messages (which contain key material for establishing sessions) and passes them to the intended recipient. It also stores public identity keys and public pre-keys, but it *never* has access to the private parts of these keys or the ability to decrypt the messages being exchanged.
*   **Relevant Files:**
    *   `app/e2e/client/lib/e2e.ts`: Orchestrates the use of Olm and Megolm for key exchange and message encryption/decryption (e.g., `encryptMessage`, `decryptMessage`, `createRoomKey`, `shareRoomKey`).
    *   `app/e2e/client/lib/Olm.ts`: Wrapper around the Olm cryptographic library.
    *   `app/e2e/client/lib/Megolm.ts`: Wrapper around the Megolm cryptographic library.
    *   `app/e2e/server/methods/e2e.ts`: Server-side methods for publishing/retrieving public keys and encrypted key messages.

### 3. Message Encryption

*   Once a secure Olm session key (for 1:1) or a Megolm session key (for group) is established, the actual message content is encrypted using AES-256 (or similar strong symmetric algorithm) with that session key.
*   The encrypted message, along with some metadata (like which session key was used, sender device info), is sent to the Rocket.Chat server.
*   The server stores and relays this encrypted blob. Upon receipt, the recipient's client uses the appropriate session key to decrypt the message.

### 4. Device Management and Verification

*   Each device a user uses for Rocket.Chat E2E has its own unique set of Olm identity keys.
*   When a user adds a new device, it generates its own keys. To ensure trust, existing verified devices can be used to "verify" the new device. This often involves scanning a QR code or comparing security phrases, which essentially allows the existing device to securely send its current Megolm session keys to the new device via an Olm session.
*   The Rocket.Chat server maintains a registry of public identity keys for each user's devices.
*   **Relevant Files:**
    *   `app/e2e/client/tabs/e2eDevices.ts`: UI component for managing and verifying E2E devices.
    *   `app/e2e/client/lib/e2e.ts`: Contains methods for device linking and key syncing.

### 5. Key Backup and Restoration

*   Since keys are client-side and passphrase-protected, backup and restoration are crucial for user experience and preventing data loss.
*   **Export:** Users can export their encrypted E2E keys from one device (typically a long-standing primary device). This generates an encrypted blob containing all their private keys, protected by their passphrase.
*   **Import:** This exported blob can then be used to import keys onto a new device. The user must provide the original passphrase to decrypt the blob and load the keys. This allows the new device to join existing E2E sessions.
*   **Relevant Files:**
    *   `app/e2e/client/tabs/e2eExportKeys.ts`: UI for exporting E2E keys.
    *   `app/e2e/client/tabs/e2eImportKeys.ts`: UI for importing E2E keys.
    *   `app/e2e/client/lib/e2e.ts`: Methods like `exportKeys`, `importKeys`.

### Server-Side Key Management (Public Keys Only)

The Rocket.Chat server plays a vital role in facilitating E2E communication, but its involvement with keys is strictly limited to public, non-sensitive information:

*   **Storage of Public Keys:** The server stores users' public Olm identity keys and public pre-keys, associated with their user ID and device ID. This allows other users to retrieve the necessary public key material to initiate secure sessions.
*   **Relay Service:** The server acts as a relay for encrypted key messages (Olm messages used for session setup) and encrypted E2E chat messages. It cannot decrypt any of this content.
*   **Relevant Files (Server-side):**
    *   `app/e2e/server/`: Main directory for server-side E2E logic.
    *   `app/e2e/server/methods/e2e.ts`: Defines Meteor methods for clients to interact with the server for E2E purposes (e.g., `e2e.getUsersOfRoom`, `e2e.setUserE2EKey`, `e2e.sendKey`).
    *   `app/models/server/raw/EeEKeys.ts`: Defines the MongoDB collection schema used to store public E2E key information (e.g., `_id`, `userId`, `deviceId`, `publicKey`, `devicePublicKey`, `preKey`, `preKeySigned`).

In summary, Rocket.Chat's E2E key management is highly client-centric, leveraging established cryptographic primitives (Olm/Megolm) to provide strong security guarantees, with the server acting solely as a trusted, non-decrypting relay for encrypted material and public key information.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,170 |
| Model | gemini-2.5-flash |
| Tools | NONE |
