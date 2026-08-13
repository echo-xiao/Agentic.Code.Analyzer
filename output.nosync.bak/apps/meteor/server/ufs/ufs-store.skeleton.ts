## File: apps/meteor/server/ufs/ufs-store.ts

```typescript
import fs from 'node:fs';
import type * as http from 'node:http';
import type stream from 'node:stream';

import type { IUpload } from '@rocket.chat/core-typings';
import type { IBaseUploadsModel } from '@rocket.chat/model-typings';
import type createServer from 'connect';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { ClientSession, OptionalId } from 'mongodb';

import { UploadFS } from '.';
import { Filter } from './ufs-filter';

export type StoreOptions = {
	collection?: IBaseUploadsModel<IUpload>;
	filter?: Filter;
	name: string;
	onCopyError?: (err: any, fileId: string, file: IUpload) => void;
	onFinishUpload?: (file: IUpload) => Promise<void>;
	onRead?: (fileId: string, file: IUpload, request: any, response: any) => Promise<boolean>;
	onReadError?: (err: any, fileId: string, file: IUpload) => void;
	onValidate?: (file: IUpload, options?: { session?: ClientSession }) => Promise<void>;
	onWriteError?: (err: any, fileId: string, file: IUpload) => void;
	transformRead?: (
		readStream: stream.Readable,
		writeStream: stream.Writable,
		fileId: string,
		file: IUpload,
		request: createServer.IncomingMessage,
		headers?: Record<string, any>,
	) => void;
	transformWrite?: (readStream: stream.Readable, writeStream: stream.Writable, fileId: string, file: IUpload) => void;
};

export class Store {
	protected options: StoreOptions;

	public copy: (
		fileId: string,
		store: Store,
		callback?: (err?: Error, copyId?: string, copy?: OptionalId<IUpload>, store?: Store) => void,
	) => Promise<void>;

	public create: (file: Omit<OptionalId<IUpload>, '_updatedAt'>, options?: { session?: ClientSession }) => Promise<string>;

	public write: (
		rs: stream.Readable,
		fileId: string,
		callback: (err?: Error, file?: IUpload) => void,
		options?: { session?: ClientSession },
	) => Promise<void>;

	constructor(options: StoreOptions) {
        /* Implementation Hidden */
    }

	async removeById(fileId: string, options?: { session?: ClientSession }, isDeleted = false): Promise<void> {
        /* Implementation Hidden */
    }

	async delete(_fileId: string, _options?: { session?: ClientSession }): Promise<any> {
        /* Implementation Hidden */
    }

	generateToken(pattern?: string) {
        /* Implementation Hidden */
    }

	getCollection() {
        /* Implementation Hidden */
    }

	async getFilePath(_fileId: string, _file?: IUpload): Promise<string> {
        /* Implementation Hidden */
    }

	async getFileRelativeURL(fileId: string) {
        /* Implementation Hidden */
    }

	async getFileURL(fileId: string) {
        /* Implementation Hidden */
    }

	getFilter() {
        /* Implementation Hidden */
    }

	getName() {
        /* Implementation Hidden */
    }

	async getReadStream(_fileId: string, _file: IUpload, _options?: { start?: number; end?: number }): Promise<stream.Readable> {
        /* Implementation Hidden */
    }

	getRelativeURL(path: string) {
        /* Implementation Hidden */
    }

	getURL(path: string) {
        /* Implementation Hidden */
    }

	async getRedirectURL(_file: IUpload, _forceDownload = false): Promise<string> {
        /* Implementation Hidden */
    }

	async getWriteStream(_fileId: string, _file: IUpload): Promise<stream.Writable> {
        /* Implementation Hidden */
    }

	onCopyError(err: Error, fileId: string, _file: IUpload) {
        /* Implementation Hidden */
    }

	async onFinishUpload(_file: IUpload) {
        /* Implementation Hidden */
    }

	async onRead(_fileId: string, _file: IUpload, _request: createServer.IncomingMessage, _response: http.ServerResponse) {
        /* Implementation Hidden */
    }

	onReadError(err: Error, fileId: string, _file: IUpload) {
        /* Implementation Hidden */
    }

	async onValidate(_file: IUpload, _options?: { session?: ClientSession }) {
        /* Implementation Hidden */
    }

	onWriteError(err: Error, fileId: string, _file: IUpload) {
        /* Implementation Hidden */
    }

	transformRead(
		readStream: stream.Readable,
		writeStream: stream.Writable,
		fileId: string,
		file: IUpload,
		request: createServer.IncomingMessage,
		headers?: Record<string, any>,
	) {
        /* Implementation Hidden */
    }

	transformWrite(readStream: stream.Readable, writeStream: stream.Writable, fileId: string, file: IUpload) {
        /* Implementation Hidden */
    }

	async validate(file: IUpload, options?: { session?: ClientSession }) {
        /* Implementation Hidden */
    }

	async getUrlExpiryTimeSpan(): Promise<number | null> {
        /* Implementation Hidden */
    }
}

```