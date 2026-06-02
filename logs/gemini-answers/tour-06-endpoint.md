# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you would typically use the `API.v1.addRoute` method, which is an instance of the `ApiClass`.

Here's a breakdown of the process and the relevant files:

1.  **Entry Point:** The `ApiClass` in `apps/meteor/app/api/server/ApiClass.ts` is the core component for defining REST API endpoints.

2.  **Defining a Route:** New routes are added using `API.v1.addRoute(path, options)`, where:
    *   `path` is the URL path for your endpoint (e.g., `'my-new-endpoint'`).
    *   `options` is an object containing HTTP method handlers (GET, POST, etc.) and middleware.

    You can find numerous examples of this in files like:
    *   `apps/meteor/app/livechat/server/api/v1/room.ts`
    *   `apps/meteor/app/api/server/v1/channels.ts`
    *   `apps/meteor/app/api/server/v1/users.ts`

    These files demonstrate how `API.v1.addRoute` is used to define various endpoints with their respective logic for different HTTP methods.

**Example Structure:**


```typescript
// apps/meteor/app/api/server/v1/myNewEndpoint.ts
import { API } from '../Api'; // Assuming this path, adjust if needed

API.v1.addRoute('my-new-endpoint', {
  get() {
    // Logic for GET requests to /api/v1/my-new-endpoint
    return API.v1.success({ message: 'This is a GET request!' });
  },
  post() {
    // Logic for POST requests to /api/v1/my-new-endpoint
    const { data } = this.bodyParams;
    return API.v1.success({ receivedData: data });
  },
  // You can add put, delete, etc.
});
```


**Call Chain (conceptual):**

`Your new route file` (e.g., `apps/meteor/app/api/server/v1/myNewEndpoint.ts`)
  `API.v1.addRoute()`
    `ApiClass` (defined in `apps/meteor/app/api/server/ApiClass.ts`)

To implement a new API endpoint:

1.  Create a new file (e.g., `my-custom-api.ts`) within a relevant `apps/meteor/app/api/server/v1/` or `apps/meteor/app/livechat/server/api/v1/` directory.
2.  Import the `API` object.
3.  Use `API.v1.addRoute()` to define your endpoint, specifying the path and the handlers for the HTTP methods you want to support.
4.  Implement the business logic within the handler functions, including any necessary authentication, permission checks, and data processing.

## Tool Calls (8 calls, 41,521 tokens)

**Step 1:** `search({"query":"ApiClass"})` → 27 tokens
**Step 2:** `graph({"query":"ApiClass","depth":3,"direction":"down"})` → 12 tokens
**Step 3:** `implement({"symbolName":"ApiClass","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 15 tokens
**Step 4:** `search({"layer":"server","query":"route"})` → 349 tokens
**Step 5:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/server/routes/userDataDownload.ts)` → 15 tokens
**Step 6:** `search({"query":"ApiClass.addRoute","layer":"server"})` → 15 tokens
**Step 7:** `search({"query":"API.v1.addRoute","layer":"server"})` → 1467 tokens
**Step 8:** `graph({"direction":"up","layer":"server","depth":2,"query":"API.v1.addRoute"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/4 |
| Tool calls | 8 |
| Total tokens | 41,521 |
