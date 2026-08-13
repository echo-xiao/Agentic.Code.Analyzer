## File: apps/meteor/packages/autoupdate/client_versions.js

```typescript
import { Tracker } from 'meteor/tracker';

export class ClientVersions {
	constructor() {
        /* Implementation Hidden */
    }

	// Creates a Livedata store for use with `Meteor.connection.registerStore`.
	// After the store is registered, document updates reported by Livedata are
	// merged with the documents in this `ClientVersions` instance.
	createStore() {
        /* Implementation Hidden */
    }

	hasVersions() {
        /* Implementation Hidden */
    }

	get(id) {
        /* Implementation Hidden */
    }

	// Adds or updates a version document and invokes registered callbacks for the
	// added/updated document. If a document with the given ID already exists, its
	// fields are merged with `fields`.
	set(id, fields) {
        /* Implementation Hidden */
    }

	// Registers a callback that will be invoked when a version document is added
	// or changed. Calling the function returned by `watch` removes the callback.
	// If `skipInitial` is true, the callback isn't be invoked for existing
	// documents. If `filter` is set, the callback is only invoked for documents
	// with ID `filter`.
	watch(fn, { skipInitial, filter } = {}) {
        /* Implementation Hidden */
    }

	// A reactive data source for `Autoupdate.newClientAvailable`.
	newClientAvailable(id, fields, currentVersion) {
        /* Implementation Hidden */
    }
}

```