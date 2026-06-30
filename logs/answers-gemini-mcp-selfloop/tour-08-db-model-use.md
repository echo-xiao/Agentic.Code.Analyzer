# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

In Rocket.Chat, you query data using dedicated collection objects (which act as database models) that expose methods like `find()`, `findOne()`, and `updateOne()`. These collections are typically found in the `packages/models` directory or defined within specific application modules.

Here's the typical call chain and an example from `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`:

**Call Chain:**

`apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`
→ `Rooms.find()`
→ `SmarshHistory.findOne({ _id: room._id })`
→ `Messages.find(query)`
→ `Users.findOne({ _id: message.u._id })`
→ `SmarshHistory.updateOne({ _id: room._id }, { ... }, { upsert: true })`

**Explanation:**

1.  **Access the Collection:** You interact with global or imported collection objects such as `Rooms`, `Messages`, `Users`, and `SmarshHistory`. While the exact definition (e.g., `Mongo.Collection`) wasn't explicitly retrieved in detail due to tool limitations for a full implementation, their usage demonstrates they are the interface for database operations.

2.  **Query Data with `find()` and `findOne()`:**
    *   To retrieve multiple documents, you use `Collection.find(query, options)`. This returns a cursor that can be iterated over, for example, using `for await (const item of Collection.find())`.
    *   To retrieve a single document, you use `Collection.findOne(query, options)`. This directly returns the document or `null` if not found.

3.  **Update Data with `updateOne()`:**
    *   To modify existing documents, you use methods like `Collection.updateOne(filter, update, options)`. The `options` parameter can include `{ upsert: true }` to insert a new document if no document matches the filter.

**Example from `apps/meteor/app/smarsh-connector/server/functions/generateEml.ts`:**


```typescript
// Query all rooms
for await (const room of Rooms.find()) {
    // Find one historical record for the room
    const smarshHistory = await SmarshHistory.findOne({ _id: room._id });

    // Build a query for messages in the current room
    const query: Record<string, any> = { rid: room._id };
    if (smarshHistory) {
        query.ts = { $gt: smarshHistory.lastRan };
    }

    // Query messages based on the constructed query
    const cursor = Messages.find(query);
    for await (const message of cursor) {
        // Find the sender of a message
        const sender = await Users.findOne({ _id: message.u._id });
        // ... process message and sender ...
    }

    // Update or insert a SmarshHistory record
    await SmarshHistory.updateOne(
        { _id: room._id },
        {
            _id: room._id,
            lastRan: date,
            lastResult: result,
        },
        { upsert: true },
    );
}
```


This example demonstrates how different collection objects are utilized to query, retrieve, and update data within Rocket.Chat's server-side logic.

## Tool Calls (8 calls, 29,765 tokens)

**Step 1:** `search({"layer":"server","query":"database model"})` → 15 tokens
**Step 2:** `search({"layer":"server","query":"Collection"})` → 247 tokens
**Step 3:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/tests/e2e/fixtures/collections/us)` → 15 tokens
**Step 4:** `search({"layer":"server","query":"UsersCollection"})` → 15 tokens
**Step 5:** `search({"layer":"server","query":"Mongo.Collection"})` → 15 tokens
**Step 6:** `search({"layer":"server","query":".find("})` → 384 tokens
**Step 7:** `implement({"symbolName":"generateEml","filename":"apps/meteor/app/smarsh-connector/server/functions/generateEm)` → 899 tokens
**Step 8:** `graph({"depth":2,"direction":"up","query":"Rooms"})` → 40 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/2 |
| Tool calls | 8 |
| Total tokens | 29,765 |
| Pass | NO |
