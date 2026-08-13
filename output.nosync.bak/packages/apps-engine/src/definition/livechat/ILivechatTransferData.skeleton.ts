## File: packages/apps-engine/src/definition/livechat/ILivechatTransferData.ts

```typescript
import type { IUser } from '../users';
import type { ILivechatRoom } from './ILivechatRoom';

export interface ILivechatTransferData {
	currentRoom: ILivechatRoom;
	targetAgent?: IUser;
	targetDepartment?: string;
}

```