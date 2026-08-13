## File: packages/release-action/src/bumpNextVersion.ts

```typescript
import fs from 'node:fs';
import path from 'node:path';

import * as core from '@actions/core';
import { exec } from '@actions/exec';
import * as github from '@actions/github';

import { createNpmFile } from './createNpmFile';
import { fixWorkspaceVersionsBeforePublish } from './fixWorkspaceVersionsBeforePublish';
import { commitChanges, createBranch, createTag, pushNewBranch } from './gitUtils';
import { setupOctokit } from './setupOctokit';
import { getChangelogEntry, bumpFileVersions, readPackageJson, getEngineVersionsMd, createTempReleaseNotes } from './utils';

export async function bumpNextVersion({
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