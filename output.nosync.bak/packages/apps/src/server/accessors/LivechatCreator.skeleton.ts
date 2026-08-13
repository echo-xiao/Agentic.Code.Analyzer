## File: packages/apps/src/server/accessors/LivechatCreator.ts

```typescript
import { randomBytes } from 'node:crypto';

import type { ILivechatCreator } from '@rocket.chat/apps-engine/definition/accessors';
import type { IExtraRoomParams } from '@rocket.chat/apps-engine/definition/accessors/ILivechatCreator';
import type { ILivechatRoom } from '@rocket.chat/apps-engine/definition/livechat/ILivechatRoom';
import type {
	IVisitorExternalIdentifier,
	IVisitor,
	ResolveVisitorContactData,
} from '@rocket.chat/apps-engine/definition/livechat/IVisitor';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { AppBridges } from '../bridges';

export class LivechatCreator implements ILivechatCreator {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public resolveVisitor(externalId: IVisitorExternalIdentifier, contactData?: ResolveVisitorContactData): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public createRoom(visitor: IVisitor, agent: IUser, extraParams?: IExtraRoomParams): Promise<ILivechatRoom> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated Use `createAndReturnVisitor` instead.
	 */
	public createVisitor(visitor: IVisitor): Promise<string> {
        /* Implementation Hidden */
    }

	public createAndReturnVisitor(visitor: IVisitor): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public createToken(): string {
        /* Implementation Hidden */
    }
}

```