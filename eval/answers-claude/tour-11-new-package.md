# How do you create a new package in the monorepo?

## Answer

Rocket.Chat's monorepo uses a `packages/` directory containing 50+ independent npm packages managed by Yarn workspaces (or a similar workspace tool). Each package has its own `package.json`, TypeScript configuration, and source directory. Creating a new package involves setting up this structure and wiring it into the workspace dependency graph.

A minimal example is `packages/account-utils`, which exports a single utility function. Its source file `packages/account-utils/src/index.ts` contains:

```typescript
export function hashLoginToken(loginToken: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(loginToken);
    return hash.digest('base64');
}
```

This function computes a SHA-256 hash of a login token and returns it as a base64-encoded string. It is used by the API authentication middleware in `apps/meteor/app/api/server/middlewares/authentication.ts` (and `authenticationHono.ts`) to verify user tokens. When a REST API request arrives with an `X-Auth-Token` header, the middleware hashes the token with `hashLoginToken()` and looks up the user by the hashed value in the database, matching against `services.resume.loginTokens.hashedToken`.

The package structure follows a standard pattern:
- `packages/account-utils/package.json` — declares the package name (`@rocket.chat/account-utils`), version, main/types entry points, and dependencies
- `packages/account-utils/src/index.ts` — source code with exports
- `packages/account-utils/tsconfig.json` — TypeScript compiler configuration, typically extending a shared base config

To create a new package:
1. Create `packages/my-package/` directory
2. Add `package.json` with name `@rocket.chat/my-package`, main entry point, and dependencies
3. Add `tsconfig.json` extending the shared config
4. Create `src/index.ts` with exports
5. Add the package as a dependency in consuming packages' `package.json` (e.g., in `apps/meteor/package.json`)
6. Run `yarn install` to link the workspace package

Other notable packages include: `packages/core-typings` (shared TypeScript interfaces like `IMessage`, `IRoom`, `IUser`), `packages/models` (database model implementations), `packages/core-services` (service interfaces and proxies), `packages/rest-typings` (REST API type definitions and validators), `packages/livechat` (Livechat widget), `packages/apps-engine` (Apps framework), and `packages/i18n` (internationalization).

### Call Chain
```
packages/account-utils/src/index.ts — exports hashLoginToken()
→ apps/meteor/app/api/server/middlewares/authenticationHono.ts — imports hashLoginToken
  → receives X-Auth-Token header
  → hashLoginToken(token) → SHA256 → base64
  → Users.findOneByIdAndLoginHashedToken(userId, hashedToken)
  → sets userId on request context
```

### Key Files
| File | Role |
|------|------|
| `packages/account-utils/src/index.ts` | `hashLoginToken()` — SHA256 hash of login token, base64 encoded |
| `packages/account-utils/package.json` | Package manifest with name `@rocket.chat/account-utils` |
| `apps/meteor/app/api/server/middlewares/authenticationHono.ts` | Consumer — uses `hashLoginToken()` for token verification |
| `packages/core-typings/src/index.ts` | Example large package — shared type definitions |
| `packages/models/src/index.ts` | Example large package — database model exports |
| `packages/core-services/src/index.ts` | Example large package — service interfaces and proxies |

### Key Symbols
hashLoginToken, @rocket.chat/account-utils, @rocket.chat/core-typings, @rocket.chat/models, @rocket.chat/core-services, @rocket.chat/rest-typings, @rocket.chat/apps-engine, packages, workspace
