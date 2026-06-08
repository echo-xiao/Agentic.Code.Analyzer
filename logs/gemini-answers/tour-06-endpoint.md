# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily use the `API.v1.addRoute()` method or the more specific `API.v1.get()`, `API.v1.post()`, `API.v1.put()`, and `API.v1.delete()` methods. These methods are available on the `API.v1` instance, which is an instance of `APIClass`.

Here's the call chain and relevant files:

**Call Chain:**

`createApi()` → `APIClass` → `addRoute()`/`get()`/`post()`/`put()`/`delete()`

**Detailed Steps and Key Files:**

1.  **API Instance Creation:** The `API.v1` instance is created using the `createApi` function, typically found in:
    *   `apps/meteor/app/api/server/api.ts`

    This function returns an instance of `APIClass`.

2.  **API Class Definition:** The `APIClass` itself, which defines the `addRoute`, `get`, `post`, `put`, and `delete` methods, is defined in:
    *   `apps/meteor/app/api/server/ApiClass.ts`

3.  **Defining the Endpoint:** You would then use the `addRoute` method or one of the HTTP-verb-specific methods (`get`, `post`, `put`, `delete`) on the `API.v1` object to define your endpoint. For example, to add a GET route, you might use:

    
```typescript
    API.v1.addRoute('my-new-endpoint', { authRequired: true }, {
      get() {
        return API.v1.success({ message: 'Hello from your new endpoint!' });
      },
    });
    ```

    or, for a more modern approach:
    
```typescript
    API.v1.get('my-new-endpoint', { authRequired: true }, function() {
      return API.v1.success({ message: 'Hello from your new endpoint!' });
    });
    ```


    Examples of existing endpoints can be found in various files, such as:
    *   `apps/meteor/app/api/server/v1/channels.ts`
    *   `apps/meteor/app/api/server/v1/users.ts`
    *   `apps/meteor/app/api/server/v1/groups.ts`

In summary, you define new REST API endpoints by calling `API.v1.addRoute()` (or the corresponding HTTP verb methods) within your server-side code, typically in files under `apps/meteor/app/api/server/v1/`. The `APIClass` in `apps/meteor/app/api/server/ApiClass.ts` provides the methods for registering these routes.

## Tool Calls (7 calls, 22,769 tokens)

**Step 1:** `search({"layer":"server","query":"rest api endpoint"})` → 72 tokens
**Step 2:** `graph({"direction":"down","query":"LivechatInquiriesEndpoints","layer":"server"})` → 232 tokens
**Step 3:** `search({"layer":"server","query":"API.v1.addRoute"})` → 419 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/v1/channels.ts","symbolName":"API.v1.addRoute"})` → 44 tokens
**Step 5:** `search({"layer":"server","query":"createApi"})` → 215 tokens
**Step 6:** `implement({"symbolName":"createApi","filename":"apps/meteor/app/api/server/api.ts"})` → 104 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"APIClass"})` → 1578 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/4 |
| Tool calls | 7 |
| Total tokens | 22,769 |
| Pass | NO |
