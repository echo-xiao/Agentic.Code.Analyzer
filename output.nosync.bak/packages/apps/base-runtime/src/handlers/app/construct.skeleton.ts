## File: packages/apps/base-runtime/src/handlers/app/construct.ts

```typescript
import type { IParseAppPackageResult } from '@rocket.chat/apps/dist/server/compiler/IParseAppPackageResult';
import type { App } from '@rocket.chat/apps-engine/definition/App';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { sanitizeDeprecatedUsage } from '../../lib/sanitizeDeprecatedUsage';

/**
 * A platform-dependent `require` used to resolve the modules an app is allowed
 * to load (native `node:` modules, a small allow-list of npm packages, and
 * apps-engine files). Each runtime injects its own via {@link setSandboxRequire}
 * — Node hands over its global `require`, Deno hands over its `createRequire`
 * shim that knows how to resolve compiled apps-engine paths.
 */
type SandboxRequire = (module: string) => unknown;

function defaultSandboxRequire(): never {
    /* Implementation Hidden */
}

let sandboxRequire: SandboxRequire = defaultSandboxRequire;

export function setSandboxRequire(newRequire: SandboxRequire): void {
    /* Implementation Hidden */
}

/**
 * Extra globals bound into the app's eval shell on top of the common ones
 * (`exports`, `module`, `require`, `console`, `globalThis`). Node needs none;
 * Deno injects a `Buffer` and shadows `Deno` with `undefined`. Injecting them
 * as data keeps the eval-shell skeleton single-source.
 */
type SandboxGlobals = Record<string, unknown>;

let sandboxGlobals: SandboxGlobals = {};

export function setSandboxGlobals(globals: SandboxGlobals): void {
    /* Implementation Hidden */
}

function wrapAppCode(code: string): (require: SandboxRequire) => Promise<Record<string, unknown>> {
    /* Implementation Hidden */
}

type AppConstructor = new (...args: unknown[]) => App;

export default async function handleConstructApp(request: RequestContext): Promise<boolean> {
    /* Implementation Hidden */
}

```