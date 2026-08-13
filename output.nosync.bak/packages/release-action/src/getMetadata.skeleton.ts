## File: packages/release-action/src/getMetadata.ts

```typescript
import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import path from 'node:path';

import { readPackageJson } from './utils';

export async function getMongoVersion(cwd: string) {
    /* Implementation Hidden */
}

export async function getNodeNpmVersions(cwd: string): Promise<{ node: string; yarn: string; npm: string }> {
    /* Implementation Hidden */
}

export async function getAppsEngineVersion(cwd: string) {
    /* Implementation Hidden */
}

export async function getDenoVersion(cwd: string) {
    /* Implementation Hidden */
}

```