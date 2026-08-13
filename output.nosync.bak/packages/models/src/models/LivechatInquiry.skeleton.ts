## File: packages/models/src/models/LivechatInquiry.ts

```typescript
import type {
	ILivechatInquiryRecord,
	IMessage,
	RocketChatRecordDeleted,
	ILivechatPriority,
	SelectedAgent,
} from '@rocket.chat/core-typings';
import { LivechatInquiryStatus } from '@rocket.chat/core-typings';
import type { ILivechatInquiryModel } from '@rocket.chat/model-typings';
import type {
	Collection,
	Db,
	Document,
	FindOptions,
	UpdateResult,
	Filter,
	DeleteResult,
	IndexDescription,
	FindCursor,
	UpdateFilter,
	DeleteOptions,
	AggregateOptions,
	WithId,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

const { INQUIRY_LOCK_TIMEOUT = '10000' } = process.env;

export class LivechatInquiryRaw extends BaseRaw<ILivechatInquiryRecord> implements ILivechatInquiryModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatInquiryRecord>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): Array<IndexDescription> {
        /* Implementation Hidden */
    }

	findOneQueuedByRoomId(rid: string): Promise<(ILivechatInquiryRecord & { status: LivechatInquiryStatus.QUEUED }) | null> {
        /* Implementation Hidden */
    }

	findOneByRoomId<T extends Document = ILivechatInquiryRecord>(
		rid: string,
		options?: FindOptions<T extends ILivechatInquiryRecord ? ILivechatInquiryRecord : T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	findOneReadyByRoomId<T extends Document = ILivechatInquiryRecord>(
		rid: string,
		options?: FindOptions<T extends ILivechatInquiryRecord ? ILivechatInquiryRecord : T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	findIdsByVisitorToken(token: ILivechatInquiryRecord['v']['token']): FindCursor<ILivechatInquiryRecord> {
        /* Implementation Hidden */
    }

	findIdsByVisitorId(_id: ILivechatInquiryRecord['v']['_id']): FindCursor<ILivechatInquiryRecord> {
        /* Implementation Hidden */
    }

	getDistinctQueuedDepartments(options: AggregateOptions): Promise<{ _id: string | null }[]> {
        /* Implementation Hidden */
    }

	async setDepartmentByInquiryId(inquiryId: string, department: string): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	/**
	 * Updates the `lastMessage` of inquiries that are not taken yet, after they're taken we only need to update room's `lastMessage`
	 */
	async setLastMessageByRoomId(rid: ILivechatInquiryRecord['rid'], message: IMessage): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	async setLastMessageById(inquiryId: string, lastMessage: IMessage): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async findNextAndLock(
		queueSortBy: FindOptions<ILivechatInquiryRecord>['sort'],
		department: string | null,
	): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	async unlock(inquiryId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async unlockAll(): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async getCurrentSortedQueueAsync({
		inquiryId,
		department,
		queueSortBy,
	}: {
		inquiryId?: string;
		department?: string;
		queueSortBy: FindOptions<ILivechatInquiryRecord>['sort'];
	}): Promise<(Pick<ILivechatInquiryRecord, '_id' | 'rid' | 'name' | 'ts' | 'status' | 'department'> & { position: number })[]> {
        /* Implementation Hidden */
    }

	setSlaForRoom(_rid: string, _data: { estimatedWaitingTimeQueue: number; slaId: string }): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	unsetSlaForRoom(_roomId: string): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	bulkUnsetSla(_roomIds: string[]): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	setPriorityForRoom(_rid: string, _priority: Pick<ILivechatPriority, '_id' | 'sortItem'>): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	unsetPriorityForRoom(_rid: string): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	async removeByRoomId(rid: string, options?: DeleteOptions): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	getQueuedInquiries(options?: FindOptions<ILivechatInquiryRecord>): FindCursor<ILivechatInquiryRecord> {
        /* Implementation Hidden */
    }

	takeInquiry(inquiryId: string, lockedAt?: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	openInquiry(inquiryId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async queueInquiry(
		inquiryId: string,
		lastMessage?: IMessage,
		defaultAgent?: SelectedAgent | null,
	): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	queueInquiryAndRemoveDefaultAgent(inquiryId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	readyInquiry(inquiryId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async changeDepartmentIdByRoomId(rid: string, department: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async getStatus(inquiryId: string): Promise<ILivechatInquiryRecord['status'] | undefined> {
        /* Implementation Hidden */
    }

	updateVisitorStatus(token: string, status: ILivechatInquiryRecord['v']['status']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setDefaultAgentById(inquiryId: string, defaultAgent: ILivechatInquiryRecord['defaultAgent']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async setStatusById(inquiryId: string, status: LivechatInquiryStatus): Promise<ILivechatInquiryRecord> {
        /* Implementation Hidden */
    }

	setNameByRoomId(rid: string, name: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findOneByToken(token: string): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	removeDefaultAgentById(inquiryId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async removeByVisitorToken(token: string): Promise<void> {
        /* Implementation Hidden */
    }

	async markInquiryActiveForPeriod(rid: ILivechatInquiryRecord['rid'], period: string): Promise<ILivechatInquiryRecord | null> {
        /* Implementation Hidden */
    }

	updateNameByVisitorIds(visitorIds: string[], name: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findByVisitorIds(visitorIds: string[], options?: FindOptions<ILivechatInquiryRecord>): FindCursor<ILivechatInquiryRecord> {
        /* Implementation Hidden */
    }
}

```