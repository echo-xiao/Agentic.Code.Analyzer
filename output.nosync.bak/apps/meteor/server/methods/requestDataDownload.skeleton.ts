## File: apps/meteor/server/methods/requestDataDownload.ts

```typescript
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path, { join } from 'node:path';

import type { IExportOperation, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { ExportOperations, UserDataFiles } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { settings } from '../../app/settings/server';
import * as dataExport from '../lib/dataExport';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		requestDataDownload(params: { fullExport?: boolean }): Promise<{
			requested: boolean;
			exportOperation: IExportOperation;
			url: string | null;
			pendingOperationsBeforeMyRequest: number;
		}>;
	}
}

export const requestDataDownload = async ({
	userData,
	fullExport = false,
}: {
	userData: IUser;
	fullExport?: boolean;
}): Promise<{
	requested: boolean;
	exportOperation: IExportOperation;
	url: string | null;
	pendingOperationsBeforeMyRequest: number;
}> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async requestDataDownload({ fullExport = false }) {
		methodDeprecationLogger.method('requestDataDownload', '9.0.0', '/v1/users.requestDataDownload');
		const currentUserData = await Meteor.userAsync();

		if (!currentUserData) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		return requestDataDownload({ userData: currentUserData as IUser, fullExport });
	},
});

```