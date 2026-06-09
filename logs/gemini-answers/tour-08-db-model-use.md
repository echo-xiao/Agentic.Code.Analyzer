# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

To query data using a database model in Rocket.Chat, you import the desired model from the `@rocket.chat/models` package and then call its data access methods. These models are wrappers around MongoDB collections, providing standard methods like `find`, `findOne`, `updateOne`, and `aggregate`.

Here is the typical flow:

**Entry → Import Model → Call Query Method**

1.  **Entry Point:** A server-side function, API endpoint, or service needs to fetch data. For this example, we'll look at a function that gathers statistics: `getServicesStatistics`.

2.  **Model Definition:** The core model logic is implemented in a class that extends `BaseRaw`. For the user collection, this is `UsersRaw`.
    *   **File:** `packages/models/src/models/Users.ts`

3.  **Model Import:** In the file that needs to query data, you import the proxified model. This proxy makes the model available throughout the application.
    *   **File:** `apps/meteor/app/statistics/server/lib/getServicesStatistics.ts`
    *   **Code:**
        
```typescript
        import { Users } from '@rocket.chat/models';
        ```


4.  **Query Execution:** You use the imported model object (`Users`) to call standard MongoDB query methods. The arguments typically consist of a query filter and an options object for projections, sorting, etc. In `getServicesStatistics`, the model is used to count users with different activity levels.

    *   **Example Usage (Conceptual):**
        
```typescript
        // This is a conceptual example based on the file's purpose.
        // It demonstrates how the Users model would be used inside getServicesStatistics.

        async function getServicesStatistics() {
            // Find one active user by their username
            const activeUser = await Users.findOne({ 'status': 'online', 'username': 'someuser' }, { projection: { name: 1, username: 1 } });

            // Count the total number of non-active users
            const nonActiveUsersCount = await Users.countDocuments({ 'status': { $ne: 'online' } });

            // Find all admin users, projecting only their username
            const adminUsers = await Users.find({ roles: 'admin' }, { projection: { username: 1 } }).toArray();

            return {
                activeUser,
                nonActiveUsersCount,
                adminUsers,
            };
        }
        ```


This pattern of importing from `@rocket.chat/models` and calling inherited `BaseRaw` methods is the standard way to perform database queries on the server side of the Rocket.Chat codebase.

## Tool Calls (8 calls, 30,141 tokens)

**Step 1:** `search({"query":"Users model"})` → 203 tokens
**Step 2:** `search({"query":"UsersRaw"})` → 212 tokens
**Step 3:** `graph({"query":"UsersRaw.findOne","direction":"up"})` → 14 tokens
**Step 4:** `graph({"direction":"up","query":"UsersRaw"})` → 245 tokens
**Step 5:** `search({"query":"import { Users } from '@rocket.chat/models'"})` → 365 tokens
**Step 6:** `search({"query":"mute file:apps/meteor/app/slashcommands-mute/server/mute.ts"})` → 26 tokens
**Step 7:** `implement({"symbolName":"*","filename":"apps/meteor/app/slashcommands-mute/server/mute.ts"})` → 14 tokens
**Step 8:** `search({"query":"file:apps/meteor/app/slashcommands-mute/server/mute.ts"})` → 25 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/2 |
| Tool calls | 8 |
| Total tokens | 30,141 |
| Pass | NO |
