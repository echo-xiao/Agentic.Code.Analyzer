# How do you use a database model to query data in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

To query data using a database model in Rocket.Chat, you interact with specific model classes that extend `BaseRaw`. These models provide both generic MongoDB query methods and domain-specific methods tailored to the data they manage.

Here's a breakdown of the process and the core components involved:

**1. Core Database Interaction Layer:**

*   **`packages/models/src/models/BaseRaw.ts`**: This abstract class serves as the foundation for all database models. It encapsulates the direct interaction with MongoDB collections using the `mongodb` driver. It provides fundamental CRUD (Create, Read, Update, Delete) operations, including:
    *   `findOneById(_id: T['_id'], options?: any)`: Retrieves a single document by its unique identifier.
    *   `findOne(query: Filter<T> | T['_id'] = {}, options?: any)`: Fetches a single document matching a specified query filter.
    *   `find(query: Filter<T> = {}, options?: FindOptions<P extends T ? T : P>)`: Returns a MongoDB `FindCursor` for multiple documents that match the given query.
    *   `findPaginated(query: Filter<T> = {}, options?: any)`: Provides a paginated cursor for querying multiple documents.
    *   `countDocuments(query: Filter<T>, options?: CountDocumentsOptions)`: Counts the number of documents that satisfy a query.

**2. Specific Database Models:**

*   **`packages/models/src/models/VideoConference.ts`**: This file contains the `VideoConferenceRaw` class, which is a concrete example of a database model. It extends `BaseRaw` and implements `IVideoConferenceModel`, providing specialized methods for managing video conference data.
    *   **Domain-specific Query Methods**: `VideoConferenceRaw` offers methods like `findPaginatedByRoomId(rid, { offset, count })` to query video conferences associated with a specific room, `findAllLongRunning(minDate)` to find ongoing calls, and `countByTypeAndStatus(type, status, options)` to count calls based on their type and status. These methods often wrap the more generic `BaseRaw` methods, providing a more convenient and type-safe interface for application logic.

**3. Data Type Definitions:**

*   **`packages/core-typings/src/IVideoConference.ts`**: This file defines the `IVideoConference` interface, which specifies the structure and types of data for video conference records stored in the database. This ensures type safety and consistency when working with video conference documents.
*   **`packages/model-typings/src/models/IBaseModel.ts`**: This interface defines the common contract for all models, outlining the basic CRUD operations that any model should support.

**Querying Data Flow:**

1.  **Access the Model**: In your application code (typically on the server-side), you would access an instantiated database model. These models are usually initialized with the MongoDB `Db` connection.
2.  **Construct the Query**: You can use either the domain-specific query methods provided by the concrete model (e.g., `VideoConferenceRaw`) or the more generic query methods inherited from `BaseRaw`. Query criteria are expressed using MongoDB's filter syntax (e.g., `{ rid: 'room-id', status: 'started' }`).
3.  **Execute the Query**: Call the appropriate method on the model instance.
4.  **Process Results**: The query methods return either a single document, a cursor for multiple documents, or a count, which you can then process as needed.

**Example (Conceptual):**


```typescript
// 1. Access the VideoConference model (assuming it's already instantiated and available)
import { VideoConference } from './packages/models/src/models/VideoConference.ts';

// ... in a service or API endpoint ...

const roomId = 'some-room-id';
const offset = 0;
const count = 10;

// 2. Use a domain-specific query method
const paginatedCalls = await VideoConference.findPaginatedByRoomId(roomId, { offset, count });

// 3. Process the results
paginatedCalls.cursor.forEach((call) => {
  console.log(`Video Conference ID: ${call._id}, Status: ${call.status}`);
});

// Or, using a generic BaseRaw method:
const activeCall = await VideoConference.findOne({ rid: roomId, status: 'started' });
if (activeCall) {
  console.log(`Active call found: ${activeCall.url}`);
}
```

## Tool Calls (5 calls, 19,923 tokens)

**Step 1:** `plan({"question":"How do you use a database model to query data in Rocket.Chat?"})` → 2320 tokens
**Step 2:** `search({"query":"VideoConferenceRaw"})` → 72 tokens
**Step 3:** `graph({"query":"VideoConferenceRaw","move":"expand","file":"VideoConference.ts","depth":2})` → 344 tokens
**Step 4:** `details({"filename":"VideoConference.ts","symbolName":"VideoConferenceRaw"})` → 941 tokens
**Step 5:** `details({"symbolName":"BaseRaw","filename":"BaseRaw.ts"})` → 1144 tokens

## Files Seen In Tool Results (28)

- `apps/meteor/client/views/conference/ConferenceRoute.tsx`
- `apps/meteor/client/views/conference/ConferencePage.tsx`
- `apps/meteor/client/views/conference/ConferencePageError.tsx`
- `packages/core-typings/src/IVideoConference.ts`
- `packages/models/src/models/VideoConference.ts`
- `packages/models/src/index.ts`
- `apps/meteor/server/database/utils.ts`
- `apps/meteor/server/models.ts`
- `apps/meteor/server/database/trash.ts`
- `packages/model-typings/src/models/IRoomsModel.ts`
- `packages/model-typings/src/models/IBaseUploadsModel.ts`
- `packages/mongo-adapter/src/filter.ts`
- `apps/meteor/server/services/image/service.ts`
- `packages/models/src/models/Apps.ts`
- `packages/models/src/models/AppsPersistence.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/models/Invites.ts`
- `packages/models/src/models/CallHistory.ts`
- `packages/models/src/models/BannersDismiss.ts`
- `packages/models/src/models/Analytics.ts`
- `packages/models/src/models/LivechatBusinessHours.ts`
- `packages/models/src/models/FederationRoomEvents.ts`
- `packages/models/src/models/AppLogsModel.ts`
- `packages/models/src/models/CalendarEvent.ts`
- `packages/models/src/models/LivechatContacts.ts`
- `packages/models/src/models/InstanceStatus.ts`
- `packages/models/src/models/Banners.ts`
- `packages/models/src/models/LivechatCustomField.ts`
