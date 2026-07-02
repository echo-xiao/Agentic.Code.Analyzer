# How are new endpoints registered in the REST API in Rocket.Chat?

## Baseline Answer (no tools)

New endpoints in the Rocket.Chat REST API (specifically for the `/api/v1/` prefix) are registered using the central `API` class, which is a wrapper around Express.js.

Here's a breakdown of the process and relevant files:

1.  **The `API` Class:**
    The core class responsible for managing API routes is located at:
    `app/api/server/v1/api.js`

    This file defines the `API` class, which has methods like `addRoute`, `addAuthMethod`, `addMiddleware`, etc. It internally uses an Express router instance.

2.  **The `API.addRoute()` Method:**
    This is the primary method used to register a new endpoint. Its signature generally looks like this:

    ```javascript
    API.addRoute(route, options);
    ```

    *   `route`: A string representing the URL path for the endpoint (e.g., `'/users'`, `'/channels.info'`).
    *   `options`: An object where keys are HTTP methods (e.g., `get`, `post`, `put`, `delete`) and their values are the handler functions for that method. This object can also contain middleware-like functions.

    **Example `options` structure:**

    ```javascript
    {
      get: {
        authRequired: true, // Boolean: if authentication is required
        permissionsRequired: ['view-full-other-user-info'], // Array of permissions
        validateParams: { // Optional: Joi-like validation for query/body params
          userId: String,
          username: String,
        },
        rateLimiter: true, // Boolean: if rate limiting should be applied
        action: function() { // The actual handler function
          // ... your endpoint logic here
          return API.v1.success({ user: this.getUser() });
        }
      },
      post: {
        authRequired: true,
        action: function() {
          // ... handle POST request
          return API.v1.success();
        }
      }
    }
    ```

    Inside the `action` function, `this` context provides useful properties like:
    *   `this.request`: The raw Express request object.
    *   `this.response`: The raw Express response object.
    *   `this.bodyParams`: Parsed parameters from the request body.
    *   `this.queryParams`: Parsed parameters from the query string.
    *   `this.urlParams`: Parsed parameters from the URL path (e.g., `/users/:id`).
    *   `this.userId`: The ID of the authenticated user.
    *   `this.user`: The full user object of the authenticated user.
    *   `this.getUser()`: A helper to get the full user object.

3.  **Endpoint Definition Files:**
    New endpoints are typically defined in separate files within the `app/api/server/v1/` directory. Each file usually groups related endpoints.

    **Example: `app/api/server/v1/users.js`**

    This file defines various endpoints related to users. A snippet might look like this:

    ```javascript
    import { API } from '../api';
    import { findUsers, findUser } from '../../../../server/services/user/service';

    API.addRoute('users.info', {
      get: {
        authRequired: true,
        permissionsRequired: ['view-full-other-user-info'],
        validateParams: {
          userId: String,
          username: String,
        },
        action() {
          const { userId, username } = this.queryParams;
          const user = findUser({ userId, username }); // Using a service to fetch data
          if (!user) {
            return API.v1.failure('User not found');
          }
          return API.v1.success({ user });
        },
      },
    });

    API.addRoute('users.list', {
      get: {
        authRequired: true,
        permissionsRequired: ['view-other-user-info'],
        validateParams: {
          query: Match.Optional(String),
          fields: Match.Optional(String),
          sort: Match.Optional(String),
          offset: Match.Optional(Number),
          count: Match.Optional(Number),
        },
        action() {
          const { query, fields, sort, offset, count } = this.queryParams;
          const users = findUsers({ query, fields, sort, offset, count });
          return API.v1.success(users);
        },
      },
    });
    ```

4.  **Loading the Endpoints:**
    The `API` class itself has a static method `loadAPI` (also in `app/api/server/v1/api.js`) which is responsible for iterating through all files in the `app/api/server/v1/` directory (and potentially other API version directories) and ensuring they are loaded. This effectively executes the `API.addRoute()` calls within those files.

    The `loadAPI` function is called during Rocket.Chat's server startup process.

**In summary, to register a new REST API endpoint:**

1.  Create a new JavaScript file (or modify an existing one) in `app/api/server/v1/`.
2.  Import the `API` object: `import { API } from '../api';`.
3.  Call `API.addRoute('/your-new-endpoint', { ... });` with your desired HTTP methods, authentication, permissions, validation, and handler logic.
4.  The Rocket.Chat server will automatically discover and register this route on startup.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,787 |
| Model | gemini-2.5-flash |
| Tools | NONE |
