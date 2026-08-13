## File: packages/apps/tests/test-data/bridges/contactBridge.ts

```typescript
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat';

import { ContactBridge } from '../../../src/server/bridges';

export class TestContactBridge extends ContactBridge {
	protected addContactEmail(contactId: ILivechatContact['_id'], email: string, appId: string): Promise<ILivechatContact> {
        /* Implementation Hidden */
    }

	protected getById(id: ILivechatContact['_id']): Promise<ILivechatContact> {
        /* Implementation Hidden */
    }

	protected verifyContact(verifyContactChannelParams: {
		contactId: string;
		field: string;
		value: string;
		visitorId: string;
		roomId: string;
	}): Promise<void> {
        /* Implementation Hidden */
    }
}

```