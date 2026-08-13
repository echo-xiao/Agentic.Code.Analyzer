## File: apps/meteor/ee/server/patches/verifyContactChannel.ts

```typescript
import { LivechatInquiryStatus } from '@rocket.chat/core-typings';
import type { ILivechatContact, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { LivechatContacts, LivechatInquiry, LivechatRooms } from '@rocket.chat/models';

import { QueueManager } from '../../../app/livechat/server/lib/QueueManager';
import { mergeContacts } from '../../../app/livechat/server/lib/contacts/mergeContacts';
import { verifyContactChannel } from '../../../app/livechat/server/lib/contacts/verifyContactChannel';
import { client, shouldRetryTransaction } from '../../../server/database/utils';
import { contactLogger as logger } from '../../app/livechat-enterprise/server/lib/logger';

type VerifyContactChannelParams = {
	contactId: string;
	field: string;
	value: string;
	visitorId: string;
	roomId: string;
};

async function _verifyContactChannel(
	params: VerifyContactChannelParams,
	room: Pick<IOmnichannelRoom, '_id' | 'source'>,
	attempts = 2,
): Promise<ILivechatContact | null> {
    /* Implementation Hidden */
}

export const runVerifyContactChannel = async (
	_next: any,
	params: {
		contactId: string;
		field: string;
		value: string;
		visitorId: string;
		roomId: string;
	},
): Promise<ILivechatContact | null> => {
    /* Implementation Hidden */
};

verifyContactChannel.patch(runVerifyContactChannel, () => License.hasModule('contact-id-verification'));

```