# How do you create a new database model in Rocket.Chat?

## Baseline Answer (no tools)

Creating a new database model in Rocket.Chat involves defining a MongoDB collection, attaching a schema using SimpleSchema, and integrating it into Rocket.Chat's data layer, often by extending its `_Base` model class.

Here's a step-by-step guide with file paths and code examples:

### 1. Choose a Model Name and Collection Name

*   **Model Name (Class Name):** Use PascalCase (e.g., `MyCustomEntity`). This will be accessible via `RocketChat.models.MyCustomEntity`.
*   **Collection Name (MongoDB):** Use snake_case and plural (e.g., `my_custom_entities`). This is the actual name of the collection in MongoDB.

### 2. Create the Model File

Rocket.Chat's server-side models are typically located in `app/models/server/`.

**File Path:** `app/models/server/MyCustomEntity.js`

```javascript
// app/models/server/MyCustomEntity.js

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; // For schema definition
import { Base } from './_lib/_Base'; // The base class for Rocket.Chat models

/**
 * @class MyCustomEntity
 * @extends Base
 *
 * This class represents a new custom database model for Rocket.Chat.
 * It extends the `Base` class, which handles the `Mongo.Collection`
 * creation and registration with `RocketChat.models`.
 */
class MyCustomEntity extends Base {
	constructor() {
		super('my_custom_entities'); // The actual MongoDB collection name
	}

	// Define the SimpleSchema for this model
	static schema = new SimpleSchema({
		_id: {
			type: String,
			regEx: SimpleSchema.RegEx.Id,
		},
		name: {
			type: String,
			unique: true,
			min: 3,
			max: 100,
			label: 'Entity Name',
		},
		description: {
			type: String,
			optional: true,
			max: 500,
			label: 'Entity Description',
		},
		ownerId: {
			type: String,
			regEx: SimpleSchema.RegEx.Id,
			label: 'Owner User ID',
		},
		status: {
			type: String,
			allowedValues: ['active', 'inactive', 'pending'],
			defaultValue: 'pending',
			label: 'Status',
		},
		createdAt: {
			type: Date,
			autoValue() {
				if (this.isInsert) {
					return new Date();
				} else if (this.isUpsert) {
					return { $setOnInsert: new Date() };
				}
				this.unset(); // Prevent user from supplying a value
			},
			denyUpdate: true,
		},
		updatedAt: {
			type: Date,
			autoValue() {
				if (this.isUpdate) {
					return new Date();
				}
			},
			optional: true, // It can be optional on insert if only updated on subsequent changes
		},
	});

	// Attach the schema to the collection (this happens automatically when extending Base if `schema` is static)
	// You might explicitly attach it in the constructor if not using a static property
	// MyCustomEntity.attachSchema(MyCustomEntity.schema);

	/**
	 * Helper method to find an entity by its name.
	 * @param {string} name - The name of the entity.
	 * @returns {object} The entity document or null.
	 */
	findByName(name, options) {
		check(name, String);
		return this.findOne({ name }, options);
	}

	/**
	 * Helper method to create a new entity.
	 * @param {object} data - The entity data.
	 * @returns {string} The ID of the newly created entity.
	 */
	create(data) {
		check(data, {
			name: String,
			description: Match.Maybe(String),
			ownerId: String,
			status: Match.Maybe(String),
		});

		// SimpleSchema validation will run automatically on insert/update
		return this.insert(data);
	}

	/**
	 * Helper method to update an existing entity.
	 * @param {string} entityId - The ID of the entity to update.
	 * @param {object} changes - The fields to update.
	 */
	updateById(entityId, changes) {
		check(entityId, String);
		check(changes, Object); // SimpleSchema will validate the changes against the schema

		return this.update(entityId, { $set: changes });
	}

	/**
	 * Helper method to delete an entity.
	 * @param {string} entityId - The ID of the entity to delete.
	 */
	removeById(entityId) {
		check(entityId, String);
		return this.remove(entityId);
	}
}

// Instantiate the model and make it accessible via RocketChat.models
// The `Base` class constructor already does this, but for clarity:
// RocketChat.models.MyCustomEntity = new MyCustomEntity();
// The `app/models/server/index.js` file will automatically instantiate and register this class.
```

### Explanation of Key Parts:

1.  **`import { Base } from './_lib/_Base';`**:
    *   `app/models/server/_lib/_Base.js` is the base class for most Rocket.Chat models. It handles the instantiation of `Mongo.Collection` and registers the model under `RocketChat.models`.
    *   By extending `Base`, your model automatically gets a `Mongo.Collection` instance and is added to `RocketChat.models`.

2.  **`class MyCustomEntity extends Base`**:
    *   Defines your new model class.

3.  **`constructor() { super('my_custom_entities'); }`**:
    *   The `super()` call passes the collection name (`my_custom_entities`) to the `Base` class constructor. This is what creates the `Mongo.Collection` instance for your model.

4.  **`static schema = new SimpleSchema({...});`**:
    *   This static property defines the schema for your collection using `aldeed:simple-schema`.
    *   **`_id`**: Always include `_id` with `SimpleSchema.RegEx.Id`.
    *   **`createdAt`, `updatedAt`**: Common fields using `autoValue` to automatically set timestamps.
    *   **`optional`, `unique`, `allowedValues`, `defaultValue`, `min`, `max`, `label`**: Use these properties for validation and documentation.
    *   When you extend `Base` and define a static `schema`, the schema is automatically attached to the underlying `Mongo.Collection` by the `Base` class's initialization logic.

5.  **Helper Methods (`findByName`, `create`, `updateById`, `removeById`)**:
    *   These are methods defined directly on your `MyCustomEntity` class.
    *   They provide a cleaner, more encapsulated API for interacting with your collection, abstracting away direct `insert`, `update`, `findOne`, `find`, `remove` calls.
    *   **`check`**: It's good practice to use `Meteor.check` to validate arguments passed to your methods.
    *   When you call `this.insert()`, `this.update()`, etc., the SimpleSchema validation automatically runs.

### 3. Ensure the Model is Loaded

Rocket.Chat's `app/models/server/index.js` usually has a mechanism to load all `.js` files in the `app/models/server/` directory. By simply placing your `MyCustomEntity.js` file in that directory, it should be automatically loaded and instantiated.

You can verify this by searching for `RocketChat.models.MyCustomEntity` in a server console or in other files.

### 4. Integrate with Rocket.Chat (Methods and Publications)

To interact with your new model from the client, you'll need to define Meteor Methods and Publications.

**a. Publication (for fetching data from the server):**

**File Path:** `app/publications/server/myCustomEntity.js` (or similar, e.g., in a new `app/publications/server/custom/` folder)

```javascript
// app/publications/server/myCustomEntity.js

import { Meteor } from 'meteor/meteor';
import { RocketChat } from '/app/rocketchat'; // Access RocketChat global object

Meteor.publish('myCustomEntities.list', function (filter = {}, options = {}) {
	if (!this.userId) {
		return this.ready();
	}

	// Example: Only allow admins to see all entities
	if (!RocketChat.authz.hasPermission(this.userId, 'view-custom-entities')) { // You'd define this permission
		// Or restrict to entities owned by the user
		filter.ownerId = this.userId;
	}

	// Return the cursor for the subscription
	return RocketChat.models.MyCustomEntity.find(filter, options);
});

Meteor.publish('myCustomEntities.getById', function (entityId) {
	if (!this.userId) {
		return this.ready();
	}

	// Similar permission checks as above
	return RocketChat.models.MyCustomEntity.find({ _id: entityId });
});
```

**b. Methods (for performing actions like create, update, delete):**

**File Path:** `app/lib/server/methods/myCustomEntity.js` (or `app/methods/server/myCustomEntity.js` if you prefer that convention)

```javascript
// app/lib/server/methods/myCustomEntity.js

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RocketChat } from '/app/rocketchat'; // Access RocketChat global object

Meteor.methods({
	'myCustomEntity.create'(data) {
		check(data, {
			name: String,
			description: Match.Maybe(String),
			ownerId: String, // Ensure this matches the current user for security, or has admin override
			status: Match.Maybe(String),
		});

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'User not logged in');
		}

		// Example: Check if the user has permission to create custom entities
		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-custom-entity')) {
			throw new Meteor.Error('not-authorized', 'User does not have permission to create entities');
		}

		// Ensure ownerId is consistent with the logged-in user unless an admin is doing it
		if (data.ownerId !== Meteor.userId() && !RocketChat.authz.hasPermission(Meteor.userId(), 'create-custom-entity-for-other-users')) {
			throw new Meteor.Error('not-authorized', 'Cannot create entity for another user');
		}

		return RocketChat.models.MyCustomEntity.create(data);
	},

	'myCustomEntity.update'(entityId, changes) {
		check(entityId, String);
		check(changes, Object);

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'User not logged in');
		}

		// Retrieve the existing entity to check ownership or specific permissions
		const entity = RocketChat.models.MyCustomEntity.findOne(entityId);
		if (!entity) {
			throw new Meteor.Error('not-found', 'Entity not found');
		}

		// Permission check: User is owner OR has admin permission
		if (entity.ownerId !== Meteor.userId() && !RocketChat.authz.hasPermission(Meteor.userId(), 'edit-all-custom-entities')) {
			throw new Meteor.Error('not-authorized', 'User does not own this entity or have permission to edit it');
		}

		return RocketChat.models.MyCustomEntity.updateById(entityId, changes);
	},

	'myCustomEntity.remove'(entityId) {
		check(entityId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'User not logged in');
		}

		const entity = RocketChat.models.MyCustomEntity.findOne(entityId);
		if (!entity) {
			throw new Meteor.Error('not-found', 'Entity not found');
		}

		// Permission check: User is owner OR has admin permission
		if (entity.ownerId !== Meteor.userId() && !RocketChat.authz.hasPermission(Meteor.userId(), 'remove-all-custom-entities')) {
			throw new Meteor.Error('not-authorized', 'User does not own this entity or have permission to remove it');
		}

		return RocketChat.models.MyCustomEntity.removeById(entityId);
	},
});
```

### 5. Client-Side Integration (Subscribing and Calling Methods)

On the client, you would subscribe to the publications and call the methods:

```javascript
// Example client-side code (e.g., in a UI component)

import { Meteor } from 'meteor/meteor';

// To access the collection directly on the client (usually for local data or specific reactive needs)
// Note: This collection will only contain data published by the server.
const MyCustomEntities = new Mongo.Collection('my_custom_entities');

// Subscribe to data
const sub = Meteor.subscribe('myCustomEntities.list', { status: 'active' }, { sort: { name: 1 } });

if (sub.ready()) {
    const activeEntities = MyCustomEntities.find({ status: 'active' }).fetch();
    console.log(activeEntities);
}

// Call a method to create a new entity
Meteor.call('myCustomEntity.create', {
    name: 'New Rocket Entity',
    description: 'This is a brand new entity for Rocket.Chat',
    ownerId: Meteor.userId(), // Assuming current user is the owner
}, (error, result) => {
    if (error) {
        console.error('Error creating entity:', error);
    } else {
        console.log('Entity created with ID:', result);
    }
});
```

### 6. Consider Migrations

If your schema changes in a way that requires existing data to be updated (e.g., adding a new required field, renaming a field), you'll need to create a migration. Rocket.Chat uses `rocketchat:migrations`.

**File Path:** `private/migrations/<timestamp_or_version>-my-custom-entity-migration.js`

```javascript
// private/migrations/202301010001-add-status-field-to-mycustomentities.js

import { Migrations } from 'meteor/rocketchat:migrations';
import { RocketChat } from '/app/rocketchat'; // Access RocketChat global object

Migrations.add({
	version: 202301010001, // Use a unique, incremental timestamp or version number
	up() {
		// Code to run when migrating UP to this version
		// For example, adding a default status to existing documents
		RocketChat.models.MyCustomEntity.update(
			{ status: { $exists: false } },
			{ $set: { status: 'active' } }, // Set a default value for existing docs
			{ multi: true }
		);

		// Or migrating data structures
		// RocketChat.models.MyCustomEntity.find({ oldField: { $exists: true } }).forEach((doc) => {
		//   RocketChat.models.MyCustomEntity.update(doc._id, {
		//     $set: { newField: doc.oldField },
		//     $unset: { oldField: 1 },
		//   });
		// });
	},
	down() {
		// Code to run when migrating DOWN from this version (optional, but good for rollback)
		// For example, removing the status field or reverting changes
		RocketChat.models.MyCustomEntity.update(
			{ status: { $exists: true } },
			{ $unset: { status: 1 } },
			{ multi: true }
		);
	},
});
```

By following these steps, you can effectively create and integrate a new database model into your Rocket.Chat instance. Remember to always prioritize security by implementing robust permission checks in your methods and publications.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,801 |
| Model | gemini-2.5-flash |
| Tools | NONE |
