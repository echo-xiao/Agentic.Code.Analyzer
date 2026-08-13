## File: packages/models/src/models/LivechatVisitors.ts

```typescript
import type { IVisitorExternalIdentifier, ILivechatVisitor, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatVisitorsModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	AggregationCursor,
	Collection,
	FindCursor,
	Db,
	Document,
	Filter,
	FindOptions,
	UpdateResult,
	IndexDescription,
	DeleteResult,
	UpdateFilter,
	WithId,
	FindOneAndUpdateOptions,
} from 'mongodb';
import { ObjectId } from 'mongodb';

import { Settings } from '../index';
import { BaseRaw } from './BaseRaw';

export class LivechatVisitorsRaw extends BaseRaw<ILivechatVisitor> implements ILivechatVisitorsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatVisitor>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneVisitorByPhone(phone: string): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	async findOneVisitorByPhoneOrEmailAndAddExternalId(
		contactData: { phone: string } | { email: string },
		appId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
	): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	findOneByExternalId(entityId: string): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	async updateExternalIdById(
		_id: string,
		appId: string,
		externalId: Omit<IVisitorExternalIdentifier, 'appId'>,
	): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	async findOneGuestByEmailAddress(emailAddress: string): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	/**
	 * Find visitors by _id
	 * @param {string} token - Visitor token
	 */
	findById(_id: string, options: FindOptions<ILivechatVisitor>): FindCursor<ILivechatVisitor> {
        /* Implementation Hidden */
    }

	findEnabled(query: Filter<ILivechatVisitor>, options?: FindOptions<ILivechatVisitor>): FindCursor<ILivechatVisitor> {
        /* Implementation Hidden */
    }

	findOneEnabledById<T extends Document = ILivechatVisitor>(_id: string, options?: FindOptions<ILivechatVisitor>): Promise<T | null> {
        /* Implementation Hidden */
    }

	findVisitorByToken(token: string): FindCursor<ILivechatVisitor> {
        /* Implementation Hidden */
    }

	getVisitorByToken(token: string, options: FindOptions<ILivechatVisitor>): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	countVisitorsBetweenDate({ start, end, department }: { start: Date; end: Date; department?: string }): Promise<number> {
        /* Implementation Hidden */
    }

	async getNextVisitorUsername(): Promise<string> {
        /* Implementation Hidden */
    }

	findByNameRegexWithExceptionsAndConditions<P extends Document = ILivechatVisitor>(
		searchTerm: string,
		exceptions: string[] = [],
		conditions: Filter<ILivechatVisitor> = {},
		options: FindOptions<P extends ILivechatVisitor ? ILivechatVisitor : P> = {},
	): AggregationCursor<
		P & {
			custom_name: string;
		}
	> {
        /* Implementation Hidden */
    }

	/**
	 * Find visitors by their email or phone or username or name
	 */
	async findPaginatedVisitorsByEmailOrPhoneOrNameOrUsernameOrCustomField(
		emailOrPhone?: string,
		nameOrUsername?: RegExp,
		allowedCustomFields: string[] = [],
		options?: FindOptions<ILivechatVisitor>,
	): Promise<FindPaginated<FindCursor<ILivechatVisitor>>> {
        /* Implementation Hidden */
    }

	async findOneByEmailAndPhoneAndCustomField(
		email: string | null | undefined,
		phone: string | null | undefined,
		customFields?: { [key: string]: RegExp },
	): Promise<ILivechatVisitor | null> {
        /* Implementation Hidden */
    }

	updateAllLivechatDataByToken(token: string, livechatDataToUpdate: Record<string, string>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async updateLivechatDataByToken(
		token: string,
		key: string,
		value: unknown,
		overwrite = true,
	): Promise<UpdateResult | Document | boolean> {
        /* Implementation Hidden */
    }

	updateLastAgentByToken(token: string, lastAgent: ILivechatVisitor['lastAgent']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	updateById(_id: string, update: UpdateFilter<ILivechatVisitor>): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async updateOneByIdOrToken(
		update: Partial<ILivechatVisitor>,
		options?: FindOneAndUpdateOptions,
	): Promise<null | WithId<ILivechatVisitor>> {
        /* Implementation Hidden */
    }

	saveGuestById(
		_id: string,
		data: { name?: string; username?: string; email?: string; phone?: string; livechatData: { [k: string]: any } },
	): Promise<UpdateResult | Document | boolean> {
        /* Implementation Hidden */
    }

	removeDepartmentById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override removeById(_id: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async saveGuestEmailPhoneById(_id: string, emails: string[], phones: string[]): Promise<UpdateResult | Document | void> {
        /* Implementation Hidden */
    }

	removeContactManagerByUsername(manager: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	disableById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setLastChatById(_id: string, lastChat: Required<ILivechatVisitor['lastChat']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateDepartmentById(_id: string, department: string) {
        /* Implementation Hidden */
    }

	findByIds(ids: string[], options?: FindOptions<ILivechatVisitor>): FindCursor<ILivechatVisitor> {
        /* Implementation Hidden */
    }
}

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

```