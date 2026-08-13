## File: packages/apps/src/server/bridges/LivechatBridge.ts

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

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

type LivechatReadPermissions = keyof Pick<
	typeof AppPermissions,
	'livechat-department' | 'livechat-message' | 'livechat-room' | 'livechat-status' | 'livechat-visitor'
>;

type LivechatWritePermissions = keyof Pick<
	typeof AppPermissions,
	'livechat-custom-fields' | 'livechat-department' | 'livechat-message' | 'livechat-room' | 'livechat-visitor'
>;

type LivechatMultiplePermissions = keyof Pick<typeof AppPermissions, 'livechat-department' | 'livechat-message'>;

export abstract class LivechatBridge extends BaseBridge {
	public doIsOnline(departmentId?: string, appId?: string): boolean {
        /* Implementation Hidden */
    }

	public async doIsOnlineAsync(departmentId?: string, appId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doCreateMessage(message: ILivechatMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public async doGetMessageById(messageId: string, appId: string): Promise<ILivechatMessage> {
        /* Implementation Hidden */
    }

	public async doUpdateMessage(message: ILivechatMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please use the `doCreateAndReturnVisitor` method instead.
	 */
	public async doCreateVisitor(visitor: IVisitor, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public async doCreateAndReturnVisitor(visitor: IVisitor, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doFindVisitors(query: object, appId: string): Promise<Array<IVisitor>> {
        /* Implementation Hidden */
    }

	public async doFindVisitorById(id: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doFindVisitorByEmail(email: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doFindVisitorByToken(token: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doFindVisitorByPhoneNumber(phoneNumber: string, appId: string): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doResolveVisitor(
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		contactData: ResolveVisitorContactData | undefined,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doTransferVisitor(visitor: IVisitor, transferData: ILivechatTransferData, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doUpdateVisitorExternalId(
		visitorId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		appId: string,
	): Promise<IVisitor | undefined> {
        /* Implementation Hidden */
    }

	public async doCreateRoom(visitor: IVisitor, agent: IUser, appId: string, extraParams?: IExtraRoomParams): Promise<ILivechatRoom> {
        /* Implementation Hidden */
    }

	public async doCloseRoom(room: ILivechatRoom, comment: string, closer: IUser | undefined, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doCountOpenRoomsByAgentId(agentId: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	public async doFindOpenRoomsByAgentId(agentId: string, appId: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	public async doFindRooms(visitor: IVisitor, departmentId: string | null, appId: string): Promise<Array<ILivechatRoom>> {
        /* Implementation Hidden */
    }

	public async doFindDepartmentByIdOrName(value: string, appId: string): Promise<IDepartment | undefined> {
        /* Implementation Hidden */
    }

	public async doFindDepartmentsEnabledWithAgents(appId: string): Promise<Array<IDepartment>> {
        /* Implementation Hidden */
    }

	public async do_fetchLivechatRoomMessages(appId: string, roomId: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }

	public async doSetCustomFields(
		data: { token: IVisitor['token']; key: string; value: string; overwrite: boolean },
		appId: string,
	): Promise<number> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please use the `isOnlineAsync` method instead.
	 * In the next major, this method will be `async`
	 */
	protected abstract isOnline(departmentId?: string, appId?: string): boolean;

	protected abstract isOnlineAsync(departmentId?: string, appId?: string): Promise<boolean>;

	protected abstract createMessage(message: ILivechatMessage, appId: string): Promise<string>;

	protected abstract getMessageById(messageId: string, appId: string): Promise<ILivechatMessage>;

	protected abstract updateMessage(message: ILivechatMessage, appId: string): Promise<void>;

	/**
	 * @deprecated please use `createAndReturnVisitor` instead.
	 * It returns the created record rather than the ID.
	 */
	protected abstract createVisitor(visitor: IVisitor, appId: string): Promise<string>;

	protected abstract createAndReturnVisitor(visitor: IVisitor, appId: string): Promise<IVisitor | undefined>;

	/**
	 * @deprecated This method does not adhere to the conversion practices applied
	 * elsewhere in the Apps-Engine and will be removed in the next major version.
	 * Prefer other methods that fetch visitors.
	 */
	protected abstract findVisitors(query: object, appId: string): Promise<Array<IVisitor>>;

	protected abstract findVisitorById(id: string, appId: string): Promise<IVisitor | undefined>;

	protected abstract findVisitorByEmail(email: string, appId: string): Promise<IVisitor | undefined>;

	protected abstract findVisitorByToken(token: string, appId: string): Promise<IVisitor | undefined>;

	protected abstract findVisitorByPhoneNumber(phoneNumber: string, appId: string): Promise<IVisitor | undefined>;

	protected abstract resolveVisitor(
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		contactData: ResolveVisitorContactData | undefined,
		appId: string,
	): Promise<IVisitor | undefined>;

	protected abstract transferVisitor(visitor: IVisitor, transferData: ILivechatTransferData, appId: string): Promise<boolean>;

	protected abstract updateVisitorExternalId(
		visitorId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
		appId: string,
	): Promise<IVisitor | undefined>;

	protected abstract createRoom(visitor: IVisitor, agent: IUser, appId: string, extraParams?: IExtraRoomParams): Promise<ILivechatRoom>;

	protected abstract closeRoom(room: ILivechatRoom, comment: string, closer: IUser | undefined, appId: string): Promise<boolean>;

	protected abstract countOpenRoomsByAgentId(agentId: string, appId: string): Promise<number>;

	protected abstract findOpenRoomsByAgentId(agentId: string, appId: string): Promise<Array<ILivechatRoom>>;

	protected abstract findRooms(visitor: IVisitor, departmentId: string | null, appId: string): Promise<Array<ILivechatRoom>>;

	protected abstract findDepartmentByIdOrName(value: string, appId: string): Promise<IDepartment | undefined>;

	protected abstract findDepartmentsEnabledWithAgents(appId: string): Promise<Array<IDepartment>>;

	protected abstract _fetchLivechatRoomMessages(appId: string, roomId: string): Promise<Array<IMessage>>;

	protected abstract setCustomFields(
		data: { token: IVisitor['token']; key: string; value: string; overwrite: boolean },
		appId: string,
	): Promise<number>;

	private hasReadPermission(appId: string, scope: LivechatReadPermissions): boolean {
        /* Implementation Hidden */
    }

	private hasWritePermission(appId: string, scope: LivechatWritePermissions): boolean {
        /* Implementation Hidden */
    }

	private hasMultiplePermission(appId: string, scope: LivechatMultiplePermissions): boolean {
        /* Implementation Hidden */
    }
}

```