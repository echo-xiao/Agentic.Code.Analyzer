# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily use the `API.v1` instance and its `addRoute` method, or its more modern `.get()`, `.post()`, `.put()`, or `.delete()` methods.

**Entry → Step 1 → Step 2 → Final**

1.  **Entry Point:** The primary way to register new routes is through `API.v1.addRoute()`.
2.  **Implementation:** The `API.v1` instance is derived from `ApiClass` (likely defined in `apps/meteor/app/api/server/ApiClass.ts`). You would call `API.v1.addRoute()` within your server-side API definition files.
3.  **Examples:** You can find numerous examples of how to define endpoints using `API.v1.addRoute()` in files like:
    *   `apps/meteor/app/api/server/v1/channels.ts`
    *   `apps/meteor/app/api/server/v1/users.ts`
    *   `apps/meteor/app/api/server/v1/groups.ts`
    *   `apps/meteor/app/livechat/server/api/v1/contact.ts`

**To create a new endpoint:**

1.  You would typically create a new file (e.g., `apps/meteor/app/api/server/v1/myNewEndpoint.ts`) or extend an existing one.
2.  Inside this file, you would call `API.v1.addRoute()` and provide the route path, HTTP method(s), and a handler function. Alternatively, you can use the more specific `API.v1.get()`, `API.v1.post()`, etc., methods.

**Example Structure (conceptual based on search results):**


```typescript
// apps/meteor/app/api/server/v1/myNewEndpoint.ts

API.v1.addRoute('my-new-endpoint', { authRequired: true }, {
  get() {
    // Handle GET request
    return API.v1.success({ message: 'This is my new GET endpoint!' });
  },
  post() {
    // Handle POST request
    const { someData } = this.bodyParams; // Access request body parameters
    return API.v1.success({ received: someData });
  },
});
```

## Tool Calls (8 calls, 24,069 tokens)

**Step 1:** `search({"query":"REST API endpoint","layer":"server"})` → 133 tokens
**Step 2:** `graph({"query":"ApiClass","direction":"down","layer":"server"})` → 12 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"LivechatInquiriesEndpoints"})` → 232 tokens
**Step 5:** `graph({"direction":"up","layer":"server","query":"LivechatInquiriesEndpoints"})` → 241 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 7:** `search({"layer":"server","query":"API.v1.addRoute"})` → 419 tokens
**Step 8:** `graph({"direction":"down","query":"API.v1.addRoute","layer":"server"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/4 |
| Tool calls | 8 |
| Total tokens | 24,069 |
| Pass | NO |
