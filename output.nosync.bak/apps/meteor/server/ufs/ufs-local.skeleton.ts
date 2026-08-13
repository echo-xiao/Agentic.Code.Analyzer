## File: apps/meteor/server/ufs/ufs-local.ts

```typescript
import fs from 'node:fs';
import { unlink } from 'node:fs/promises';
import { isNativeError } from 'node:util/types';

import type { IUpload } from '@rocket.chat/core-typings';
import mkdirp from 'mkdirp';

import { UploadFS } from './ufs';
import type { StoreOptions } from './ufs-store';
import { Store } from './ufs-store';

type LocalStoreOptions = StoreOptions & {
	mode?: string;
	path?: string;
	writeMode?: number;
};

export class LocalStore extends Store {
	protected getPath: (file: string) => string;

	constructor(options: LocalStoreOptions) {
        /* Implementation Hidden */
    }

	override async getFilePath(fileId: string, fileParam?: IUpload): Promise<string> {
        /* Implementation Hidden */
    }
}

// Add store to UFS namespace
UploadFS.store.Local = LocalStore;

```