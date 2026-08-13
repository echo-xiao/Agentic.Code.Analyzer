## File: apps/meteor/app/livechat/server/lib/resolveVisitor.ts

```typescript
import type { IVisitorExternalIdentifier, ILivechatVisitor } from '@rocket.chat/core-typings';
import { LivechatVisitors } from '@rocket.chat/models';

type ResolveVisitorContactData = { phone: string } | { email: string };

type ResolveVisitorParams = {
	appId: string;
	externalId: Omit<IVisitorExternalIdentifier, 'appId'>;
	contactData?: ResolveVisitorContactData;
};

export async function resolveVisitor({ appId, externalId, contactData }: ResolveVisitorParams): Promise<ILivechatVisitor | null> {
    /* Implementation Hidden */
}

```