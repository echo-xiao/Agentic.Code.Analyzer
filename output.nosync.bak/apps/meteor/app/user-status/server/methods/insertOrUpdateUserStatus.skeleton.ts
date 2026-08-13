## File: apps/meteor/app/user-status/server/methods/insertOrUpdateUserStatus.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { ICustomUserStatus } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { CustomUserStatus } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { trim } from '../../../../lib/utils/stringUtils';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';

type InsertOrUpdateUserStatus = {
	_id?: string;
	name: string;
	statusType: string;
	status?: string;
	emoji?: string;
	message?: string;
	order?: number;
	previousName?: string;
	previousStatusType?: string;
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		insertOrUpdateUserStatus(userStatusData: InsertOrUpdateUserStatus): string | boolean;
	}
}

export const insertOrUpdateUserStatus = async (userId: string, userStatusData: InsertOrUpdateUserStatus): Promise<string | boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async insertOrUpdateUserStatus(userStatusData) {
		methodDeprecationLogger.method('insertOrUpdateUserStatus', '9.0.0', ['/v1/custom-user-status.create', '/v1/custom-user-status.update']);
		if (!this.userId) {
			throw new Meteor.Error('not_authorized');
		}

		return insertOrUpdateUserStatus(this.userId, userStatusData);
	},
});

```