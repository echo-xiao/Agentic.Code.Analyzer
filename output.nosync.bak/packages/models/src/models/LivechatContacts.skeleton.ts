## File: packages/models/src/models/LivechatContacts.ts

```typescript
import type {
	AtLeast,
	ILivechatContact,
	ILivechatContactChannel,
	ILivechatContactConflictingField,
	ILivechatContactVisitorAssociation,
	ILivechatVisitor,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatContactsModel, InsertionModel, Updater } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	Document,
	Collection,
	Db,
	RootFilterOperators,
	Filter,
	FindOptions,
	FindCursor,
	IndexDescription,
	UpdateResult,
	UpdateFilter,
	UpdateOptions,
	FindOneAndUpdateOptions,
	AggregationCursor,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class LivechatContactsRaw extends BaseRaw<ILivechatContact> implements ILivechatContactsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatContact>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async insertContact(
		data: InsertionModel<Omit<ILivechatContact, 'createdAt'>> & { createdAt?: ILivechatContact['createdAt'] },
	): Promise<ILivechatContact['_id']> {
        /* Implementation Hidden */
    }

	async patchContact(
		contactId: string,
		changes: {
			set?: Partial<ILivechatContact>;
			unset?: Partial<Record<keyof ILivechatContact, '' | 1>>;
		},
		options?: FindOneAndUpdateOptions,
	) {
        /* Implementation Hidden */
    }

	updateById(contactId: string, update: UpdateFilter<ILivechatContact>, options?: UpdateOptions): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async updateContactCustomFields(
		contactId: string,
		dataToUpdate: { customFields: Record<string, unknown>; conflictingFields: ILivechatContactConflictingField[] },
		options?: FindOneAndUpdateOptions,
	): Promise<ILivechatContact | null> {
        /* Implementation Hidden */
    }

	findPaginatedContacts(
		search: { searchText?: string; unknown?: boolean },
		options?: FindOptions,
	): FindPaginated<FindCursor<ILivechatContact>> {
        /* Implementation Hidden */
    }

	async findContactMatchingVisitor(visitor: AtLeast<ILivechatVisitor, 'visitorEmails' | 'phone'>): Promise<ILivechatContact | null> {
        /* Implementation Hidden */
    }

	async findContactByEmailAndContactManager(email: string): Promise<Pick<ILivechatContact, 'contactManager'> | null> {
        /* Implementation Hidden */
    }

	private makeQueryForVisitor(
		visitor: ILivechatContactVisitorAssociation,
		extraFilters?: Filter<Required<ILivechatContact>['channels'][number]>,
	): Filter<ILivechatContact> {
        /* Implementation Hidden */
    }

	async findOneByVisitor<T extends Document = ILivechatContact>(
		visitor: ILivechatContactVisitorAssociation,
		options: FindOptions<ILivechatContact> = {},
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	async addChannel(contactId: string, channel: ILivechatContactChannel): Promise<void> {
        /* Implementation Hidden */
    }

	async updateLastChatById(
		contactId: string,
		visitor: ILivechatContactVisitorAssociation,
		lastChat: ILivechatContact['lastChat'],
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async isChannelBlocked(visitor: ILivechatContactVisitorAssociation): Promise<boolean> {
        /* Implementation Hidden */
    }

	setChannelBlockStatus(visitor: ILivechatContactVisitorAssociation, blocked: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setChannelVerifiedStatus(visitor: ILivechatContactVisitorAssociation, verified: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setVerifiedUpdateQuery(verified: boolean, contactUpdater: Updater<ILivechatContact>): Updater<ILivechatContact> {
        /* Implementation Hidden */
    }

	setFieldAndValueUpdateQuery(field: string, value: string, contactUpdater: Updater<ILivechatContact>): Updater<ILivechatContact> {
        /* Implementation Hidden */
    }

	updateFromUpdaterByAssociation(
		visitor: ILivechatContactVisitorAssociation,
		contactUpdater: Updater<ILivechatContact>,
		options: UpdateOptions = {},
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async findSimilarVerifiedContacts(
		{ field, value }: Pick<ILivechatContactChannel, 'field' | 'value'>,
		originalContactId: string,
		options?: FindOptions<ILivechatContact>,
	): Promise<ILivechatContact[]> {
        /* Implementation Hidden */
    }

	findAllByVisitorId(visitorId: string): FindCursor<ILivechatContact> {
        /* Implementation Hidden */
    }

	async findOneEnabledById(_id: ILivechatContact['_id'], options?: FindOptions<ILivechatContact>): Promise<ILivechatContact | null>;

	async findOneEnabledById<P extends Document = ILivechatContact>(_id: P['_id'], options?: FindOptions<P>): Promise<P | null>;

	async findOneEnabledById(_id: ILivechatContact['_id'], options?: any): Promise<ILivechatContact | null> {
        /* Implementation Hidden */
    }

	disableByVisitorId(visitorId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	disableByContactId(contactId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async addEmail(contactId: string, email: string): Promise<ILivechatContact | null> {
        /* Implementation Hidden */
    }

	isContactActiveOnPeriod(visitor: ILivechatContactVisitorAssociation, period: string): Promise<number> {
        /* Implementation Hidden */
    }

	markContactActiveForPeriod(visitor: ILivechatContactVisitorAssociation, period: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	countContactsOnPeriod(period: string): Promise<number> {
        /* Implementation Hidden */
    }

	countByContactInfo({ contactId, email, phone }: { contactId?: string; email?: string; phone?: string }): Promise<number> {
        /* Implementation Hidden */
    }

	countUnknown(): Promise<number> {
        /* Implementation Hidden */
    }

	countBlocked(): Promise<number> {
        /* Implementation Hidden */
    }

	countFullyBlocked(): Promise<number> {
        /* Implementation Hidden */
    }

	countVerified(): Promise<number> {
        /* Implementation Hidden */
    }

	countContactsWithoutChannels(): Promise<number> {
        /* Implementation Hidden */
    }

	getStatistics(): AggregationCursor<{ totalConflicts: number; avgChannelsPerContact: number }> {
        /* Implementation Hidden */
    }

	updateByVisitorId(visitorId: string, update: UpdateFilter<ILivechatContact>, options?: UpdateOptions): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```