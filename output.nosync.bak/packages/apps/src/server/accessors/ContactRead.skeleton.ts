## File: packages/apps/src/server/accessors/ContactRead.ts

```typescript
import type { IContactRead } from '@rocket.chat/apps-engine/definition/accessors/IContactRead';
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat';

import type { AppBridges } from '../bridges';

export class ContactRead implements IContactRead {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(contactId: ILivechatContact['_id']): Promise<ILivechatContact | undefined> {
        /* Implementation Hidden */
    }
}

```