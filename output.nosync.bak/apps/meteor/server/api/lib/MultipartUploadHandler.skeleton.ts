## File: apps/meteor/server/api/lib/MultipartUploadHandler.ts

```typescript
import fs from 'node:fs';
import { IncomingMessage } from 'node:http';
import type { Stream, Transform } from 'node:stream';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import { MeteorError } from '@rocket.chat/core-services';
import { Random } from '@rocket.chat/random';
import busboy, { type BusboyConfig } from 'busboy';
import ExifTransformer from 'exif-be-gone';

import { getMimeType } from '../../../app/utils/lib/mimeTypes';
import { UploadFS } from '../../ufs';

export type ParsedUpload = {
	tempFilePath: string;
	filename: string;
	mimetype: string;
	size: number;
	fieldname: string;
};

export type ParseOptions = {
	field: string;
	maxSize?: number;
	allowedMimeTypes?: string[];
	transforms?: Transform[]; // Optional transform pipeline (e.g., EXIF stripping)
	fileOptional?: boolean;
};

export class MultipartUploadHandler {
	static transforms = {
		stripExif(): Transform {
			return new ExifTransformer();
		},
	};

	static async cleanup(tempFilePath: string): Promise<void> {
        /* Implementation Hidden */
    }

	static async stripExifFromFile(tempFilePath: string): Promise<number> {
        /* Implementation Hidden */
    }

	static async parseRequest(
		request: IncomingMessage | Request,
		options: ParseOptions,
	): Promise<{ file: ParsedUpload | null; fields: Record<string, string> }> {
        /* Implementation Hidden */
    }
}

```