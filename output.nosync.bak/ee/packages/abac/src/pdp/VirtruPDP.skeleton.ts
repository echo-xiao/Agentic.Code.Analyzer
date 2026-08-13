## File: ee/packages/abac/src/pdp/VirtruPDP.ts

```typescript
import type { IAbacAttributeDefinition, IRoom, IUser, AtLeast } from '@rocket.chat/core-typings';
import { Rooms, Users } from '@rocket.chat/models';
import { serverFetch } from '@rocket.chat/server-fetch';
import { isTruthy } from '@rocket.chat/tools';
import pLimit from 'p-limit';

import { OnlyCompliantCanBeAddedToRoomError, PdpHealthCheckError } from '../errors';
import { logger } from '../logger';
import type {
	IPolicyDecisionPoint,
	IGetDecisionBulkRequest,
	IGetDecisionBulkResponse,
	IResourceDecision,
	NonCompliantPair,
	ReevaluationUser,
} from './types';
import { HEALTH_CHECK_TIMEOUT } from '../clients/virtru/VirtruClient';
import type { VirtruClient } from '../clients/virtru/VirtruClient';
import { buildEntityIdentifier, buildAttributeFqns, getUserEntityKey } from '../clients/virtru/identity';

const pdpLogger = logger.section('VirtruPDP');

export const getDeniedSubjects = <T extends { user: Pick<IUser, '_id'>; room: Pick<IRoom, '_id'> }>(
	responses: Array<{ resourceDecisions?: IResourceDecision[] } | undefined>,
	subjects: T[],
): T[] => {
    /* Implementation Hidden */
};

export class VirtruPDP implements IPolicyDecisionPoint {
	private client: VirtruClient;

	constructor(client: VirtruClient) {
        /* Implementation Hidden */
    }

	async isAvailable(): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getHealthStatus(): Promise<void> {
        /* Implementation Hidden */
    }

	private async checkIdpConnectivity(): Promise<string> {
        /* Implementation Hidden */
    }

	private async checkPlatformHealth(): Promise<void> {
        /* Implementation Hidden */
    }

	private async checkAuthorizedAccess(token: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async getDecisionBulk(
		requests: Array<IGetDecisionBulkRequest | null>,
	): Promise<Array<{ resourceDecisions?: IResourceDecision[] } | undefined>> {
        /* Implementation Hidden */
    }

	async canAccessObject(
		room: AtLeast<IRoom, '_id' | 'abacAttributes'>,
		user: AtLeast<IUser, '_id'>,
	): Promise<{ granted: boolean; userToRemove?: IUser }> {
        /* Implementation Hidden */
    }

	async checkUsernamesMatchAttributes(usernames: string[], attributes: IAbacAttributeDefinition[], object: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async onRoomAttributesChanged(
		room: AtLeast<IRoom, '_id' | 't' | 'teamMain' | 'abacAttributes'>,
		newAttributes: IAbacAttributeDefinition[],
	): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	async evaluateUserRooms(
		entries: Array<{
			user: Pick<IUser, '_id' | 'emails' | 'username'>;
			rooms: AtLeast<IRoom, '_id' | 'abacAttributes'>[];
		}>,
	): Promise<NonCompliantPair[]> {
        /* Implementation Hidden */
    }

	async reevaluateUsers(users: ReevaluationUser[]): Promise<NonCompliantPair[]> {
        /* Implementation Hidden */
    }

	async onSubjectAttributesChanged(user: IUser, _next: IAbacAttributeDefinition[]): Promise<IRoom[]> {
        /* Implementation Hidden */
    }
}

```