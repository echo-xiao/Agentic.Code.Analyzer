# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

To query data in Rocket.Chat using a database model, you generally import the relevant model (e.g., `Users`) and then call its methods, which internally utilize the core `BaseRaw` class for MongoDB operations.

Here's the call chain and explanation:

**Call Chain:** `Your code` → `Users.findOneById` (or similar method) → `BaseRaw.find` → `MongoDB Collection.find`

1.  **Model Definition and Access**:
    *   Database models like `Users` are defined in `packages/models/src/index.ts`. These models extend `BaseRaw`, which provides the fundamental MongoDB collection operations.
    *   You would typically import a model like `Users` into your server-side code (e.g., `apps/meteor/app/api/server/v1/users.ts`).

2.  **Querying with Model Methods**:
    *   You interact with the database by calling methods on the imported model. For instance, to find a user by ID, you might use `Users.findOneById()`.
    *   Example usage can be seen in `apps/meteor/app/api/server/v1/users.ts`, where calls like `Users.findOneById(this.bodyParams.userId, { projection: fields })` are made.

3.  **Underlying Database Interaction (`BaseRaw.find`)**:
    *   The model methods (like `findOneById`) internally delegate to the methods provided by the `BaseRaw` class, located at `packages/models/src/models/BaseRaw.ts`.
    *   The `BaseRaw.find` method is responsible for executing the actual MongoDB query. Its implementation is as follows:
        
```typescript
        find<P extends Document>(
        		query: Filter<T> = {},
        		options?: FindOptions<P extends T ? T : P>,
        	): FindCursor<WithId<P>> | FindCursor<WithId<T>> {
        		const optionsDef = this.doNotMixInclusionAndExclusionFields(options);
        		return this.col.find(query, optionsDef);
        	}
        ```

    *   As shown in `packages/models/src/models/BaseRaw.ts`, `this.col.find(query, optionsDef)` is the line where the MongoDB driver's `find` method is directly invoked with the provided query filter and options.

In summary, you use a database model by importing it and calling its specific query methods (e.g., `findOneById`, `findByUsername`, `find`), which then utilize the `BaseRaw` class to interact directly with the MongoDB collection.

## Tool Calls (5 calls, 17,288 tokens)

**Step 1:** `search({"query":"Users.findOne"})` → 415 tokens
**Step 2:** `graph({"direction":"down","file":"apps/meteor/app/api/server/v1/users.ts","layer":"server","query":"Users.)` → 14 tokens
**Step 3:** `search({"query":"Users","layer":"packages"})` → 569 tokens
**Step 4:** `graph({"file":"packages/models/src/index.ts","query":"Users","layer":"packages","direction":"down"})` → 598 tokens
**Step 5:** `implement({"symbolName":"BaseRaw.find","filename":"packages/models/src/BaseRaw.ts"})` → 109 tokens
