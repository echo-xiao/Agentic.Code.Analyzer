# How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat implements end-to-end (E2E) encryption with a dual-key system: asymmetric user key pairs and symmetric room keys.

**User Key Management:**
Each user has a public/private key pair. The private key is encrypted client-side with a password and stored on the server, while the public key is used to encrypt room keys.

*   **Client-side:** The `E2E` class in `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts` manages the generation, loading, and persistence of these keys. When a user logs in, the system attempts to load keys from local storage and then from the database. If a private key exists in the database but not locally, the user is prompted for their password to decrypt it. New keys are generated if none are found.
*   **Server-side:**
    *   `apps/meteor/app/e2e/server/methods/fetchMyKeys.ts`: This method is responsible for fetching a user's E2E keys from the server.
    *   `apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`: This method handles the persistence of newly generated or updated user public and private keys to the server.

**Room Key Management:**
Each encrypted room has a symmetric room key. This key is encrypted with each member's public key and stored in their `Subscription` record.

*   **Client-side:** The `E2ERoom` class in `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts` handles the encryption and decryption of messages within a specific room using its symmetric key. The `encryptOldKeysForParticipant` method in this file encrypts historical room keys for new participants using their public key.
*   **Server-side:**
    *   `apps/meteor/app/api/server/v1/e2e.ts`: This file contains API endpoints for managing suggested group keys.
        *   `e2e.acceptSuggestedGroupKey`: Used to accept a suggested room key.
        *   `e2e.rejectSuggestedGroupKey`: Used to reject a suggested room key.
    *   `apps/meteor/app/e2e/server/functions/resetRoomKey.ts`: This function rotates the encryption key for a specific room, moving the current `E2EKey` into an `oldRoomKeys` array for all subscribers and preparing the room for a new key generation.

**Key Reset Mechanisms:**

*   **User Key Reset:** The `resetOwnE2EKey` function allows a user to reset their own E2EE keys, clearing them from the `Users` collection and all their subscriptions.
*   **Room Key Reset:** The `resetRoomKey` server-side function (found in `apps/meteor/app/e2e/server/functions/resetRoomKey.ts`) rotates the encryption key for a specific room.

**Key Storage:**
User E2E keys (public and private) and a random password are stored in the client-side persistent storage, typically `window.localStorage`.

## Tool Calls (11 calls, 14,920 tokens)

**Step 1:** `wiki({"question":"How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?"})` → 1180 tokens
**Step 2:** `search({"layer":"server","query":"e2e.fetchMyKeys OR e2e.setUserPublicAndPrivateKeys OR e2e.acceptSuggestedGroupKey OR e2e.reje)` → 55 tokens
**Step 3:** `search({"query":"E2E class","layer":"client"})` → 24 tokens
**Step 4:** `search({"query":"E2ERoom class","layer":"client"})` → 25 tokens
**Step 5:** `search({"query":"apps/meteor/client/lib/e2ee/rocketchat.e2e.ts"})` → 72 tokens
**Step 6:** `search({"query":"apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts"})` → 75 tokens
**Step 7:** `search({"query":"setUserPublicAndPrivateKeys","layer":"server"})` → 114 tokens
**Step 8:** `search({"query":"resetRoomKey","layer":"server"})` → 98 tokens
**Step 9:** `search({"query":"fetchMyKeys","layer":"server"})` → 69 tokens
**Step 10:** `search({"layer":"server","query":"acceptSuggestedGroupKey"})` → 83 tokens
**Step 11:** `search({"query":"rejectSuggestedGroupKey","layer":"server"})` → 83 tokens

## Files Seen In Tool Results (9)

- `apps/meteor/client/lib/e2ee/rocketchat.e2e.ts`
- `apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts`
- `apps/meteor/app/e2e/server/methods/setUserPublicAndPrivateKeys.ts`
- `apps/meteor/server/api/v1/e2e.ts`
- `packages/rest-typings/src/v1/e2e/e2eSetUserPublicAndPrivateKeysParamsPOST.ts`
- `apps/meteor/app/e2e/server/functions/resetRoomKey.ts`
- `apps/meteor/client/views/room/hooks/useE2EEResetRoomKey.ts`
- `apps/meteor/app/e2e/server/methods/fetchMyKeys.ts`
- `apps/meteor/app/api/server/v1/e2e.ts`
