## File: packages/models/src/dummy/BaseDummy.ts

```typescript
import type { RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { DefaultFields, FindPaginated, IBaseModel, InsertionModel, ResultFields } from '@rocket.chat/model-typings';
import type {
	BulkWriteOptions,
	ChangeStream,
	Collection,
	DeleteOptions,
	DeleteResult,
	Document,
	Filter,
	FindCursor,
	FindOptions,
	InsertManyResult,
	InsertOneOptions,
	InsertOneResult,
	UpdateFilter,
	UpdateOptions,
	UpdateResult,
	WithId,
} from 'mongodb';

import { getCollectionName, UpdaterImpl } from '../index';
import type { Updater } from '../updater';

export class BaseDummy<
	T extends { _id: string },
	C extends DefaultFields<T> = undefined,
	TDeleted extends RocketChatRecordDeleted<T> = RocketChatRecordDeleted<T>,
> implements IBaseModel<T, C, TDeleted>
{
	public readonly col: Collection<T>;

	private collectionName: string;

	constructor(protected name: string) {
        /* Implementation Hidden */
    }

	public async createIndexes(): Promise<string[] | void> {
        /* Implementation Hidden */
    }

	public getUpdater(): Updater<T> {
        /* Implementation Hidden */
    }

	public updateFromUpdater(query: Filter<T>, updater: Updater<T>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	getCollectionName(): string {
        /* Implementation Hidden */
    }

	async findOneAndDelete(): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	async findOneAndDeleteById(_id: T['_id']): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	async findOneAndUpdate(): Promise<WithId<T> | null> {
        /* Implementation Hidden */
    }

	findOneById(_id: T['_id'], options?: FindOptions<T> | undefined): Promise<T | null>;

	findOneById<P extends Document = T>(_id: T['_id'], options?: FindOptions<P>): Promise<P | null>;

	async findOneById(_id: T['_id'], _options?: any): Promise<T | null> {
        /* Implementation Hidden */
    }

	findOne(query?: Filter<T> | T['_id'], options?: undefined): Promise<T | null>;

	findOne<P extends Document = T>(query: Filter<T> | T['_id'], options: FindOptions<P extends T ? T : P>): Promise<P | null>;

	async findOne<P>(_query: Filter<T> | T['_id'], _options?: any): Promise<WithId<T> | WithId<P> | null> {
        /* Implementation Hidden */
    }

	find(query?: Filter<T>): FindCursor<ResultFields<T, C>>;

	find<P extends Document = T>(query: Filter<T>, options: FindOptions<P extends T ? T : P>): FindCursor<P>;

	find<P extends Document>(
		_query: Filter<T> | undefined,
		_options?: FindOptions<P extends T ? T : P>,
	): FindCursor<WithId<P>> | FindCursor<WithId<T>> {
        /* Implementation Hidden */
    }

	findPaginated<P extends Document = T>(query: Filter<T>, options?: FindOptions<P extends T ? T : P>): FindPaginated<FindCursor<WithId<P>>>;

	findPaginated(_query: Filter<T>, _options?: any): FindPaginated<FindCursor<WithId<T>>> {
        /* Implementation Hidden */
    }

	async update(
		filter: Filter<T>,
		update: UpdateFilter<T> | Partial<T>,
		options?: UpdateOptions & { multi?: true },
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async updateOne(_filter: Filter<T>, _update: UpdateFilter<T> | Partial<T>, _options?: UpdateOptions): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async updateMany(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async insertMany(_docs: InsertionModel<T>[], _options?: BulkWriteOptions): Promise<InsertManyResult<T>> {
        /* Implementation Hidden */
    }

	async insertOne(_doc: InsertionModel<T>, _options?: InsertOneOptions): Promise<InsertOneResult<T>> {
        /* Implementation Hidden */
    }

	async removeById(_id: T['_id']): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async removeByIds(_ids: T['_id'][]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async deleteOne(filter: Filter<T>, options?: DeleteOptions & { bypassDocumentValidation?: boolean }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async deleteMany(_filter: Filter<T>, _options?: DeleteOptions): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	// Trash
	trashFind<P extends TDeleted>(
		_query: Filter<TDeleted>,
		_options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindCursor<WithId<TDeleted>> | undefined {
        /* Implementation Hidden */
    }

	trashFindOneById(_id: TDeleted['_id']): Promise<TDeleted | null>;

	trashFindOneById<P extends Document>(_id: TDeleted['_id'], options: FindOptions<P extends TDeleted ? TDeleted : P>): Promise<P | null>;

	async trashFindOneById<P extends TDeleted>(
		_id: TDeleted['_id'],
		_options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): Promise<WithId<RocketChatRecordDeleted<P> | TDeleted> | null> {
        /* Implementation Hidden */
    }

	trashFindDeletedAfter(deletedAt: Date): FindCursor<WithId<TDeleted>>;

	trashFindDeletedAfter<P extends Document = TDeleted>(
		_deletedAt: Date,
		_query?: Filter<TDeleted>,
		_options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindCursor<WithId<TDeleted>> {
        /* Implementation Hidden */
    }

	trashFindPaginatedDeletedAfter<P extends Document = TDeleted>(
		_deletedAt: Date,
		_query?: Filter<TDeleted>,
		_options?: FindOptions<P extends TDeleted ? TDeleted : P>,
	): FindPaginated<FindCursor<WithId<TDeleted>>> {
        /* Implementation Hidden */
    }

	watch(_pipeline?: object[]): ChangeStream<T> {
        /* Implementation Hidden */
    }

	async countDocuments(): Promise<number> {
        /* Implementation Hidden */
    }

	async estimatedDocumentCount(): Promise<number> {
        /* Implementation Hidden */
    }
}

```