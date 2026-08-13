## File: packages/apps/src/server/runtime/base/bundler.ts

```typescript
import * as path from 'node:path';

import { build, type PluginBuild, type OnLoadArgs, type OnResolveArgs } from 'esbuild';

import type { IParseAppPackageResult } from '../../compiler';

/**
 * Some legacy apps that might be installed in workspaces have not been bundled after compilation,
 * leading to multiple files being sent to the subprocess and requiring further logic to require one another.
 * This makes running the app in the Deno Runtime much more difficult, so instead we bundle the files at runtime.
 */
export async function bundleLegacyApp(appPackage: IParseAppPackageResult) {
    /* Implementation Hidden */
}

```