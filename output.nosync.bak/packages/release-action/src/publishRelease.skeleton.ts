## File: packages/release-action/src/publishRelease.ts

```typescript
import fs from 'node:fs';
import path from 'node:path';

import * as core from '@actions/core';
import { exec } from '@actions/exec';
import * as github from '@actions/github';
import semver from 'semver';

import { createNpmFile } from './createNpmFile';
import { fixWorkspaceVersionsBeforePublish } from './fixWorkspaceVersionsBeforePublish';
import { checkoutBranch, commitChanges, createTag, getCurrentBranch, mergeBranch, pushChanges } from './gitUtils';
import { setupOctokit } from './setupOctokit';
import { bumpFileVersions, createBumpFile, getChangelogEntry, getEngineVersionsMd, isPreRelease, readPackageJson } from './utils';

export async function publishRelease({
	githubToken,
	mainPackagePath,
	mergeFinal = false,
	baseRef,
	cwd = process.cwd(),
}: {
	githubToken: string;
	mainPackagePath: string;
	baseRef?: string;
	mergeFinal?: boolean;
	cwd?: string;
}) {
    /* Implementation Hidden */
}

```