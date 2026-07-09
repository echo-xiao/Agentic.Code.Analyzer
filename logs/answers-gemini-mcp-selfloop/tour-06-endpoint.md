# How do you create a new REST API endpoint in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily interact with the `API.v1` object, which is an instance of `APIClass`. This class, defined in `apps/meteor/app/api/server/ApiClass.ts`, provides methods to register routes for different HTTP methods.

The general flow for creating an endpoint is:

1.  **Access `API.v1`**: This global object is used to register all API routes.
2.  **Call a routing method**: You can use `API.v1.addRoute()` for multiple HTTP methods on a single path, or specific methods like `API.v1.get()`, `API.v1.post()`, `API.v1.put()`, or `API.v1.delete()` for single-method endpoints.

### Core API Registration Methods

*   **`API.v1.addRoute(path, options, handlers)`**:
    *   `path`: The URL path for the endpoint (e.g., `'/my/new/endpoint'`), which can include parameters like `:paramId`.
    *   `options`: An object to configure the route, such as `authRequired` (boolean, if authentication is needed), `permissionsRequired` (array of strings, specific permissions), and `license` (array of strings, required license features).
    *   `handlers`: An object where keys are HTTP verbs (e.g., `get`, `post`) and values are asynchronous functions that define the endpoint's logic.

*   **`API.v1.get(path, options, action)` (and `post`, `put`, `delete`)**:
    *   `path`: The URL path.
    *   `options`: Route configuration similar to `addRoute`.
    *   `action`: An asynchronous function that defines the logic for the specific HTTP method.

### Example

A concrete example of creating a REST API endpoint can be found in `apps/meteor/ee/app/livechat-enterprise/server/api/units.ts`, where the `livechat/units/:unitId/monitors` endpoint is defined:

**File:** `apps/meteor/ee/app/livechat-enterprise/server/api/units.ts`


```typescript
API.v1.addRoute(
	'livechat/units/:unitId/monitors',
	{ authRequired: true, permissionsRequired: ['manage-livechat-monitors'], license: ['livechat-enterprise'] },
	{
		async get() {
			// ... implementation for GET request ...
		},
		async post() {
			// ... implementation for POST request ...
		},
		async delete() {
			// ... implementation for DELETE request ...
		},
	},
);
```


In this example:
*   The path is `livechat/units/:unitId/monitors`, indicating a parameter `unitId`.
*   `authRequired: true` means the user must be authenticated.
*   `permissionsRequired: ['manage-livechat-monitors']` specifies that the user needs the `manage-livechat-monitors` permission.
*   `license: ['livechat-enterprise']` indicates that an enterprise license with `livechat-enterprise` feature is required.
*   Separate asynchronous functions are provided for `get`, `post`, and `delete` HTTP methods, each containing the specific logic for that operation.

By following this structure, developers can define new REST API endpoints within the Rocket.Chat ecosystem, handling authentication, permissions, and the request/response logic for various HTTP verbs.

## Tool Calls (4 calls, 15,212 tokens)

**Step 1:** `wiki({"question":"How do you create a new REST API endpoint in Rocket.Chat?"})` → 867 tokens
**Step 2:** `search({"query":"APIClass"})` → 65 tokens
**Step 3:** `details({"symbolName":"APIClass","filename":"ApiClass.ts"})` → 1576 tokens
**Step 4:** `search({"query":"livechat/units/:unitId/monitors"})` → 171 tokens

## Files Seen In Tool Results (4)

- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/units.ts`
- `apps/meteor/tests/end-to-end/api/livechat/14-units.ts`
- `apps/meteor/client/views/omnichannel/units/UnitEditWithData.tsx`
