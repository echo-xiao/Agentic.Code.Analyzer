## File: packages/apps-engine/src/definition/livechat/IPostLivechatRoomTransferred.ts

```typescript
import type { IHttp, IModify, IPersistence, IRead } from '../accessors';
import { AppMethod } from '../metadata';
import type { ILivechatTransferEventContext } from './ILivechatTransferEventContext';

export interface IPostLivechatRoomTransferred {
	[AppMethod.EXECUTE_POST_LIVECHAT_ROOM_TRANSFERRED](
		context: ILivechatTransferEventContext,
		read: IRead,
		http: IHttp,
		persis: IPersistence,
		modify: IModify,
	): Promise<void>;
}

```