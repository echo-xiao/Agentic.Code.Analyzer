## File: packages/models/src/models/UsersSessions.ts

```typescript
import type { IUserSession, IUserSessionConnection, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IUsersSessionsModel } from '@rocket.chat/model-typings';
import type { FindCursor, Collection, Db, FindOptions } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class UsersSessionsRaw extends BaseRaw<IUserSession> implements IUsersSessionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IUserSession>>) {
        /* Implementation Hidden */
    }

	clearConnectionsFromInstanceId(instanceId: string[]): ReturnType<BaseRaw<IUserSession>['updateMany']> {
        /* Implementation Hidden */
    }

	updateConnectionStatusById(uid: string, connectionId: string, status: string): ReturnType<BaseRaw<IUserSession>['updateOne']> {
        /* Implementation Hidden */
    }

	async removeConnectionsFromInstanceId(instanceId: string): ReturnType<BaseRaw<IUserSession>['updateMany']> {
        /* Implementation Hidden */
    }

	removeConnectionsFromOtherInstanceIds(instanceIds: string[]): ReturnType<BaseRaw<IUserSession>['updateMany']> {
        /* Implementation Hidden */
    }

	async removeConnectionByConnectionId(connectionId: string): ReturnType<BaseRaw<IUserSession>['updateMany']> {
        /* Implementation Hidden */
    }

	findByInstanceId(instanceId: string): FindCursor<IUserSession> {
        /* Implementation Hidden */
    }

	addConnectionById(
		userId: string,
		{ id, instanceId, status }: Pick<IUserSessionConnection, 'id' | 'instanceId' | 'status'>,
	): ReturnType<BaseRaw<IUserSession>['updateOne']> {
        /* Implementation Hidden */
    }

	findByOtherInstanceIds(instanceIds: string[], options?: FindOptions<IUserSession>): FindCursor<IUserSession> {
        /* Implementation Hidden */
    }
}

```