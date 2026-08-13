## File: apps/meteor/ee/server/apps/storage/ConfigurableAppSourceStorage.ts

```typescript
import { AppSourceStorage } from '@rocket.chat/apps/dist/server/storage/AppSourceStorage';
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';

import { AppFileSystemSourceStorage } from './AppFileSystemSourceStorage';
import { AppGridFSSourceStorage } from './AppGridFSSourceStorage';

export class ConfigurableAppSourceStorage extends AppSourceStorage {
	private filesystem: AppFileSystemSourceStorage;

	private gridfs: AppGridFSSourceStorage;

	private storage: AppSourceStorage;

	constructor(
		readonly storageType: string,
		filesystemStoragePath: string,
	) {
        /* Implementation Hidden */
    }

	public setStorage(type: string): void {
        /* Implementation Hidden */
    }

	public setFileSystemStoragePath(path: string): void {
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
}

```