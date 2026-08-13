## File: apps/meteor/tests/mocks/data.ts

```typescript
import { faker } from '@faker-js/faker';
import type { IExternalComponentRoomInfo } from '@rocket.chat/apps/dist/client/definition/IExternalComponentRoomInfo';
import type { IExternalComponentUserInfo } from '@rocket.chat/apps/dist/client/definition/IExternalComponentUserInfo';
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat';
import {
	AppSubscriptionStatus,
	ILivechatAgentStatus,
	LivechatPriorityWeight,
	OmnichannelSourceType,
	UserStatus,
} from '@rocket.chat/core-typings';
import type {
	LicenseInfo,
	App,
	IMessage,
	IRoom,
	IUser,
	ILivechatContactChannel,
	Serialized,
	ILivechatAgent,
	ILivechatTag,
	IOmnichannelBusinessUnit,
	ILivechatDepartment,
	ILivechatMonitor,
	IOmnichannelRoom,
} from '@rocket.chat/core-typings';
import { parse } from '@rocket.chat/message-parser';
import type { ILivechatContactWithManagerData } from '@rocket.chat/rest-typings';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';

import type { MessageWithMdEnforced } from '../../client/lib/parseMessageTextToAstMarkdown';

export function createFakeUser<TUser extends IUser>(overrides?: Partial<IUser> & Omit<TUser, keyof IUser>): TUser;
export function createFakeUser(overrides?: Partial<IUser>): IUser {
    /* Implementation Hidden */
}

export const createFakeRoom = <T extends IRoom = IRoom>(overrides?: Partial<T & { retention?: { enabled: boolean } }>): T =>
	({
		_id: faker.database.mongodbObjectId(),
		_updatedAt: faker.date.recent(),
		t: faker.helpers.arrayElement(['c', 'p', 'd']),
		msgs: faker.number.int({ min: 0 }),
		u: {
			_id: faker.database.mongodbObjectId(),
			username: faker.internet.userName(),
			name: faker.person.fullName(),
			...overrides?.u,
		},
		usersCount: faker.number.int({ min: 0 }),
		autoTranslateLanguage: faker.helpers.arrayElement(['en', 'es', 'pt', 'ar', 'it', 'ru', 'fr']),
		...overrides,
	}) as T;

export const createFakeOmnichannelRoom = (overrides?: Partial<IOmnichannelRoom>): IOmnichannelRoom => ({
	_id: faker.database.mongodbObjectId(),
	_updatedAt: faker.date.recent(),
	t: 'l',
	msgs: faker.number.int({ min: 0 }),
	ts: faker.date.recent(),
	u: {
		_id: faker.database.mongodbObjectId(),
		username: faker.internet.userName(),
		name: faker.person.fullName(),
		...overrides?.u,
	},
	v: {
		_id: faker.database.mongodbObjectId(),
		username: faker.internet.userName(),
		name: faker.person.fullName(),
		status: UserStatus.ONLINE,
		token: faker.string.uuid(),
		activity: [],
		...overrides?.v,
	},
	source: {
		type: OmnichannelSourceType.WIDGET,
		...overrides?.source,
	},
	usersCount: faker.number.int({ min: 0 }),
	priorityWeight: LivechatPriorityWeight.NOT_SPECIFIED,
	estimatedWaitingTimeQueue: faker.number.int({ min: 0, max: 100 }),
	waitingResponse: faker.datatype.boolean(),
	livechatData: {},
	...overrides,
});

export const createFakeSubscription = (overrides?: Partial<SubscriptionWithRoom>): SubscriptionWithRoom => ({
	_id: faker.database.mongodbObjectId(),
	_updatedAt: faker.date.recent(),
	u: {
		_id: faker.database.mongodbObjectId(),
		username: faker.internet.userName(),
		name: faker.person.fullName(),
		...overrides?.u,
	},
	rid: faker.database.mongodbObjectId(),
	open: faker.datatype.boolean(),
	ts: faker.date.recent(),
	name: faker.person.fullName(),
	unread: faker.number.int({ min: 0 }),
	t: faker.helpers.arrayElement(['c', 'p', 'd']),
	ls: faker.date.recent(),
	lr: faker.date.recent(),
	userMentions: faker.number.int({ min: 0 }),
	groupMentions: faker.number.int({ min: 0 }),
	lowerCaseName: faker.person.fullName().toLowerCase(),
	lowerCaseFName: faker.person.fullName().toLowerCase(),
	usersCount: faker.number.int({ min: 0 }),
	waitingResponse: faker.datatype.boolean(),
	priorityWeight: LivechatPriorityWeight.NOT_SPECIFIED,
	estimatedWaitingTimeQueue: faker.number.int({ min: 0, max: 100 }),
	livechatData: faker.date.recent(),
	...overrides,
});

export function createFakeMessage<TMessage extends IMessage>(overrides?: Partial<IMessage> & Omit<TMessage, keyof IMessage>): TMessage;
export function createFakeMessage(overrides?: Partial<IMessage>): IMessage {
    /* Implementation Hidden */
}

export function createFakeMessageWithMd<TMessage extends IMessage>(
	overrides?: Partial<MessageWithMdEnforced<TMessage>>,
): MessageWithMdEnforced<TMessage>;
export function createFakeMessageWithMd(overrides?: Partial<MessageWithMdEnforced<IMessage>>): MessageWithMdEnforced<IMessage> {
    /* Implementation Hidden */
}

export function createFakeApp(partialApp: Partial<App> = {}): App {
    /* Implementation Hidden */
}

export const createFakeExternalComponentUserInfo = (partial: Partial<IExternalComponentUserInfo> = {}): IExternalComponentUserInfo => ({
	id: faker.database.mongodbObjectId(),
	username: faker.internet.userName(),
	avatarUrl: faker.image.avatar(),
	...partial,
});

export const createFakeExternalComponentRoomInfo = (partial: Partial<IExternalComponentRoomInfo> = {}): IExternalComponentRoomInfo => ({
	id: faker.database.mongodbObjectId(),
	members: faker.helpers.multiple(createFakeExternalComponentUserInfo),
	slugifiedName: faker.lorem.slug(),
	...partial,
});

export const createFakeLicenseInfo = (partial: Partial<Omit<LicenseInfo, 'license'>> = {}): Omit<LicenseInfo, 'license'> => ({
	activeModules: faker.helpers.arrayElements([
		'auditing',
		'canned-responses',
		'ldap-enterprise',
		'livechat-enterprise',
		'voip-enterprise',
		'omnichannel-mobile-enterprise',
		'engagement-dashboard',
		'push-privacy',
		'scalability',
		'teams-mention',
		'saml-enterprise',
		'oauth-enterprise',
		'device-management',
		'federation',
		'videoconference-enterprise',
		'message-read-receipt',
		'outlook-calendar',
		'hide-watermark',
		'custom-roles',
		'accessibility-certification',
		'outbound-messaging',
		'abac',
	]),
	externalModules: [],
	preventedActions: {
		activeUsers: faker.datatype.boolean(),
		guestUsers: faker.datatype.boolean(),
		roomsPerGuest: faker.datatype.boolean(),
		privateApps: faker.datatype.boolean(),
		marketplaceApps: faker.datatype.boolean(),
		monthlyActiveContacts: faker.datatype.boolean(),
	},
	limits: {
		activeUsers: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
		guestUsers: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
		roomsPerGuest: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
		privateApps: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
		marketplaceApps: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
		monthlyActiveContacts: { value: faker.number.int({ min: 0 }), max: faker.number.int({ min: 0 }) },
	},
	tags: faker.helpers.multiple(() => ({
		name: faker.commerce.productAdjective(),
		color: faker.internet.color(),
	})),
	trial: faker.datatype.boolean(),
	hasValidLicense: faker.datatype.boolean(),
	...partial,
});

export function createFakeMessageWithAttachment<TMessage extends IMessage>(overrides?: Partial<TMessage>): TMessage;
export function createFakeMessageWithAttachment(overrides?: Partial<IMessage>): IMessage {
    /* Implementation Hidden */
}

const guestNames = faker.helpers.uniqueArray(faker.person.firstName, 1000);

function pullNextVisitorName() {
    /* Implementation Hidden */
}

export function createFakeVisitor() {
    /* Implementation Hidden */
}

export function createFakeContactChannel(overrides?: Partial<Serialized<ILivechatContactChannel>>): Serialized<ILivechatContactChannel> {
    /* Implementation Hidden */
}

export function createFakeContact(overrides?: Partial<Serialized<ILivechatContact>>): Serialized<ILivechatContact> {
    /* Implementation Hidden */
}

export function createFakeContactWithManagerData(
	overrides?: Partial<Serialized<ILivechatContactWithManagerData>>,
): Serialized<ILivechatContactWithManagerData> {
    /* Implementation Hidden */
}

export function createFakeAgent(overrides?: Partial<Serialized<ILivechatAgent>>): Serialized<ILivechatAgent> {
    /* Implementation Hidden */
}

export function createFakeTag(overrides?: Partial<Serialized<ILivechatTag>>): Serialized<ILivechatTag> {
    /* Implementation Hidden */
}

export function createFakeBusinessUnit(overrides?: Partial<Serialized<IOmnichannelBusinessUnit>>): Serialized<IOmnichannelBusinessUnit> {
    /* Implementation Hidden */
}

export const createFakeDepartment = (overrides: Partial<Serialized<ILivechatDepartment>> = {}): Serialized<ILivechatDepartment> => ({
	_id: faker.string.uuid(),
	name: `${faker.commerce.department()} ${faker.string.uuid()}`,
	enabled: true,
	email: faker.internet.email(),
	showOnRegistration: false,
	showOnOfflineForm: false,
	type: 'd',
	_updatedAt: new Date().toISOString(),
	offlineMessageChannelName: '',
	numAgents: 0,
	ancestors: undefined,
	parentId: undefined,
	...overrides,
});

export function createFakeMonitor(overrides?: Partial<Serialized<ILivechatMonitor>>): Serialized<ILivechatMonitor> {
    /* Implementation Hidden */
}

export const createMockedPagination = (results = 0, total = 0) => ({
	current: 0,
	setCurrent: () => undefined,
	itemsPerPage: 25 as const,
	setItemsPerPage: () => undefined,
	itemsPerPageLabel: () => 'Items per page:',
	showingResultsLabel: () => `Showing results 1 - ${results} of ${total}`,
});

```