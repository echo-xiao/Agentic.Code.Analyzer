## File: ee/packages/abac/src/store/VirtruAttributeStore.ts

```typescript
import type { AbacActor } from '@rocket.chat/core-services';
import type { IAbacAttribute, IAbacAttributeDefinition, IRoom, IRoomAbacRedaction } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import mem from 'mem';

import {
	AbacEntityResolutionFailedError,
	AbacInvalidAttributeValuesError,
	AbacNotAuthorizedToModifyRoomError,
	PdpUnavailableError,
} from '../errors';
import { logger } from '../logger';
import type { AttributeEntitlements, IAttributeStore, ListAttributesOptions, ListAttributesResult } from './types';
import type { VirtruClient } from '../clients/virtru/VirtruClient';
import { buildAttributeFqns, buildEntityIdentifier, getUserEntityKey, parseAttributeFqns } from '../clients/virtru/identity';
import type { IGetDecisionBulkRequest, IGetDecisionBulkResponse, IGetEntitlementsRequest, IGetEntitlementsResponse } from '../pdp/types';

const storeLogger = logger.section('VirtruAttributeStore');

const ENTITLEMENTS_CACHE_MS = 15_000;

export class VirtruAttributeStore implements IAttributeStore {
	private client: VirtruClient;

	private readonly entitlementsCache = new Map<string, { data: Promise<IAbacAttributeDefinition[]>; maxAge: number }>();

	private _entitlementsForEntity: (entityId: string) => Promise<IAbacAttributeDefinition[]>;

	constructor(client: VirtruClient) {
        /* Implementation Hidden */
    }

	private async resolveEntityId(actor: AbacActor): Promise<string> {
        /* Implementation Hidden */
    }

	private async fetchEntitlements(entityId: string): Promise<IAbacAttributeDefinition[]> {
        /* Implementation Hidden */
    }

	private async getEntitlements(actor: AbacActor): Promise<IAbacAttributeDefinition[]> {
        /* Implementation Hidden */
    }

	async list(actor: AbacActor | undefined, opts?: ListAttributesOptions): Promise<ListAttributesResult> {
        /* Implementation Hidden */
    }

	async entitlementsOf(actor: AbacActor): Promise<AttributeEntitlements> {
        /* Implementation Hidden */
    }

	onStoreSelected(): void {
        /* Implementation Hidden */
    }

	async validateAssignable(attrs: IAbacAttributeDefinition[], actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	async scopeRoomsPage<T extends Pick<IRoom, '_id' | 'abacAttributes'>>(
		rooms: T[],
		actor: AbacActor,
	): Promise<Array<T & IRoomAbacRedaction>> {
        /* Implementation Hidden */
    }

	async assertCanModifyRoom(room: Pick<IRoom, '_id' | 'abacAttributes'>, actor: AbacActor): Promise<void> {
        /* Implementation Hidden */
    }

	private async decideRooms(rooms: Array<Pick<IRoom, '_id' | 'abacAttributes'>>, actor: AbacActor): Promise<Set<string>> {
        /* Implementation Hidden */
    }
}

```