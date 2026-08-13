## File: apps/meteor/app/file-upload/ufs/GoogleStorage/server.ts

```typescript
import type { GetSignedUrlConfig } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage';
import type { IUpload } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import { check } from 'meteor/check';

import { SystemLogger } from '../../../../server/lib/logger/system';
import { UploadFS } from '../../../../server/ufs';
import type { StoreOptions } from '../../../../server/ufs/ufs-store';
import { getUrlExpiryTimeSpanWithFallback } from '../../server/lib/urlExpiry';

type GStoreOptions = StoreOptions & {
	connection: {
		credentials: {
			client_email: string;
			private_key: string;
			projectId: string;
		};
	};
	bucket: string;
	URLExpiryTimeSpan: number;
	getPath: (file: Omit<IUpload, '_updatedAt'>) => string;
};

class GoogleStorageStore extends UploadFS.Store {
	protected getPath: (file: Omit<IUpload, '_updatedAt'>) => string;

	constructor(options: GStoreOptions) {
        /* Implementation Hidden */
    }
}

// Add store to UFS namespace
UploadFS.store.GoogleStorage = GoogleStorageStore;

```