## File: packages/models/src/models/Analytics.ts

```typescript
import type { IAnalytics, IRoom } from '@rocket.chat/core-typings';
import type { IAnalyticsModel, IChannelsWithNumberOfMessagesBetweenDate } from '@rocket.chat/model-typings';
import { Random } from '@rocket.chat/random';
import type { AggregationCursor, FindCursor, Db, IndexDescription, FindOptions, UpdateResult, Document, Collection } from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class AnalyticsRaw extends BaseRaw<IAnalytics> implements IAnalyticsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	saveMessageSent({ room, date }: { room: IRoom; date: IAnalytics['date'] }): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	saveUserData({ date }: { date: IAnalytics['date'] }): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	saveMessageDeleted({ room, date }: { room: { _id: string }; date: IAnalytics['date'] }): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	getMessagesSentTotalByDate({
		start,
		end,
		options = {},
	}: {
		start: IAnalytics['date'];
		end: IAnalytics['date'];
		options?: { sort?: FindOptions<IAnalytics>['sort']; count?: number };
	}): AggregationCursor<{
		_id: IAnalytics['date'];
		messages: number;
	}> {
        /* Implementation Hidden */
    }

	getMessagesOrigin({ start, end }: { start: IAnalytics['date']; end: IAnalytics['date'] }): AggregationCursor<{
		t: IRoom['t'];
		messages: number;
	}> {
        /* Implementation Hidden */
    }

	getMostPopularChannelsByMessagesSentQuantity({
		start,
		end,
		options = {},
	}: {
		start: IAnalytics['date'];
		end: IAnalytics['date'];
		options?: { sort?: FindOptions<IAnalytics>['sort']; count?: number };
	}): AggregationCursor<{
		t: IRoom['t'];
		name: string;
		messages: number;
		usernames: string[];
	}> {
        /* Implementation Hidden */
    }

	getTotalOfRegisteredUsersByDate({
		start,
		end,
		options = {},
	}: {
		start: IAnalytics['date'];
		end: IAnalytics['date'];
		options?: { sort?: FindOptions<IAnalytics>['sort']; count?: number };
	}): AggregationCursor<{
		_id: IAnalytics['date'];
		users: number;
	}> {
        /* Implementation Hidden */
    }

	findByTypeBeforeDate({ type, date }: { type: IAnalytics['type']; date: IAnalytics['date'] }): FindCursor<IAnalytics> {
        /* Implementation Hidden */
    }

	getRoomsWithNumberOfMessagesBetweenDateQuery({
		types,
		start,
		end,
		startOfLastWeek,
		endOfLastWeek,
		options,
	}: {
		types: Array<IRoom['t']>;
		start: number;
		end: number;
		startOfLastWeek: number;
		endOfLastWeek: number;
		options?: any;
	}) {
        /* Implementation Hidden */
    }

	findRoomsByTypesWithNumberOfMessagesBetweenDate(params: {
		types: Array<IRoom['t']>;
		start: number;
		end: number;
		startOfLastWeek: number;
		endOfLastWeek: number;
		options?: any;
	}): AggregationCursor<{ channels: IChannelsWithNumberOfMessagesBetweenDate[]; total: number }> {
        /* Implementation Hidden */
    }
}

```