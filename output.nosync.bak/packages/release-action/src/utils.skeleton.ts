## File: packages/release-action/src/utils.ts

```typescript
import fs from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import mdastToString from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import unified from 'unified';

import { getAppsEngineVersion, getDenoVersion, getMongoVersion, getNodeNpmVersions } from './getMetadata';

export const BumpLevels = {
	dep: 0,
	patch: 1,
	minor: 2,
	major: 3,
} as const;

export function getChangelogEntry(changelog: string, version: string) {
    /* Implementation Hidden */
}

export async function readPackageJson(cwd: string) {
    /* Implementation Hidden */
}

async function getUpdateFilesList(cwd: string): Promise<string[]> {
    /* Implementation Hidden */
}

export async function bumpFileVersions(cwd: string, oldVersion: string, newVersion: string) {
    /* Implementation Hidden */
}

export async function createBumpFile(cwd: string, pkgName: string) {
    /* Implementation Hidden */
}

export async function getEngineVersionsMd(cwd: string) {
    /* Implementation Hidden */
}

export function isPreRelease(cwd: string) {
    /* Implementation Hidden */
}

export function createTempReleaseNotes(version: string, releaseBody: string) {
    /* Implementation Hidden */
}

```