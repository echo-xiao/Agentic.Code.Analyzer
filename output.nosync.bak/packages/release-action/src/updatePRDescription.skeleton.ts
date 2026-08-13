## File: packages/release-action/src/updatePRDescription.ts

```typescript
import fs from 'node:fs';
import path from 'node:path';

import * as core from '@actions/core';
import { exec } from '@actions/exec';
import * as github from '@actions/github';

import { setupOctokit } from './setupOctokit';
import { createTempReleaseNotes, getChangelogEntry, getEngineVersionsMd, isPreRelease, readPackageJson } from './utils';

export async function updatePRDescription({
	githubToken,
	mainPackagePath,
	cwd = process.cwd(),
}: {
	githubToken: string;
	mainPackagePath: string;
	cwd?: string;
}) {
    /* Implementation Hidden */
}

```