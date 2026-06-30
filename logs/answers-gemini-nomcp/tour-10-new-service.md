# How do you add a new service in Rocket.Chat?

## Baseline Answer (no tools)

Adding a new "service" in Rocket.Chat typically refers to creating a new logical module or feature set within the existing Meteor application structure. While Rocket.Chat is moving towards a more microservices-oriented architecture for some components (like the `apps-engine` or `push` services), for most in-tree features, it still follows a modular pattern within the main monorepo.

The most common pattern for a new service involves creating a dedicated directory under `app/` and structuring its server-side, client-side, and shared logic.

Here's a step-by-step guide, focusing on the common `ServiceClass` pattern used in many Rocket.Chat modules:

### 1. Choose a Location and Create the Directory Structure

The standard place for a new service is within the `app/` directory.

```
app/
└── <your-service-name>/
    ├── client/          # Client-side code (UI, routes, subscriptions)
    │   ├── views/
    │   └── router.ts
    ├── lib/             # Shared code (e.g., ServiceClass definition, constants, types)
    │   └── Service.ts
    ├── server/          # Server-side code (methods, publications, startup, settings, permissions)
    │   ├── methods/
    │   ├── publications/
    │   ├── startup/
    │   ├── settings.ts
    │   └── permissions.ts
    └── tests/           # Tests for your service
        ├── client/
        └── server/
```

**Example:** Look at `app/livechat/`, `app/federation/`, or `app/apps/` for inspiration.

### 2. Define the Service Class (Recommended Pattern)

Many Rocket.Chat services use a `ServiceClass` pattern to encapsulate their logic.

**File:** `app/<your-service-name>/lib/Service.ts`

```typescript
import { ServiceClass } from '@rocket.chat/core-services'; // Or a similar base class if you need specific functionality

export class MyNewService extends ServiceClass {
	// The name of your service, used for logging and identification
	protected name = 'my-new-service';

	constructor() {
		super(); // Call the parent constructor

		// You can register methods directly here or in separate files
		// this.addMethod('myNewService.doSomething', this.doSomething);
	}

	// Lifecycle hook: Called when the service is initialized
	async onInit(): Promise<void> {
		this.logger.debug('MyNewService initialized');
		// Perform any initial setup here
	}

	// Lifecycle hook: Called when the service starts
	async onStart(): Promise<void> {
		this.logger.debug('MyNewService started');
		// Register methods, publications, observers, etc.
		this.registerMethods();
		this.registerPublications();
		this.registerObservers();
	}

	// Lifecycle hook: Called when the service stops (e.g., during shutdown)
	async onStop(): Promise<void> {
		this.logger.debug('MyNewService stopped');
		// Clean up resources
	}

	// --- Custom methods for your service ---

	private registerMethods(): void {
		// Example: Register a Meteor method
		Meteor.methods({
			'myNewService.doSomething': this.doSomething.bind(this),
			'myNewService.getData': this.getData.bind(this),
		});
	}

	private registerPublications(): void {
		// Example: Register a Meteor publication
		Meteor.publish('myNewService.allData', function (this: Meteor.Publication) {
			if (!this.userId) {
				return this.ready();
			}
			// Example: Return some data
			return MyCollection.find({});
		});
	}

	private registerObservers(): void {
		// Example: Observe changes in a collection
		// MyCollection.find({}).observeChanges({
		// 	added: (_id, fields) => this.logger.info('New item added', _id, fields),
		// });
	}

	public async doSomething(param1: string): Promise<string> {
		// Ensure user is logged in and has permission
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'User not authorized');
		}
		// Check permissions if needed
		// if (!hasPermission(Meteor.userId(), 'my-new-service-permission')) {
		// 	throw new Meteor.Error('not-allowed', 'Permission denied');
		// }

		this.logger.info(`Doing something with: ${param1}`);
		// ... service logic ...
		return `Processed: ${param1}`;
	}

	public async getData(): Promise<any[]> {
		// ... fetch data ...
		return [{ id: '1', value: 'test' }];
	}
}
```

### 3. Implement Server-Side Logic (Methods, Publications, Startup)

While you can register methods and publications directly in the `ServiceClass`, for larger services, it's common to separate them into dedicated files.

**File:** `app/<your-service-name>/server/methods/myMethod.ts`

```typescript
import { Meteor } from 'meteor/meteor';
import { MyNewService } from '../../lib/Service'; // Import your service instance

Meteor.methods({
	'myNewService.anotherMethod': async function (arg: string) {
		// Access your service instance if it's globally available or passed around
		// For simplicity, if you instantiate it in startup, you might need to export it.
		// Or, if your service methods are bound to the class, you don't need this.
		// This example assumes methods are registered *within* the service class.
		// If you want to define methods *outside* the service class but still use its logic:
		// const service = new MyNewService(); // Not ideal, creates new instance
		// OR: export a global instance from lib/Service.ts and import it here.
		// For the ServiceClass pattern, methods are usually registered *by* the service.
		console.log(`Another method called with: ${arg}`);
		return `Processed by another method: ${arg}`;
	},
});
```

**File:** `app/<your-service-name>/server/publications/myData.ts`

```typescript
import { Meteor } from 'meteor/meteor';
// import { MyCollection } from '../../lib/collections'; // If you have a collection

Meteor.publish('myNewService.someSpecificData', function (this: Meteor.Publication, userId: string) {
	if (!this.userId) {
		return this.ready();
	}
	// Example: Publish data based on a parameter
	// return MyCollection.find({ owner: userId });
	return this.ready(); // No data for this example
});
```

**File:** `app/<your-service-name>/server/startup/init.ts`

This is where you instantiate and start your service.

```typescript
import { Meteor } from 'meteor/meteor';
import { MyNewService } from '../../lib/Service';

// Instantiate your service
export const myNewServiceInstance = new MyNewService();

Meteor.startup(async () => {
	// Initialize and start the service
	await myNewServiceInstance.init();
	await myNewServiceInstance.start();
});
```

### 4. Add Settings (Optional but Recommended)

If your service needs configuration, define settings.

**File:** `app/<your-service-name>/server/settings.ts`

```typescript
import { settings } from '../../settings/server';

settings.addGroup('MyNewService', function () {
	this.add('MyNewService_Enabled', true, {
		type: 'boolean',
		group: 'MyNewService',
		public: true,
		i18nLabel: 'MyNewService_Enabled',
		i18nDescription: 'MyNewService_Enabled_Description',
	});

	this.add('MyNewService_API_Key', '', {
		type: 'string',
		group: 'MyNewService',
		public: false, // Keep sensitive settings private
		i18nLabel: 'MyNewService_API_Key',
		i18nDescription: 'MyNewService_API_Key_Description',
		secret: true,
	});
});
```

You can then access these settings using `settings.get('MyNewService_Enabled')` on the server.

### 5. Add Permissions (Optional)

If your service requires specific user roles or permissions.

**File:** `app/<your-service-name>/server/permissions.ts`

```typescript
import { api } from '../../api/server/sdk/api';

api.addPermission('access-my-new-service', ['admin', 'owner', 'moderator']);
api.addPermission('manage-my-new-service-settings', ['admin']);
```

You can check permissions using `hasPermission(userId, 'access-my-new-service')`.

### 6. Add Client-Side Components (Optional)

If your service has a UI, you'll add React components, Blaze templates, and potentially client-side routing.

**File:** `app/<your-service-name>/client/views/MyNewServicePage.tsx`

```typescript
import React from 'react';
import { useMethod, useSubscription } from '@rocket.chat/ui-contexts'; // Example hooks

const MyNewServicePage: React.FC = () => {
	const callDoSomething = useMethod('myNewService.doSomething');
	const { data: someData, isLoading: dataLoading } = useSubscription('myNewService.allData');

	const handleClick = async () => {
		try {
			const result = await callDoSomething('hello from client');
			console.log('Method result:', result);
		} catch (error) {
			console.error('Method error:', error);
		}
	};

	return (
		<div>
			<h1>My New Service Page</h1>
			<button onClick={handleClick}>Call Server Method</button>
			{dataLoading ? <p>Loading data...</p> : <pre>{JSON.stringify(someData, null, 2)}</pre>}
		</div>
	);
};

export default MyNewServicePage;
```

**File:** `app/<your-service-name>/client/router.ts` (for client-side routing)

```typescript
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { lazy } from 'react';

// Assuming you have a main layout template
import '../../client/main'; // Or wherever your main layout is defined

// Lazy load your React component
const MyNewServicePage = lazy(() => import('./views/MyNewServicePage'));

FlowRouter.route('/my-new-service', {
	name: 'my-new-service-page',
	action() {
		BlazeLayout.render('mainLayout', {
			center: MyNewServicePage, // Render your React component in the 'center' region
		});
	},
});
```

### 7. Testing

Write tests for your service logic.

**File:** `app/<your-service-name>/tests/server/unit/myService.test.ts`

```typescript
import { expect } from 'chai';
import { MyNewService } from '../../../lib/Service';
import { stub, restore } from 'sinon';
import { Meteor } from 'meteor/meteor';

describe('MyNewService', function () {
	let service: MyNewService;
	let userIdStub: sinon.SinonStub;

	beforeEach(function () {
		service = new MyNewService();
		userIdStub = stub(Meteor, 'userId').returns('test-user-id');
	});

	afterEach(function () {
		restore();
	});

	it('should return processed string when doSomething is called', async function () {
		const result = await service.doSomething('test-param');
		expect(result).to.equal('Processed: test-param');
	});

	it('should throw error if user is not authorized for doSomething', async function () {
		userIdStub.returns(null); // Simulate no logged-in user
		let error: any;
		try {
			await service.doSomething('test-param');
		} catch (e) {
			error = e;
		}
		expect(error).to.be.an.instanceOf(Meteor.Error);
		expect(error.error).to.equal('not-authorized');
	});
});
```

### Key Considerations:

*   **TypeScript:** Rocket.Chat heavily uses TypeScript. It's highly recommended to write your new service in TypeScript for better maintainability and type safety.
*   **Modularity:** Keep your service focused on a single responsibility.
*   **Error Handling:** Implement robust error handling for all server-side methods.
*   **Security:** Always validate user input and check permissions on the server.
*   **Settings vs. Hardcoding:** Use settings for any configurable values.
*   **Existing Patterns:** Look at how existing services like `app/livechat`, `app/federation`, `app/apps`, or `app/threads` are structured for best practices.
*   **Meteor's Build System:** Files in `app/` are automatically loaded by Meteor based on their directory structure (`lib` first, then `server`, then `client`).
*   **`@rocket.chat/core-services`:** This package provides a base `ServiceClass` and other utilities that are useful for building new services.

By following these steps, you can effectively integrate a new feature or module as a "service" within the Rocket.Chat codebase.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,801 |
| Model | gemini-2.5-flash |
| Tools | NONE |
