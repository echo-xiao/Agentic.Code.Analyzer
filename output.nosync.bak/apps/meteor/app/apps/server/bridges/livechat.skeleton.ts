## File: apps/meteor/app/apps/server/bridges/livechat.ts

```typescript
import type { IAppServerOrchestrator, IAppsLivechatMessage } from '@rocket.chat/apps';
import { LivechatBridge } from '@rocket.chat/apps/dist/server/bridges/LivechatBridge';
import type { IExtraRoomParams } from '@rocket.chat/apps-engine/definition/accessors/ILivechatCreator';
import type {
	IVisitorExternalIdentifier,
	IVisitor,
	ILivechatRoom,
	ILivechatTransferData,
	IDepartment,
	ResolveVisitorContactData,
} from '@rocket.chat/apps-engine/definition/livechat';
import type { IMessage as IAppsEngineMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import type { ILivechatDepartment, IOmnichannelRoom, SelectedAgent, ILivechatVisitor } from '@rocket.chat/core-typings';
import { OmnichannelSourceType } from '@rocket.chat/core-typings';
import { LivechatVisitors, LivechatRooms, LivechatDepartment, Users } from '@rocket.chat/models';
import { registerGuest } from '@rocket.chat/omni-core';

import { deasyncPromise } from '../../../../server/deasync/deasync';
import { callbacks } from '../../../../server/lib/callbacks';
import { closeRoom } from '../../../livechat/server/lib/closeRoom';
import { setCustomFields } from '../../../livechat/server/lib/custom-fields';
import { getRoomMessages } from '../../../livechat/server/lib/getRoomMessages';
import type { ILivechatMessage } from '../../../livechat/server/lib/localTypes';
import { updateMessage, sendMessage } from '../../../livechat/server/lib/messages';
import { resolveVisitor } from '../../../livechat/server/lib/resolveVisitor';
import { createRoom } from '../../../livechat/server/lib/rooms';
import { online } from '../../../livechat/server/lib/service-status';
import { transfer } from '../../../livechat/server/lib/transfer';
import { settings } from '../../../settings/server';

declare module '@rocket.chat/apps-engine/definition/accessors/ILivechatCreator' {
	interface IExtraRoomParams {
		customFields?: Record<string, unknown>;
	}
}

export class AppLivechatBridge extends LivechatBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected isOnline(departmentId?: string): boolean {
        /* Implementation Hidden */
    }

	protected async isOnlineAsync(departmentId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async createMessage(message: IAppsLivechatMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async getMessageById(messageId: string, appId: string): Promise<IAppsLivechatMessage> {
        /* Implementation Hidden */
    }

	protected async updateMessage(message: IAppsLivechatMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async createRoom(
		visitor: IVisitor,
		agent: IUser,
		appId: string,
		{ source, customFields }: IExtraRoomParams = {},
	): Promise<ILivechatRoom> {
        /* Implementation Hidden */
    }

	protected async closeRoom(room: ILivechatRoom, comment: string, closer: IUser | undefined, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async findOpenRoomsByAgentId(agentId: string, appId: string): Promise<ILivechatRoom[]> {
        /* Implementation Hidden */
    }

	protected async countOpenRoomsByAgentId(agentId: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	protected async findRooms(visitor: IVisitor, departmentId: string | null, appId: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated Use `createAndReturnVisitor` instead.
	 * Note: This method does not support `externalIds`.
	 */
	protected async createVisitor(visitor: IVisitor, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async createAndReturnVisitor(visitor: IVisitor, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async transferVisitor(visitor: IVisitor, transferData: ILivechatTransferData, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async findVisitors(query: object, appId: string): Promise<Array<IVisitor>> {
        /* Implementation Hidden */
    }

	protected async findVisitorById(id: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async findVisitorByEmail(email: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async findVisitorByToken(token: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async findVisitorByPhoneNumber(phoneNumber: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async resolveVisitor(
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		contactData: ResolveVisitorContactData | undefined,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async updateVisitorExternalId(
		visitorId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	protected async findDepartmentByIdOrName(value: string, appId: string): Promise<IDepartment | undefined> {
        /* Implementation Hidden */
    }

	protected async findDepartmentsEnabledWithAgents(appId: string): Promise<Array<IDepartment>> {
        /* Implementation Hidden */
    }

	protected async _fetchLivechatRoomMessages(appId: string, roomId: string): Promise<Array<IAppsEngineMessage>> {
        /* Implementation Hidden */
    }

	protected async setCustomFields(
		data: { token: IVisitor['token']; key: string; value: string; overwrite: boolean },
		appId: string,
	): Promise<number> {
        /* Implementation Hidden */
    }
}

```