## File: packages/apps/src/server/accessors/LivechatRead.ts

```typescript
import type { ILivechatRead } from '@rocket.chat/apps-engine/definition/accessors/ILivechatRead';
import type { IDepartment } from '@rocket.chat/apps-engine/definition/livechat';
import type { ILivechatRoom } from '@rocket.chat/apps-engine/definition/livechat/ILivechatRoom';
import type { IVisitor } from '@rocket.chat/apps-engine/definition/livechat/IVisitor';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import type { LivechatBridge } from '../bridges/LivechatBridge';

export class LivechatRead implements ILivechatRead {
	constructor(
		private readonly livechatBridge: LivechatBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please use the `isOnlineAsync` method instead.
	 * In the next major, this method will be `async`
	 */
	public isOnline(departmentId?: string): boolean {
        /* Implementation Hidden */
    }

	public isOnlineAsync(departmentId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public getDepartmentsEnabledWithAgents(): Promise<Array<IDepartment>> {
        /* Implementation Hidden */
    }

	public getLivechatRooms(visitor: IVisitor, departmentId?: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	public getLivechatTotalOpenRoomsByAgentId(agentId: string): Promise<number> {
        /* Implementation Hidden */
    }

	public getLivechatOpenRoomsByAgentId(agentId: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated This method does not adhere to the conversion practices applied
	 * elsewhere in the Apps-Engine and will be removed in the next major version.
	 * Prefer the alternative methods to fetch visitors.
	 */
	public getLivechatVisitors(query: object): Promise<Array<IVisitor>> {
        /* Implementation Hidden */
    }

	public getLivechatVisitorById(id: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public getLivechatVisitorByEmail(email: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public getLivechatVisitorByToken(token: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public getLivechatVisitorByPhoneNumber(phoneNumber: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public getLivechatDepartmentByIdOrName(value: string): Promise<IDepartment | undefined> {
        /* Implementation Hidden */
    }

	public _fetchLivechatRoomMessages(roomId: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }
}

```