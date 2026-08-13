## File: packages/apps/deno-runtime/lib/require.ts

```typescript
import { createRequire } from 'node:module';

const _require = createRequire(import.meta.url);

const ALLOWED_NATIVE_MODULES = [
	'path',
	'url',
	'crypto',
	'buffer',
	'stream',
	'net',
	'http',
	'https',
	'zlib',
	'util',
	'punycode',
	'os',
	'querystring',
	'fs',
];

const ALLOWED_EXTERNAL_MODULES = ['uuid', '@rocket.chat/apps-engine'];

// As the apps are bundled, the only times they will call require are
// 1. To require native modules
// 2. To require external npm packages we may provide
// 3. To require apps-engine files
export const require = (module: string) => {
    /* Implementation Hidden */
};

```