# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Gemini Answer

End-to-end (E2E) encryption key management in Rocket.Chat is a client-driven process where the server's role is primarily to store and exchange encrypted keys, without having access to the private keys themselves. The process involves generating a personal RSA key pair for the user and separate AES keys for each encrypted room.

Here is the step-by-step process for how keys are managed:

**Entry → Key Pair Generation → Local Storage → Server Sync → Room Key Exchange**

1.  **Entry Point: Key Pair Generation**
    The process begins on the client side when a user enables E2E encryption. The client generates a public/private RSA-4096 key pair.

    *   **File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
    *   **Symbol:** `E2E.createAndLoadKeys`
    *   **Logic:** This method calls an underlying RSA library (`Rsa.generate()`) to create the key pair. The public key is stored in plain text, while the private key is encrypted with a key derived from the user's password using PBKDF2 and AES-GCM.

2.  **Local Storage and Server Upload**
    After generation, the keys are stored locally in the browser's storage. The client then uploads the public key and the *encrypted* private key to the server.

    *   **File:** `apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`
    *   **Logic:** A Meteor method on the server receives the user's public key and encrypted private key and stores them in the database. The server never sees the unencrypted private key.

3.  **Fetching Room Keys**
    When the client needs to participate in encrypted conversations, it requests the necessary keys from the server.

    *   **Client File:** `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
    *   **Client Symbol:** `E2E.requestSubscriptionKeys`
    *   **Server File:** `apps/meteor/app/e2e/server/methods/requestSubscriptionKeys.ts`
    *   **Logic:** The client calls the `e2e.requestSubscriptionKeys` Meteor method. The server responds by sending the client the encrypted room keys for all channels the user is a member of.

4.  **Group Room Key Management**
    Each encrypted room has its own symmetric AES-256 key used for encrypting messages within that room. This room key is then encrypted for each member of the room using their individual public RSA key.

    *   **Server File:** `apps/meteor/app/e2e/server/methods/updateGroupKey.ts`
    *   **Logic:** When a new user is added to a room, the room key is encrypted with their public RSA key and stored by the server. The server then provides this encrypted key to the new user's client, which can decrypt it with its private key.

This architecture ensures that the server facilitates the key exchange but cannot decrypt message content, as it only ever has access to public keys and encrypted private/room keys.

## Tool Calls (8 calls, 36,477 tokens)

**Step 1:** `search({"query":"E2E","layer":"server"})` → 559 tokens
**Step 2:** `graph({"direction":"down","query":"E2E"})` → 184 tokens
**Step 3:** `implement({"symbolName":"E2E.createAndLoadKeys","filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts"})` → 315 tokens
**Step 4:** `implement({"filename":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts","symbolName":"E2E.requestSubscriptionKey)` → 83 tokens
**Step 5:** `search({"query":"e2e.requestSubscriptionKeys","layer":"server"})` → 239 tokens
**Step 6:** `implement({"symbolName":"e2e.requestSubscriptionKeys","filename":"apps/meteor/app/e2e/server/methods/requestSu)` → 60 tokens
**Step 7:** `implement({"symbolName":"requestSubscriptionKeys","filename":"apps/meteor/app/e2e/server/methods/requestSubscr)` → 62 tokens
**Step 8:** `graph({"query":"e2e.requestSubscriptionKeys","direction":"down","layer":"server"})` → 17 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/6 |
| Tool calls | 8 |
| Total tokens | 36,477 |
| Pass | NO |
