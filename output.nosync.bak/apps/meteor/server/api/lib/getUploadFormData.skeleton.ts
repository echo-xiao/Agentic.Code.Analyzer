## File: apps/meteor/server/api/lib/getUploadFormData.ts

```typescript
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';

import { MeteorError } from '@rocket.chat/core-services';
import type { ValidateFunction } from 'ajv';
import busboy from 'busboy';

import { getMimeType } from '../../../app/utils/lib/mimeTypes';

type UploadResult<K> = {
	file: Readable & { truncated: boolean };
	fieldname: string;
	filename: string;
	encoding: string;
	mimetype: string;
	fileBuffer: Buffer;
	fields: K;
};

type UploadResultWithOptionalFile<K> =
	| UploadResult<K>
	| ({
			[P in keyof Omit<UploadResult<K>, 'fields'>]: undefined;
	  } & {
			fields: K;
	  });

export async function getUploadFormData<
	T extends string,
	K extends Record<string, string> = Record<string, string>,
	V extends ValidateFunction<K> = ValidateFunction<K>,
>(
	{ request }: { request: Request },
	options: {
		field?: T;
		validate?: V;
		sizeLimit?: number;
		fileOptional: true;
	},
): Promise<UploadResultWithOptionalFile<K>>;

export async function getUploadFormData<
	T extends string,
	K extends Record<string, string> = Record<string, string>,
	V extends ValidateFunction<K> = ValidateFunction<K>,
>(
	{ request }: { request: Request },
	options?: {
		field?: T;
		validate?: V;
		sizeLimit?: number;
		fileOptional?: false | undefined;
	},
): Promise<UploadResult<K>>;

export async function getUploadFormData<
	T extends string,
	K extends Record<string, string> = Record<string, string>,
	V extends ValidateFunction<K> = ValidateFunction<K>,
>(
	{ request }: { request: Request },
	options: {
		field?: T;
		validate?: V;
		sizeLimit?: number;
		fileOptional?: boolean;
	} = {},
): Promise<UploadResultWithOptionalFile<K>> {
    /* Implementation Hidden */
}

```