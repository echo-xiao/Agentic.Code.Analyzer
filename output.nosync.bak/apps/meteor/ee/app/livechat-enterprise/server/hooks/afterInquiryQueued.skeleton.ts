## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/afterInquiryQueued.ts

```typescript
import type { ILivechatInquiryRecord } from '@rocket.chat/core-typings';
import moment from 'moment';

import { afterInquiryQueued } from '../../../../../app/livechat/server/lib/hooks';
import { settings } from '../../../../../app/settings/server';
import { OmnichannelQueueInactivityMonitor } from '../lib/QueueInactivityMonitor';

export const afterInquiryQueuedFunc = async (inquiry: ILivechatInquiryRecord) => {
    /* Implementation Hidden */
};

afterInquiryQueued.patch(async (originalFn: any, inquiry: ILivechatInquiryRecord) => {
	await originalFn();
	return afterInquiryQueuedFunc(inquiry);
});

```