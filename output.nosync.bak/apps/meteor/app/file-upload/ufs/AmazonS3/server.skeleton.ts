## File: apps/meteor/app/file-upload/ufs/AmazonS3/server.ts

```typescript
import stream from 'node:stream';

import {
	DeleteObjectCommand,
	GetObjectCommand,
	S3Client,
	type GetObjectCommandInput,
	type PutObjectCommandInput,
	type S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { IUpload } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import { check } from 'meteor/check';
import _ from 'underscore';

import { SystemLogger } from '../../../../server/lib/logger/system';
import { UploadFS } from '../../../../server/ufs';
import type { StoreOptions } from '../../../../server/ufs/ufs-store';
import { getUrlExpiryTimeSpanWithFallback } from '../../server/lib/urlExpiry';

export type S3Options = StoreOptions & {
	connection: S3ClientConfig;
	params: {
		Bucket: string;
		ACL: string;
	};
	URLExpiryTimeSpan: number;
	getPath: (file: Omit<IUpload, '_updatedAt'>) => string;
};

class AmazonS3Store extends UploadFS.Store {
	protected getPath: (file: Omit<IUpload, '_updatedAt'>) => string;

	constructor(options: S3Options) {
        /* Implementation Hidden */
    }
}

// Add store to UFS namespace
UploadFS.store.AmazonS3 = AmazonS3Store;

```