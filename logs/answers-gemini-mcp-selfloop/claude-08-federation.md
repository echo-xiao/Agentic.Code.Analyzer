# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

My apologies, I seem to have exhausted my tool calls and was unable to pinpoint the exact mechanism for sending federation messages across different servers.

From the searches, I can see that `startFederationService` in `apps/meteor/ee/server/startup/federation.ts` is likely the entry point for the federation service. There are also interfaces like `IFederationService` in `packages/core-services/src/types/IFederationService.ts`.

However, I could not find a specific "send message" or "send federated" function within the call graph of `startFederationService` or directly through a search, nor could I implement `IFederationService` to see its methods.

To properly answer your question about how federation messages are sent, I would need to:

1.  Investigate the implementation of the `IFederationService` or other related federation services to identify the specific methods responsible for sending messages.
2.  Trace the call graph of those identified methods to understand the underlying communication protocols and mechanisms used for inter-server communication (e.g., REST API calls, pub/sub, etc.).

## Tool Calls (8 calls, 32,415 tokens)

**Step 1:** `search({"query":"federation message send","layer":"server"})` → 73 tokens
**Step 2:** `search({"layer":"server","query":"federation send message"})` → 73 tokens
**Step 3:** `search({"layer":"server","query":"FederationService"})` → 205 tokens
**Step 4:** `graph({"layer":"packages","query":"IFederationService","direction":"down"})` → 43 tokens
**Step 5:** `graph({"direction":"down","query":"startFederationService","layer":"server"})` → 1387 tokens
**Step 6:** `search({"layer":"ee","query":"FederationService"})` → 205 tokens
**Step 7:** `search({"layer":"ee","query":"sendFederated"})` → 14 tokens
**Step 8:** `search({"layer":"ee","query":"sendFederation"})` → 15 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/5 |
| Tool calls | 8 |
| Total tokens | 32,415 |
| Pass | NO |
