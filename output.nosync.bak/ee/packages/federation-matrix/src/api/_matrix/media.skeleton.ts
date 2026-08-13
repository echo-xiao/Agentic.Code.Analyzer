## File: ee/packages/federation-matrix/src/api/_matrix/media.ts

```typescript
import crypto from 'node:crypto';

import type { IUpload } from '@rocket.chat/core-typings';
import { federationSDK } from '@rocket.chat/federation-sdk';
import { Router } from '@rocket.chat/http-router';
import { ajv } from '@rocket.chat/rest-typings/dist/v1/Ajv';

import { MatrixMediaService } from '../../services/MatrixMediaService';
import { canAccessResourceMiddleware } from '../middlewares/canAccessResource';

const MediaDownloadParamsSchema = {
	type: 'object',
	properties: {
		mediaId: { type: 'string' },
	},
	required: ['mediaId'],
	additionalProperties: false,
};

const ErrorResponseSchema = {
	type: 'object',
	properties: {
		errcode: { type: 'string' },
		error: { type: 'string' },
	},
	required: ['errcode', 'error'],
};

const BufferResponseSchema = {
	type: 'object',
	description: 'Raw file buffer or multipart response',
};

const isMediaDownloadParamsProps = ajv.compile(MediaDownloadParamsSchema);
const isErrorResponseProps = ajv.compile(ErrorResponseSchema);
const isBufferResponseProps = ajv.compile(BufferResponseSchema);

const SECURITY_HEADERS = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Content-Security-Policy': "default-src 'none'; img-src 'self'; media-src 'self'",
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

function createMultipartResponse(
	buffer: Buffer,
	mimeType: string,
	fileName: string,
	metadata: Record<string, any> = {},
): { body: Buffer; contentType: string } {
    /* Implementation Hidden */
}

async function getMediaFile(mediaId: string, serverName: string): Promise<{ file: IUpload; buffer: Buffer } | null> {
    /* Implementation Hidden */
}

export const getMatrixMediaRoutes = () => {
    /* Implementation Hidden */
};

```