# How do you create a new REST API endpoint in Rocket.Chat?

## Baseline Answer (no tools)

Creating a new REST API endpoint in Rocket.Chat involves defining a new route using the `API.v1.addRoute` method. Most of the API endpoints are located in the `app/api/server/v1/` directory.

Here's a step-by-step guide with an example:

### 1. Choose or Create a New API File

You can either add your new endpoint to an existing API file (e.g., `app/api/server/v1/users.js` for user-related endpoints) or create a new file for a new domain of endpoints. For a new domain, it's best to create a new file in `app/api/server/v1/` (e.g., `app/api/server/v1/myCustomFeature.js`).

Rocket.Chat automatically loads all files within the `app/api/server/v1/` directory, so you don't need to explicitly register your new file.

### 2. Define the Route using `API.v1.addRoute`

Inside your chosen or new file, you'll use `API.v1.addRoute` to define your endpoint.

**Example: Creating a simple `/api/v1/my-custom-feature` endpoint**

Let's create a new file: `app/api/server/v1/myCustomFeature.js`

```javascript
// app/api/server/v1/myCustomFeature.js

import { API } from '../api'; // Import the API instance

// Define a new route for /api/v1/my-custom-feature
API.v1.addRoute('my-custom-feature', { authRequired: true }, {
	/**
	 * @summary Get information about the custom feature
	 * @route GET /api/v1/my-custom-feature
	 * @returns {object} JSON object with feature details
	 */
	get() {
		// Access query parameters if needed
		const { param1, param2 } = this.queryParams;

		// Perform some logic
		const featureData = {
			id: 'custom-feature-123',
			name: 'My Awesome Custom Feature',
			status: 'active',
			requestedParams: { param1, param2 },
			userId: this.userId, // The ID of the authenticated user
		};

		// Return a success response
		return API.v1.success(featureData);
	},

	/**
	 * @summary Create or update the custom feature
	 * @route POST /api/v1/my-custom-feature
	 * @body {string} name - The name of the feature
	 * @body {string} description - A description
	 * @returns {object} JSON object with success status
	 */
	post() {
		// Access body parameters
		const { name, description } = this.bodyParams;

		if (!name) {
			return API.v1.failure('Name is required for creating the feature.');
		}

		// Perform some logic, e.g., save to database
		console.log(`User ${this.userId} is creating/updating feature: ${name} - ${description}`);

		// Return a success response
		return API.v1.success({
			message: 'Custom feature processed successfully!',
			name,
			description,
			userId: this.userId,
		});
	},

	/**
	 * @summary Delete the custom feature
	 * @route DELETE /api/v1/my-custom-feature/:id
	 * @param {string} id - The ID of the feature to delete
	 * @returns {object} JSON object with success status
	 */
	delete() {
		// Access URL parameters (e.g., from /my-custom-feature/:id)
		const { id } = this.urlParams;

		if (!id) {
			return API.v1.failure('Feature ID is required for deletion.');
		}

		// Perform deletion logic
		console.log(`User ${this.userId} is deleting feature with ID: ${id}`);

		// Return a success response
		return API.v1.success({
			message: `Custom feature with ID ${id} deleted successfully.`,
			userId: this.userId,
		});
	},
});
```

### Key Components Explained:

1.  **`import { API } from '../api';`**:
    *   This imports the main API instance from `app/api/server/api.js`. All API routes are registered against this instance.

2.  **`API.v1.addRoute('my-custom-feature', { authRequired: true }, { ... });`**:
    *   **`'my-custom-feature'`**: This is the path segment for your route. The full path will be `/api/v1/my-custom-feature`. You can also define URL parameters here, e.g., `'my-custom-feature/:id'`.
    *   **`{ authRequired: true }`**: This is an options object.
        *   `authRequired: true` (default for most routes) means the user must be logged in and provide a valid `X-Auth-Token` and `X-User-Id` in the request headers.
        *   Set to `false` for public endpoints.
        *   Other options can include `permissions` for fine-grained access control (e.g., `permissions: ['view-l-room']`).
    *   **`{ ... }`**: This is an object where you define the handler functions for different HTTP methods (GET, POST, PUT, DELETE, etc.).

3.  **Handler Functions (`get()`, `post()`, `delete()`)**:
    *   Each function corresponds to an HTTP method.
    *   **`this` context**: Inside these functions, `this` refers to the current request context, providing useful properties:
        *   `this.userId`: The ID of the authenticated user making the request.
        *   `this.queryParams`: An object containing URL query parameters (e.g., `?param1=value`).
        *   `this.bodyParams`: An object containing parameters from the request body (for POST, PUT).
        *   `this.urlParams`: An object containing parameters extracted from the URL path (e.g., `id` from `/my-custom-feature/:id`).
        *   `this.request`: The raw Node.js `http.IncomingMessage` object.
        *   `this.response`: The raw Node.js `http.ServerResponse` object.

4.  **Response Methods (`API.v1.success()`, `API.v1.failure()`)**:
    *   **`API.v1.success(data)`**: Returns a successful JSON response with `statusCode: 200` and the provided `data`.
    *   **`API.v1.failure(error)`**: Returns an error JSON response with `statusCode: 400` (or other appropriate status codes if specified) and the `error` message. You can also pass an object with `error` and `statusCode`.

### 3. Restart Rocket.Chat

After creating or modifying an API file, you need to restart your Rocket.Chat instance for the changes to take effect.

### 4. Test Your Endpoint

You can test your new endpoint using tools like Postman, Insomnia, `curl`, or directly from your browser for GET requests.

**Example `curl` commands:**

**GET Request:**
```bash
curl -X GET \
  http://localhost:3000/api/v1/my-custom-feature?param1=test&param2=another \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -H 'X-User-Id: YOUR_USER_ID'
```

**POST Request:**
```bash
curl -X POST \
  http://localhost:3000/api/v1/my-custom-feature \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -H 'X-User-Id: YOUR_USER_ID' \
  -d '{
    "name": "New Feature",
    "description": "This is a description for the new feature."
  }'
```

**DELETE Request:**
```bash
curl -X DELETE \
  http://localhost:3000/api/v1/my-custom-feature/someFeatureId123 \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -H 'X-User-Id: YOUR_USER_ID'
```

Remember to replace `YOUR_AUTH_TOKEN` and `YOUR_USER_ID` with actual values obtained from a logged-in user (e.g., by inspecting network requests after logging into Rocket.Chat or using the `/api/v1/login` endpoint).

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,364 |
| Model | gemini-2.5-flash |
| Tools | NONE |
