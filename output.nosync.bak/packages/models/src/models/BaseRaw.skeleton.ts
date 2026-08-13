## File: packages/models/src/models/BaseRaw.ts

```typescript
import type { RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IBaseModel, DefaultFields, ResultFields, FindPaginated, InsertionModel } from '@rocket.chat/model-typings';
import { traceInstanceMethods } from '@rocket.chat/tracing';
import { ObjectId } from 'mongodb';
import type {
	BulkWriteOptions,
	ChangeStream,
	Collection,
	CollectionOptions,
	Db,
	Filter,
	FindOneAndUpdateOptions,
	IndexDescription,
	InsertOneOptions,
	OptionalUnlessRequiredId,
	UpdateFilter,
	WithId,
	UpdateOptions,
	Document,
	FindOptions,
	FindCursor,
	UpdateResult,
	InsertManyResult,
	InsertOneResult,
	DeleteResult,
	DeleteOptions,
	FindOneAndDeleteOptions,
	CountDocumentsOptions,
	ClientSession,
} from 'mongodb';

import { getCollectionName, UpdaterImpl } from '..';
import type { Updater } from '../updater';
import { setUpdatedAt } from './setUpdatedAt';

const warnFields =
	process.env.NODE_ENV !== 'production' || process.env.SHOW_WARNINGS === 'true'
		? (...rest: any): void => {
				console.warn(...rest, new Error().stack);
			}
		: new Function();

type ModelOptions = {
	preventSetUpdatedAt?: boolean;
	collectionNameResolver?: (name: string) => string;
	collection?: CollectionOptions;
};

export abstract class BaseRaw<
	T extends { _id: string },
	C extends DefaultFields<T> = undefined,
	TDeleted extends RocketChatRecordDeleted<T> = RocketChatRecordDeleted<T>,
> implements IBaseModel<T, C, TDeleted>
{
	protected defaultFields: C | undefined;

	public readonly col: Collection<T>;

	private preventSetUpdatedAt: boolean;

	/**
	 * Collection name to store data.
	 */
	private collectionName: string;

	/**
	 * @param db MongoDB instance
	 * @param name Name of the model without any prefix. Used by trash records to set the `__collection__` field.
	 * @param trash Trash collection instance
	 * @param options Model options
	 */
	constructor(
		private db: Db,
		protected name: string,
		protected trash?: Collection<TDeleted>,
		options?: ModelOptions,
	) {
        /* Implementation Hidden */
    }

	private pendingIndexes: Promise<void> | undefined;

	public async createIndexes() {
        /* Implementation Hidden */
    }

	protected modelIndexes(): IndexDescription[] | undefined {
        /* Implementation Hidden */
    }

	getCollectionName(): string {
        /* Implementation Hidden */
    }

	public getUpdater(): Updater<T> {
        /* Implementation Hidden */
    }

	public updateFromUpdater(query: Filter<T>, updater: Updater<T>, options: UpdateOptions = {}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	private doNotMixInclusionAndExclusionFields(options: FindOptions<T> = {}): FindOptions<T> {
        /* Implementation Hidden */
    }

	private ensureDefaultFields<P extends Document>(options: FindOptions<P>): FindOptions<P>;

	private ensureDefaultFields<P extends Document>(
		options?: FindOptions<P> & { fields?: FindOptions<P>['projection'] },
	): FindOptions<P> | FindOptions<T> | undefined {
        /* Implementation Hidden */
    }

	public findOneAndUpdate(query: Filter<T>, update: UpdateFilter<T> | T, options?: FindOneAndUpdateOptions): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	async findOneById(_id: T['_id'], options?: FindOptions<T>): Promise<T | null>;

	async findOneById<P extends Document = T>(_id: T['_id'], options?: FindOptions<P>): Promise<P | null>;

	async findOneById(_id: T['_id'], options?: any): Promise<T | null> {
        /* Implementation Hidden */
    }

	async findOne(query?: Filter<T> | T['_id'], options?: undefined): Promise<T | null>;

	async findOne<P extends Document = T>(query: Filter<T> | T['_id'], options?: FindOptions<P extends T ? T : P>): Promise<P | null>;

	async findOne<P>(query: Filter<T> | T['_id'] = {}, options?: any): Promise<WithId<T> | WithId<P> | null> {
        /* Implementation Hidden */
    }

	find(query?: Filter<T>): FindCursor<ResultFields<T, C>>;

	find<P extends Document = T>(query: Filter<T>, options?: FindOptions<P extends T ? T : P>): FindCursor<P>;

	find<P extends Document>(
		query: Filter<T> = {},
		options?: FindOptions<P extends T ? T : P>,
	): FindCursor<WithId<P>> | FindCursor<WithId<T>> {
        /* Implementation Hidden */
    }

	findPaginated<P extends Document = T>(query: Filter<T>, options?: FindOptions<P extends T ? T : P>): FindPaginated<FindCursor<WithId<P>>>;

	findPaginated(query: Filter<T> = {}, options?: any): FindPaginated<FindCursor<WithId<T>>> {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated use {@link updateOne} or {@link updateAny} instead
	 */
	update(
		filter: Filter<T>,
		update: UpdateFilter<T> | Partial<T>,
		options?: UpdateOptions & { multi?: true },
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateOne(filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateMany(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	insertMany(docs: InsertionModel<T>[], options?: BulkWriteOptions): Promise<InsertManyResult<T>> {
        /* Implementation Hidden */
    }

	insertOne(doc: InsertionModel<T>, options?: InsertOneOptions): Promise<InsertOneResult<T>> {
        /* Implementation Hidden */
    }

	removeById(_id: T['_id'], options?: { session?: ClientSession }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByIds(ids: T['_id'][]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async deleteOne(filter: Filter<T>, options?: DeleteOptions & { bypassDocumentValidation?: boolean }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async findOneAndDelete(filter: Filter<T>, options?: FindOneAndDeleteOptions): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	findOneAndDeleteById(_id: T['_id'], options?: FindOneAndDeleteOptions): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	async deleteMany(filter: Filter<T>, options?: DeleteOptions & { onTrash?: (record: ResultFields<T, C>) => void }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	// Trash
	trashFind<P extends TDeleted>(
		query: Filter<TDeleted>,
		options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindCursor<WithId<TDeleted>> | undefined {
        /* Implementation Hidden */
    }

	trashFindOneById(_id: TDeleted['_id']): Promise<TDeleted | null>;

	trashFindOneById<P extends Document>(_id: TDeleted['_id'], options: FindOptions<P extends TDeleted ? TDeleted : P>): Promise<P | null>;

	async trashFindOneById<P extends TDeleted>(
		_id: TDeleted['_id'],
		options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): Promise<WithId<P | TDeleted> | null> {
        /* Implementation Hidden */
    }

	private setUpdatedAt(record: UpdateFilter<T> | InsertionModel<T>): void {
        /* Implementation Hidden */
    }

	trashFindDeletedAfter(deletedAt: Date): FindCursor<WithId<TDeleted>>;

	trashFindDeletedAfter<P extends Document = TDeleted>(
		deletedAt: Date,
		query?: Filter<TDeleted>,
		options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindCursor<WithId<TDeleted>> {
        /* Implementation Hidden */
    }

	trashFindPaginatedDeletedAfter<P extends Document = TDeleted>(
		deletedAt: Date,
		query?: Filter<TDeleted>,
		options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindPaginated<FindCursor<WithId<TDeleted>>> {
        /* Implementation Hidden */
    }

	watch(pipeline?: object[]): ChangeStream<T> {
        /* Implementation Hidden */
    }

	countDocuments(query: Filter<T>, options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	estimatedDocumentCount(): Promise<number> {
        /* Implementation Hidden */
    }
}

```