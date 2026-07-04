# How do you use a database model to query data in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat uses a structured approach to query data through database models, primarily defined in the `packages/models` package. These models extend a `BaseRaw` class, which implements the `IBaseModel` interface, providing a consistent API for database interactions.

Here's how you use a database model to query data:

**1. Model Definition:**
   *   Database models are concrete implementations found in `packages/models`.
   *   They extend the `BaseRaw` class (defined in `packages/models/src/BaseRaw.ts`), which in turn implements the `IBaseModel` interface (defined in `@rocket.chat/model-typings/src/IBaseModel.ts`).
   *   This structure ensures type safety and provides a common set of CRUD (Create, Read, Update, Delete) operations.

**2. Core Querying Mechanisms (via `IBaseModel`):**
   All models inherit standard methods for finding documents:
   *   `findOne(query, options)`: Retrieves a single document.
   *   `findOneById(_id, options)`: Retrieves a single document by its `_id`.
   *   `find(query, options)`: Retrieves multiple documents, returning a `FindCursor`.
   *   `findPaginated(query, options)`: Returns paginated results with a cursor and total count.

**3. Specialized Queries:**
   Models often extend `IBaseModel` with domain-specific methods. For example, the `SubscriptionsRaw` model (found in `packages/models/src/models/Subscriptions.ts`) might have methods like:
   *   `findConnectedUsersExcept`: Uses MongoDB aggregation pipelines for complex queries.
   *   `incUnreadForRoomIdExcludingUserIds`: Updates unread counts for a room, excluding specific users.

**4. Aggregation Pipelines:**
   For complex data retrieval and transformation, models can leverage MongoDB's aggregation framework. Methods within the models construct these pipelines to perform advanced queries.

**5. Model Registration:**
   In `apps/meteor/server/models.ts`, various `Raw` models (e.g., `SubscriptionsRaw`, `UsersRaw`) are instantiated with the database connection and registered. This makes them available throughout the application for data access.

**Example Flow for Querying Subscriptions:**

1.  **Model Implementation:** `packages/models/src/models/Subscriptions.ts` defines the `SubscriptionsRaw` class.
2.  **Inherited Methods:** `SubscriptionsRaw` inherits `find`, `findOne`, etc., from `BaseRaw`.
3.  **Specialized Methods:** `SubscriptionsRaw` also implements methods like `findConnectedUsersExcept` for specific subscription-related queries.
4.  **Usage:** When the application needs to query subscription data, it accesses the registered `Subscriptions` model and calls the appropriate method (e.g., `Subscriptions.findOne({ userId: 'someId' })` or `Subscriptions.findConnectedUsersExcept(...)`).

## Tool Calls (1 calls, 3,846 tokens)

**Step 1:** `wiki({"question":"How does Rocket.Chat use database models to query data?"})` → 1171 tokens

## Files Seen In Tool Results (1)

- `apps/meteor/server/models.ts`
