# How do you create a new database model in Rocket.Chat?

## Baseline Answer (no tools)

To create a new database model in Rocket.Chat, you follow a pattern that leverages its existing model abstraction built on top of MongoDB. Rocket.Chat uses `app/models/lib/Base.js` as a foundational class for all its database models, providing common CRUD (Create, Read, Update, Delete) operations.

Here's a step-by-step guide:

### 1. Create the Model File

*   **Location**: New server-side database models are typically located in `app/models/server/`.
*   **Filename**: Name your file descriptively, e.g., `MyNewModel.js`.

### 2. Define the Model Class

Your model class will extend `RocketChat.models.Base` (or `Base` if imported directly).

**File Path Example:** `app/models/server/MyNewModel.js`

```javascript
import { Base } from '../lib/Base'; // Path to RocketChat.models.Base

// If you plan to define a schema and potentially use it for manual validation,
// you might import SimpleSchema (if 'simpl-schema' package is installed).
// import SimpleSchema from 'simpl-schema';

class MyNewModel extends Base {
	constructor() {
		// Call the parent constructor with the *actual MongoDB collection name*.
		// This name will be used in your database.
		super('my_new_collection_name');

		// --- Recommended: Create MongoDB Indexes ---
		// Define indexes for frequently queried fields to improve performance.
		// These are created when the server starts.
		this._collection.createIndex({ name: 1 }, { unique: true }); // Example: Ensure 'name' is unique
		this._collection.createIndex({ userId: 1 }); // Example: Index by user ID for common lookups
		this._collection.createIndex({ status: 1, createdAt: -1 }); // Example: Compound index for status and latest items
	}

	// --- Optional: Define a Schema for Documentation and Validation ---
	// While Rocket.Chat's `Base` doesn't automatically enforce this schema
	// like `aldeed:collection2` would, it's highly recommended to define one
	// for clarity, documentation, and to use for manual validation within your methods.
	schema = {
		_id: { type: String, optional: true }, // MongoDB _id, usually auto-generated
		name: { type: String, unique: true, min: 3, max: 100 },
		description: { type: String, optional: true, max: 500 },
		status: { type: String, allowedValues: ['active', 'inactive', 'archived'], defaultValue: 'active' },
		createdAt: { type: Date, autoValue: function() { if (this.isInsert) return new Date(); }, optional: true },
		updatedAt: { type: Date, autoValue: function() { if (this.isUpdate) return new Date(); }, optional: true },
		userId: { type: String }, // The user who created this item
		metadata: { type: Object, blackbox: true, optional: true }, // Flexible field for additional data
	};

	// --- Custom Data Access and Manipulation Methods ---
	// You should add methods specific to your model here.
	// These methods typically wrap or extend the basic operations provided by `Base`.

	/**
	 * Finds all active items, optionally filtered by a user.
	 * @param {string} [userId] Optional user ID to filter items by.
	 * @param {object} [options] MongoDB query options (sort, fields, limit, skip).
	 * @returns {Mongo.Cursor} A Meteor/MongoDB cursor to the matching documents.
	 */
	findActive(userId, options = {}) {
		const query = { status: 'active' };
		if (userId) {
			query.userId = userId;
		}
		return this.find(query, options); // `this.find` is inherited from `Base`
	}

	/**
	 * Finds a single item by its unique name.
	 * @param {string} name The unique name of the item.
	 * @param {object} [options] MongoDB query options.
	 * @returns {object|null} The item document or null if not found.
	 */
	findOneByName(name, options = {}) {
		return this.findOne({ name: name }, options); // `this.findOne` is inherited from `Base`
	}

	/**
	 * Creates and inserts a new item into the collection.
	 * @param {object} doc The document data to insert. Must contain 'name' and 'userId'.
	 * @returns {string} The `_id` of the newly inserted document.
	 */
	create(doc) {
		// Example of basic validation before insertion
		if (!doc.name || !doc.userId) {
			throw new Meteor.Error('invalid-data', 'Name and userId are required to create a new item.');
		}
		// You could use `SimpleSchema.validate(doc, this.schema)` here for stricter validation.

		const newDoc = {
			...doc,
			createdAt: new Date(),
			status: doc.status || 'active', // Set default status if not provided
		};

		return this.insert(newDoc); // `this.insert` is inherited from `Base`
	}

	/**
	 * Updates an item's status by its `_id`.
	 * @param {string} _id The ID of the item to update.
	 * @param {string} newStatus The new status ('active', 'inactive', 'archived').
	 * @returns {number} The number of documents modified.
	 */
	updateStatus(_id, newStatus) {
		// Validate against allowed values in the schema
		if (!this.schema.status.allowedValues.includes(newStatus)) {
			throw new Meteor.Error('invalid-status', `Invalid status value: ${newStatus}`);
		}
		return this.update({ _id: _id }, { $set: { status: newStatus, updatedAt: new Date() } }); // `this.update` is inherited from `Base`
	}

	/**
	 * Removes an item from the collection by its `_id`.
	 * @param {string} _id The ID of the item to remove.
	 * @returns {number} The number of documents removed.
	 */
	removeById(_id) {
		return this.remove({ _id: _id }); // `this.remove` is inherited from `Base`
	}
}

// --- Register the Model with RocketChat.models ---
// This makes your model globally accessible throughout the Rocket.Chat server.
// The `RocketChat` global object is populated during server startup.
if (typeof RocketChat !== 'undefined' && RocketChat.models) {
	RocketChat.models.MyNewModel = new MyNewModel();
}

// In modern Rocket.Chat code, you might explicitly export the class
// and then instantiate it in an index file, but the above direct assignment
// to `RocketChat.models` is common in existing server models.
```

### Key Concepts Explained:

1.  **`app/models/lib/Base.js`**: This is the core abstraction for Rocket.Chat's MongoDB models. It encapsulates a `Mongo.Collection` instance and provides common methods (`find`, `findOne`, `insert`, `update`, `remove`) as well as convenience methods like `findBy*` and `findOneBy*`.
2.  **`super('my_new_collection_name')`**: In your constructor, you *must* call `super()` with the desired MongoDB collection name. This initializes the `Base` class with a `Mongo.Collection` instance linked to that specific collection.
3.  **`this._collection.createIndex()`**: It's crucial to define MongoDB indexes in your model's constructor. Indexes significantly speed up query performance, especially on fields you frequently query or sort by. For example, if you often search by `userId`, an index on `userId` is essential.
4.  **`schema` property (Optional but Recommended)**: Although `Base.js` doesn't automatically enforce a schema, defining a `schema` property on your model class is a strong convention in Rocket.Chat. It serves as:
    *   **Documentation**: Clearly outlines the expected structure of documents in your collection.
    *   **Validation Reference**: You can use this schema manually within your custom methods (e.g., before `insert` or `update`) for data validation, potentially using a package like `simpl-schema`.
5.  **Custom Methods**: Implement methods like `findActive`, `findOneByName`, `create`, `updateStatus`, etc. These methods encapsulate specific business logic for querying and manipulating data in your collection, making your code cleaner and more maintainable. They typically leverage the `this.find()`, `this.findOne()`, `this.insert()`, `this.update()`, and `this.remove()` methods inherited from `Base.js`.
6.  **`RocketChat.models.MyNewModel = new MyNewModel()`**: This line is critical. It instantiates your model and assigns it to the global `RocketChat.models` object, making it accessible by its name (`RocketChat.models.MyNewModel`) from anywhere else on the server-side.

By following this pattern, your new model will seamlessly integrate with Rocket.Chat's database layer and be available for use in methods, publications, and other server-side logic.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,955 |
| Model | gemini-2.5-flash |
| Tools | NONE |
