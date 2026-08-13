## File: apps/meteor/app/livechat/server/lib/takeInquiry.ts

```typescript
import { Omnichannel } from '@rocket.chat/core-services';
import { LivechatInquiry, LivechatRooms, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { RoutingManager } from './RoutingManager';
import { isAgentAvailableToTakeContactInquiry } from './contacts/isAgentAvailableToTakeContactInquiry';
import { migrateVisitorIfMissingContact } from './contacts/migrateVisitorIfMissingContact';
import { settings } from '../../../settings/server';

export const takeInquiry = async (
	userId: string,
	inquiryId: string,
	options?: { clientAction: boolean; forwardingToDepartment?: { oldDepartmentId: string; transferData: any } },
): Promise<void> => {
    /* Implementation Hidden */
};

```