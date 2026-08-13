## File: packages/apps/tests/test-data/bridges/livechatBridge.ts

```typescript
import type { IExtraRoomParams } from '@rocket.chat/apps-engine/definition/accessors/ILivechatCreator';
import type {
	IDepartment,
	IVisitorExternalIdentifier,
	ILivechatMessage,
	ILivechatRoom,
	ILivechatTransferData,
	IVisitor,
	ResolveVisitorContactData,
} from '@rocket.chat/apps-engine/definition/livechat';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { LivechatBridge } from '../../../src/server/bridges/LivechatBridge';

export class TestLivechatBridge extends LivechatBridge {
	public findDepartmentsEnabledWithAgents(appId: string): Promise<Array<IDepartment>> {
        /* Implementation Hidden */
    }

	public isOnline(departmentId?: string): boolean {
        /* Implementation Hidden */
    }

	public isOnlineAsync(departmentId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public createMessage(message: ILivechatMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public getMessageById(messageId: string, appId: string): Promise<ILivechatMessage> {
        /* Implementation Hidden */
    }

	public updateMessage(message: ILivechatMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public createVisitor(visitor: IVisitor, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public createAndReturnVisitor(visitor: IVisitor, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public transferVisitor(visitor: IVisitor, transferData: ILivechatTransferData, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public findVisitors(query: object, appId: string): Promise<Array<IVisitor>> {
        /* Implementation Hidden */
    }

	public findVisitorById(id: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public findVisitorByEmail(email: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public findVisitorByToken(token: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public findVisitorByPhoneNumber(phoneNumber: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public resolveVisitor(
		externalId: IVisitorExternalIdentifier,
		contactData: ResolveVisitorContactData | undefined,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public updateVisitorExternalId(
		visitorId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public createRoom(visitor: IVisitor, agent: IUser, appId: string, extraParams?: IExtraRoomParams): Promise<ILivechatRoom> {
        /* Implementation Hidden */
    }

	public closeRoom(room: ILivechatRoom, comment: string, closer: IUser | undefined, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public findRooms(visitor: IVisitor, departmentId: string | null, appId: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	public findOpenRoomsByAgentId(agentId: string, appId: string): Promise<ILivechatRoom[]> {
        /* Implementation Hidden */
    }

	public countOpenRoomsByAgentId(agentId: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	public findDepartmentByIdOrName(value: string, appId: string): Promise<IDepartment | undefined> {
        /* Implementation Hidden */
    }

	public _fetchLivechatRoomMessages(appId: string, roomId: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }

	public setCustomFields(
		data: { token: IVisitor['token']; key: string; value: string; overwrite: boolean },
		appId: string,
	): Promise<number> {
        /* Implementation Hidden */
    }
}

```