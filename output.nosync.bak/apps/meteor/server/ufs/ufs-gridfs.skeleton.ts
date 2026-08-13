## File: apps/meteor/server/ufs/ufs-gridfs.ts

```typescript
import type { IUpload } from '@rocket.chat/core-typings';
import { MongoInternals } from 'meteor/mongo';
import { NpmModuleMongodb } from 'meteor/npm-mongo';
import type { ObjectId } from 'mongodb';

import { UploadFS } from './ufs';
import type { StoreOptions } from './ufs-store';

type GridFSStoreOptions = StoreOptions & {
	chunkSize: number;
	collectionName: string;
};

export class GridFSStore extends UploadFS.Store {
	protected chunkSize: number;

	protected collectionName: string;

	constructor(options: GridFSStoreOptions) {
        /* Implementation Hidden */
    }
}

// Add store to UFS namespace
UploadFS.store.GridFS = GridFSStore;

```