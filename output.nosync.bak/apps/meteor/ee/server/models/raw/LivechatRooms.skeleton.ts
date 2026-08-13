## File: apps/meteor/ee/server/models/raw/LivechatRooms.ts

```typescript
import type {
	ILivechatPriority,
	IOmnichannelRoom,
	IOmnichannelServiceLevelAgreements,
	RocketChatRecordDeleted,
	ReportResult,
	ILivechatContact,
} from '@rocket.chat/core-typings';
import { LivechatPriorityWeight, DEFAULT_SLA_CONFIG } from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatRoomsModel } from '@rocket.chat/model-typings';
import type { Updater } from '@rocket.chat/models';
import { LivechatRoomsRaw } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { FindCursor, UpdateResult, Document, FindOptions, Db, Collection, Filter, AggregationCursor, UpdateOptions } from 'mongodb';

import { readSecondaryPreferred } from '../../../../server/database/readSecondaryPreferred';

declare module '@rocket.chat/model-typings' {
	interface ILivechatRoomsModel {
		associateRoomsWithDepartmentToUnit: (departments: string[], unit: string) => Promise<void>;
		removeUnitAssociationFromRooms: (unit: string) => Promise<void>;
		updateDepartmentAncestorsById: (rid: string, ancestors?: string[]) => Promise<UpdateResult>;
		unsetPredictedVisitorAbandonmentByRoomId(rid: string): Promise<UpdateResult>;
		findAbandonedOpenRooms(date: Date, extraQuery?: Filter<IOmnichannelRoom>): FindCursor<IOmnichannelRoom>;
		setPredictedVisitorAbandonmentByRoomId(roomId: string, date: Date): Promise<UpdateResult>;
		getPredictedVisitorAbandonmentByRoomIdUpdateQuery(date: Date, roomUpdater: Updater<IOmnichannelRoom>): Updater<IOmnichannelRoom>;
		unsetAllPredictedVisitorAbandonment(): Promise<void>;
		setOnHoldByRoomId(roomId: string): Promise<UpdateResult>;
		unsetOnHoldByRoomId(roomId: string): Promise<UpdateResult>;
		unsetOnHoldAndPredictedVisitorAbandonmentByRoomId(roomId: string): Promise<UpdateResult>;
		setSlaForRoomById(
			roomId: string,
			sla: Pick<IOmnichannelServiceLevelAgreements, '_id' | 'dueTimeInMinutes'>,
		): Promise<UpdateResult | Document>;
		removeSlaFromRoomById(roomId: string): Promise<UpdateResult | Document>;
		bulkRemoveSlaFromRoomsById(slaId: string): Promise<UpdateResult | Document>;
		findOpenBySlaId(
			slaId: string,
			options: FindOptions<IOmnichannelRoom>,
			extraQuery?: Filter<IOmnichannelRoom>,
		): FindCursor<IOmnichannelRoom>;
		setPriorityByRoomId(roomId: string, priority: Pick<ILivechatPriority, '_id' | 'sortItem'>): Promise<UpdateResult>;
		unsetPriorityByRoomId(roomId: string): Promise<UpdateResult>;
		countPrioritizedRooms(): Promise<number>;
		countRoomsWithSla(): Promise<number>;
		countRoomsWithTranscriptSent(): Promise<number>;
		getConversationsBySource(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult>;
		getConversationsByStatus(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult>;
		getConversationsByDepartment(
			start: Date,
			end: Date,
			sort: Record<string, 1 | -1>,
			extraQuery: Filter<IOmnichannelRoom>,
		): AggregationCursor<ReportResult>;
		getConversationsByTags(
			start: Date,
			end: Date,
			sort: Record<string, 1 | -1>,
			extraQuery: Filter<IOmnichannelRoom>,
		): AggregationCursor<ReportResult>;
		getConversationsByAgents(
			start: Date,
			end: Date,
			sort: Record<string, 1 | -1>,
			extraQuery: Filter<IOmnichannelRoom>,
		): AggregationCursor<ReportResult>;
		getConversationsWithoutTagsBetweenDate(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): Promise<number>;
		getTotalConversationsWithoutAgentsBetweenDate(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): Promise<number>;
		getTotalConversationsWithoutDepartmentBetweenDates(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): Promise<number>;
		updateMergedContactIds(
			contactIdsThatWereMerged: ILivechatContact['_id'][],
			newContactId: ILivechatContact['_id'],
			options?: UpdateOptions,
		): Promise<UpdateResult | Document>;
	}
}

export class LivechatRoomsRawEE extends LivechatRoomsRaw implements ILivechatRoomsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOmnichannelRoom>>) {
        /* Implementation Hidden */
    }

	override countPrioritizedRooms(): Promise<number> {
        /* Implementation Hidden */
    }

	override countRoomsWithSla(): Promise<number> {
        /* Implementation Hidden */
    }

	override countRoomsWithTranscriptSent(): Promise<number> {
        /* Implementation Hidden */
    }

	override async unsetAllPredictedVisitorAbandonment(): Promise<void> {
        /* Implementation Hidden */
    }

	override setOnHoldByRoomId(roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override unsetOnHoldByRoomId(roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override unsetOnHoldAndPredictedVisitorAbandonmentByRoomId(roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override setSlaForRoomById(
		roomId: string,
		sla: Pick<IOmnichannelServiceLevelAgreements, '_id' | 'dueTimeInMinutes'>,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override removeSlaFromRoomById(roomId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override bulkRemoveSlaFromRoomsById(slaId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override findOpenBySlaId(
		slaId: string,
		options: FindOptions<IOmnichannelRoom>,
		extraQuery?: Filter<IOmnichannelRoom>,
	): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	override async setPriorityByRoomId(roomId: string, priority: Pick<ILivechatPriority, '_id' | 'sortItem'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override async unsetPriorityByRoomId(roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override getPredictedVisitorAbandonmentByRoomIdUpdateQuery(
		date: Date,
		roomUpdater: Updater<IOmnichannelRoom> = this.getUpdater(),
	): Updater<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	override setPredictedVisitorAbandonmentByRoomId(rid: string, willBeAbandonedAt: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override findAbandonedOpenRooms(date: Date, extraQuery?: Filter<IOmnichannelRoom>): FindCursor<IOmnichannelRoom> {
        /* Implementation Hidden */
    }

	override async unsetPredictedVisitorAbandonmentByRoomId(roomId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override async associateRoomsWithDepartmentToUnit(departments: string[], unitId: string): Promise<void> {
        /* Implementation Hidden */
    }

	override async removeUnitAssociationFromRooms(unitId: string): Promise<void> {
        /* Implementation Hidden */
    }

	override async updateDepartmentAncestorsById(rid: string, departmentAncestors?: string[]) {
        /* Implementation Hidden */
    }

	override getConversationsBySource(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	override getConversationsByStatus(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	override getConversationsByDepartment(
		start: Date,
		end: Date,
		sort: Record<string, 1 | -1>,
		extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	override getTotalConversationsWithoutDepartmentBetweenDates(
		start: Date,
		end: Date,
		extraQuery: Filter<IOmnichannelRoom>,
	): Promise<number> {
        /* Implementation Hidden */
    }

	override getConversationsByTags(
		start: Date,
		end: Date,
		sort: Record<string, 1 | -1>,
		extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	override getConversationsWithoutTagsBetweenDate(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): Promise<number> {
        /* Implementation Hidden */
    }

	override getConversationsByAgents(
		start: Date,
		end: Date,
		sort: Record<string, 1 | -1>,
		extraQuery: Filter<IOmnichannelRoom>,
	): AggregationCursor<ReportResult> {
        /* Implementation Hidden */
    }

	override getTotalConversationsWithoutAgentsBetweenDate(start: Date, end: Date, extraQuery: Filter<IOmnichannelRoom>): Promise<number> {
        /* Implementation Hidden */
    }

	override updateMergedContactIds(
		contactIdsThatWereMerged: ILivechatContact['_id'][],
		newContactId: ILivechatContact['_id'],
		options?: UpdateOptions,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override findClosedRoomsByContactAndSourcePaginated({
		contactId,
		source,
		options = {},
	}: {
		contactId: string;
		source?: string;
		options?: FindOptions;
	}): FindPaginated<FindCursor<IOmnichannelRoom>> {
        /* Implementation Hidden */
    }
}

```