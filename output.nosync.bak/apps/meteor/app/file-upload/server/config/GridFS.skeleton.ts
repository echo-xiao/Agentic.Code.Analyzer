## File: apps/meteor/app/file-upload/server/config/GridFS.ts

```typescript
import type * as http from 'node:http';
import type { TransformCallback, TransformOptions } from 'node:stream';
import stream from 'node:stream';
import zlib from 'node:zlib';

import type { IUpload } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';

import { getContentDisposition } from './helper';
import { UploadFS } from '../../../../server/ufs';
import { FileUploadClass, FileUpload } from '../lib/FileUpload';
import { getFileRange, setRangeHeaders } from '../lib/ranges';

const logger = new Logger('FileUpload');

class ExtractRange extends stream.Transform {
	private start: number;

	private stop: number;

	private bytes_read: number;

	constructor(options: TransformOptions & { start: number; stop: number }) {
        /* Implementation Hidden */
    }

	override _transform(chunk: any, _enc: BufferEncoding, cb: TransformCallback) {
        /* Implementation Hidden */
    }
}

// code from: https://github.com/jalik/jalik-ufs/blob/master/ufs-server.js#L310
const readFromGridFS = async function (
	storeName: string | undefined,
	fileId: string,
	file: IUpload,
	req: http.IncomingMessage,
	res: http.ServerResponse,
) {
    /* Implementation Hidden */
};

const copyFromGridFS = async function (storeName: string | undefined, fileId: string, file: IUpload, out: stream.Writable) {
    /* Implementation Hidden */
};

FileUpload.configureUploadsStore('GridFS', 'GridFS:Uploads', {
	collectionName: 'rocketchat_uploads',
});

FileUpload.configureUploadsStore('GridFS', 'GridFS:UserDataFiles', {
	collectionName: 'rocketchat_userDataFiles',
});

// DEPRECATED: backwards compatibility (remove)
UploadFS.getStores().rocketchat_uploads = UploadFS.getStores()['GridFS:Uploads'];

FileUpload.configureUploadsStore('GridFS', 'GridFS:Avatars', {
	collectionName: 'rocketchat_avatars',
});

new FileUploadClass({
	name: 'GridFS:Uploads',

	async get(file, req, res) {
		file = FileUpload.addExtensionTo(file);

		res.setHeader('Content-Disposition', `${getContentDisposition(req)}; filename*=UTF-8''${encodeURIComponent(file.name || '')}`);
		file.uploadedAt && res.setHeader('Last-Modified', file.uploadedAt.toUTCString());
		res.setHeader('Content-Type', file.type || 'application/octet-stream');
		res.setHeader('Content-Length', file.size || 0);

		await readFromGridFS(file.store, file._id, file, req, res);
	},

	async copy(file, out) {
		await copyFromGridFS(file.store, file._id, file, out);
	},
});

new FileUploadClass({
	name: 'GridFS:UserDataFiles',

	async get(file, req, res) {
		file = FileUpload.addExtensionTo(file);

		res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(file.name || '')}`);
		file.uploadedAt && res.setHeader('Last-Modified', file.uploadedAt.toUTCString());
		res.setHeader('Content-Type', file.type || '');
		res.setHeader('Content-Length', file.size || 0);

		await readFromGridFS(file.store, file._id, file, req, res);
	},

	async copy(file, out) {
		await copyFromGridFS(file.store, file._id, file, out);
	},
});

new FileUploadClass({
	name: 'GridFS:Avatars',

	async get(file, req, res) {
		file = FileUpload.addExtensionTo(file);

		await readFromGridFS(file.store, file._id, file, req, res);
	},

	async copy(file, out) {
		await copyFromGridFS(file.store, file._id, file, out);
	},
});

```