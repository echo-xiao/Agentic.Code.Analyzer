## File: packages/models/src/models/LivechatAgentActivity.ts

```typescript
import type { ILivechatAgentActivity, IServiceHistory, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ILivechatAgentActivityModel } from '@rocket.chat/model-typings';
import { parseISO, format } from 'date-fns';
import type { AggregationCursor, Collection, Document, FindCursor, Db, WithId, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class LivechatAgentActivityRaw extends BaseRaw<ILivechatAgentActivity> implements ILivechatAgentActivityModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatAgentActivity>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByAgendIdAndDate(agentId: string, date: ILivechatAgentActivity['date']): Promise<ILivechatAgentActivity | null> {
        /* Implementation Hidden */
    }

	async createOrUpdate(
		data: Partial<Pick<ILivechatAgentActivity, 'date' | 'agentId' | 'lastStartedAt'>> = {},
	): Promise<null | WithId<ILivechatAgentActivity>> {
        /* Implementation Hidden */
    }

	updateLastStoppedAt({
		agentId,
		date,
		lastStoppedAt,
		availableTime,
	}: Pick<ILivechatAgentActivity, 'date' | 'agentId' | 'lastStoppedAt' | 'availableTime'>): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateServiceHistory({
		agentId,
		date,
		serviceHistory,
	}: Pick<ILivechatAgentActivity, 'date' | 'agentId'> & { serviceHistory: IServiceHistory }): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findOpenSessions(): FindCursor<ILivechatAgentActivity> {
        /* Implementation Hidden */
    }

	findAllAverageAvailableServiceTime({ date, departmentId }: { date: Date; departmentId?: string }): Promise<
		{
			averageAvailableServiceTimeInSeconds: number;
		}[]
	> {
        /* Implementation Hidden */
    }

	findAvailableServiceTimeHistory(p: {
		start: string;
		end: string;
		fullReport: boolean;
		onlyCount: true;
		options?: { sort?: Record<string, number>; offset?: number; count?: number };
	}): AggregationCursor<{ total: number }>;

	findAvailableServiceTimeHistory(p: {
		start: string;
		end: string;
		fullReport: boolean;
		onlyCount?: false;
		options?: { sort?: Record<string, number>; offset?: number; count?: number };
	}): AggregationCursor<ILivechatAgentActivity>;

	findAvailableServiceTimeHistory({
		start,
		end,
		fullReport,
		onlyCount = false,
		options = {},
	}: {
		start: string;
		end: string;
		fullReport: boolean;
		onlyCount?: boolean;
		options?: { sort?: Record<string, number>; offset?: number; count?: number };
	}): AggregationCursor<ILivechatAgentActivity> | AggregationCursor<{ total: number }> {
        /* Implementation Hidden */
    }
}

```