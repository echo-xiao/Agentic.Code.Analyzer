# How are new endpoints registered in the REST API in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat primarily uses the **Restivus** Meteor package to define and register its REST API endpoints, specifically for the `/api/v1` routes.

Here's a breakdown of how it works:

### 1. The Core Mechanism: `API.v1.addRoute`

Most of the `v1` REST API endpoints are registered using the `API.v1.addRoute` method.

**Location:** You'll find endpoint definitions primarily within the `app/api/server/v1/` directory. Each file in this directory typically groups related endpoints.

**Example (from `app/api/server/v1/users.ts`):**

```typescript
import { API } from '../_lib/v1/methods'; // This imports the Restivus instance

// ... other imports and helper functions ...

API.v1.addRoute('users.list', { authRequired: true }, {
	get() {
		const { offset, count, fields, query } = this.parseJsonQuery();
		const { sort, projection, options } = this.get)//getFindOptions({ offset, count, fields });
		
		// Ensure that the query does not return "bot" users if hideBots is enabled
		const findQuery = query;

		// If the hideBots setting is enabled, add a query to filter out bots
		const hideBots = settings.get('Hide_Bots_From_Search');
		if (hideBots) {
			findQuery.roles = { $ne: 'bot' };
		}
		
		// Find users based on the constructed query and options
		const { cursor, total } = Users.findPaginated(findQuery, options);

		return API.v1.success({
			users: cursor.fetch(),
			count: cursor.count(),
			offset,
			total,
		});
	},
});

API.v1.addRoute('users.create', { authRequired: true }, {
	post() {
		// ... logic for creating a user ...
	},
});
```

**Explanation:**

1.  **`API.v1` Object:** This is an instance of the `Restivus` class, configured specifically for the `v1` API. It's initialized in `app/api/server/_lib/v1/methods.ts`.
2.  **`addRoute(routeName, options, handlers)`:**
    *   **`routeName`**: A string that defines the path for the endpoint. `Restivus` automatically prepends `/api/v1/` to this. So, `'users.list'` becomes `/api/v1/users.list`, and `'users.create'` becomes `/api/v1/users.create`. If you use a path with slashes, like `'users/:userId/info'`, it will correctly handle path parameters.
    *   **`options`**: An object for route-specific configurations:
        *   `authRequired: true/false`: Indicates if the user needs to be authenticated to access this endpoint.
        *   `roleRequired: 'admin'` (or an array of roles): Restricts access to users with specific roles.
        *   `rateLimit: true/false`: Enables/disables rate limiting for this route.
        *   `middleware`: Custom Express-style middleware functions can be added here.
    *   **`handlers`**: An object where keys are HTTP verbs (`get`, `post`, `put`, `delete`, `patch`) and values are the corresponding handler functions. Inside these functions, `this` refers to the route context provided by `Restivus`, which includes methods like `parseJsonQuery()`, `getLoggedInUser()`, `bodyParams`, `queryParams`, etc.

### 2. Restivus Initialization (`API.v1` instance)

The `API.v1` object, which is the core of the v1 REST API, is initialized in:

**File:** `app/api/server/_lib/v1/methods.ts`

```typescript
import { Restivus } from 'meteor/nimble:restivus';
import { settings } from '../../../../settings/server';
import { getPaginationItems } from '../../../../lib/server/functions/getPaginationItems';

class APIClass extends Restivus {
	constructor(options = {}) {
		super(options);
		// ... additional configuration ...
	}
}

export const API = {
	v1: new APIClass({
		version: 'v1',
		apiPath: 'api/', // This means routes will be at /api/v1/...
		use;//UseAuth: true,
		prettyJson: true,
		enableCors: true,
		// ... more global configurations ...
	}),
};

// ... further global configuration or helper methods for API.v1 ...
```

Here, `API.v1` is instantiated, and global options like `version`, `apiPath`, `useAuth`, `prettyJson`, and `enableCors` are set. These global options can then be overridden or extended at the individual route level using the `options` parameter in `addRoute`.

### 3. Other API Registration Mechanisms (Less Common for `v1` REST)

While `Restivus` handles most of the `/api/v1` routes, Rocket.Chat also uses other mechanisms:

*   **Internal DDP Methods:** Many functionalities are exposed as DDP (Distributed Data Protocol) methods. These aren't REST endpoints directly, but they form the basis for much of the real-time functionality and can sometimes be called via a REST wrapper if needed for external integrations.
*   **Custom Express Routes:** For highly specific, non-`v1` API routes (e.g., certain webhook integrations or very old legacy routes), you might find direct Express-style route definitions using `WebApp.connectHandlers.use()` or similar, but this is rare for new development.
*   **Apps-Engine API:** For Rocket.Chat Apps (the extensibility framework), apps can define their own custom API endpoints. These are registered through the Apps-Engine itself and typically follow a path like `/api/apps/public/:appId/`. This is a separate routing layer managed by the Apps-Engine.

### In Summary:

To register a new REST API endpoint in Rocket.Chat (for the primary `/api/v1` API):

1.  **Create/Edit a file** in `app/api/server/v1/` (e.g., `myNewFeature.ts`).
2.  **Import `API`** from `../_lib/v1/methods`.
3.  **Use `API.v1.addRoute`** to define your endpoint, specifying the route name, authentication/authorization options, and handler functions for the desired HTTP verbs.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,895 |
| Model | gemini-2.5-flash |
| Tools | NONE |
