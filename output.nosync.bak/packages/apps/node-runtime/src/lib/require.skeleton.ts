## File: packages/apps/node-runtime/src/lib/require.ts

```typescript
const ALLOWED_MODULES = [
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
	// External libraries
	'uuid',
	'@rocket.chat/apps-engine',
];

// As the apps are bundled, the only times they will call require are
// 1. To require native modules
// 2. To require external npm packages we may provide
// 3. To require apps-engine files
export const sandboxRequire = (module: string) => {
    /* Implementation Hidden */
};

```