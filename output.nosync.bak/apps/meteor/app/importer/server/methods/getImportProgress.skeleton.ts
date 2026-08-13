## File: apps/meteor/app/importer/server/methods/getImportProgress.ts

```typescript
import type { IImportProgress } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Imports } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { Importers } from '..';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';

export const executeGetImportProgress = async (): Promise<IImportProgress> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getImportProgress(): IImportProgress;
	}
}

Meteor.methods<ServerMethods>({
	async getImportProgress() {
		methodDeprecationLogger.method('getImportProgress', '9.0.0', '/v1/getImportProgress');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', 'getImportProgress');
		}

		if (!(await hasPermissionAsync(userId, 'run-import'))) {
			throw new Meteor.Error('error-action-not-allowed', 'Importing is not allowed', 'setupImporter');
		}

		return executeGetImportProgress();
	},
});

```