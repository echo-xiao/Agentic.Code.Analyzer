## File: packages/apps-engine/src/definition/livechat/ILivechatEventContext.ts

```typescript
import type { IUser } from '../users';
import type { IDepartment } from './IDepartment';
import type { ILivechatRoom } from './ILivechatRoom';

export interface ILivechatEventContext {
	agent: IUser;
	room: ILivechatRoom;
}

export interface ILivechatDepartmentEventContext {
	department: IDepartment;
}

```