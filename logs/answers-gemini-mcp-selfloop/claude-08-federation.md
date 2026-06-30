# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

I was unable to find specific code for sending federation messages across different servers in Rocket.Chat. My initial searches for "federation message send", "federation send", "matrix federation send", and "federation outbound" did not yield direct results for the sending mechanism. While I found `saveMessageFromFederation` in `apps/meteor/server/services/messages/service.ts`, which suggests how *incoming* federation messages are handled, I could not identify the corresponding outbound process for sending messages. The graph traversal for `executeSendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts` also did not reveal any explicit federation-related calls within its downstream dependencies.

Therefore, I cannot provide a definitive answer on how federation messages are sent across different servers based on the current information.

## Tool Calls (8 calls, 40,395 tokens)

**Step 1:** `search({"layer":"server","query":"federation message send"})` → 326 tokens
**Step 2:** `search({"query":"federation send","layer":"ee"})` → 411 tokens
**Step 3:** `search({"query":"federation message","layer":"server"})` → 317 tokens
**Step 4:** `graph({"depth":3,"layer":"server","file":"apps/meteor/app/lib/server/methods/sendMessage.ts","direction":")` → 1298 tokens
**Step 5:** `search({"layer":"ee","query":"federation message process"})` → 18 tokens
**Step 6:** `search({"layer":"ee","query":"matrix federation send"})` → 83 tokens
**Step 7:** `search({"layer":"server","query":"federation message hook"})` → 17 tokens
**Step 8:** `search({"layer":"ee","query":"federation outbound"})` → 16 tokens
