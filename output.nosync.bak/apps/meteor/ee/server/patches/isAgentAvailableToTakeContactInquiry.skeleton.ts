## File: apps/meteor/ee/server/patches/isAgentAvailableToTakeContactInquiry.ts

```typescript
import type { ILivechatContact, ILivechatVisitor, IOmnichannelSource } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { LivechatContacts } from '@rocket.chat/models';

import { isAgentAvailableToTakeContactInquiry } from '../../../app/livechat/server/lib/contacts/isAgentAvailableToTakeContactInquiry';
import { isVerifiedChannelInSource } from '../../../app/livechat/server/lib/contacts/isVerifiedChannelInSource';
import { settings } from '../../../app/settings/server';

// If the contact is unknown and the setting to block unknown contacts is on, we must not allow the agent to take this inquiry
// if the contact is not verified in this channel and the block unverified contacts setting is on, we should not allow the inquiry to be taken
// otherwise, the contact is allowed to be taken
export const runIsAgentAvailableToTakeContactInquiry = async (
	_next: any,
	visitorId: ILivechatVisitor['_id'],
	source: IOmnichannelSource,
	contactId: ILivechatContact['_id'],
): Promise<{ error: string; value: false } | { value: true }> => {
    /* Implementation Hidden */
};

isAgentAvailableToTakeContactInquiry.patch(runIsAgentAvailableToTakeContactInquiry, () => License.hasModule('contact-id-verification'));

```