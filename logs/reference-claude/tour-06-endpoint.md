# How do you create a new REST API endpoint in Rocket.Chat?

## Answer

Creating a new REST API endpoint in Rocket.Chat involves using the `APIClass` system that wraps Hono-based routing with authentication, rate limiting, and permission middleware. The process centers on calling `addRoute()` on an `APIClass` instance, which is created by `createApi()` in `apps/meteor/app/api/server/api.ts`.

The `createApi()` function (line 33 of `api.ts`) instantiates an `APIClass` with configuration options including API path prefix, authentication defaults, and pretty-printing. Two primary instances are created: `API.v1` (versioned, with default auth) and `API.default` (unversioned, no default auth). These are exported as a singleton `API` object.

To register a new endpoint, you call `API.v1.addRoute(path, options, endpoints)` in `ApiClass.ts`. The `addRoute()` method accepts a path string, an options object (with fields like `authRequired`, `permissionsRequired`, `validateParams`, `rateLimiterOptions`), and an object mapping HTTP methods (GET, POST, PUT, DELETE) to handler functions. Each handler receives a typed `this` context with `this.userId`, `this.bodyParams`, `this.queryParams`, and helper methods like `this.success()`, `this.failure()`, `this.notFound()`.

Internally, `addRoute()` wraps each action with `_internalRouteActionHandler()`, which orchestrates the middleware chain: authentication via `authenticationMiddlewareForHono` (from `middlewares/authenticationHono.ts`), permission checks via `permissionsMiddleware` (from `middlewares/permissions.ts`), rate limiting, and optional two-factor authentication verification through `checkCodeForUser()` from `app/2fa/server/code`. The handler is then registered on the underlying `RocketChatAPIRouter` (from `router.ts`), which manages Hono route registration.

For example, `apps/meteor/app/api/server/v1/chat.ts` registers endpoints like `chat.sendMessage`, `chat.delete`, `chat.update`, `chat.react`, etc. The `chat.sendMessage` POST endpoint validates params using `isChatSendMessageProps` from `@rocket.chat/rest-typings`, checks auth, then calls `executeSendMessage()`. Parameter validation uses `ajv` schema validators defined in the `@rocket.chat/rest-typings` package.

The API bootstrap entry point is `apps/meteor/app/api/server/index.ts`, which imports all v1 endpoint files, causing their `addRoute()` calls to execute at startup. The `RocketChatAPIRouter` (`router.ts`, line 36) extends a base router and handles the Hono framework integration, converting Rocket.Chat's route definitions into Hono-compatible middleware chains.

### Call Chain
```
api.ts createApi() → new APIClass(options)
→ v1/chat.ts: API.v1.addRoute('chat.sendMessage', ...)
→ ApiClass.ts addRoute() → _internalRouteActionHandler()
  → authenticationMiddlewareForHono (authenticationHono.ts)
  → permissionsMiddleware (permissions.ts)
  → rate limiter
  → action handler
→ RocketChatAPIRouter (router.ts) registers on Hono
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/api/server/api.ts` | Creates API instances via `createApi()`, exports `API` singleton |
| `apps/meteor/app/api/server/ApiClass.ts` | `APIClass` with `addRoute()`, `_internalRouteActionHandler()` |
| `apps/meteor/app/api/server/router.ts` | `RocketChatAPIRouter` — Hono-based route registration |
| `apps/meteor/app/api/server/middlewares/authenticationHono.ts` | `authenticationMiddlewareForHono` — auth middleware |
| `apps/meteor/app/api/server/middlewares/permissions.ts` | `permissionsMiddleware` — permission checking |
| `apps/meteor/app/api/server/v1/chat.ts` | Example endpoint file registering chat.sendMessage, chat.delete, etc. |
| `apps/meteor/app/api/server/index.ts` | Bootstrap — imports all v1 endpoint files |
| `apps/meteor/app/api/server/definition.ts` | Type definitions for route options, results, actions |
| `packages/rest-typings/src/index.ts` | Param validators (isChatSendMessageProps, etc.) and ajv schemas |

### Key Symbols
createApi, APIClass, addRoute, _internalRouteActionHandler, RocketChatAPIRouter, authenticationMiddlewareForHono, permissionsMiddleware, API.v1, API.default, checkCodeForUser, ajv, isChatSendMessageProps, TypedThis, TypedAction, TypedOptions, GenericRouteExecutionContext, APIActionHandler
