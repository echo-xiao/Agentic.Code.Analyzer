## File: apps/meteor/ee/server/apps/storage/AppFileSystemSourceStorage.ts

```typescript
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';

import { AppSourceStorage } from '@rocket.chat/apps/dist/server/storage/AppSourceStorage';
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';

export class AppFileSystemSourceStorage extends AppSourceStorage {
	private pathPrefix = 'fs:/';

	private path: string;

	public setPath(path: string): void {
        /* Implementation Hidden */
    }

	public checkPath(): void {
        /* Implementation Hidden */
    }

	public async store(item: IAppStorageItem, zip: Buffer): Promise<string> {
        /* Implementation Hidden */
    }

	public async fetch(item: IAppStorageItem): Promise<Buffer> {
        /* Implementation Hidden */
    }

	public async update(item: IAppStorageItem, zip: Buffer): Promise<string> {
        /* Implementation Hidden */
    }

	public async remove(item: IAppStorageItem): Promise<void> {
        /* Implementation Hidden */
    }

	private itemToFilename(item: IAppStorageItem): string {
        /* Implementation Hidden */
    }

	private filenameToSourcePath(filename: string): string {
        /* Implementation Hidden */
    }

	private sourcePathToFilename(sourcePath: string): string {
        /* Implementation Hidden */
    }
}

```