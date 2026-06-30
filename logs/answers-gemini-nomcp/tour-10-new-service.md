# How do you add a new service in Rocket.Chat?

## Baseline Answer (no tools)

In Rocket.Chat, a "service" generally refers to a logical module that encapsulates specific business logic, interacts with the database, and exposes methods for other parts of the application (e.g., API endpoints, UI components, other services).

Rocket.Chat has evolved its service architecture, moving towards a more structured, class-based approach using TypeScript, particularly for new features. The modern approach heavily leverages the `@rocket.chat/sdk` package for service definition and client-server communication.

Here's a breakdown of how to add a new service, focusing on the modern best practices:

## Modern Approach: `server/services` and `app/sdk/client/services`

This is the recommended approach for new services that involve both server-side logic and potentially client-side interaction.

### 1. Server-Side Service Implementation

This is where your core business logic resides.

**a. Create the Service File:**

*   **Path:** `server/services/<your-service-name>/<your-service-name>.ts`
*   **Content:**
    *   Define a class that extends `ServiceClass` from `@rocket.chat/sdk`.
    *   Give it a unique `name`.
    *   Implement your business logic methods.
    *   Use dependency injection (`@inject`) to get access to other services, models, or utilities.

**Example: `server/services/example-preferences/ExamplePreferencesService.ts`**

```typescript
import { ServiceClass, AppEvents, registerService } from '@rocket.chat/sdk';
import { Settings } from '../../app/models/server'; // Example: Interacting with an existing model
import { Users } from '../../app/models/server';
import { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import { ILoggedInUser } from '@rocket.chat/apps-engine/definition/users';
import { PermissionsService } from '../permissions/permissions'; // Example: Injecting another service
import { inject } from 'tsyringe';

// Define the interface for the service methods (optional but good for type safety)
interface IExamplePreferencesService {
	getPreference(userId: string, key: string): Promise<any>;
	setPreference(userId: string, key: string, value: any): Promise<boolean>;
}

export class ExamplePreferencesService extends ServiceClass implements IExamplePreferencesService {
	public readonly name = 'ExamplePreferences'; // Unique service name

	// Inject other services or dependencies
	constructor(@inject('PermissionsService') private permissionsService: PermissionsService) {
		super();
	}

	protected onSetup(): void {
		// This method is called when the service is registered.
		// You can register DDP methods here, but usually, methods are automatically exposed if defined as public.
		// This is also a good place for initializations or event listeners.
		this.logger.debug('ExamplePreferencesService setup complete.');
	}

	protected onActivate(): void {
		// This method is called when the service becomes active.
		this.logger.debug('ExamplePreferencesService activated.');

		// Example: Registering an internal event listener
		this.api.onEvent(AppEvents.USER_CREATED, (user) => {
			this.logger.info(`New user created: ${user.username}. Initializing preferences...`);
			// You could call a method to set default preferences for new users here.
			// this.setDefaultPreferences(user._id);
		});
	}

	/**
	 * Retrieves a specific user preference.
	 * @param userId The ID of the user.
	 * @param key The preference key.
	 */
	public async getPreference(userId: string, key: string): Promise<any> {
		if (!userId || !key) {
			throw new Error('User ID and preference key are required.');
		}

		// Example permission check
		if (!(await this.permissionsService.hasPermission(userId, 'view-user-preferences'))) {
			throw new Error('Not authorized to view user preferences.');
		}

		// Example: Fetching from a custom collection or the Settings collection
		const user = Users.findOneById(userId);
		if (!user) {
			throw new Error('User not found.');
		}

		// In a real scenario, you'd likely have a dedicated collection for user preferences.
		// For this example, let's simulate fetching from user.settings (if it existed) or a generic setting.
		// const userPreference = UserPreferencesCollection.findOne({ userId, key });
		// return userPreference?.value;

		// Or, if it's a global setting that might be overridden:
		const setting = Settings.findOneById(key) as ISetting | undefined;
		if (setting) {
			// Logic to check if user has an override
			this.logger.debug(`Fetching preference "${key}" for user "${userId}".`);
			return setting.value; // Or user.settings[key] if implemented
		}

		return null;
	}

	/**
	 * Sets a specific user preference.
	 * @param userId The ID of the user.
	 * @param key The preference key.
	 * @param value The value to set.
	 */
	public async setPreference(userId: string, key: string, value: any): Promise<boolean> {
		if (!userId || !key) {
			throw new Error('User ID and preference key are required.');
		}

		// Example permission check
		if (!(await this.permissionsService.hasPermission(userId, 'edit-user-preferences'))) {
			throw new Error('Not authorized to edit user preferences.');
		}

		const user = Users.findOneById(userId);
		if (!user) {
			throw new Error('User not found.');
		}

		this.logger.debug(`Setting preference "${key}" to "${value}" for user "${userId}".`);

		// In a real scenario, you'd update a dedicated collection for user preferences.
		// Example: UserPreferencesCollection.upsert({ userId, key }, { $set: { value } });
		// For this example, let's just log and return true.
		this.logger.info(`User ${user.username} updated preference ${key} to ${value}`);

		// Simulate a database update
		return true;
	}
}
```

**b. Register the Service:**

*   **Path:** `server/services/<your-service-name>/index.ts`
*   **Content:** This file is responsible for importing and registering your service with Rocket.Chat's service manager.

**Example: `server/services/example-preferences/index.ts`**

```typescript
import { registerService } from '@rocket.chat/sdk';
import { ExamplePreferencesService } from './ExamplePreferencesService';

// Register the service using its class
registerService(ExamplePreferencesService);
```

### 2. Client-Side SDK (for Services Callable from the Client)

If your service needs to expose methods that can be called directly from the client (e.g., via DDP), you need to define a client-side SDK counterpart.

*   **Path:** `app/sdk/client/services/<your-service-name>.ts`
*   **Content:**
    *   Define a class with the *same name* as your server-side service.
    *   Extend `ServiceClass` from `@rocket.chat/sdk`.
    *   The methods in this client-side class will automatically `call` the corresponding server-side methods via DDP.

**Example: `app/sdk/client/services/ExamplePreferencesService.ts`**

```typescript
import { ServiceClass } from '@rocket.chat/sdk';
import { registerService } from '../../lib/services'; // Helper to register client services

interface IExamplePreferencesService {
	getPreference(key: string): Promise<any>;
	setPreference(key: string, value: any): Promise<boolean>;
}

export class ExamplePreferencesService extends ServiceClass implements IExamplePreferencesService {
	public readonly name = 'ExamplePreferences'; // MUST match the server-side service name

	// The `super()` call connects this client-side instance to the server-side service.
	// You don't need to explicitly call `this.call` for methods, as it's handled by ServiceClass.
	constructor() {
		super();
	}

	/**
	 * Retrieves a specific user preference from the server.
	 * @param key The preference key.
	 */
	public async getPreference(key: string): Promise<any> {
		// When called, this will invoke the server-side ExamplePreferencesService.getPreference method
		// The current user's ID is automatically passed by the DDP method invocation.
		return this.call<any>('getPreference', key);
	}

	/**
	 * Sets a specific user preference on the server.
	 * @param key The preference key.
	 * @param value The value to set.
	 */
	public async setPreference(key: string, value: any): Promise<boolean> {
		// When called, this will invoke the server-side ExamplePreferencesService.setPreference method
		// The current user's ID is automatically passed by the DDP method invocation.
		return this.call<boolean>('setPreference', key, value);
	}
}

// Register the client-side service for discovery
registerService(ExamplePreferencesService);
```
**Important Note:** The client-side `getPreference` and `setPreference` methods above only take `key` and `value` respectively. The `userId` is automatically determined by the DDP method context on the server side (i.e., `this.userId` in the server method). If you *need* to explicitly pass a `userId` from the client (e.g., for an admin action), ensure the server-side method handles permission checks carefully.

### 3. Integrate and Use the Service

**a. From Other Server-Side Services or Modules:**

You can inject your service into other services or access it directly.

*   **Using `@inject` (Recommended for services):**
    ```typescript
    import { ServiceClass, inject } from '@rocket.chat/sdk';
    import { ExamplePreferencesService } from '../example-preferences/ExamplePreferencesService';

    class MyOtherService extends ServiceClass {
        constructor(@inject('ExamplePreferencesService') private examplePrefs: ExamplePreferencesService) {
            super();
        }

        public async doSomethingWithPrefs(userId: string) {
            const pref = await this.examplePrefs.getPreference(userId, 'myCustomPref');
            console.log('User preference:', pref);
            await this.examplePrefs.setPreference(userId, 'myCustomPref', true);
        }
    }
    ```

*   **Using `ServiceManager.getService` (Less common, but possible):**
    ```typescript
    import { ServiceManager } from '@rocket.chat/sdk';

    const examplePrefs = ServiceManager.getService('ExamplePreferences') as ExamplePreferencesService;
    if (examplePrefs) {
        examplePrefs.getPreference('someUserId', 'someKey').then(console.log);
    }
    ```

**b. From Client-Side UI Components (React, Blaze):**

You typically interact with the client-side SDK.

```typescript
// In a client-side component (e.g., React hook, Blaze helper)
import { ServiceManager } from '@rocket.chat/sdk';
import { ExamplePreferencesService } from '../../app/sdk/client/services/ExamplePreferencesService'; // Ensure this path is correct for your project

// Get the client-side instance of your service
const examplePrefsClient = ServiceManager.getService('ExamplePreferences') as ExamplePreferencesService;

if (examplePrefsClient) {
    // Call methods on the client-side SDK, which will communicate with the server
    examplePrefsClient.getPreference('myClientPref').then((pref) => {
        console.log('Client-side preference:', pref);
    }).catch((error) => {
        console.error('Error fetching preference:', error);
    });

    examplePrefsClient.setPreference('myClientPref', 'someValue').then((success) => {
        console.log('Preference set:', success);
    }).catch((error) => {
        console.error('Error setting preference:', error);
    });
}
```

## Legacy Approach: `app/services` (Functional, Less Structured)

While still present, this approach is less preferred for new, complex features. It usually involves a single file defining a set of functions or a class that doesn't necessarily extend `ServiceClass` from the SDK.

*   **Path:** `app/services/<your-service-name>.js` (or `.ts`)
*   **Content:**
    ```javascript
    // app/services/legacy-example.js
    import { Meteor } from 'meteor/meteor';
    import { check } from 'meteor/check';
    import { Settings } from '../models/server'; // Example model import

    export const LegacyExampleService = {
      // Server-side method (can be called via Meteor.call if defined)
      getGlobalSetting(settingId) {
        check(settingId, String);
        return Settings.findOneById(settingId)?.value;
      },

      // Example of a purely internal server-side function
      _internalHelper() {
        // ...
      },

      // A method that might be exposed via Meteor.methods
      // Note: You'd still need to explicitly define this in server/methods or similar.
    };

    // To make it callable via Meteor.call, you'd typically do:
    // Meteor.methods({
    //   'legacyExample.getGlobalSetting': function(settingId) {
    //     // Add security checks here (e.g., this.userId, permissions)
    //     return LegacyExampleService.getGlobalSetting(settingId);
    //   },
    // });
    ```
*   **Usage:** You would import `LegacyExampleService` directly in other server files. For client-side access, you'd define `Meteor.methods` on the server and `Meteor.call` on the client.

## Key Considerations and Best Practices

1.  **Modularity:** Keep services focused on a single responsibility.
2.  **Type Safety:** Use TypeScript for all new services.
3.  **Dependency Injection (`@inject`):** Prefer injecting dependencies rather than using global singletons or direct imports of other services when possible. This improves testability and maintainability.
4.  **Security:** Always perform permission checks (`this.userId`, `hasPermission`) on the server-side methods, especially for methods callable from the client. Never trust client-side input.
5.  **Error Handling:** Implement robust error handling and throw meaningful exceptions.
6.  **Validation:** Validate all input parameters using `check` or a more advanced validation library.
7.  **Database Interactions:** Services often interact with the database. Use Rocket.Chat's existing model layer (e.g., `Users`, `Rooms`, `Settings`) or create new collections and models as needed.
8.  **Testing:** Write unit tests for your service logic.
9.  **Naming Conventions:** Use clear, descriptive names for your services and their methods (e.g., `NotificationService`, `PermissionService`).
10. **`onSetup()` and `onActivate()`:** These methods in `ServiceClass` are useful for initial setup, event listeners, and ensuring resources are ready when the service starts and becomes active.
11. **Client-Server Communication:** The `@rocket.chat/sdk`'s `ServiceClass` abstracts DDP methods, making client-server communication much simpler and type-safe.

By following the `server/services` and `app/sdk/client/services` pattern, you'll be aligning with Rocket.Chat's modern architecture, resulting in more robust, maintainable, and testable code.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,186 |
| Model | gemini-2.5-flash |
| Tools | NONE |
