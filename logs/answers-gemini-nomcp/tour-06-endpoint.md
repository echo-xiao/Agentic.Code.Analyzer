# How do you create a new REST API endpoint in Rocket.Chat?

## Baseline Answer (no tools)

Creating a new REST API endpoint in Rocket.Chat involves defining a new route handler within the existing API structure, typically in the `app/api/server/v1` directory. Rocket.Chat uses a custom wrapper around Express.js for its REST API.

Here's a step-by-step guide with specific file paths:

### Core Concepts

*   **API.v1 object:** The main object used to register routes for API version 1.
*   **`addRoute(path, handlers)`:** The key method to define an endpoint.
    *   `path`: The URL path for your endpoint (e.g., `/my-custom-endpoint`).
    *   `handlers`: An object where keys are HTTP methods (`get`, `post`, `put`, `delete`) and values are the handler functions.
*   **`this` context in handlers:** Inside a handler function, `this` provides access to useful properties:
    *   `this.queryParams`: For `GET` query parameters.
    *   `this.bodyParams`: For `POST`/`PUT` body parameters (already parsed).
    *   `this.urlParams`: For parameters defined in the path (e.g., `/users/:userId`).
    *   `this.userId`: The ID of the authenticated user (if any).
    *   `this.request`, `this.response`: The raw Express `req` and `res` objects.
    *   `this.success(data)`: Helper to send a successful JSON response.
    *   `this.failure(error)`: Helper to send an error JSON response.
    *   `this.validate(schema)`: For input validation using `simple-schema`.
    *   `this.hasPermission(userId, permissionName)`: For checking user permissions.
*   **Automatic Route Loading:** Files placed in `app/api/server/v1/` that call `API.v1.addRoute()` are automatically loaded when the server starts.

### Step-by-Step Guide

#### 1. Create a New API File

Navigate to `app/api/server/v1/` and create a new JavaScript file for your endpoint. It's good practice to name it descriptively based on the resource it manages.

**Example:** `app/api/server/v1/myCustomEndpoint.js`

#### 2. Define Your Endpoint

Inside your new file, import `API` and use `API.v1.addRoute()` to define your endpoint(s).

**`app/api/server/v1/myCustomEndpoint.js`**

```javascript
import { API } from '../api'; // Import the API object

// Example 1: A simple GET endpoint
API.v1.addRoute('my-custom-endpoint', {
	get() {
		// Example: Access query parameters
		const { param1, param2 } = this.queryParams;

		// Perform some business logic
		const result = `Hello from custom endpoint! Param1: ${param1}, Param2: ${param2}`;

		// Send a success response
		return API.v1.success({ message: result });
	},
});

// Example 2: A POST endpoint with authentication and body parameters
API.v1.addRoute('my-secure-post-endpoint', {
	post() {
		// --- 1. Authentication Check ---
		if (!this.userId) {
			// If no user is authenticated, throw an Unauthorized error
			throw new API.v1.Unauthorized();
		}

		// --- 2. Input Validation (Optional but Recommended) ---
		// You can use this.validate() if you have a schema defined
		// const { data } = this.validate({
		// 	data: String,
		// 	optionalField: { type: String, optional: true }
		// });

		const { someData, anotherField } = this.bodyParams;

		if (!someData) {
			// Throw a specific error if required data is missing
			throw new API.v1.Error('missing-data', 'The "someData" field is required.', {
				statusCode: 400,
			});
		}

		// --- 3. Permission Check (Optional but Recommended) ---
		// Assume you have a custom permission 'access-my-custom-endpoint'
		if (!this.hasPermission(this.userId, 'access-my-custom-endpoint')) {
			throw new API.v1.Forbidden('no-permission-to-access-custom-endpoint');
		}

		// --- 4. Business Logic ---
		// Example: Interact with a database, call a Meteor method, etc.
		// For instance, inserting data into a collection:
		// const newRecordId = MyCustomCollection.insert({
		// 	userId: this.userId,
		// 	someData,
		// 	anotherField,
		// 	createdAt: new Date(),
		// });

		// Or calling a server method:
		// const methodResult = Meteor.call('myCustomMethod', someData, anotherField);

		// For demonstration, just return the received data
		const responseData = {
			receivedBy: this.userId,
			processedData: `${someData} - processed`,
			originalAnotherField: anotherField,
			timestamp: new Date(),
		};

		// --- 5. Return Response ---
		return API.v1.success(responseData);
	},
});


// Example 3: Endpoint with URL parameters
API.v1.addRoute('my-resource/:id', {
	get() {
		const { id } = this.urlParams; // Access the 'id' from the URL path

		// Example: Fetch a resource by ID
		// const resource = MyResourceCollection.findOne(id);

		// if (!resource) {
		// 	throw new API.v1.NotFound(`Resource with ID ${id} not found`);
		// }

		return API.v1.success({ message: `Fetching resource with ID: ${id}` });
	},
	put() {
		const { id } = this.urlParams;
		const { newName } = this.bodyParams;

		if (!this.userId) {
			throw new API.v1.Unauthorized();
		}
		if (!newName) {
			throw new API.v1.Error('missing-field', 'The "newName" field is required.', {
				statusCode: 400,
			});
		}

		// Example: Update the resource
		// MyResourceCollection.update(id, { $set: { name: newName } });

		return API.v1.success({
			message: `Resource ${id} updated with new name: ${newName}`,
		});
	},
});
```

#### 3. Define Permissions (If Applicable)

If your endpoint requires custom permissions (like `access-my-custom-endpoint` in the example), you need to define them. Permissions are typically defined in a startup file or a dedicated permissions file.

**Example:** Adding a custom permission

You can add this to a file like `app/authorization/server/startup.js` or `app/authorization/server/functions/addUserRoles.js` (or a similar location if you're developing a custom app/package).

```javascript
// In a server-side startup file, e.g., app/authorization/server/startup.js

import { Authorization } from '../../authorization'; // Adjust path if needed

Meteor.startup(() => {
	// Add your custom permission
	Authorization.addPermission('access-my-custom-endpoint', [
		'admin',
		'owner',
		'user', // Or specific roles that should have this permission
	]);
});
```

#### 4. Restart Rocket.Chat

After adding or modifying API files, you need to restart your Rocket.Chat instance for the changes to take effect.

#### 5. Test Your Endpoint

You can test your new endpoint using tools like Postman, Insomnia, or `curl`.

**Example `curl` commands:**

*   **GET `/api/v1/my-custom-endpoint`**
    ```bash
    curl -X GET "http://localhost:3000/api/v1/my-custom-endpoint?param1=valueA&param2=valueB"
    ```

*   **POST `/api/v1/my-secure-post-endpoint` (requires authentication token)**
    First, log in to get an `X-Auth-Token` and `X-User-Id`:
    ```bash
    curl -X POST \
      http://localhost:3000/api/v1/login \
      -H 'Content-Type: application/json' \
      -d '{ "user": "your_username", "password": "your_password" }'
    ```
    Then use the received tokens:
    ```bash
    curl -X POST \
      http://localhost:3000/api/v1/my-secure-post-endpoint \
      -H 'Content-Type: application/json' \
      -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
      -H 'X-User-Id: YOUR_USER_ID' \
      -d '{ "someData": "Hello World", "anotherField": "More data" }'
    ```

*   **GET `/api/v1/my-resource/123`**
    ```bash
    curl -X GET "http://localhost:3000/api/v1/my-resource/123"
    ```

### Key Files and Directories

*   **`app/api/server/api.js`**: The main API entry point where `API.v1` is initialized and Express routes are set up. It imports all files from `app/api/server/v1/`.
*   **`app/api/server/v1/`**: Directory containing all version 1 REST API endpoint definitions.
*   **`app/api/server/helpers/apiHelpers.js`**: Contains utility functions like `success`, `failure`, `parseJsonQuery`, `hasPermission`, and the custom `API.v1.Error` classes (e.g., `Unauthorized`, `Forbidden`, `NotFound`).
*   **`app/authorization/server/startup.js`**: A common place to define custom permissions.

By following these steps, you can successfully create and integrate new REST API endpoints into your Rocket.Chat instance. Remember to prioritize security, input validation, and proper error handling for robust API design.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,857 |
| Model | gemini-2.5-flash |
| Tools | NONE |
