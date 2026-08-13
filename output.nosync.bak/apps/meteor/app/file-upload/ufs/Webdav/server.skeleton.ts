## File: apps/meteor/app/file-upload/ufs/Webdav/server.ts

```typescript
import stream from 'node:stream';

import type { IUpload } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import { check } from 'meteor/check';

import { WebdavClientAdapter } from '../../../../server/bridges/webdav/lib/webdavClientAdapter';
import { SystemLogger } from '../../../../server/lib/logger/system';
import { UploadFS } from '../../../../server/ufs';
import type { StoreOptions } from '../../../../server/ufs/ufs-store';

type WebdavOptions = StoreOptions & {
	connection: {
		credentials: {
			server: string;
			username: string;
			password: string;
		};
	};
	uploadFolderPath: string;
	getPath: (file: Omit<IUpload, '_updatedAt'>) => string;
};

class WebdavStore extends UploadFS.Store {
	protected getPath: (file: Omit<IUpload, '_updatedAt'>) => string;

	constructor(options: WebdavOptions) {
        /* Implementation Hidden */
    }
}

// Add store to UFS namespace
UploadFS.store.Webdav = WebdavStore;

```