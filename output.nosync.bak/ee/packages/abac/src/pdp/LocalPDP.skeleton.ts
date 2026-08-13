## File: ee/packages/abac/src/pdp/LocalPDP.ts

```typescript
import { LDAPEnterprise } from '@rocket.chat/core-services';
import type { IAbacAttributeDefinition, IRoom, AtLeast, IUser } from '@rocket.chat/core-typings';
import { Rooms, Users } from '@rocket.chat/models';

import { OnlyCompliantCanBeAddedToRoomError } from '../errors';
import { buildCompliantConditions, buildNonCompliantConditions, buildRoomNonCompliantConditionsFromSubject } from '../helper';
import type { IPolicyDecisionPoint, ReevaluationUser } from './types';

export class LocalPDP implements IPolicyDecisionPoint {
	async isAvailable(): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getHealthStatus(): Promise<void> {
        /* Implementation Hidden */
    }

	async canAccessObject(
		room: AtLeast<IRoom, '_id' | 'abacAttributes'>,
		user: AtLeast<IUser, '_id'>,
	): Promise<{ granted: boolean; userToRemove?: IUser }> {
        /* Implementation Hidden */
    }

	async onRoomAttributesChanged(
		room: AtLeast<IRoom, '_id' | 't' | 'teamMain' | 'abacAttributes'>,
		newAttributes: IAbacAttributeDefinition[],
	): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	async onSubjectAttributesChanged(user: IUser, _next: IAbacAttributeDefinition[]): Promise<IRoom[]> {
        /* Implementation Hidden */
    }

	async evaluateUserRooms(
		_entries: Array<{
			user: Pick<IUser, '_id' | 'emails' | 'username'>;
			rooms: AtLeast<IRoom, '_id' | 'abacAttributes'>[];
		}>,
	): Promise<Array<{ user: Pick<IUser, '_id' | 'emails' | 'username'>; room: IRoom }>> {
        /* Implementation Hidden */
    }

	async reevaluateUsers(users: ReevaluationUser[]): Promise<void> {
        /* Implementation Hidden */
    }

	async checkUsernamesMatchAttributes(usernames: string[], attributes: IAbacAttributeDefinition[], _object: IRoom): Promise<void> {
        /* Implementation Hidden */
    }
}

```