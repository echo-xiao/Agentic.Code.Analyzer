# How do you create a new REST API endpoint in Rocket.Chat?

## Baseline Answer (no tools)

Creating a new REST API endpoint in Rocket.Chat involves using its internal API framework, primarily the `API.v1.addRoute` function. Most v1 API endpoints reside in the `app/api/server/v1/` directory.

Here's a step-by-step guide:

### 1. Locate the API Directory

The core API definitions are located in `app/api/server/v1/`. You can either:
*   Add your new endpoint to an existing file if it logically belongs there (e.g., `users.js` for user-related endpoints, `channels.js` for channel-related ones).
*   Create a new JavaScript file in this directory (e.g., `app/api/server/v1/myCustomEndpoint.js`) for a new domain of endpoints. Meteor's build system will automatically pick up new files in this directory.

### 2. Define Your Endpoint Using `API.v1.addRoute`

Each endpoint (or a group of related endpoints) is defined using `API.v1.addRoute`.

**Example: `app/api/server/v1/myCustomEndpoint.js`**

```javascript
import { API } from '../api'; // Adjust the import path as needed for your file's location
import { hasPermission } from '../../authorization/server/functions/hasPermission'; // Example for permission checks

API.v1.addRoute('my-custom-endpoint', {
	// ------------------------------------------------------------------------------------------------------
	// --- GET /api/v1/my-custom-endpoint -------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	/**
	 * @swagger
	 *   /api/v1/my-custom-endpoint:
	 *     get:
	 *       summary: Retrieves a custom message
	 *       description: A simple endpoint to demonstrate API creation.
	 *       security:
	 *         - accessToken: []
	 *         - xAuthToken: []
	 *       parameters:
	 *         - in: query
	 *           name: optionalParam
	 *           schema:
	 *             type: string
	 *           description: An optional query parameter.
	 *       responses:
	 *         200:
	 *           description: Successful operation.
	 *           content:
	 *             application/json:
	 *               schema:
	 *                 type: object
	 *                 properties:
	 *                   success:
	 *                     type: boolean
	 *                   message:
	 *                     type: string
	 *                   paramValue:
	 *                     type: string
	 *                     nullable: true
	 *         401:
	 *           description: Unauthorized
	 *         403:
	 *           description: Not authorized to view this endpoint
	 *
	 */
	authRequired: true, // Set to `true` if authentication is required for ALL methods in this route definition.
	get() {
		// --- 1. Authentication and Authorization ---
		// `authRequired: true` ensures `this.userId` and `this.user` are available if the user is logged in.
		// For more granular permission checks:
		if (!hasPermission(this.userId, 'view-full-other-user-info')) { // Example: Replace with relevant permission
			return API.v1.failure({ statusCode: 403, error: 'Not authorized to access this endpoint.' });
		}

		// --- 2. Accessing Request Parameters ---
		// For GET requests, query parameters are in `this.queryParams`.
		const { optionalParam } = this.queryParams;

		// For path parameters (e.g., `/users/:id`), they would be in `this.urlParams`.
		// const { id } = this.urlParams;

		// --- 3. Business Logic and Database Interactions ---
		// It's recommended to call existing Meteor methods or dedicated service functions
		// that encapsulate business logic and database operations.
		// Example: const data = Meteor.call('someServerMethod', optionalParam, this.userId);
		// Or directly query a collection (use with caution, prefer services/methods):
		// const users = RocketChat.models.Users.find({ roles: 'admin' }).fetch();

		let responseMessage = `Hello from your custom Rocket.Chat API endpoint! User ID: ${this.userId}`;
		if (optionalParam) {
			responseMessage += ` You provided optionalParam: "${optionalParam}"`;
		}

		// --- 4. Responding to the Client ---
		return API.v1.success({
			message: responseMessage,
			paramValue: optionalParam,
		});
	},

	// ------------------------------------------------------------------------------------------------------
	// --- POST /api/v1/my-custom-endpoint ------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	/**
	 * @swagger
	 *   /api/v1/my-custom-endpoint:
	 *     post:
	 *       summary: Processes a custom payload
	 *       description: Demonstrates handling POST requests.
	 *       security:
	 *         - accessToken: []
	 *         - xAuthToken: []
	 *       requestBody:
	 *         required: true
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 name:
	 *                   type: string
	 *                   description: A name to process.
	 *                   example: "Test Name"
	 *                 value:
	 *                   type: number
	 *                   description: A numeric value.
	 *                   example: 123
	 *       responses:
	 *         200:
	 *           description: Successful operation.
	 *           content:
	 *             application/json:
	 *               schema:
	 *                 type: object
	 *                 properties:
	 *                   success:
	 *                     type: boolean
	 *                   message:
	 *                     type: string
	 *                   receivedName:
	 *                     type: string
	 *                   receivedValue:
	 *                     type: number
	 *         400:
	 *           description: Missing required parameters
	 *         401:
	 *           description: Unauthorized
	 *
	 */
	post() {
		// `this.bodyParams` contains the parsed JSON body for POST/PUT requests.
		const { name, value } = this.bodyParams;

		if (!name || value === undefined) {
			return API.v1.failure({ statusCode: 400, error: 'Missing required parameters: name and value.' });
		}

		// Perform some operation with `name` and `value`.
		// Example: const newRecord = SomeService.createRecord(name, value, this.userId);

		return API.v1.success({
			message: `Successfully received and processed: Name - "${name}", Value - "${value}"`,
			receivedName: name,
			receivedValue: value,
		});
	},

	// You can also define other HTTP methods like `put`, `delete`, `patch`, etc.
	// put() { /* ... */ },
	// delete() { /* ... */ },
});
```

### Key Concepts Explained:

1.  **`API.v1.addRoute(path, definition)`**:
    *   `path`: The path for your endpoint, relative to `/api/v1/`. You can use placeholders for URL parameters (e.g., `'users/:userId/messages'`).
    *   `definition`: An object that defines the behavior for different HTTP methods.

2.  **`authRequired: true/false`**:
    *   If `true`, the endpoint will require a valid user authentication token (`X-Auth-Token` and `X-User-Id` headers, or an `accessToken` in query params) to be provided. If not, it will return a `401 Unauthorized` error.
    *   If `false`, the endpoint is publicly accessible.

3.  **`this` Context within Method Handlers**:
    Inside `get()`, `post()`, etc., `this` provides access to request-specific data:
    *   `this.queryParams`: An object containing key-value pairs from the URL query string (e.g., `?param=value`).
    *   `this.urlParams`: An object containing key-value pairs for parameters defined in the route path (e.g., for `/users/:id`, `this.urlParams.id` would be available).
    *   `this.bodyParams`: An object containing the parsed JSON body of the request (for POST, PUT, PATCH methods).
    *   `this.request`: The raw Node.js `http.IncomingMessage` object.
    *   `this.response`: The raw Node.js `http.ServerResponse` object.
    *   `this.userId`: The ID of the authenticated user (if `authRequired: true`).
    *   `this.user`: The full user object of the authenticated user (if `authRequired: true`).

4.  **Responding to the Client**:
    *   `API.v1.success(data)`: Use this for successful responses. `data` will be wrapped in a `{ success: true, ...data }` object and sent with a `200 OK` status.
    *   `API.v1.failure({ statusCode, message, error, errors })`: Use this for error responses. `statusCode` is typically `400`, `401`, `403`, `404`, `500`, etc. The `error` or `message` will be sent to the client along with `{ success: false }`.

5.  **Authentication and Authorization**:
    *   The `authRequired: true` flag handles basic authentication.
    *   For specific permission checks, use the `hasPermission` function (imported from `app/authorization/server/functions/hasPermission`) within your method handler, checking against `this.userId` and the required permission string.

6.  **Swagger Documentation (Optional but Recommended)**:
    Rocket.Chat uses JSDoc-style comments with Swagger/OpenAPI annotations to generate its API documentation. It's good practice to include these comments above your method definitions to document your endpoint's parameters, responses, and security requirements.

### 3. Restart Rocket.Chat

After adding or modifying API files, you need to restart your Rocket.Chat server for the changes to take effect.

### Example Usage (cURL):

Assuming your Rocket.Chat instance is running on `http://localhost:3000`:

**GET request (without optionalParam):**

```bash
curl -X GET \
  -H "X-Auth-Token: <YOUR_AUTH_TOKEN>" \
  -H "X-User-Id: <YOUR_USER_ID>" \
  http://localhost:3000/api/v1/my-custom-endpoint
```

**GET request (with optionalParam):**

```bash
curl -X GET \
  -H "X-Auth-Token: <YOUR_AUTH_TOKEN>" \
  -H "X-User-Id: <YOUR_USER_ID>" \
  "http://localhost:3000/api/v1/my-custom-endpoint?optionalParam=testValue"
```

**POST request:**

```bash
curl -X POST \
  -H "X-Auth-Token: <YOUR_AUTH_TOKEN>" \
  -H "X-User-Id: <YOUR_USER_ID>" \
  -H "Content-Type: application/json" \
  -d '{ "name": "My New Item", "value": 42 }' \
  http://localhost:3000/api/v1/my-custom-endpoint
```

By following these steps, you can successfully add new REST API endpoints to your Rocket.Chat instance.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 5,441 |
| Model | gemini-2.5-flash |
| Tools | NONE |
