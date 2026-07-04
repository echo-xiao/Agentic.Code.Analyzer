# How does message search work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Message search in Rocket.Chat follows this flow:

**Entry Point (Client-side):**
1.  The `MessageSearchForm` component, located at `apps/meteor/client/views/room/contextualBar/MessageSearchTab/components/MessageSearchForm.tsx`, is the client-side interface for initiating a message search. It captures the search text and other parameters.

**Server-side Processing:**
1.  The client-side request triggers the `chat.search` API endpoint. This endpoint is defined in `apps/meteor/app/api/server/v1/chat.ts`.
2.  The `chat.search` endpoint then calls the `messageSearch` function.
3.  The `messageSearch` function, found in `apps/meteor/server/methods/messageSearch.ts`, is responsible for the core search logic.
    *   It first performs access checks to ensure the user can access the room (if a `rid` is provided).
    *   It then calls `parseMessageSearchQuery` to convert the raw search text into a MongoDB query.
    *   Finally, it executes the MongoDB query against the `Messages` collection, filtering out removed and hidden messages, and restricting the search to a specific room or all accessible rooms.

**Query Parsing:**
1.  The `parseMessageSearchQuery` function, located at `apps/meteor/server/lib/parseMessageSearchQuery.ts`, is crucial for interpreting search modifiers. It uses a `MessageSearchQueryParser` to handle various search modifiers like `from:`, `mention:`, `has:star`, `has:url`, and `is:pinned`, transforming them into a structured MongoDB query and options.

## Tool Calls (8 calls, 60,684 tokens)

**Step 1:** `wiki({"question":"How does message search work in Rocket.Chat?"})` → 762 tokens
**Step 2:** `search({"query":"MessageSearchForm","layer":"client"})` → 83 tokens
**Step 3:** `graph({"query":"MessageSearchForm","move":"down","file":"MessageSearchForm.tsx","depth":4})` → 3600 tokens
**Step 4:** `search({"layer":"server","query":"chat.search"})` → 72 tokens
**Step 5:** `details({"filename":"chat.ts","symbolName":"chat.search"})` → 43 tokens
**Step 6:** `search({"query":"messageSearch","layer":"server"})` → 94 tokens
**Step 7:** `details({"filename":"messageSearch.ts","symbolName":"messageSearch"})` → 412 tokens
**Step 8:** `details({"filename":"parseMessageSearchQuery.ts","symbolName":"parseMessageSearchQuery"})` → 263 tokens

## Files Seen In Tool Results (4)

- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/client/views/room/contextualBar/MessageSearchTab/components/MessageSearchForm.tsx`
- `apps/meteor/server/methods/messageSearch.ts`
- `apps/meteor/server/lib/parseMessageSearchQuery.ts`
