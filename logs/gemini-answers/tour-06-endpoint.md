# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint, you add a new route to the `API.v1` object. This process involves creating a new file and using the `API.v1.addRoute()` method to define the endpoint's path, options, and handlers.

### Call Chain and File Locations

The chain for defining and registering an endpoint is straightforward. Your code calls `addRoute` on the `API.v1` object, which then configures middleware and registers the route with the underlying web server.

`Your file → API.v1.addRoute() → APIClass.addRoute() → Router registration`

1.  **API Object Definition**: `apps/meteor/app/api/server/api.ts`
    This file contains the `createApi` factory function that instantiates the `API.v1` object as an instance of `APIClass`.

2.  **API Class Implementation**: `apps/meteor/app/api/server/ApiClass.ts`
    This file holds the core logic for the REST API, including the `addRoute` method. This method is responsible for adding middleware for authentication, rate limiting, permissions, and error handling to your endpoint's handler.

3.  **Endpoint Examples**: `apps/meteor/app/api/server/v1/`
    This directory contains numerous files where existing endpoints are defined. A very simple example is the `info` endpoint, typically found in a file like `misc.ts`.

### How to Create a New Endpoint

Follow these steps to create a new endpoint (e.g., `/api/v1/my-endpoint`):

**1. Create a New File**

Create a new TypeScript file in the API directory, for example: `apps/meteor/app/api/server/v1/myEndpoint.ts`.

**2. Use `API.v1.addRoute` to Define the Endpoint**

In your new file, call `API.v1.addRoute` to define the endpoint. While the method is marked as deprecated in favor of newer typed methods (`.get()`, `.post()`), `addRoute` is still widely used and demonstrates the core concepts clearly.

The `addRoute` method takes three main arguments:
*   **Path**: The URL path for your endpoint (e.g., `'my-endpoint'`).
*   **Options**: An object to configure the endpoint, most importantly `authRequired: true` or `false`. You can also set permissions via `permissionsRequired`.
*   **Operations**: An object where keys are HTTP methods (e.g., `get`, `post`) and values are the handler functions.

**3. Implement the Handler Function**

The handler function is where your endpoint's logic lives. Inside the handler, the `this` context provides access to request data:
*   `this.queryParams`: For URL query parameters.
*   `this.bodyParams`: For the JSON body of a POST/PUT request.
*   `this.user`: The user object, if `authRequired: true`.
*   `this.userId`: The ID of the authenticated user.

To return a response, use the helper methods `API.v1.success(data)` for a 200 OK response or `API.v1.failure(message, errorType)` for an error.

### Example: A Simple `GET` Endpoint

Here is a complete example for `apps/meteor/app/api/server/v1/myEndpoint.ts`:


```typescript
import { API } from '../api';

// Defines a new endpoint at /api/v1/my-endpoint
API.v1.addRoute('my-endpoint', {
	// This endpoint requires the user to be authenticated
	authRequired: true,
	// Optional: define role permissions required to access this endpoint
	permissionsRequired: ['view-l-room'],
	// General information about the endpoint for documentation
	info: {
		name: 'myEndpoint',
		description: 'An example endpoint that returns user information.',
		// Describe expected query parameters for documentation purposes
		parameters: [
			{ name: 'active', in: 'query', description: 'Filters for active users', required: false, type: 'boolean' },
		],
	},
}, {
	// This block defines the handler for the GET HTTP method
	get() {
		// Access the authenticated user's data
		const { user } = this;

		// Access query parameters, e.g., /api/v1/my-endpoint?active=true
		const { active } = this.queryParams;
		console.log(`Filter active users: ${active}`);

		// Return a successful response with a JSON payload
		return API.v1.success({
			message: `Hello, ${user.username}!`,
			user,
		});
	},
	// You could add other methods like post, put, delete here
	// post() {
	//   const { myParam } = this.bodyParams;
	//   ...
	//   return API.v1.success();
	// }
});
```

## Tool Calls (5 calls, 23,413 tokens)

**Step 1:** `search({"query":"API.v1.addRoute","layer":"server"})` → 419 tokens
**Step 2:** `graph({"query":"API.v1.addRoute","direction":"down","layer":"server"})` → 14 tokens
**Step 3:** `search({"layer":"server","query":"createApi"})` → 215 tokens
**Step 4:** `implement({"symbolName":"createApi","filename":"apps/meteor/app/api/server/api.ts"})` → 104 tokens
**Step 5:** `implement({"symbolName":"APIClass.addRoute","filename":"apps/meteor/app/api/server/api.ts"})` → 1712 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/4 |
| Tool calls | 5 |
| Total tokens | 23,413 |
| Pass | NO |
