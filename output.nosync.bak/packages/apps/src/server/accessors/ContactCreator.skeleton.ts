## File: packages/apps/src/server/accessors/ContactCreator.ts

```typescript
import type { IContactCreator } from '@rocket.chat/apps-engine/definition/accessors/IContactCreator';
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat';

import type { AppBridges } from '../bridges';

export class ContactCreator implements IContactCreator {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	verifyContact(verifyContactChannelParams: {
		contactId: string;
		field: string;
		value: string;
		visitorId: string;
		roomId: string;
	}): Promise<void> {
        /* Implementation Hidden */
    }

	addContactEmail(contactId: ILivechatContact['_id'], email: string): Promise<ILivechatContact> {
        /* Implementation Hidden */
    }
}

```