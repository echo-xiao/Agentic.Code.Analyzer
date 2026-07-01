# How do you create a new REST API endpoint in Rocket.Chat?

## Baseline Answer (no tools)

Creating a new REST API endpoint in Rocket.Chat involves defining a new route using its internal API framework, which is built on top of Express.js. The core of this process revolves around the `app/api/server/api.js` module.

Here's a step-by-step guide with specific file paths and an example:

### 1. Choose a Location for Your Endpoint File

Rocket.Chat's API endpoints are typically organized by version and resource. For v1 endpoints, you'll usually create a new file within the `app/api/server/v1/` directory.

*   **Example Path:** `app/api/server/v1/myCustomEndpoint.js`

### 2. Define Your Endpoint

Inside your new file, you'll import the `API` object and use its `v1.addRoute` method to register your endpoint.

**File:** `app/api/server/v1/myCustomEndpoint.js`

```javascript
import { API } from '../api'; // Import the API object from the parent directory
import { check } from 'meteor/check'; // Useful for basic type checking, though Joi is preferred for complex validation

// Define your new API route
// The first argument is the path segment (e.g., /api/v1/my-custom-endpoint)
// The second argument is an options object (e.g., { authRequired: true } for authenticated access)
// The third argument is an object where keys are HTTP methods (get, post, put, delete)
// and values are the handler functions for those methods.
API.v1.addRoute('my-custom-endpoint', { authRequired: true }, {
    /**
     * @api {get} /api/v1/my-custom-endpoint Get a custom message
     * @apiName GetMyCustomEndpoint
     * @apiGroup MyCustom
     * @apiDescription Returns a simple custom message.
     * @apiSuccess {String} message A custom success message.
     * @apiError (Error 401) Unauthorized If the user is not authenticated.
     */
    get() {
        // 'this' context provides useful properties and methods:
        // this.userId: The ID of the authenticated user
        // this.user: The full user object of the authenticated user
        // this.queryParams: Object containing URL query parameters
        // this.urlParams: Object containing URL path parameters (e.g., for /users/:id)
        // this.request: The raw Express request object
        // this.response: The raw Express response object

        // Since authRequired: true, this.userId will be available if logged in.
        // You can add further authorization checks here if needed (e.g., role-based).
        if (!this.userId) {
            return this.unauthorized(); // Sends a 401 Unauthorized response
        }

        // Example of accessing query parameters:
        // const { greetingType } = this.queryParams;
        // let message = 'Hello from your custom endpoint!';
        // if (greetingType === 'formal') {
        //     message = 'Greetings from your custom endpoint!';
        // }

        return this.success({ // Sends a 200 OK JSON response
            message: `Hello, ${this.user.username}! This is your custom GET endpoint.`,
            timestamp: new Date(),
        });
    },

    /**
     * @api {post} /api/v1/my-custom-endpoint Post a greeting
     * @apiName PostMyCustomEndpoint
     * @apiGroup MyCustom
     * @apiParam {String} name The name to greet.
     * @apiSuccess {String} greeting A personalized greeting.
     * @apiError (Error 400) InvalidParams If 'name' is missing or invalid.
     * @apiError (Error 401) Unauthorized If the user is not authenticated.
     */
    post() {
        if (!this.userId) {
            return this.unauthorized();
        }

        // this.bodyParams: Object containing the request body parameters (for POST/PUT)
        const { name } = this.bodyParams;

        // Input validation is crucial.
        // You can use Meteor's 'check' for simple types or Joi for complex schemas.
        try {
            check(name, String);
        } catch (e) {
            // Sends a 400 Bad Request JSON response
            return this.failure({
                message: 'Invalid parameter: "name" must be a string.',
                details: e.message,
            });
        }

        return this.success({
            greeting: `Hello, ${name}! Your message was received by ${this.user.username}.`,
            receivedAt: new Date(),
        });
    },

    /**
     * @api {delete} /api/v1/my-custom-endpoint/:id Delete an item
     * @apiName DeleteMyCustomEndpoint
     * @apiGroup MyCustom
     * @apiParam {String} id The ID of the item to delete.
     * @apiSuccess {String} message Confirmation of deletion.
     * @apiError (Error 401) Unauthorized If the user is not authenticated.
     * @apiError (Error 403) Forbidden If the user does not have permission.
     * @apiError (Error 404) NotFound If the item does not exist.
     */
    delete() {
        if (!this.userId) {
            return this.unauthorized();
        }

        // Example of checking user permissions
        // Rocket.Chat provides `hasPermission` and `hasRole` helpers.
        // You might need to import them or access them via a service.
        // For simplicity, let's assume a direct check for now.
        // In a real scenario, you'd use `RocketChat.authz.hasPermission(this.userId, 'delete-my-custom-items')`
        // if (!RocketChat.authz.hasPermission(this.userId, 'delete-my-custom-items')) {
        //     return this.unauthorized('User does not have permission to delete items.'); // 403 Forbidden
        // }

        const { id } = this.urlParams; // Access path parameters

        if (!id) {
            return this.failure('Missing parameter: "id" in URL.');
        }

        // Simulate deletion logic
        // if (!itemExists(id)) {
        //     return this.notFound(); // Sends a 404 Not Found response
        // }
        // deleteItem(id);

        return this.success({
            message: `Item with ID "${id}" deleted successfully.`,
        });
    },
});
```

### Key Concepts and Best Practices:

1.  **`API.v1.addRoute(path, options, methods)`**:
    *   `path`: The URL path segment (e.g., `'my-custom-endpoint'`). The full path will be `/api/v1/my-custom-endpoint`.
    *   `options`: An object for route-specific settings.
        *   `authRequired: true`: Requires the user to be logged in. If `false` or omitted, the endpoint is public.
        *   `permissions`: An array of permissions required to access the endpoint.
    *   `methods`: An object mapping HTTP verbs (`get`, `post`, `put`, `delete`) to their respective handler functions.

2.  **`this` Context in Handlers**:
    Inside the handler functions, `this` refers to the current request context, providing:
    *   `this.userId`: The ID of the authenticated user.
    *   `this.user`: The full user object.
    *   `this.queryParams`: URL query parameters (e.g., `?param=value`).
    *   `this.bodyParams`: Request body parameters (for POST/PUT).
    *   `this.urlParams`: Parameters extracted from the URL path (e.g., `/users/:id` would have `this.urlParams.id`).
    *   `this.request`, `this.response`: Raw Express request and response objects.

3.  **Response Helpers**:
    Rocket.Chat's API framework provides convenient methods for sending responses:
    *   `this.success(data)`: Sends a `200 OK` response with JSON data.
    *   `this.failure(error)`: Sends a `400 Bad Request` response with an error message. You can pass a string or an object.
    *   `this.notFound()`: Sends a `404 Not Found` response.
    *   `this.unauthorized(message)`: Sends a `401 Unauthorized` response.
    *   `this.notAllowed(message)`: Sends a `403 Forbidden` response.

4.  **Input Validation**:
    *   **Always validate** `this.queryParams` and `this.bodyParams`.
    *   For simple type checks, `meteor/check` (`check(value, Type)`) is sufficient.
    *   For complex schemas, Rocket.Chat often uses `Joi`. You can define a Joi schema and use `this.validate(schema)` to validate parameters.

5.  **Authentication and Authorization**:
    *   `authRequired: true` handles basic authentication (user must be logged in).
    *   For authorization (checking user roles or specific permissions), you'll need to implement checks within your handler using Rocket.Chat's permission system (e.g., `RocketChat.authz.hasPermission(this.userId, 'my-custom-permission')`).

6.  **Error Handling**:
    *   Return meaningful error messages and appropriate HTTP status codes.
    *   Log server-side errors but avoid exposing sensitive internal details to the client.

7.  **Documentation**:
    *   Use JSDoc-style comments (as shown in the example) to describe your endpoints, parameters, and responses. Tools like `apidoc` can parse these comments to generate API documentation.

After creating this file, Rocket.Chat's server will automatically pick up and register the new routes when it starts or restarts. You can then test your endpoints using tools like Postman, Insomnia, or `curl`.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,519 |
| Model | gemini-2.5-flash |
| Tools | NONE |
