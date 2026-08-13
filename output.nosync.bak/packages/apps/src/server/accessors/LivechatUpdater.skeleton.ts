## File: packages/apps/src/server/accessors/LivechatUpdater.ts

```typescript
import type { ILivechatUpdater } from '@rocket.chat/apps-engine/definition/accessors';
import type {
	ILivechatRoom,
	ILivechatTransferData,
	IVisitor,
	IVisitorExternalIdentifier,
} from '@rocket.chat/apps-engine/definition/livechat';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { AppBridges } from '../bridges';

export class LivechatUpdater implements ILivechatUpdater {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public transferVisitor(visitor: IVisitor, transferData: ILivechatTransferData): Promise<boolean> {
        /* Implementation Hidden */
    }

	public closeRoom(room: ILivechatRoom, comment: string, closer?: IUser): Promise<boolean> {
        /* Implementation Hidden */
    }

	public setCustomFields(token: IVisitor['token'], key: string, value: string, overwrite: boolean): Promise<boolean> {
        /* Implementation Hidden */
    }

	public updateVisitorExternalId(visitorId: string, externalId: Omit<IVisitorExternalIdentifier, 'appId'>): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }
}

```