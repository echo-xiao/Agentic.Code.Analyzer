# How are new endpoints registered in the REST API in Rocket.Chat?

## Baseline Answer (no tools)

New endpoints in the Rocket.Chat REST API are primarily registered using the `API.v1.addRoute` method. This method is part of the custom API framework built into Rocket.Chat, which itself leverages Express.js.

Here's a breakdown of the process:

1.  **The `API` Class:**
    The core of the REST API registration lives in the `API` class, specifically the `v1` instance.
    *   **File:** `app/api/server/v1/api.js`

    This file defines the `API` class, which manages routes, middleware (like authentication and rate limiting), and integrates with Express.

2.  **The `addRoute` Method:**
    The `API.v1.addRoute` method is used to define a new API endpoint. It takes the following parameters:

    *   `path` (String): The URL path for the endpoint (e.g., `'users.list'`).
    *   `endpoints` (Object): An object where keys are HTTP methods (e.g., `get`, `post`, `put`, `delete`) and values are the handler functions for those methods.
    *   `options` (Object, optional): An object containing various options for the route, such as:
        *   `authRequired` (Boolean): Whether authentication is required for this endpoint (defaults to `true`).
        *   `rateLimiterOptions` (Object): Options for rate limiting this specific route.
        *   `permissionsRequired` (Array): An array of permissions required to access this endpoint.
        *   `roleRequired` (Array): An array of roles required to access this endpoint.
        *   `validateParams` (Function): A function to validate the request parameters.

3.  **Example of Endpoint Registration:**

    Most API endpoints are defined in files within the `app/api/server/v1/` directory, grouped by resource (e.g., `users.js`, `channels.js`, `messages.js`).

    Let's look at an example from `app/api/server/v1/users.js` for the `users.list` endpoint:

    ```javascript
    // app/api/server/v1/users.js

    import { API } from '../api';
    import { findUsers, findUser, findUserPresence, findUserByUsername } from '../lib/users';
    import { getUserInfo } from '../lib/users.info';

    API.v1.addRoute('users.list', { authRequired: true }, {
        get() {
            const { offset, count, fields, query, sort } = this.parseJsonQuery();
            const { text, filter, active, status, statusExact, role, username, email, name } = this.queryParams;

            // ... (logic to build query and options)

            const users = Promise.await(findUsers({
                query: parsedQuery,
                pagination: {
                    offset,
                    count,
                },
                sort: parsedSort,
                fields: parsedFields,
            }));

            return API.v1.success(users);
        },
    });

    // Another example for a POST endpoint:
    API.v1.addRoute('users.create', { authRequired: true }, {
        post() {
            const { username, email, name, password, active, roles, joinDefaultChannels, verified, requirePasswordChange, sendWelcomeEmail, customFields } = this.bodyParams;

            // ... (logic to create user)

            const userId = Promise.await(Meteor.callAsync('createMyAccount', {
                username,
                email,
                name,
                password,
                active,
                roles,
                joinDefaultChannels,
                verified,
                requirePasswordChange,
                sendWelcomeEmail,
                customFields,
            }));

            const user = Promise.await(getUserInfo(userId));

            return API.v1.success({ user });
        },
    });
    ```

    In this example:
    *   `API.v1.addRoute('users.list', ...)` registers the endpoint.
    *   `authRequired: true` specifies that a valid authentication token is needed.
    *   The `get()` method defines the handler for GET requests to `/api/v1/users.list`.
    *   The `post()` method defines the handler for POST requests to `/api/v1/users.create`.

4.  **Middleware Integration:**
    The `API` class automatically applies global middleware to registered routes. This includes:
    *   **Authentication:** `API.v1.authMiddleware` checks for a valid `X-Auth-Token` and `X-User-Id` in the request headers.
    *   **Rate Limiting:** `API.v1.rateLimiter` applies rate limits based on user, IP, and route.
    *   **Permissions:** The `permissionsRequired` and `roleRequired` options are handled by middleware to ensure the authenticated user has the necessary privileges.

In summary, new REST API endpoints are registered by calling `API.v1.addRoute` in the server-side API files, specifying the path, HTTP method handlers, and any required options like authentication or permissions.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,648 |
| Model | gemini-2.5-flash |
| Tools | NONE |
