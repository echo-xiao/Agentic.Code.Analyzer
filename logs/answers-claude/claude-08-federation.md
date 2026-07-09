# Federation messages across servers?

## Answer

Federation in Rocket.Chat enables cross-server communication using the Matrix protocol. The implementation is primarily in the Enterprise Edition package `ee/packages/federation-matrix/`, with hooks in the main application connecting core events to federation actions.

**Outbound Messages:**

The `FederationMatrix` class in `ee/packages/federation-matrix/src/FederationMatrix.ts` (line 30) extends `ServiceClass` and implements `IFederationMatrixService`. It provides methods for sending messages, reactions, and other events to federated rooms. When a user sends a message in a federated room, the federation hooks intercept the event and call `FederationMatrix.sendMessage()`, which formats the message into Matrix event format and sends it to the remote homeserver using the Federation SDK (`@rocket.chat/federation-sdk`).

The `FederationMatrix` class manages configuration through settings watchers: `Federation_Service_Domain` for the server's Matrix domain, and EDU processing flags for typing, presence, and receipts. It uses `MatrixMediaService` (from `services/MatrixMediaService`) for handling media/file transfers across federated servers.

Message formatting helpers in `ee/packages/federation-matrix/src/helpers/message.parsers.ts` (`toExternalMessageFormat()`, `toExternalQuoteMessageFormat()`) convert Rocket.Chat message format to Matrix event format, handling mentions, quotes, and attachments.

**Inbound Messages:**

Incoming federation traffic arrives via Matrix's server-to-server API. The routes are defined in the `api/_matrix/` directory. `ee/packages/federation-matrix/src/api/_matrix/transactions.ts` handles `processIncomingTransaction()`, which processes batches of Matrix events (PDUs and EDUs) received from remote homeservers.

Authentication of incoming requests uses `isAuthenticatedMiddleware` which validates Matrix server signatures. Once authenticated, each event in the transaction is dispatched by type:
- Message events → `ee/packages/federation-matrix/src/events/message.ts` → `saveMessageFromFederation()` which creates or updates messages in the local database
- Reaction events → `ee/packages/federation-matrix/src/events/reaction.ts`
- Room membership, invites → `ee/packages/federation-matrix/src/api/_matrix/invite.ts`

**Application Hooks:**

The main application connects to federation via hooks in `apps/meteor/ee/server/hooks/federation/`. `FederationActions` (in `apps/meteor/server/services/room/service.ts`, imported from `./hooks/BeforeFederationActions`) intercepts room operations (user joins, leaves, messages) and triggers federation events when the room is federated (`isRoomNativeFederated()`).

**Federation Keys:**

Federation signing keys are managed through settings. `generateFederationKeys()` creates Ed25519 key pairs used for Matrix server-to-server authentication and event signing.

**Setup and Configuration:**

`ee/packages/federation-matrix/src/setup.ts` handles federation service initialization, and `ee/packages/federation-matrix/src/index.ts` exports the public API. The federation service registers as `'federation-matrix'` in the service broker.

### Call Chain
```
Outbound:
User sends message in federated room
→ FederationActions hooks (ee/server/hooks/federation/)
→ FederationMatrix.sendMessage() (FederationMatrix.ts)
  → toExternalMessageFormat() (message.parsers.ts)
  → federation SDK sends Matrix event to remote homeserver
  → MatrixMediaService for file transfers

Inbound:
Remote homeserver → PUT /_matrix/federation/v1/send/:txnId
→ routes.ts → isAuthenticatedMiddleware
→ transactions.ts processIncomingTransaction()
  → message events → message.ts saveMessageFromFederation()
  → reaction events → reaction.ts
  → invite events → invite.ts
→ Messages.insertOne() / Messages.updateOne()
```

### Key Files
| File | Role |
|------|------|
| `ee/packages/federation-matrix/src/FederationMatrix.ts` | `FederationMatrix extends ServiceClass` — outbound federation, `sendMessage()` |
| `ee/packages/federation-matrix/src/api/_matrix/transactions.ts` | `processIncomingTransaction()` — processes inbound Matrix events |
| `ee/packages/federation-matrix/src/events/message.ts` | `saveMessageFromFederation()` — persists incoming federated messages |
| `ee/packages/federation-matrix/src/events/reaction.ts` | Federation reaction event handling |
| `ee/packages/federation-matrix/src/api/_matrix/invite.ts` | Federation invite handling |
| `ee/packages/federation-matrix/src/helpers/message.parsers.ts` | `toExternalMessageFormat()`, `toExternalQuoteMessageFormat()` |
| `ee/packages/federation-matrix/src/services/MatrixMediaService.ts` | `MatrixMediaService` — media transfer across servers |
| `ee/packages/federation-matrix/src/setup.ts` | Federation service initialization |
| `ee/packages/federation-matrix/src/index.ts` | Public API exports |
| `apps/meteor/server/services/room/service.ts` | Imports `FederationActions` for room operation hooks |
| `packages/core-services/src/types/IFederationMatrixService.ts` | `IFederationMatrixService` interface |

### Key Symbols
FederationMatrix, IFederationMatrixService, sendMessage, processIncomingTransaction, saveMessageFromFederation, isAuthenticatedMiddleware, toExternalMessageFormat, toExternalQuoteMessageFormat, MatrixMediaService, FederationActions, isRoomNativeFederated, isUserNativeFederated, generateFederationKeys, Federation_Service_Domain, federationSDK
