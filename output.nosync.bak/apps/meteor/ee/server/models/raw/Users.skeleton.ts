## File: apps/meteor/ee/server/models/raw/Users.ts

```typescript
import type { RocketChatRecordDeleted, IUser, AvailableAgentsAggregation } from '@rocket.chat/core-typings';
import { queryStatusAgentOnline, UsersRaw } from '@rocket.chat/models';
import type { Db, Collection, Filter } from 'mongodb';

import { readSecondaryPreferred } from '../../../../server/database/readSecondaryPreferred';

declare module '@rocket.chat/model-typings' {
	interface IUsersModel {
		getUnavailableAgents(
			departmentId: string,
			customFilter: Filter<AvailableAgentsAggregation>,
			enabledWhenIdle?: boolean,
			enabledWhenOffline?: boolean,
		): Promise<Pick<AvailableAgentsAggregation, 'username'>[]>;
	}
}

export class UsersEE extends UsersRaw {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IUser>>) {
        /* Implementation Hidden */
    }

	override getUnavailableAgents(
		departmentId: string,
		customFilter: Filter<AvailableAgentsAggregation>,
		enabledWhenIdle = false,
		enabledWhenOffline = false,
	): Promise<Pick<AvailableAgentsAggregation, 'username'>[]> {
        /* Implementation Hidden */
    }
}

```