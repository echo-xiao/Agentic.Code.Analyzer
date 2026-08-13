## File: apps/meteor/app/apps/server/bridges/contact.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { ContactBridge } from '@rocket.chat/apps/dist/server/bridges/ContactBridge';
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat';

import { addContactEmail } from '../../../livechat/server/lib/contacts/addContactEmail';
import { verifyContactChannel } from '../../../livechat/server/lib/contacts/verifyContactChannel';

export class AppContactBridge extends ContactBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	async getById(contactId: ILivechatContact['_id'], appId: string): Promise<ILivechatContact | undefined> {
        /* Implementation Hidden */
    }

	async verifyContact(
		verifyContactChannelParams: {
			contactId: string;
			field: string;
			value: string;
			visitorId: string;
			roomId: string;
		},
		appId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	protected async addContactEmail(contactId: ILivechatContact['_id'], email: string, appId: string): Promise<ILivechatContact> {
        /* Implementation Hidden */
    }
}

```