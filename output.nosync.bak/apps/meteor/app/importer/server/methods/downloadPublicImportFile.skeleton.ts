## File: apps/meteor/app/importer/server/methods/downloadPublicImportFile.ts

```typescript
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';

import { Import } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Meteor } from 'meteor/meteor';

import { Importers } from '..';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { ProgressStep } from '../../lib/ImporterProgressStep';
import { RocketChatImportFileInstance } from '../startup/store';

function downloadHttpFile(fileUrl: string, writeStream: fs.WriteStream): void {
    /* Implementation Hidden */
}

function copyLocalFile(filePath: fs.PathLike, writeStream: fs.WriteStream): void {
    /* Implementation Hidden */
}

export const executeDownloadPublicImportFile = async (userId: IUser['_id'], fileUrl: string, importerKey: string): Promise<void> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		downloadPublicImportFile(fileUrl: string, importerKey: string): void;
	}
}

Meteor.methods<ServerMethods>({
	async downloadPublicImportFile(fileUrl: string, importerKey: string) {
		methodDeprecationLogger.method('downloadPublicImportFile', '9.0.0', '/v1/downloadPublicImportFile');
		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', 'downloadPublicImportFile');
		}

		if (!(await hasPermissionAsync(userId, 'run-import'))) {
			throw new Meteor.Error('error-action-not-allowed', 'Importing is not allowed', 'downloadPublicImportFile');
		}

		await executeDownloadPublicImportFile(userId, fileUrl, importerKey);
	},
});

```