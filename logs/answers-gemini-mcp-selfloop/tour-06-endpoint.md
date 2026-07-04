# How do you create a new REST API endpoint in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily interact with the `API.v1` object, which is an instance of `APIClass`. The process involves defining the endpoint's HTTP method, path, authentication requirements, request body validation, and the asynchronous action function that handles the request.

Here's a breakdown of the process and key files:

**Core Components and Files:**

1.  **`APIClass` Definition:**
    *   **File:** `apps/meteor/app/api/server/ApiClass.ts`
    *   This file defines the `APIClass`, which is the base class for creating API versions and registering routes.

2.  **`API.v1` Instance:**
    *   **File:** `apps/meteor/app/api/server/api.ts`
    *   The `API.v1` object is a singleton instance of `APIClass` specifically configured for version `v1` and with default authentication enabled. This is where `API.v1` is instantiated.

3.  **Endpoint Definitions:**
    *   **Files:** `apps/meteor/app/api/server/v1/*.ts` (e.g., `apps/meteor/app/api/server/v1/users.ts`, `apps/meteor/app/api/server/v1/channels.ts`)
    *   These files contain the actual definitions of various API endpoints using the `API.v1` object.

**Steps to Create a New REST API Endpoint:**

1.  **Access `API.v1`:** You will use the `API.v1` object to define your endpoint.

2.  **Choose an HTTP Method:** Use one of the following methods on `API.v1` corresponding to your desired HTTP method:
    *   `.post()` for POST requests
    *   `.get()` for GET requests
    *   `.put()` for PUT requests
    *   `.delete()` for DELETE requests

3.  **Define the Endpoint Path and Options:**
    Each method takes the endpoint path (e.g., `'/my-new-endpoint'`) and an options object as arguments. The options object typically includes:
    *   `authRequired`: A boolean indicating if authentication is required.
    *   `permissionsRequired`: An array of strings specifying the permissions needed to access the endpoint.
    *   `body` or `query`: An AJV schema for validating the request body or query parameters.
    *   `response`: An object defining the expected response schemas for different HTTP status codes.

4.  **Implement the `action` Function:**
    The `action` function is an asynchronous function that contains the core logic of your endpoint. Inside this function:
    *   `this.bodyParams` and `this.queryParams` provide access to the validated request data.
    *   The function should return `API.v1.success()` with the response data for successful operations, or `API.v1.failure()`/`API.v1.internalError()` for errors.

**Example Flow:**

Entry (`apps/meteor/app/api/server/api.ts`) → `API.v1` instance → Endpoint Definition (e.g., `API.v1.post('/custom-user-status.create', {...})` in a file like `apps/meteor/app/api/server/v1/customUserStatus.ts` if it existed) → `action` function execution.

**Example Snippet (Conceptual):**


```typescript
// In a new file, e.g., apps/meteor/app/api/server/v1/myNewEndpoint.ts
import { API } from '../../../../app/api/server/api'; // Assuming correct relative path

API.v1.post(
	'my-new-endpoint',
	{
		authRequired: true,
		body: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
			required: ['message'],
			additionalProperties: false,
		},
		response: {
			200: {
				type: 'object',
				properties: {
					status: { type: 'string' },
					receivedMessage: { type: 'string' },
				},
				required: ['status', 'receivedMessage'],
			},
		},
	},
	async function action() {
		const { message } = this.bodyParams;
		// Perform some logic with the message
		console.log('Received message:', message);

		return API.v1.success({
			status: 'success',
			receivedMessage: message,
		});
	},
);
```

## Tool Calls (4 calls, 9,742 tokens)

**Step 1:** `wiki({"question":"How do you create a new REST API endpoint in Rocket.Chat?"})` → 961 tokens
**Step 2:** `search({"query":"APIClass"})` → 65 tokens
**Step 3:** `search({"query":"API.v1"})` → 296 tokens
**Step 4:** `search({"query":"new APIClass"})` → 74 tokens

## Files Seen In Tool Results (12)

- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/api/server/v1/users.ts`
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/api/server/v1/groups.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/app/api/server/v1/teams.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/app/livechat/imports/server/rest/dashboards.ts`
- `apps/meteor/app/api/server/v1/im.ts`
- `apps/meteor/app/api/server/v1/commands.ts`
- `apps/meteor/app/api/server/api.ts`
