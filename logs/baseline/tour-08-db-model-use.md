# How do you use a database model to query data in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat leverages MongoDB as its primary database, and interacts with it primarily through Meteor's `Mongo.Collection` objects. These `Mongo.Collection` instances effectively serve as your "database models" in the Rocket.Chat codebase.

Here's a breakdown of how you use them to query data:

### 1. Defining the Database Model (Collection)

Database models are typically defined in the `app/models/` directory. They are instances of `Mongo.Collection` and often have a `SimplSchema` attached for validation.

**Example: `app/models/Rooms.js`**

```javascript
import { Mongo } from 'meteor/mongo';
import { attachSchema } from './_Base'; // A base utility for attaching schemas
import { roomSchema } from '../../lib/schemas/room'; // The schema definition

// The collection itself, representing the 'rooms' model
export const Rooms = new Mongo.Collection('rocketchat_room');

// Attach the schema for validation on insert/update
attachSchema(Rooms, roomSchema);

// Additional methods or helper functions related to rooms can be added here
// For example:
// Rooms.findByUserAndName = (userId, name) => Rooms.findOne({ t: 'c', name, 'uids': userId });
```

**Key Points:**

*   `new Mongo.Collection('rocketchat_room')`: This creates a collection object named `Rooms` that maps to the `rocketchat_room` collection in your MongoDB instance. Rocket.Chat typically prefixes its collections with `rocketchat_`.
*   `attachSchema(Rooms, roomSchema)`: While not directly for querying, this is crucial for defining the structure and validation rules for the `Rooms` model, ensuring data integrity when *inserting* or *updating*.

### 2. Basic Querying Syntax

Once you have a collection object, you can use standard MongoDB query syntax via Meteor's `find()` and `findOne()` methods.

#### `Rooms.find(query, options)`

Returns a `Mongo.Cursor` which can be reactive on the client-side or converted to an array using `.fetch()` on the server-side.

*   **Find all rooms:**
    ```javascript
    const allRoomsCursor = Rooms.find({});
    // On server: allRoomsCursor.fetch(); // Returns an array
    ```

*   **Find rooms with specific criteria:**
    ```javascript
    // Find all public channels
    const publicChannels = Rooms.find({ t: 'c' });

    // Find a direct message room between two specific users
    const dmRoom = Rooms.find({ t: 'd', uids: { $all: ['userId1', 'userId2'] } });
    ```

*   **Find rooms with projection (select specific fields):**
    ```javascript
    // Find rooms, but only return _id and name
    const roomNames = Rooms.find({}, { fields: { _id: 1, name: 1 } });
    ```

*   **Find rooms with sorting and limiting:**
    ```javascript
    // Find the 10 most recently created rooms
    const latestRooms = Rooms.find({}, { sort: { createdAt: -1 }, limit: 10 });
    ```

#### `Rooms.findOne(query, options)`

Returns a single document (object) or `undefined` if no document matches.

*   **Find a room by its `_id`:**
    ```javascript
    const roomById = Rooms.findOne('room-id-here'); // Shorthand for { _id: 'room-id-here' }
    ```

*   **Find a room by its name:**
    ```javascript
    const generalRoom = Rooms.findOne({ name: 'general' });
    ```

*   **Find a room with specific fields:**
    ```javascript
    const roomWithReducedFields = Rooms.findOne({ name: 'general' }, { fields: { _id: 1, t: 1 } });
    ```

### 3. Where to Query

The context of where you query is important due to Meteor's isomorphic nature and security considerations.

#### a. Server-Side (Recommended for most operations)

On the server, you have direct access to the full `Mongo.Collection` and all its data. This is where most complex queries and data manipulations should occur for security and data integrity.

*   **Within a Meteor Method (`server/methods/`):**
    Methods are invoked by clients to perform server-side logic and return data.

    **Example: `server/methods/getRoomInfo.js`**
    ```javascript
    import { Meteor } from 'meteor/meteor';
    import { Rooms } from '../../app/models/Rooms'; // Import your model

    Meteor.methods({
        'getRoomInfo'(roomId) {
            // Ensure the user is logged in
            if (!this.userId) {
                throw new Meteor.Error('not-authorized');
            }

            // Perform the query directly on the server
            const room = Rooms.findOne(roomId, {
                fields: {
                    _id: 1,
                    name: 1,
                    t: 1,
                    description: 1,
                    usersCount: 1,
                },
            });

            // Implement access checks here
            // e.g., if (!RocketChat.authz.hasPermission('view-c-room', this.userId, room._id)) { ... }

            return room;
        },
    });
    ```

*   **Within a Meteor Publication (`server/publications/`):**
    Publications send reactive data from the server to specific client subscriptions. The `find()` call within a publication defines *what* data is sent.

    **Example: `server/publications/room.js`**
    ```javascript
    import { Meteor } from 'meteor/meteor';
    import { Rooms } from '../../app/models/Rooms'; // Import your model

    Meteor.publish('stream-room-messages', function(roomId, limit = 50) {
        // Ensure user is logged in
        if (!this.userId) {
            return this.ready();
        }

        // Add permission checks (very common in RC)
        // if (!RocketChat.authz.hasPermission('view-c-room', this.userId, roomId)) {
        //    return this.ready();
        // }

        // This query defines the data that will be sent to the client
        return Rooms.find({ _id: roomId }, {
            fields: {
                _id: 1,
                name: 1,
                t: 1,
                // ... other fields the client needs for this publication
            },
        });
    });
    ```

*   **Directly in server-side logic:**
    For internal server processes, API endpoints (using `RocketChat.API.v1` or similar), or background jobs.

    **Example: `server/startup/createDefaultRooms.js`**
    ```javascript
    import { Rooms } from '../../app/models/Rooms';

    Meteor.startup(() => {
        if (Rooms.find({ name: 'general', t: 'c' }).count() === 0) {
            Rooms.insert({
                name: 'general',
                t: 'c',
                // ... other room properties
            });
        }
    });
    ```

#### b. Client-Side (Subscribed Data Only)

On the client, `Mongo.Collection` instances (like `Rooms`) only contain the subset of data that the client has *subscribed* to via publications. A client-side `Rooms.find()` will only query this local, in-memory cache.

**Example: `client/components/room/roomInfo.js` (a React component or Blaze helper)**

```javascript
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'; // For reactive data in React
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../app/models/Rooms';

const RoomInfo = ({ roomId }) => {
    // Subscribe to the 'stream-room-messages' publication
    // This will populate the client-side Rooms collection with data for roomId
    Meteor.subscribe('stream-room-messages', roomId);

    const room = useTracker(() => {
        // This query runs on the client's local cache of the Rooms collection
        return Rooms.findOne(roomId, {
            fields: { name: 1, t: 1, description: 1 },
        });
    }, [roomId]); // Re-run if roomId changes

    if (!room) {
        return <div>Loading room info...</div>;
    }

    return (
        <div>
            <h2>{room.name}</h2>
            <p>Type: {room.t === 'c' ? 'Channel' : 'DM'}</p>
            <p>{room.description}</p>
        </div>
    );
};

export default RoomInfo;
```

### 4. Advanced Querying (Aggregation)

For more complex queries that involve grouping, joining (lookup), or intricate data transformations, Rocket.Chat can also leverage MongoDB's **Aggregation Framework**. This is typically done directly on the server-side, using the collection's underlying raw collection access.

```javascript
import { Rooms } from '../../app/models/Rooms';

async function getRoomStats() {
    const pipeline = [
        {
            $match: {
                t: 'c', // Only public channels
            },
        },
        {
            $group: {
                _id: null, // Group all documents
                totalChannels: { $sum: 1 },
                avgUsers: { $avg: '$usersCount' },
            },
        },
    ];

    // Access the raw collection and run the aggregation
    const result = await Rooms.rawCollection().aggregate(pipeline).toArray();
    return result;
}
```

### Summary of Querying in Rocket.Chat:

1.  **Models are `Mongo.Collection` instances:** Typically found in `app/models/`.
2.  **`find()` and `findOne()`:** Are the primary methods for querying.
3.  **Server-side is crucial:** Most data fetching and manipulation happen within Meteor Methods or Publications for security and access control.
4.  **Client-side queries local data:** Only queries data already subscribed to from the server.
5.  **Schemas provide structure:** `SimplSchema` is used to define the data model and validate insertions/updates.
6.  **Aggregation for complex queries:** Use `rawCollection().aggregate()` for advanced use cases.

By following these patterns, Rocket.Chat effectively manages its data interactions within the Meteor framework and MongoDB.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,024 |
| Model | gemini-2.5-flash |
| Tools | NONE |
