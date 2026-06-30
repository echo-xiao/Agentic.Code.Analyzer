# How do you use a database model to query data in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat leverages Meteor's `Mongo.Collection` for database interactions, but it wraps these collections in its own model classes to provide a more structured and extensible way to query and manage data.

Here's a breakdown of how you use a database model to query data in Rocket.Chat:

### 1. Understanding Rocket.Chat's Model Structure

Rocket.Chat defines its database models primarily in the `app/models/server/raw/` directory. These models extend a `Base` class (e.g., `app/models/server/raw/Base.ts`) which provides common methods and wraps the underlying `Mongo.Collection`.

**Example Model Definition (`app/models/server/raw/Users.ts`):**

```typescript
import { BaseRaw } from './Base';
import { IUser } from '../../../definition/IUser';

export class UsersRaw extends BaseRaw<IUser> {
	constructor() {
		super('users'); // 'users' is the name of the MongoDB collection
	}

	// Custom query methods for the Users collection go here
	findByUsername(username: string, options?: FindOneOptions<IUser>): Promise<IUser | null> {
		return this.findOne({ username }, options);
	}

	// ... other custom methods
}
```

You'll typically interact with instances of these models, which are usually exported and made available globally or through dependency injection. For example, the `Users` model is often accessed as `RocketChat.models.Users` or directly imported.

### 2. Basic Querying with `find` and `findOne`

The core of querying comes from the `Mongo.Collection` methods `find` and `findOne`, which are exposed through Rocket.Chat's model instances.

#### `findOne(selector, options)`

Retrieves a single document that matches the `selector`.

*   **`selector`**: An object specifying the query criteria (e.g., `{ _id: 'someId' }`, `{ username: 'john.doe' }`).
*   **`options`**: An optional object for projection (`fields`), sorting (`sort`), etc.

**Example:** Get a user by their ID.

```typescript
import { UsersRaw } from '../../app/models/server/raw/Users'; // Assuming you're in a context where you can import it

// In a server-side context (e.g., a Meteor Method, a publication, or a background job)
async function getUserById(userId: string) {
	const user = await new UsersRaw().findOne({ _id: userId });
	if (user) {
		console.log(`Found user: ${user.username}`);
	} else {
		console.log('User not found.');
	}
	return user;
}

// Or, if you have a global instance like RocketChat.models.Users
async function getUserByIdGlobal(userId: string) {
	const user = await RocketChat.models.Users.findOne({ _id: userId });
	return user;
}
```

#### `find(selector, options)`

Retrieves multiple documents that match the `selector`. It returns a **cursor**, not the documents directly. You need to use `fetch()` on the cursor to get an array of documents.

*   **`selector`**: An object specifying the query criteria.
*   **`options`**: An optional object for projection (`fields`), sorting (`sort`), limiting (`limit`), skipping (`skip`), etc.

**Example:** Get the 10 most recent messages in a specific room.

```typescript
import { MessagesRaw } from '../../app/models/server/raw/Messages'; // Assuming import

async function getRecentMessages(roomId: string) {
	const messagesCursor = await new MessagesRaw().find(
		{ rid: roomId },
		{
			sort: { ts: -1 }, // Sort by timestamp descending
			limit: 10, // Get only 10 messages
			projection: { msg: 1, u: 1, ts: 1 }, // Only return these fields
		},
	);

	const messages = await messagesCursor.toArray(); // Convert cursor to array
	messages.forEach(message => {
		console.log(`[${message.u.username}] ${message.msg}`);
	});
	return messages;
}

// Or using the global instance
async function getRecentMessagesGlobal(roomId: string) {
	const messages = await RocketChat.models.Messages.find(
		{ rid: roomId },
		{
			sort: { ts: -1 },
			limit: 10,
			projection: { msg: 1, u: 1, ts: 1 },
		},
	).toArray(); // Use .toArray() directly on the promise if the model returns a promise-like cursor
	return messages;
}
```

### 3. Rocket.Chat's Custom Query Helpers

Rocket.Chat's model classes often include custom helper methods that encapsulate common query patterns, making the code cleaner and more readable.

**Example (`app/models/server/raw/Users.ts`):**

```typescript
// Inside UsersRaw class
findByUsername(username: string, options?: FindOneOptions<IUser>): Promise<IUser | null> {
	return this.findOne({ username }, options);
}

findActiveUsers(options?: FindOptions<IUser>): Promise<FindCursor<IUser>> {
	return this.find({ active: true }, options);
}
```

**Usage:**

```typescript
// Get a user by username using the custom helper
const userByUsername = await RocketChat.models.Users.findByUsername('jane.doe');

// Get all active users
const activeUsers = await RocketChat.models.Users.findActiveUsers({
	sort: { username: 1 },
	projection: { username: 1, emails: 1 },
}).toArray();
```

These custom methods are defined directly within the respective model files (e.g., `app/models/server/raw/Rooms.ts`, `app/models/server/raw/Messages.ts`, etc.).

### 4. Advanced Querying with `rawCollection()`

For more complex MongoDB operations that are not directly supported by `Mongo.Collection`'s `find` or `findOne` (like aggregations, specific update operators, or advanced indexing commands), Rocket.Chat's models provide access to the underlying native MongoDB collection via `rawCollection()`.

**Example: Performing an Aggregation**

```typescript
import { MessagesRaw } from '../../app/models/server/raw/Messages';

async function countMessagesPerUserInRoom(roomId: string) {
	const messagesCollection = await new MessagesRaw().rawCollection(); // Get the native collection

	const result = await messagesCollection.aggregate([
		{ $match: { rid: roomId } },
		{
			$group: {
				_id: '$u.username',
				count: { $sum: 1 },
			},
		},
		{ $sort: { count: -1 } },
	]).toArray();

	console.log('Message counts per user:', result);
	return result;
}
```

### Key Considerations:

*   **Server-Side Only:** Direct database queries using these models should almost exclusively happen on the server-side. Client-side data access in Meteor/Rocket.Chat is typically done through `Meteor.subscribe` and reactive data sources.
*   **`async`/`await`:** Modern Rocket.Chat code heavily uses `async`/`await` for database operations, as the underlying `rawCollection()` methods are asynchronous and even `Mongo.Collection` methods are often wrapped to return Promises.
*   **Performance:** Always consider indexing, limiting results, and projecting only necessary fields (`projection` or `fields` option) to optimize query performance.
*   **Security:** When building features, ensure that any user-provided input used in queries is properly sanitized and validated to prevent injection attacks.

By understanding these patterns, you can effectively query data within the Rocket.Chat codebase using its established model architecture.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,248 |
| Model | gemini-2.5-flash |
| Tools | NONE |
