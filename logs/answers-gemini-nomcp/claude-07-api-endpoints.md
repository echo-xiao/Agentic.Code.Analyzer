# How are new endpoints registered in the REST API in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat registers its REST API endpoints primarily using a custom API framework built into the server. The core mechanism involves calling the `API.v1.addRoute` method.

Here's a detailed breakdown of how new endpoints are registered:

1.  **The `API` Object:**
    At the heart of the Rocket.Chat REST API is the global `API` object (or `RocketChat.API` in some contexts). This object is responsible for managing routes, handling requests, and enforcing security policies (authentication, permissions, rate limiting).

    You can find its definition and initialization in:
    *   `app/api/server/api.js`

2.  **`API.v1.addRoute()` Method:**
    This is the primary method used to register new API endpoints for version 1 of the API. It typically takes three arguments:
    *   **`route` (string):** The path segment for the route. For example, `'users'` would register endpoints under `/api/v1/users`.
    *   **`options` (object):** An object containing configuration for the route, such as:
        *   `authRequired` (boolean, default: `true`): Whether the endpoint requires user authentication.
        *   `permissionsRequired` (array or string): Specific permissions a user must have to access the endpoint.
        *   `rateLimiterOptions` (object): Configuration for rate limiting, if desired.
        *   `anonymous` (boolean): If `true`, the route can be accessed anonymously without a user session.
    *   **`handlers` (object):** An object where each key corresponds to an HTTP method (e.g., `get`, `post`, `put`, `delete`) and its value is the handler function for that method. The handler function receives `this.requestParams()` (URL and query parameters), `this.bodyParams()` (request body), and `this.userId` (if authenticated).

3.  **Endpoint File Structure:**
    Most API endpoints are defined in separate files, typically grouped by API version and functionality within the `app/api/server/` directory.

    *   For v1 endpoints, you'll find them in `app/api/server/v1/`.
    *   Each file usually defines one or more routes related to a specific domain (e.g., `users.js` for user-related endpoints, `channels.js` for channel-related endpoints).

4.  **Example of Registering an Endpoint:**

    Let's look at a simplified example, similar to how the `status` endpoint is registered:

    **File:** `app/api/server/v1/status.js`

    ```javascript
    import { API } from '../api'; // Import the API object

    API.v1.addRoute('status', { authRequired: false }, {
        /**
         * @openapi
         * /api/v1/status:
         *   get:
         *     summary: Get Rocket.Chat server status
         *     description: Returns the current status of the Rocket.Chat server.
         *     responses:
         *       200:
         *         description: Server status information.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: string
         *                   example: online
         *                 // ... other status properties
         */
        get() {
            // No authentication required for this endpoint.
            // this.requestParams() would contain URL/query parameters if any.
            // this.bodyParams() would contain the request body for POST/PUT.

            return API.v1.success({
                status: 'online',
                version: process.env.ROOT_URL, // Example of accessing server data
                // ... any other relevant status information
            });
        },
        /**
         * @openapi
         * /api/v1/status:
         *   post:
         *     summary: Updates server status (requires authentication and specific permissions)
         *     description: This is a placeholder; actual implementation would vary.
         *     security:
         *       - authToken: []
         *     responses:
         *       200:
         *         description: Status updated successfully.
         */
        post() {
            // This would typically require `authRequired: true` and `permissionsRequired`
            // return API.v1.success({ message: 'Status updated' });
            throw new Error('Not implemented'); // Example: if POST isn't supported for status
        },
    });
    ```

5.  **Initialization:**
    To ensure all these endpoint files are loaded and their routes are registered, there's usually an `index.js` file (or similar) in the `app/api/server/` directory that imports all the specific route files. This ensures that when the server starts, `API.v1.addRoute` is called for every defined endpoint.

    *   `app/api/server/index.js` often serves this purpose by importing all files from `app/api/server/v1/` and other API versions.

This system allows for a structured and maintainable way to define, configure, and expose REST API endpoints in Rocket.Chat, leveraging a common set of utilities for authentication, authorization, and response handling.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,990 |
| Model | gemini-2.5-flash |
| Tools | NONE |
