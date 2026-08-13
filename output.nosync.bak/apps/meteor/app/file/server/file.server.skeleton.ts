## File: apps/meteor/app/file/server/file.server.ts

```typescript
import type { ReadStream } from 'node:fs';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';

import type { ObjectId } from 'bson';
import { MongoInternals } from 'meteor/mongo';
import { NpmModuleMongodb } from 'meteor/npm-mongo';
import mime from 'mime-type/with-db';
import mkdirp from 'mkdirp';

import { sanitizeFileName } from './functions/sanitizeFileName';

const { db } = MongoInternals.defaultRemoteCollectionDriver().mongo;

type IFile = {
	buffer: Buffer;
	contentType?: string;
	length: number;
	uploadDate?: Date;
};

interface IRocketChatFileStore {
	remove(fileId: string): Promise<void>;

	createWriteStream(fileName: string, contentType: string): void;

	createReadStream(fileName: string): void;

	getFileWithReadStream(fileName: string): Promise<
		| {
				readStream: NpmModuleMongodb.GridFSBucketReadStream | ReadStream;
				contentType?: string;
				length: number;
				uploadDate?: Date;
		  }
		| undefined
	>;

	getFile(fileName: string): Promise<IFile | undefined>;

	deleteFile(fileName: string): Promise<void>;
}

class GridFS implements IRocketChatFileStore {
	private name: string;

	private bucket: NpmModuleMongodb.GridFSBucket;

	constructor({ name = 'file' } = {}) {
        /* Implementation Hidden */
    }

	private async findOne(filename: string) {
        /* Implementation Hidden */
    }

	async remove(fileId: string) {
        /* Implementation Hidden */
    }

	createWriteStream(fileName: string, contentType: string) {
        /* Implementation Hidden */
    }

	createReadStream(fileName: string) {
        /* Implementation Hidden */
    }

	async getFileWithReadStream(fileName: string) {
        /* Implementation Hidden */
    }

	async getFile(fileName: string) {
        /* Implementation Hidden */
    }

	async deleteFile(fileName: string) {
        /* Implementation Hidden */
    }
}

class FileSystem implements IRocketChatFileStore {
	private absolutePath: string;

	constructor({ absolutePath = '~/uploads' } = {}) {
        /* Implementation Hidden */
    }

	createWriteStream(fileName: string) {
        /* Implementation Hidden */
    }

	createReadStream(fileName: string) {
        /* Implementation Hidden */
    }

	stat(fileName: string) {
        /* Implementation Hidden */
    }

	async remove(fileName: string) {
        /* Implementation Hidden */
    }

	async getFileWithReadStream(fileName: string) {
        /* Implementation Hidden */
    }

	async getFile(fileName: string) {
        /* Implementation Hidden */
    }

	async deleteFile(fileName: string) {
        /* Implementation Hidden */
    }
}

export const RocketChatFile = {
	bufferToStream(buffer: Buffer) {
		return Readable.from(buffer);
	},

	dataURIParse(dataURI: string | Buffer) {
		const imageData = (Buffer.isBuffer(dataURI) ? dataURI : Buffer.from(dataURI)).toString().split(';base64,');
		return {
			image: imageData[1],
			contentType: imageData[0].replace('data:', ''),
		};
	},

	GridFS,
	FileSystem,
};

```