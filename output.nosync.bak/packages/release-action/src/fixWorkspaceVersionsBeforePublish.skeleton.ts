## File: packages/release-action/src/fixWorkspaceVersionsBeforePublish.ts

```typescript
// Changesets doesn't currently support workspace versions:
// https://github.com/changesets/changesets/issues/432
// https://github.com/changesets/action/issues/246
// To work around that, we'll manually resolve any `workspace:` version ranges
// with this tool prior to publishing. If/when changesets adds native support for
// publishing with Yarn 3, we can remove this script.
//
// We'll only support the `workspace:^` range, which is the only one we
// generally want to use.

import fs from 'node:fs/promises';
import path from 'node:path';

import { getExecOutput } from '@actions/exec';

import { readPackageJson } from './utils';

const DEPENDENCY_TYPES = ['dependencies', 'devDependencies', 'peerDependencies'];

export async function fixWorkspaceVersionsBeforePublish() {
    /* Implementation Hidden */
}

```