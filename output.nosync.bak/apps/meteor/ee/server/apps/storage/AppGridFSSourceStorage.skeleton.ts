## File: apps/meteor/ee/server/apps/storage/AppGridFSSourceStorage.ts

```typescript
import { AppSourceStorage } from '@rocket.chat/apps/dist/server/storage/AppSourceStorage';
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';
import { streamToBuffer } from '@rocket.chat/tools';
import { MongoInternals } from 'meteor/mongo';
import { NpmModuleMongodb } from 'meteor/npm-mongo';
import { ObjectId } from 'mongodb';

export class AppGridFSSourceStorage extends AppSourceStorage {
	private pathPrefix = 'GridFS:/';

	private bucket: NpmModuleMongodb.GridFSBucket;

	constructor() {
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

	private idToPath(id: NpmModuleMongodb.GridFSBucketWriteStream['id']): string {
        /* Implementation Hidden */
    }

	private itemToObjectId(item: IAppStorageItem): ObjectId {
        /* Implementation Hidden */
    }
}

```