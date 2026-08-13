## File: apps/meteor/ee/app/canned-responses/server/methods/saveCannedResponse.ts

```typescript
import type { IOmnichannelCannedResponse, ILivechatDepartment } from '@rocket.chat/core-typings';
import { LivechatDepartment, CannedResponse, Users } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import notifications from '../../../../../app/notifications/server/lib/Notifications';
import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';

type ResponseData = {
	shortcut: string;
	text: string;
	scope: string;
	tags?: string[];
	departmentId?: string;
};

export const saveCannedResponse = async (
	userId: string,
	responseData: ResponseData,
	_id?: string,
): Promise<Omit<IOmnichannelCannedResponse, '_updatedAt' | '_createdAt'> & { _createdAt?: Date }> => {
    /* Implementation Hidden */
};

```