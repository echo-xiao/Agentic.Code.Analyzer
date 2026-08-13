## File: apps/meteor/app/importer/server/methods/getImportFileData.ts

```typescript
import fs from 'node:fs';
import path from 'node:path';

import type { IImportProgress, IImporterSelection } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Imports } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { Importers } from '..';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { ProgressStep } from '../../lib/ImporterProgressStep';
import { RocketChatImportFileInstance } from '../startup/store';

export const executeGetImportFileData = async (): Promise<IImporterSelection | { waiting: true }> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getImportFileData(): IImporterSelection | { waiting: true };
	}
}

Meteor.methods<ServerMethods>({
	async getImportFileData() {
		methodDeprecationLogger.method('getImportFileData', '9.0.0', '/v1/getImportFileData');
		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', 'getImportFileData');
		}

		if (!(await hasPermissionAsync(userId, 'run-import'))) {
			throw new Meteor.Error('error-action-not-allowed', 'Importing is not allowed', 'getImportFileData');
		}

		return executeGetImportFileData();
	},
});

```