## File: apps/meteor/app/importer/server/methods/uploadImportFile.ts

```typescript
import { Import } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Meteor } from 'meteor/meteor';

import { Importers } from '..';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { RocketChatFile } from '../../../file/server';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { ProgressStep } from '../../lib/ImporterProgressStep';
import { RocketChatImportFileInstance } from '../startup/store';

export const executeUploadImportFile = async (
	userId: IUser['_id'],
	binaryContent: string,
	contentType: string,
	fileName: string,
	importerKey: string,
): Promise<void> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		uploadImportFile(binaryContent: string, contentType: string, fileName: string, importerKey: string): void;
	}
}

Meteor.methods<ServerMethods>({
	async uploadImportFile(binaryContent, contentType, fileName, importerKey) {
		methodDeprecationLogger.method('uploadImportFile', '9.0.0', '/v1/uploadImportFile');
		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', 'uploadImportFile');
		}

		if (!(await hasPermissionAsync(userId, 'run-import'))) {
			throw new Meteor.Error('error-action-not-allowed', 'Importing is not allowed', 'uploadImportFile');
		}

		await executeUploadImportFile(userId, binaryContent, contentType, fileName, importerKey);
	},
});

```