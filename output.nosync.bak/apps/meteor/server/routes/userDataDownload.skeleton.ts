## File: apps/meteor/server/routes/userDataDownload.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import { hashLoginToken } from '@rocket.chat/account-utils';
import type { IIncomingMessage, IUser, IUserDataFile } from '@rocket.chat/core-typings';
import { UserDataFiles, Users } from '@rocket.chat/models';
import { Cookies } from 'meteor/ostrio:cookies';
import { WebApp } from 'meteor/webapp';
import { match } from 'path-to-regexp';

import { FileUpload } from '../../app/file-upload/server';
import { settings } from '../../app/settings/server';

const cookies = new Cookies();

const matchUID = async (uid: string | undefined, token: string | undefined, ownerUID: string) => {
    /* Implementation Hidden */
};

const isRequestFromOwner = async (req: IIncomingMessage, ownerUID: IUser['_id']) => {
    /* Implementation Hidden */
};

const sendUserDataFile = (file: IUserDataFile) => (req: IncomingMessage, res: ServerResponse, next: () => void) => {
	const userDataStore = FileUpload.getStore('UserDataFiles');
	if (!userDataStore?.get) {
		res.writeHead(403).end(); // @todo: maybe we should return a better error?
		return;
	}

	res.setHeader('Content-Security-Policy', "default-src 'none'");
	res.setHeader('Cache-Control', 'max-age=31536000');
	void userDataStore.get(file, req, res, next);
};

const matchFileRoute = match<{ fileID: string }>('/:fileID', { decode: decodeURIComponent });

const userDataDownloadHandler = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    /* Implementation Hidden */
};

WebApp.connectHandlers.use('/data-export/', userDataDownloadHandler);

```