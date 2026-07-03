# How do you use a database model to query data in Rocket.Chat?

## Plan

intent: pattern

## Gemini Answer

Rocket.Chat uses a database model pattern where specific models extend a `BaseRaw` class, which in turn provides methods for interacting with MongoDB collections.

Here's the flow for querying data:

**Flow:** Identify Model → Access Model Instance → Call Query Method → Provide Criteria and Options

1.  **Identify the relevant model:** Determine which model corresponds to the data you want to query. For example, `MessagesRaw` for messages, `UsersRaw` for users, etc.
2.  **Access the model instance:** Models are typically accessed via proxified imports.
    *   **File:** `packages/models/src/index.ts` (This file handles the registration and export of models, making them accessible via `@rocket.chat/models`.)
    *   **Example:** `import { Messages } from '@rocket.chat/models';`
3.  **Call a query method:** Use one of the specialized query methods provided by the specific model (e.g., `Messages.findVisibleByRoomId`) or a generic method inherited from `BaseRaw` (e.g., `Messages.find`, `Messages.findOne`).
    *   **File:** `packages/models/src/models/Messages.ts` (Example of a concrete model with specialized query methods like `findVisibleByRoomId`, `findOneByRoomIdAndMessageId`, etc.)
    *   **File:** `packages/models/src/models/BaseRaw.ts` (Provides fundamental query methods such as `find`, `findOne`, `findPaginated`, and `countDocuments`.)
4.  **Provide query criteria and options:** Pass a MongoDB-style `Filter` object for the query and `FindOptions` for specifying sorting, projection (which fields to return), limits, skips, etc.

**Example of querying messages:**

To find all visible messages in a specific room, sorted by timestamp in descending order and limited to 10 messages:


```typescript
import { Messages } from '@rocket.chat/models';
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import type { FindOptions } from 'mongodb';

const roomId: IRoom['_id'] = 'someRoomId';
const options: FindOptions<IMessage> = { sort: { ts: -1 }, limit: 10 };

const messagesCursor = Messages.findVisibleByRoomId(roomId, options);

// You can then iterate through the cursor to process the messages
// for await (const message of messagesCursor) {
//   console.log(message.msg);
// }
```


**Core Files:**

*   `packages/models/src/models/BaseRaw.ts`: This file defines the base class for all database models, providing the core methods for interacting with MongoDB collections (e.g., `find`, `findOne`, `update`, `insert`, `delete`).
*   `packages/models/src/models/Messages.ts`: This file is an example of a concrete database model (`MessagesRaw`) that extends `BaseRaw`. It implements specific methods tailored for querying and manipulating message data.
*   `packages/model-typings/src/models/IBaseModel.ts`: This file defines the TypeScript interface for the `BaseRaw` class, outlining the common methods available to all models.
*   `packages/model-typings/src/models/IMessagesModel.ts`: This file defines the TypeScript interface for the `Messages` model, specifying the unique query and manipulation methods available for messages.

## Tool Calls (5 calls, 20,036 tokens)

**Step 1:** `plan({"question":"How do you use a database model to query data in Rocket.Chat?","intent":"pattern"})` → 253 tokens
**Step 2:** `search({"query":"MessagesRaw"})` → 66 tokens
**Step 3:** `graph({"query":"MessagesRaw","file":"Messages.ts","depth":1,"move":"expand"})` → 221 tokens
**Step 4:** `details({"filename":"Messages.ts","symbolName":"MessagesRaw"})` → 4167 tokens
**Step 5:** `details({"filename":"BaseRaw.ts","symbolName":"BaseRaw"})` → 1134 tokens

## Files Seen In Tool Results (9)

- `packages/models/src/models/Messages.ts`
- `packages/models/src/models/MessageReads.ts`
- `packages/models/src/models/EmailMessageHistory.ts`
- `apps/meteor/server/models.ts`
- `packages/models/src/index.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/model-typings/src/models/IMessagesModel.ts`
- `packages/model-typings/src/models/IMessageReadsModel.ts`
- `packages/model-typings/src/models/IEmailMessageHistoryModel.ts`
