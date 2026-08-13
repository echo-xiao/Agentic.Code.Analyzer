## File: ee/packages/abac/src/index.ts

```typescript
import { api, Authorization, License, Room, ServiceClass, Settings } from '@rocket.chat/core-services';
import type { AbacActor, IAbacService } from '@rocket.chat/core-services';
import { AbacAccessOperation, AbacObjectType, isAbacPdpType, isAbacAttributeStoreType } from '@rocket.chat/core-typings';
import type {
	IAbacAttribute,
	IAbacAttributeDefinition,
	IRoom,
	IRoomAbacRedaction,
	AtLeast,
	IUser,
	ILDAPEntry,
	AbacAuditReason,
	AbacAttributeStoreType,
	AbacPdpType,
	AbacUserIdentifiers,
} from '@rocket.chat/core-typings';
import { Rooms, AbacAttributes, Users, Subscriptions } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { isTruthy } from '@rocket.chat/tools';
import type { Document, UpdateFilter } from 'mongodb';
import pLimit from 'p-limit';

import { Audit } from './audit';
import { VirtruClient } from './clients/virtru/VirtruClient';
import {
	AbacAttributeInUseError,
	AbacAttributeNotFoundError,
	AbacDuplicateAttributeKeyError,
	AbacInvalidAttributeValuesError,
	AbacUnsupportedObjectTypeError,
	AbacUnsupportedOperationError,
	PdpUnavailableError,
	PdpHealthCheckError,
} from './errors';
import {
	getAbacRoom,
	diffAttributes,
	extractAttribute,
	diffAttributeSets,
	validateAndNormalizeAttributes,
	MAX_ABAC_ATTRIBUTE_KEYS,
	stripTrailingSlashes,
} from './helper';
import { logger } from './logger';
import type { IPolicyDecisionPoint, VirtruPDPConfig } from './pdp';
import { LocalPDP, VirtruPDP } from './pdp';
import { LocalAttributeStore, VirtruAttributeStore } from './store';
import type { AttributeStoreDescriptor, AttributeStoreSelectionContext, IAttributeStore } from './store';

// Limit concurrent user removals to avoid overloading the server with too many operations at once
const limit = pLimit(20);

export class AbacService extends ServiceClass implements IAbacService {
	protected name = 'abac';

	private pdp: IPolicyDecisionPoint | null = null;

	private virtruPdpConfig: VirtruPDPConfig = {
		baseUrl: '',
		clientId: '',
		clientSecret: '',
		oidcEndpoint: '',
		defaultEntityKey: 'emailAddress',
		attributeNamespace: 'example.com',
	};

	private virtruClient = new VirtruClient(this.virtruPdpConfig);

	private abacEnabled?: boolean;

	private pdpTypeSetting?: AbacPdpType;

	private attributeStoreSetting?: AbacAttributeStoreType;

	private readonly attributeStores: Record<AbacAttributeStoreType, AttributeStoreDescriptor> = {
		local: { store: new LocalAttributeStore(), isEligible: () => true },
		virtru: {
			store: new VirtruAttributeStore(this.virtruClient),
			isEligible: (ctx) => ctx.abacEnabled && ctx.pdpType === 'virtru' && ctx.licensed,
		},
	};

	private lastSelectedStore?: IAttributeStore;

	decisionCacheTimeout = 60; // seconds

	constructor() {
        /* Implementation Hidden */
    }

	private async loadVirtruPdpConfig(): Promise<void> {
        /* Implementation Hidden */
    }

	private syncVirtruPdpConfig(): void {
        /* Implementation Hidden */
    }

	private async computeEffectiveStoreType(): Promise<AbacAttributeStoreType> {
        /* Implementation Hidden */
    }

	private async fireEffectiveStoreTransitionIfChanged(prevEffective: AbacAttributeStoreType): Promise<void> {
        /* Implementation Hidden */
    }

	private async resolveAttributeStore(): Promise<IAttributeStore> {
        /* Implementation Hidden */
    }

	async isExternalAttributeStore(): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async onAttributeStoreTransition(from: AbacAttributeStoreType, to: AbacAttributeStoreType): Promise<void> {
        /* Implementation Hidden */
    }

	setPdpStrategy(strategy: AbacPdpType): void {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async addSubjectAttributes(user: IUser, ldapUser: ILDAPEntry, map: Record<string, string>): Promise<void> {
        /* Implementation Hidden */
    }

	async addAbacAttribute(attribute: IAbacAttributeDefinition, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async listAbacAttributes(
		filters?: { key?: string; values?: string; offset?: number; count?: number },
		actor?: AbacActor,
	): Promise<{
		attributes: IAbacAttribute[];
		offset: number;
		count: number;
		total: number;
	}> {
        /* Implementation Hidden */
    }

	async listAbacRooms(
		filters?: {
			offset?: number;
			count?: number;
			filter?: string;
			filterType?: 'all' | 'roomName' | 'attribute' | 'value';
		},
		actor?: AbacActor,
	): Promise<{
		rooms: Array<IRoom & IRoomAbacRedaction>;
		offset: number;
		count: number;
		total: number;
	}> {
        /* Implementation Hidden */
    }

	async scopeRoomsForAdmin<T extends Pick<IRoom, '_id' | 'abacAttributes'>>(
		rooms: T[],
		actor: AbacActor,
	): Promise<Array<T & IRoomAbacRedaction>> {
        /* Implementation Hidden */
    }

	async updateAbacAttributeById(_id: string, update: { key?: string; values?: string[] }, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteAbacAttributeById(_id: string, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async getAbacAttributeById(_id: string, _actor: AbacActor | undefined): Promise<{ key: string; values: string[] }> {
        /* Implementation Hidden */
    }

	async isAbacAttributeInUseByKey(key: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	private broadcastRoomUpdate(room: IRoom): void {
        /* Implementation Hidden */
    }

	private async enforceCanModifyRoom(store: IAttributeStore, room: Pick<IRoom, '_id' | 'abacAttributes'>, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	private async enforceStoreValidation(store: IAttributeStore, attrs: IAbacAttributeDefinition[], actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async setRoomAbacAttributes(rid: string, attributes: Record<string, string[]>, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async updateRoomAbacAttributeValues(rid: string, key: string, values: string[], actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async removeRoomAbacAttribute(rid: string, key: string, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async addRoomAbacAttributeByKey(rid: string, key: string, values: string[], actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async replaceRoomAbacAttributeByKey(rid: string, key: string, values: string[], actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	private shouldUseCache(userSub: { abacLastTimeChecked?: Date }): boolean {
        /* Implementation Hidden */
    }

	async canAccessObject(
		room: Pick<IRoom, '_id' | 't' | 'teamId' | 'prid' | 'abacAttributes'>,
		user: Pick<IUser, '_id'>,
		action: AbacAccessOperation,
		objectType: AbacObjectType,
	) {
        /* Implementation Hidden */
    }

	async checkUsernamesMatchAttributes(usernames: string[], attributes: IAbacAttributeDefinition[], object: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private pdpType: AbacPdpType = 'local';

	private async ensurePdpAvailable(): Promise<void> {
        /* Implementation Hidden */
    }

	private async removeUserFromRoom(room: AtLeast<IRoom, '_id'>, user: IUser, reason: AbacAuditReason): Promise<void> {
        /* Implementation Hidden */
    }

	protected async onRoomAttributesChanged(
		room: AtLeast<IRoom, '_id' | 't' | 'teamMain' | 'abacAttributes'>,
		newAttributes: IAbacAttributeDefinition[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	protected async onSubjectAttributesChanged(user: IUser, _next: IAbacAttributeDefinition[]): Promise<void> {
        /* Implementation Hidden */
    }

	async getPDPHealth(): Promise<void> {
        /* Implementation Hidden */
    }

	async evaluateRoomMembership(): Promise<void> {
        /* Implementation Hidden */
    }

	async reevaluateUsers(identifiers: AbacUserIdentifiers): Promise<void> {
        /* Implementation Hidden */
    }
}

export { LocalPDP, VirtruPDP } from './pdp';
export type { IPolicyDecisionPoint, VirtruPDPConfig } from './pdp';
export { PdpHealthCheckError, getPdpHealthErrorCode, AbacAttributeStoreExternalError } from './errors';

export default AbacService;

```