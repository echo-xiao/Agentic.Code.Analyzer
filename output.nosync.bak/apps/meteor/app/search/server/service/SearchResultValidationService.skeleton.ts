## File: apps/meteor/app/search/server/service/SearchResultValidationService.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Users, Rooms } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';
import mem from 'mem';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomAsync } from '../../../authorization/server';
import { SearchLogger } from '../logger/logger';
import type { IRawSearchResult, ISearchResult } from '../model/ISearchResult';

export class SearchResultValidationService {
	private getSubscription = mem(async (rid: IRoom['_id'], uid?: IUser['_id']) => {
		if (!rid) {
			return;
		}

		const room = await Rooms.findOneById(rid);
		if (!room) {
			return;
		}

		if (!uid || !(await canAccessRoomAsync(room, { _id: uid }))) {
			return;
		}

		return room;
	});

	private getUser = mem(async (uid: IUser['_id']) => {
		if (!uid) {
			return;
		}

		return Users.findOneById(uid, { projection: { username: 1 } });
	});

	async validateSearchResult(result: IRawSearchResult): Promise<ISearchResult> {
        /* Implementation Hidden */
    }
}

```