## File: apps/meteor/server/services/image/service.ts

```typescript
import type { Readable } from 'node:stream';
import stream from 'node:stream';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IMediaService, ResizeResult } from '@rocket.chat/core-services';
import { streamToBuffer } from '@rocket.chat/tools';
import ExifTransformer from 'exif-be-gone';
import ft from 'file-type';
import isSvg from 'is-svg';
import sharp from 'sharp';

export class MediaService extends ServiceClassInternal implements IMediaService {
	protected name = 'media';

	private imageExts = new Set([
		'jpg',
		'png',
		'gif',
		'webp',
		'flif',
		'cr2',
		'tif',
		'bmp',
		'jxr',
		'psd',
		'ico',
		'bpg',
		'jp2',
		'jpm',
		'jpx',
		'heic',
		'cur',
		'dcm',
	]);

	async resizeFromBuffer(
		input: Buffer,
		width: number,
		height: number,
		keepType: boolean,
		blur: boolean,
		enlarge: boolean,
		fit?: keyof sharp.FitEnum | undefined,
	): Promise<ResizeResult> {
        /* Implementation Hidden */
    }

	async resizeFromStream(
		input: stream.Stream,
		width: number,
		height: number,
		keepType: boolean,
		blur: boolean,
		enlarge: boolean,
		fit?: keyof sharp.FitEnum | undefined,
	): Promise<ResizeResult> {
        /* Implementation Hidden */
    }

	async isImage(buff: Buffer): Promise<boolean> {
        /* Implementation Hidden */
    }

	isSvgImage(buff: Buffer): boolean {
        /* Implementation Hidden */
    }

	stripExifFromBuffer(buffer: Buffer): Promise<Buffer> {
        /* Implementation Hidden */
    }

	stripExifFromImageStream(stream: stream.Stream): Readable {
        /* Implementation Hidden */
    }

	private bufferToStream(buffer: Buffer): stream.PassThrough {
        /* Implementation Hidden */
    }
}

```