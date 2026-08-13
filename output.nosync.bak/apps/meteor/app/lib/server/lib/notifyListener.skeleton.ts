## File: apps/meteor/app/lib/server/lib/notifyListener.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type {
	IRocketChatRecord,
	IRoom,
	ILoginServiceConfiguration,
	ISetting,
	IRole,
	IPermission,
	IIntegration,
	LoginServiceConfiguration as LoginServiceConfigurationData,
	ILivechatInquiryRecord,
	ILivechatPriority,
	ILivechatDepartmentAgents,
	IEmailInbox,
	IIntegrationHistory,
	AtLeast,
	ISubscription,
	ISettingColor,
	IUser,
	IMessage,
	SettingValue,
	MessageTypesValues,
	ILivechatContact,
} from '@rocket.chat/core-typings';
import {
	Rooms,
	LivechatRooms,
	Permissions,
	Settings,
	Roles,
	Integrations,
	LoginServiceConfiguration,
	IntegrationHistory,
	Subscriptions,
	LivechatInquiry,
	LivechatDepartmentAgents,
	Users,
	Messages,
} from '@rocket.chat/models';
import mem from 'mem';

import { subscriptionFields } from '../../../../lib/publishFields';
import { shouldHideSystemMessage } from '../../../../server/lib/systemMessage/hideSystemMessage';

type ClientAction = 'inserted' | 'updated' | 'removed';

export const notifyOnLivechatPriorityChanged = async (
	data: Pick<ILivechatPriority, 'name' | '_id'>,
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoomChanged = async <T extends IRocketChatRecord>(
	data: T | T[],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoomChangedById = async <T extends IRocketChatRecord>(
	ids: T['_id'] | T['_id'][],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoomChangedByUsernamesOrUids = async <T extends IRoom>(
	uids: T['u']['_id'][],
	usernames: T['u']['username'][],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoomChangedByContactId = async <T extends ILivechatContact>(
	contactId: T['_id'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoomChangedByUserDM = async <T extends IRoom>(
	userId: T['u']['_id'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnPermissionChanged = async (permission: IPermission, clientAction: ClientAction = 'updated'): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnPermissionChangedById = async (pid: IPermission['_id'], clientAction: ClientAction = 'updated'): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoleChanged = async <T extends IRole>(role: T, clientAction: 'removed' | 'changed' = 'changed'): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnRoleChangedById = async <T extends IRole>(
	id: T['_id'],
	clientAction: 'removed' | 'changed' = 'changed',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLoginServiceConfigurationChanged = async <T extends ILoginServiceConfiguration>(
	service: Partial<T> & Pick<T, '_id'>,
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLoginServiceConfigurationChangedByService = async <T extends ILoginServiceConfiguration>(
	service: T['service'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationChanged = async <T extends IIntegration>(
	data: T,
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationChangedById = async <T extends IIntegration>(
	id: T['_id'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationChangedByUserId = async <T extends IIntegration>(
	id: T['userId'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationChangedByChannels = async <T extends IIntegration>(
	channels: T['channel'],
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnEmailInboxChanged = async <T extends IEmailInbox>(
	data: Pick<T, '_id'> | T, // TODO: improve typing
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatInquiryChanged = async (
	data: ILivechatInquiryRecord | ILivechatInquiryRecord[],
	clientAction: ClientAction = 'updated',
	diff?: Partial<Record<keyof ILivechatInquiryRecord, unknown> & { queuedAt: unknown; takenAt: unknown }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatInquiryChangedById = async (
	ids: ILivechatInquiryRecord['_id'] | ILivechatInquiryRecord['_id'][],
	clientAction: ClientAction = 'updated',
	diff?: Partial<Record<keyof ILivechatInquiryRecord, unknown> & { queuedAt: unknown; takenAt: unknown }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatInquiryChangedByVisitorIds = async (
	visitorIds: ILivechatInquiryRecord['v']['_id'][],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
	diff?: Partial<Record<keyof ILivechatInquiryRecord, unknown> & { queuedAt: Date; takenAt: Date }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatInquiryChangedByRoom = async (
	rids: ILivechatInquiryRecord['rid'] | ILivechatInquiryRecord['rid'][],
	clientAction: ClientAction = 'updated',
	diff?: Partial<Record<keyof ILivechatInquiryRecord, unknown> & { queuedAt: unknown; takenAt: unknown }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatInquiryChangedByToken = async (
	token: ILivechatInquiryRecord['v']['token'],
	clientAction: ClientAction = 'updated',
	diff?: Partial<Record<keyof ILivechatInquiryRecord, unknown> & { queuedAt: unknown; takenAt: unknown }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationHistoryChanged = async <T extends IIntegrationHistory>(
	data: AtLeast<T, '_id'>,
	clientAction: ClientAction = 'updated',
	diff: Partial<T> = {},
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnIntegrationHistoryChangedById = async <T extends IIntegrationHistory>(
	id: T['_id'],
	clientAction: ClientAction = 'updated',
	diff: Partial<T> = {},
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatDepartmentAgentChanged = async <T extends ILivechatDepartmentAgents>(
	data: Partial<T> & Pick<T, '_id' | 'agentId' | 'departmentId'>,
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatDepartmentAgentChangedByDepartmentId = async <T extends ILivechatDepartmentAgents>(
	departmentId: T['departmentId'],
	clientAction: 'inserted' | 'updated' = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnLivechatDepartmentAgentChangedByAgentsAndDepartmentId = async <T extends ILivechatDepartmentAgents>(
	agentsIds: T['agentId'][],
	departmentId: T['departmentId'],
	clientAction: 'inserted' | 'updated' = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSettingChanged = async (
	setting: ISetting & { editor?: ISettingColor['editor'] },
	clientAction: ClientAction = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSettingChangedById = async (id: ISetting['_id'], clientAction: ClientAction = 'updated'): Promise<void> => {
    /* Implementation Hidden */
};

type NotifyUserChange = {
	id: IUser['_id'];
	clientAction: 'inserted' | 'removed' | 'updated';
	data?: IUser;
	diff?: Record<string, any>;
	unset?: Record<string, number>;
};

export const notifyOnUserChange = async ({ clientAction, id, data, diff, unset }: NotifyUserChange) => {
    /* Implementation Hidden */
};

/**
 * Calls the callback only if DB Watchers are disabled
 */
export const notifyOnUserChangeAsync = async (cb: () => Promise<NotifyUserChange | NotifyUserChange[] | void>) => {
    /* Implementation Hidden */
};

// TODO this may be only useful on 'inserted'
export const notifyOnUserChangeById = async ({
	clientAction,
	id,
}: {
	id: IUser['_id'];
	clientAction: 'inserted' | 'removed' | 'updated';
}) => {
    /* Implementation Hidden */
};

const getUserNameCached = mem(
	async (userId: string): Promise<string | undefined> => {
		const user = await Users.findOne<Pick<IUser, 'name'>>(userId, { projection: { name: 1 } });
		return user?.name;
	},
	{ maxAge: 10000 },
);

const getSettingCached = mem(async (setting: string): Promise<SettingValue> => Settings.getValueById(setting), { maxAge: 10000 });

export async function getMessageToBroadcast({ id, data }: { id: IMessage['_id']; data?: IMessage }): Promise<IMessage | void> {
    /* Implementation Hidden */
}

export const notifyOnMessageChange = async ({ id, data }: { id: IMessage['_id']; data?: IMessage }): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChanged = async (subscription: ISubscription, clientAction: ClientAction = 'updated'): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByRoomIdAndUserId = async (
	rid: ISubscription['rid'],
	uid: ISubscription['u']['_id'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedById = async (
	id: ISubscription['_id'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByUserPreferences = async (
	uid: ISubscription['u']['_id'],
	notificationOriginField: keyof ISubscription,
	originFieldNotEqualValue: 'user' | 'subscription',
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByRoomId = async (
	rid: ISubscription['rid'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByAutoTranslateAndUserId = async (
	uid: ISubscription['u']['_id'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByUserIdAndRoomType = async (
	uid: ISubscription['u']['_id'],
	t: ISubscription['t'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByVisitorIds = async (
	visitorIds: Exclude<ISubscription['v'], undefined>['_id'][],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByNameAndRoomType = async (
	filter: Partial<Pick<ISubscription, 'name' | 't'>>,
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByUserId = async (
	uid: ISubscription['u']['_id'],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

export const notifyOnSubscriptionChangedByRoomIdAndUserIds = async (
	rid: ISubscription['rid'],
	uids: ISubscription['u']['_id'][],
	clientAction: Exclude<ClientAction, 'removed'> = 'updated',
): Promise<void> => {
    /* Implementation Hidden */
};

```