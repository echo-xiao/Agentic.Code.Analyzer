## File: packages/models/src/models/ModerationReports.ts

```typescript
import type {
	IMessage,
	IModerationAudit,
	IModerationReport,
	RocketChatRecordDeleted,
	MessageReport,
	UserReport,
} from '@rocket.chat/core-typings';
import type { FindPaginated, IModerationReportsModel, PaginationParams } from '@rocket.chat/model-typings';
import type { AggregationCursor, Collection, Db, Document, FindCursor, FindOptions, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class ModerationReportsRaw extends BaseRaw<IModerationReport> implements IModerationReportsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IModerationReport>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] | undefined {
        /* Implementation Hidden */
    }

	createWithMessageDescriptionAndUserId(
		message: IMessage,
		description: IModerationReport['description'],
		room: IModerationReport['room'],
		reportedBy: IModerationReport['reportedBy'],
	): ReturnType<BaseRaw<IModerationReport>['insertOne']> {
        /* Implementation Hidden */
    }

	createWithDescriptionAndUser(
		reportedUser: UserReport['reportedUser'],
		description: UserReport['description'],
		reportedBy: UserReport['reportedBy'],
	): ReturnType<BaseRaw<IModerationReport>['insertOne']> {
        /* Implementation Hidden */
    }

	findMessageReportsGroupedByUser(
		latest: Date,
		oldest: Date,
		selector: string,
		pagination: PaginationParams<IModerationReport>,
	): AggregationCursor<IModerationAudit> {
        /* Implementation Hidden */
    }

	findUserReports(
		latest: Date,
		oldest: Date,
		selector: string,
		pagination: PaginationParams<IModerationReport>,
	): AggregationCursor<Pick<UserReport, '_id' | 'reportedUser' | 'ts'> & { count: number }> {
        /* Implementation Hidden */
    }

	async getTotalUniqueReportedUsers(latest: Date, oldest: Date, selector: string, isMessageReports?: boolean): Promise<number> {
        /* Implementation Hidden */
    }

	countMessageReportsInRange(latest: Date, oldest: Date, selector: string): Promise<number> {
        /* Implementation Hidden */
    }

	findReportedMessagesByReportedUserId(
		userId: string,
		selector: string,
		pagination: PaginationParams<IModerationReport>,
		options: FindOptions<IModerationReport> = {},
	): FindPaginated<FindCursor<Pick<MessageReport, '_id' | 'message' | 'ts' | 'room'>>> {
        /* Implementation Hidden */
    }

	findUserReportsByReportedUserId(
		userId: string,
		selector: string,
		pagination: PaginationParams<IModerationReport>,
		options: FindOptions<IModerationReport> = {},
	): FindPaginated<FindCursor<Omit<UserReport, 'moderationInfo'>>> {
        /* Implementation Hidden */
    }

	findReportsByMessageId(
		messageId: string,
		selector: string,
		pagination: PaginationParams<IModerationReport>,
		options: FindOptions<IModerationReport> = {},
	): FindPaginated<FindCursor<Pick<IModerationReport, '_id' | 'description' | 'reportedBy' | 'ts' | 'room'>>> {
        /* Implementation Hidden */
    }

	async hideMessageReportsByMessageId(messageId: string, userId: string, reason: string, action: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async hideMessageReportsByUserId(userId: string, moderatorId: string, reason: string, action: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async hideUserReportsByUserId(userId: string, moderatorId: string, reason: string, action: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	private getSearchQueryForSelector(selector?: string): any {
        /* Implementation Hidden */
    }

	private getSearchQueryForSelectorUsers(selector?: string): any {
        /* Implementation Hidden */
    }
}

```