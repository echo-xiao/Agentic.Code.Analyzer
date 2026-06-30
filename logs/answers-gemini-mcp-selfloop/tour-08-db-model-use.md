# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

Rocket.Chat uses a database model based on the `BaseRaw` class to query data, which in turn interacts with the MongoDB driver.

Here's how it works:

1.  **Model Definition**: You define a database model that extends `BaseRaw`. This `BaseRaw` class acts as an abstraction layer over a MongoDB collection.
2.  **Querying Data**: To query data, you call the `find` method on an instance of your model, passing a MongoDB `query` object (filter criteria) and optional `options` (such as projection, sorting, limits, etc.).
3.  **Delegation to MongoDB Collection**: The `BaseRaw.find` method then delegates this call to its internal `this.col` property, which is a MongoDB `Collection` object. This `this.col.find(query, optionsDef)` is the direct interaction with the MongoDB driver, executing the query against the database.

**Call Chain:**
`YourModel.find(query, options)` → `BaseRaw.find(query, options)` → `this.col.find(query, options)` (MongoDB driver call)

**Key File:**
*   `packages/models/src/models/BaseRaw.ts`: This file defines the `BaseRaw` class, including the `find` method and the `col` property which holds the MongoDB Collection object.

## Tool Calls (6 calls, 19,058 tokens)

**Step 1:** `search({"layer":"packages","query":"Model.find"})` → 14 tokens
**Step 2:** `search({"query":"find","layer":"packages"})` → 416 tokens
**Step 3:** `graph({"file":"packages/models/src/models/BaseRaw.ts","direction":"down","query":"find"})` → 314 tokens
**Step 4:** `implement({"symbolName":"find","filename":"packages/models/src/models/BaseRaw.ts"})` → 147 tokens
**Step 5:** `implement({"filename":"packages/models/src/models/BaseRaw.ts","symbolName":"BaseRaw.find"})` → 109 tokens
**Step 6:** `implement({"filename":"packages/models/src/models/BaseRaw.ts","symbolName":"BaseRaw"})` → 1137 tokens
