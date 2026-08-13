## File: packages/apps/deno-runtime/main.ts

```typescript
import { Buffer } from 'node:buffer';
import { Socket } from 'node:net';
import process from 'node:process';

// Deno consumes the base as TypeScript source through the import map: ESM
// imports honor the map (`@rocket.chat/apps/` → `../`), so bare specifiers and
// `@rocket.chat/apps/*` resolve to allowed paths. Importing the compiled `dist`
// instead would run the base as CommonJS, whose `require()` bypasses the import
// map and falls back to node_modules — outside the subprocess read allowlist.
import { setSandboxGlobals, setSandboxRequire } from '@rocket.chat/apps/base-runtime/handlers/app/construct';
import { setTransport } from '@rocket.chat/apps/base-runtime/lib/messenger';
import { startMainLoop } from '@rocket.chat/apps/base-runtime/mainLoop';

import registerErrorListeners from './error-handlers';
import { require } from './lib/require';
import { stdoutTransport } from './lib/transports/stdoutTransport';

if (!process.argv.includes('--subprocess')) {
	console.error(`
            This is the Deno wrapper for the Rocket.Chat Apps runtime. It is not meant to be executed stand-alone;
            It is instead meant to be executed as a subprocess by the Apps-Engine framework.
	`);

	process.exit(1);
}

function prepareEnvironment() {
    /* Implementation Hidden */
}

// This runtime communicates with the Apps-Engine host through stdout
setTransport(stdoutTransport);

// Deno's sandbox `require` is a createRequire shim that resolves compiled
// apps-engine paths; the eval shell additionally needs a `Buffer` and a
// shadowed `Deno` (→ undefined) bound by name.
setSandboxRequire(require);
setSandboxGlobals({ Buffer, Deno: undefined });

// Process-global side effect; doing it once at startup is cleaner than inside construct
prepareEnvironment();

registerErrorListeners();

startMainLoop();

```