## File: packages/apps-engine/src/definition/accessors/IContactRead.ts

```typescript
import type { ILivechatContact } from '../livechat';

export interface IContactRead {
	getById(contactId: ILivechatContact['_id']): Promise<ILivechatContact | null>;
}

```