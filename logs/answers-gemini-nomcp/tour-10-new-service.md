# How do you add a new service in Rocket.Chat?

## Baseline Answer (no tools)

Adding a new "service" in Rocket.Chat typically means creating a new logical module or feature domain within the existing monorepo that encapsulates specific business logic, data interactions, and potentially exposes an API. Rocket.Chat often organizes these within the `app/` directory or specifically `app/services/` for more backend-focused, reusable modules.

Here's a comprehensive guide on how to add a new service, covering common patterns and file locations:

## Understanding "Service" in Rocket.Chat

In Rocket.Chat, a "service" isn't usually a separate microservice running independently (unless you're talking about Enterprise features or specific external integrations). Instead, it's a well-defined module or set of files within the main codebase responsible for a particular functionality.

Common scenarios for creating a new service:
*   Integrating with an external system (e.g., a new push notification provider, a new payment gateway).
*   Encapsulating complex business logic that can be reused across different parts of the application.
*   Providing a new API surface for a specific feature.

Let's assume we want to create a service called `MyCoolService`.

## Core Steps and File Paths

### 1. **Directory Structure**

First, create a dedicated directory for your service. The most common patterns are:

*   **`app/services/<your-service-name>`**: Ideal for backend-focused services that might be consumed by various parts of the application (e.g., `app/services/federation`, `app/services/oauth`).
*   **`app/<your-feature-name>/server`**: If the service is tightly coupled to a specific feature that also has client-side components (e.g., `app/livechat/server`).

For this example, let's use `app/services/my-cool-service`.

```
Rocket.Chat/
├── app/
│   ├── services/
│   │   └── my-cool-service/
│   │       ├── server/
│   │       │   ├── my-cool-service.ts  <-- Main service logic
│   │       │   ├── settings.ts         <-- Service-specific settings
│   │       │   ├── methods.ts          <-- DDP/Meteor methods
│   │       │   ├── api.ts              <-- REST API endpoints
│   │       │   └── index.ts            <-- Entry point for server-side
│   │       └── lib/
│   │           └── index.ts            <-- Shared utility functions/types
│   └── (other app modules)
```

### 2. **Service Core Logic (`app/services/my-cool-service/server/my-cool-service.ts`)**

This file will contain the primary business logic for your service. It should be a class or an object that exports functions. Using a class is often preferred for better organization and type safety, especially with TypeScript.

```typescript
// app/services/my-cool-service/server/my-cool-service.ts
import { Settings } from '../../../settings/server';
import { SystemLogger } from '../../../logger/server';
import { IMyCoolServiceResult } from '../lib'; // Assuming types are defined in lib

class MyCoolService {
	private logger = new SystemLogger('MyCoolService');
	private someSettingValue: string | undefined;

	constructor() {
		this.initialize();
	}

	private async initialize() {
		// Watch for settings changes if your service depends on them
		Settings.watch('MyCoolService_Enabled', (value) => {
			this.logger.debug(`MyCoolService_Enabled changed to: ${value}`);
			// Handle enable/disable logic
		});

		Settings.watch('MyCoolService_ApiKey', (value) => {
			this.someSettingValue = value as string;
			this.logger.debug('MyCoolService API Key updated.');
		});

		// You can also fetch initial values
		this.someSettingValue = await Settings.get<string>('MyCoolService_ApiKey');

		this.logger.info('MyCoolService initialized');
	}

	public async performCoolAction(data: { input: string }): Promise<IMyCoolServiceResult> {
		this.logger.info(`Performing cool action with input: ${data.input}`);
		if (!this.someSettingValue) {
			throw new Error('MyCoolService is not configured. Missing API Key.');
		}
		// Simulate some async operation
		await new Promise(resolve => setTimeout(resolve, 500));

		const processedResult = `Processed: ${data.input.toUpperCase()} - using key: ${this.someSettingValue.substring(0, 5)}...`;
		this.logger.debug(`Cool action result: ${processedResult}`);

		return {
			success: true,
			output: processedResult,
			timestamp: new Date(),
		};
	}

	public async getStatus(): Promise<string> {
		return `MyCoolService is ${this.someSettingValue ? 'active' : 'inactive'}.`;
	}

	// ... other methods
}

export const myCoolService = new MyCoolService();
```

### 3. **Shared Utilities/Types (`app/services/my-cool-service/lib/index.ts`)**

This file is for types, interfaces, or utility functions that might be needed on both the client and server side (though for a pure backend service, it's mostly for types).

```typescript
// app/services/my-cool-service/lib/index.ts
export interface IMyCoolServiceResult {
	success: boolean;
	output: string;
	timestamp: Date;
}

export const SOME_SHARED_CONSTANT = 'shared-value';
```

### 4. **Service-Specific Settings (`app/services/my-cool-service/server/settings.ts`)**

Define any settings that configure your service. These will appear in the Rocket.Chat administration panel.

```typescript
// app/services/my-cool-service/server/settings.ts
import { settings } from '../../../settings/server';

settings.addGroup('MyCoolService', function () {
	this.add('MyCoolService_Enabled', true, {
		type: 'boolean',
		public: true,
		i18nLabel: 'MyCoolService_Enabled',
		i18nDescription: 'MyCoolService_Enabled_Description',
	});

	this.add('MyCoolService_ApiKey', '', {
		type: 'string',
		public: false, // Keep sensitive information private
		i18nLabel: 'MyCoolService_ApiKey',
		i18nDescription: 'MyCoolService_ApiKey_Description',
		secret: true, // Hides the value in the UI
	});

	this.add('MyCoolService_Endpoint', 'https://api.mycoolservice.com', {
		type: 'string',
		public: false,
		i18nLabel: 'MyCoolService_Endpoint',
	});
});
```

### 5. **Meteor Methods (DDP) (`app/services/my-cool-service/server/methods.ts`)**

If your service needs to expose functionality to the client side via DDP (real-time protocol), define Meteor methods.

```typescript
// app/services/my-cool-service/server/methods.ts
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { myCoolService } from './my-cool-service';
import { hasPermission } from '../../../authorization/server'; // For permission checks

Meteor.methods({
	'myCoolService:performAction'(input: string) {
		check(input, String);

		// Example permission check
		if (!Meteor.userId() || !hasPermission(Meteor.userId(), 'view-my-cool-service')) {
			throw new Meteor.Error('not-authorized', 'User not authorized to perform this action');
		}

		return myCoolService.performCoolAction({ input });
	},

	'myCoolService:getStatus'() {
		// This might not require specific permissions, or a lighter one
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'User not logged in');
		}
		return myCoolService.getStatus();
	},
});
```

### 6. **REST API Endpoints (`app/services/my-cool-service/server/api.ts`)**

For exposing a standard HTTP/REST API, use `API.v1.addRoute`. This is often preferred for integrations with external systems or when a stateless interaction is sufficient.

```typescript
// app/services/my-cool-service/server/api.ts
import { API } from '../../../api/server';
import { myCoolService } from './my-cool-service';

API.v1.addRoute('my-cool-service.performAction', { authRequired: true }, {
	post() {
		const { input } = this.bodyParams;
		if (typeof input !== 'string') {
			return API.v1.failure('Invalid input parameter. Must be a string.');
		}

		try {
			// You'd typically want to do permission checks here as well
			// E.g., if (!this.userId || !hasPermission(this.userId, 'some-permission')) { ... }

			const result = Promise.await(myCoolService.performCoolAction({ input })); // Use Promise.await for sync-like behavior in Meteor Fibers
			return API.v1.success({ result });
		} catch (error: any) {
			return API.v1.failure(error.message, error.statusCode || 500);
		}
	},
});

API.v1.addRoute('my-cool-service.status', { authRequired: false }, {
	get() {
		try {
			const status = Promise.await(myCoolService.getStatus());
			return API.v1.success({ status });
		} catch (error: any) {
			return API.v1.failure(error.message, error.statusCode || 500);
		}
	},
});
```

### 7. **Server-side Entry Point (`app/services/my-cool-service/server/index.ts`)**

This file ensures all server-side components of your service are loaded when the application starts.

```typescript
// app/services/my-cool-service/server/index.ts
import './settings';
import './methods';
import './api';
import './my-cool-service'; // Initialize the service instance
// If you have models, background jobs, etc., import them here too
```

### 8. **Global Server Initialization (`app/app.ts` or `server/startup/index.ts`)**

Ensure your service's server-side entry point is imported so it runs on startup.

```typescript
// app/app.ts (or server/startup/index.ts if it's a very core service)
// ... other imports
import '../app/services/my-cool-service/server'; // Add this line
```

### 9. **Permissions (`app/authorization/server/startup/permissions.ts`)**

If your service introduces new actions that require specific user roles, define permissions.

```typescript
// app/authorization/server/startup/permissions.ts
import { authorization } from '../index';

Meteor.startup(() => {
	// ... existing permissions

	authorization.addPermission('view-my-cool-service', ['admin', 'owner']);
	authorization.addPermission('perform-my-cool-service-action', ['admin', 'owner', 'user']);
});
```

### 10. **Translations (`i18n/en.i18n.json` and others)**

Add translation keys for your settings, UI elements, and any messages.

```json
// i18n/en.i18n.json
{
  "MyCoolService_Enabled": "Enable My Cool Service",
  "MyCoolService_Enabled_Description": "Activates the functionality of My Cool Service.",
  "MyCoolService_ApiKey": "My Cool Service API Key",
  "MyCoolService_ApiKey_Description": "The secret API key for My Cool Service integration.",
  "not-authorized": "Not Authorized"
}
```

### 11. **Database Interactions (if applicable)**

If your service needs its own data, define a new collection and model.

*   **Collection Declaration (`app/models/server/raw/MyCoolServiceCollection.ts`)**

    ```typescript
    // app/models/server/raw/MyCoolServiceCollection.ts
    import { MongoInternals } from 'meteor/mongo';

    export const MyCoolServiceCollection = new MongoInternals.RemoteCollection('my_cool_service_data');
    ```

*   **Model (`app/models/server/MyCoolService.ts`)**

    ```typescript
    // app/models/server/MyCoolService.ts
    import { BaseDb } from './_BaseDb';
    import { MyCoolServiceCollection } from './raw/MyCoolServiceCollection';

    interface IMyCoolServiceData {
        _id: string;
        userId: string;
        timestamp: Date;
        data: any;
    }

    class MyCoolServiceDb extends BaseDb<IMyCoolServiceData> {
        constructor() {
            super(MyCoolServiceCollection);
        }

        async create(userId: string, data: any): Promise<string> {
            const record = {
                userId,
                timestamp: new Date(),
                data,
            };
            const result = await this.col.insertOne(record);
            return result.insertedId;
        }

        findByUserId(userId: string) {
            return this.col.find({ userId }).toArray();
        }
    }

    export const MyCoolService = new MyCoolServiceDb();
    ```

    Then you'd use `MyCoolService` from your `my-cool-service.ts` file.

### 12. **Background Jobs (optional) (`app/agenda/server/index.ts` or `app/services/my-cool-service/server/background-jobs.ts`)**

If your service needs to schedule periodic tasks, integrate with Agenda.

```typescript
// app/services/my-cool-service/server/background-jobs.ts
import { Agenda } from 'agenda';
import { SystemLogger } from '../../../logger/server';
import { myCoolService } from './my-cool-service';

const agendaLogger = new SystemLogger('MyCoolServiceAgenda');

Meteor.startup(() => {
	const agenda = Agenda.create({ db: { address: process.env.MONGO_URL } }); // Ensure Mongo URL is set

	agenda.define('my-cool-service-cleanup', async (job) => {
		agendaLogger.info('Running my-cool-service-cleanup job...');
		try {
			// Example: Call a method on your service
			// await myCoolService.cleanupOldData();
			agendaLogger.info('my-cool-service-cleanup job completed.');
		} catch (error) {
			agendaLogger.error('Error in my-cool-service-cleanup job:', error);
		}
	});

	// Schedule the job
	agenda.on('ready', () => {
		agenda.every('0 0 * * *', 'my-cool-service-cleanup'); // Run daily at midnight
		agenda.start();
	});

	agenda.on('error', (err) => agendaLogger.error('Agenda error:', err));
});
```
*And then import `background-jobs.ts` in your `app/services/my-cool-service/server/index.ts`.*

### 13. **Client-Side Integration (if applicable)**

If your service has a UI component:

*   **Client Entry Point (`app/services/my-cool-service/client/index.ts`)**
    This would import client-side UI, routes, or helper functions.
*   **Routes (`client/router.ts`)**
    Define new routes using `FlowRouter.route`.
*   **UI Components (`client/views`, `client/components`)**
    Build React or Blaze components to interact with your service via Meteor methods or REST API.

## Best Practices

*   **TypeScript First:** Use TypeScript for all new code to leverage type safety and better tooling.
*   **Logger:** Use `SystemLogger` for consistent logging.
*   **Settings:** Centralize configuration through the `settings` API.
*   **Permissions:** Always implement robust permission checks, especially for methods and API endpoints.
*   **Error Handling:** Provide meaningful error messages and handle exceptions gracefully.
*   **Modularity:** Keep your service focused on a single responsibility.
*   **Testing:** Write unit and integration tests for your service logic.
    *   `tests/unit/server/services/my-cool-service.test.ts`
*   **Documentation:** Add comments to your code and update the Rocket.Chat documentation if it's a significant feature.

By following these steps, you can effectively add and integrate a new service into the Rocket.Chat ecosystem.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,624 |
| Model | gemini-2.5-flash |
| Tools | NONE |
