# How are endpoints registered in REST API?

## Answer

REST API endpoint registration in Rocket.Chat is built on a layered architecture: `createApi()` creates `APIClass` instances, `addRoute()` registers individual routes with middleware wrapping, and `RocketChatAPIRouter` handles the underlying Hono framework integration. The full middleware chain includes authentication, permissions, rate limiting, and 2FA enforcement.

**Bootstrap:**

The API system bootstraps in `apps/meteor/app/api/server/index.ts`, which imports all endpoint files from the `v1/` directory. Each file's top-level code calls `API.v1.addRoute(...)`, registering routes during module initialization.

**API Instance Creation:**

`createApi()` in `apps/meteor/app/api/server/api.ts` (line 33) instantiates `APIClass` with options:
- `version: 'v1'` — creates URL prefix `/api/v1/`
- `useDefaultAuth: true` — enables authentication by default
- `prettyJson` — enables pretty-printing in development

Two instances are created: `API.v1` (versioned, authenticated) and `API.default` (unversioned, no default auth). The singleton `API.api` is a `RocketChatAPIRouter('/api')` that serves as the root Hono router.

**Route Registration — addRoute():**

`APIClass.addRoute()` in `apps/meteor/app/api/server/ApiClass.ts` accepts:
- `path`: Route path (e.g., `'chat.sendMessage'`)
- `options`: `TypedOptions` including `authRequired`, `permissionsRequired`, `validateParams`, `rateLimiterOptions`, `twoFactorRequired`
- `endpoints`: Object mapping HTTP methods to handler functions

Each handler is wrapped by `_internalRouteActionHandler()`, which builds the middleware chain:

1. **Authentication** — `authenticationMiddlewareForHono` from `apps/meteor/app/api/server/middlewares/authenticationHono.ts`. Extracts `X-Auth-Token` and `X-User-Id` headers, hashes the token via `hashLoginToken()`, looks up the user, and sets `userId` on the request context.

2. **Permissions** — `permissionsMiddleware` from `apps/meteor/app/api/server/middlewares/permissions.ts`. Checks `permissionsRequired` option against the user's roles using `hasPermissionAsync()`.

3. **Rate Limiting** — Configurable per-route via `rateLimiterOptions` with defaults from `API_Enable_Rate_Limiter_Limit_Calls_Default` and `API_Enable_Rate_Limiter_Limit_Time_Default` settings.

4. **2FA** — When `twoFactorRequired` is set, calls `checkCodeForUser()` from `app/2fa/server/code` to verify the 2FA code.

5. **License** — Enterprise license middleware from `ee/app/api-enterprise/server/middlewares/license.ts`.

**Hono Router:**

`RocketChatAPIRouter` in `apps/meteor/app/api/server/router.ts` (line 36) extends a base router class and manages Hono route registration. It converts Rocket.Chat's route definitions into Hono-compatible handlers. The `APIActionHandler` type and `APIActionContext` type define the handler and context shapes.

**Validation:**

Parameter validation uses `ajv` from `@rocket.chat/rest-typings`. Validator functions like `isChatSendMessageProps` are generated from JSON Schema definitions and passed as `validateParams` to `addRoute()`. The `definition.ts` file in the API server directory defines types like `TypedThis`, `TypedAction`, `TypedOptions`, `SuccessResult`, `FailureResult`, etc.

### Call Chain
```
api/server/index.ts — imports all v1/*.ts files
→ v1/chat.ts: API.v1.addRoute('chat.sendMessage', { authRequired: true, validateParams: isChatSendMessageProps }, { post: handler })
→ ApiClass.ts addRoute()
  → _internalRouteActionHandler() wraps handler with:
    1. authenticationMiddlewareForHono (authenticationHono.ts) — token auth
    2. permissionsMiddleware (permissions.ts) — RBAC check
    3. rate limiter — request throttling
    4. 2FA check — checkCodeForUser()
    5. license middleware — enterprise check
    6. action handler execution
  → RocketChatAPIRouter (router.ts) — registers on Hono
→ WebApp (Meteor) serves via express/connect adapter
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/api/server/api.ts` | `createApi()`, `API` singleton with `v1`, `default`, `api` |
| `apps/meteor/app/api/server/ApiClass.ts` | `APIClass` — `addRoute()`, `_internalRouteActionHandler()` |
| `apps/meteor/app/api/server/router.ts` | `RocketChatAPIRouter` — Hono route management |
| `apps/meteor/app/api/server/middlewares/authenticationHono.ts` | `authenticationMiddlewareForHono` — token-based auth |
| `apps/meteor/app/api/server/middlewares/permissions.ts` | `permissionsMiddleware` — RBAC permission checking |
| `apps/meteor/app/api/server/definition.ts` | Types: `TypedThis`, `TypedAction`, `SuccessResult`, `FailureResult` |
| `apps/meteor/app/api/server/index.ts` | Bootstrap — imports all endpoint files |
| `apps/meteor/app/api/server/v1/chat.ts` | Example: chat endpoints registration |
| `packages/rest-typings/src/index.ts` | `ajv` validators, param type guards |
| `ee/app/api-enterprise/server/middlewares/license.ts` | Enterprise license middleware |

### Key Symbols
createApi, APIClass, addRoute, _internalRouteActionHandler, RocketChatAPIRouter, authenticationMiddlewareForHono, permissionsMiddleware, APIActionHandler, APIActionContext, TypedThis, TypedAction, TypedOptions, SuccessResult, FailureResult, ForbiddenResult, UnauthorizedResult, NotFoundResult, checkCodeForUser, ajv, validateParams, rateLimiterOptions, defaultRateLimiterOptions
