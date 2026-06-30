# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you should use the `API.v1` (or `API.default` for legacy APIs) object and its specific HTTP method functions (`get`, `post`, `put`, `delete`). The `addRoute` method is deprecated.

The general process is as follows:

1.  **Identify the API object:** Most new endpoints should be added to `API.v1`.
    *   `apps/meteor/app/api/server/api.ts`
2.  **Choose the HTTP method:** Select the appropriate method (`get`, `post`, `put`, `delete`) based on your endpoint's functionality. These methods are part of the `APIClass`.
    *   `apps/meteor/app/api/server/ApiClass.ts`
3.  **Define the endpoint:** Call the chosen method with the following parameters:
    *   `subpath`: The URL path for your endpoint (e.g., `'/my-new-endpoint'`).
    *   `options`: An object specifying various settings for the endpoint, such as `authRequired` (boolean), `permissions` (array of strings), `rateLimiterOptions`, `validateParams`, etc.
    *   `action`: An asynchronous function that will be executed when the endpoint is called. This function receives `this` context with properties like `queryParams`, `bodyParams`, `request`, `response`, `userId`, `user`, etc.

**Call Chain:**
`Entry` (e.g., a new file defining your endpoint) → `API.v1.get/post/put/delete` → `APIClass.method` (internal handling of the route) → `Router.method` (from Hono library)

**Example (conceptual):**

Imagine you want to create a new GET endpoint at `/api/v1/my-new-endpoint` that returns a simple message.


```typescript
// In a new file, e.g., apps/meteor/app/api/server/v1/myNewEndpoint.ts
import { API } from '../api'; // Adjust the import path as necessary

API.v1.get(
	'my-new-endpoint',
	{
		authRequired: true, // Example: This endpoint requires authentication
		permissions: ['view-l-room'], // Example: User needs 'view-l-room' permission
	},
	async function () {
		// Access request data:
		// const { myParam } = this.queryParams;
		// const userId = this.userId;

		// Perform some server-side logic
		const message = `Hello from your new API endpoint, ${this.user?.username || 'Guest'}!`;

		// Return a success response
		return API.v1.success({
			message,
		});
	},
);
```


**Key Files Involved:**

*   `apps/meteor/app/api/server/api.ts`: Defines the `API` object and initializes `API.v1` and `API.default`.
*   `apps/meteor/app/api/server/ApiClass.ts`: Contains the `APIClass` definition, which provides the `get`, `post`, `put`, and `delete` methods for registering routes.
*   `apps/meteor/app/api/server/v1/users.ts` (and other similar files): Examples of how existing API endpoints are defined using `API.v1.addRoute` (or the newer `get`/`post`/etc. methods).

## Tool Calls (8 calls, 50,550 tokens)

**Step 1:** `search({"query":"rest api","layer":"server"})` → 295 tokens
**Step 2:** `graph({"direction":"down","layer":"server","file":"apps/meteor/app/api/server/api.ts","query":"startRestAP)` → 1618 tokens
**Step 3:** `implement({"symbolName":"startRestAPI","filename":"apps/meteor/app/api/server/api.ts"})` → 153 tokens
**Step 4:** `search({"query":"API.v1","layer":"server"})` → 285 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/api/server/v1/users.ts","symbolName":"API.v1.addRoute"})` → 43 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"API"})` → 259 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"APIClass"})` → 1578 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass.addRoute"})` → 1712 tokens
