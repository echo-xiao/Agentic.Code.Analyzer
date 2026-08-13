## File: apps/meteor/client/meteor/minimongo/LocalCollection.ts

```typescript
import type { Optional } from '@rocket.chat/core-typings';
import {
	createDocumentMatcherFromFilter,
	createPredicateFromFilter,
	createTransformFromUpdateFilter,
	createUpsertDocument,
} from '@rocket.chat/mongo-adapter';
import type { ArrayIndices } from '@rocket.chat/mongo-adapter';
import { Meteor } from 'meteor/meteor';
import type { CountDocumentsOptions, FilterOperators, Filter, UpdateFilter } from 'mongodb';
import type { StoreApi, UseBoundStore } from 'zustand';

import { Cursor } from './Cursor';
import type { Options } from './Cursor';
import { DiffSequence } from './DiffSequence';
import type { IdMap } from './IdMap';
import { MinimongoError } from './MinimongoError';
import { SynchronousQueue } from './SynchronousQueue';
import { clone, assertHasValidFieldNames } from './common';
import type { Query } from './queries';

/**
 * Forked from Meteor's Mongo.Collection, this class implements a local collection over a Zustand store.
 *
 * Do not use this class directly.
 */
export class LocalCollection<T extends { _id: string }> {
	readonly observeQueue = new SynchronousQueue();

	readonly queries = new Set<Query<T>>();

	private savedOriginals: Map<T['_id'], T | undefined> | null = null;

	paused = false;

	constructor(public store: UseBoundStore<StoreApi<{ readonly records: ReadonlyMap<T['_id'], T> }>>) {
        /* Implementation Hidden */
    }

	find(selector: Filter<T> | T['_id'] = {}, options?: Options<T>) {
        /* Implementation Hidden */
    }

	countDocuments(selector: Filter<T> = {}, options?: CountDocumentsOptions) {
        /* Implementation Hidden */
    }

	estimatedDocumentCount(options?: CountDocumentsOptions) {
        /* Implementation Hidden */
    }

	findOne(selector?: Filter<T> | T['_id'], options?: Options<T>) {
        /* Implementation Hidden */
    }

	async findOneAsync(selector: Filter<T> | T['_id'] = {}, options: Options<T> = {}) {
        /* Implementation Hidden */
    }

	private prepareInsert(doc: T) {
        /* Implementation Hidden */
    }

	insert(doc: T, callback?: (error: Error | null, id: T['_id']) => void) {
        /* Implementation Hidden */
    }

	async insertAsync(doc: T, callback?: (error: Error | null, id: T['_id']) => void) {
        /* Implementation Hidden */
    }

	private deferCallback<TFunction extends (...args: any) => void>(callback: TFunction | undefined | null, ...args: Parameters<TFunction>) {
        /* Implementation Hidden */
    }

	private _insertInResults(query: Query<T>, doc: T) {
        /* Implementation Hidden */
    }

	private async _insertInResultsAsync(query: Query<T>, doc: T) {
        /* Implementation Hidden */
    }

	pauseObservers() {
        /* Implementation Hidden */
    }

	private clearResultQueries(callback?: (error: Error | null, result: number) => void) {
        /* Implementation Hidden */
    }

	private prepareRemove(selector: Filter<T>) {
        /* Implementation Hidden */
    }

	remove(selector: Filter<T>, callback?: (error: Error | null, result: number) => void) {
        /* Implementation Hidden */
    }

	async removeAsync(selector: Filter<T>, callback?: (error: Error | null, result: number) => void) {
        /* Implementation Hidden */
    }

	private _resumeObservers() {
        /* Implementation Hidden */
    }

	async resumeObserversServer() {
        /* Implementation Hidden */
    }

	resumeObserversClient() {
        /* Implementation Hidden */
    }

	retrieveOriginals() {
        /* Implementation Hidden */
    }

	saveOriginals() {
        /* Implementation Hidden */
    }

	private prepareUpdate(selector: Filter<T>) {
        /* Implementation Hidden */
    }

	private finishUpdate({
		options,
		updateCount,
		callback,
		insertedId,
	}: {
		options: { _returnObject?: boolean };
		updateCount: number;
		callback?: (error: Error | null, result: number | { numberAffected: number; insertedId?: T['_id'] }) => void;
		insertedId?: T['_id'];
		selector?: unknown;
		mod?: unknown;
	}) {
        /* Implementation Hidden */
    }

	async updateAsync(
		selector: Filter<T>,
		mod: UpdateFilter<T>,
		_options?:
			| { multi?: boolean; upsert?: boolean; insertedId?: T['_id']; _returnObject?: boolean }
			| null
			| ((
					error: Error | null,
					result:
						| number
						| {
								numberAffected: number;
								insertedId?: T['_id'];
						  },
			  ) => void),
		_callback?: (
			error: Error | null,
			result:
				| number
				| {
						numberAffected: number;
						insertedId?: T['_id'];
				  },
		) => void,
	) {
        /* Implementation Hidden */
    }

	update(
		selector: Filter<T>,
		mod: UpdateFilter<T>,
		_options?:
			| { multi?: boolean; upsert?: boolean; insertedId?: T['_id']; _returnObject?: boolean }
			| null
			| ((
					error: Error | null,
					result:
						| number
						| {
								numberAffected: number;
								insertedId?: T['_id'];
						  },
			  ) => void),
		_callback?: (
			error: Error | null,
			result:
				| number
				| {
						numberAffected: number;
						insertedId?: T['_id'];
				  },
		) => void,
	) {
        /* Implementation Hidden */
    }

	upsert(
		selector: Filter<T>,
		mod: UpdateFilter<T>,
		_options?:
			| { multi?: boolean; upsert?: boolean; insertedId?: T['_id']; _returnObject?: boolean }
			| null
			| ((
					error: Error | null,
					result:
						| number
						| {
								numberAffected: number;
								insertedId?: T['_id'];
						  },
			  ) => void),
		_callback?: (
			error: Error | null,
			result:
				| number
				| {
						numberAffected: number;
						insertedId?: T['_id'];
				  },
		) => void,
	) {
        /* Implementation Hidden */
    }

	upsertAsync(
		selector: Filter<T>,
		mod: UpdateFilter<T>,
		_options?:
			| { multi?: boolean; upsert?: boolean; insertedId?: T['_id']; _returnObject?: boolean }
			| null
			| ((
					error: Error | null,
					result:
						| number
						| {
								numberAffected: number;
								insertedId?: T['_id'];
						  },
			  ) => void),
		_callback?: (
			error: Error | null,
			result:
				| number
				| {
						numberAffected: number;
						insertedId?: T['_id'];
				  },
		) => void,
	) {
        /* Implementation Hidden */
    }

	private async _eachPossiblyMatchingDocAsync(selector: Filter<T>, fn: (doc: T, id: T['_id']) => Promise<boolean>) {
        /* Implementation Hidden */
    }

	private _eachPossiblyMatchingDoc(selector: Filter<T>, fn: (doc: T, id: T['_id']) => void | boolean) {
        /* Implementation Hidden */
    }

	private _getMatchedDocAndModify(doc: T) {
        /* Implementation Hidden */
    }

	private _modifyAndNotify(doc: T, mod: UpdateFilter<T>, arrayIndices: ArrayIndices | undefined) {
        /* Implementation Hidden */
    }

	private async _modifyAndNotifyAsync(doc: T, mod: UpdateFilter<T>, arrayIndices: ArrayIndices | undefined) {
        /* Implementation Hidden */
    }

	recomputeQuery(query: Query<T>) {
        /* Implementation Hidden */
    }

	private _recomputeResults(query: Query<T>, oldResults?: IdMap<T['_id'], T> | T[] | null) {
        /* Implementation Hidden */
    }

	private _saveOriginal(id: T['_id'], doc: T | undefined) {
        /* Implementation Hidden */
    }

	private _binarySearch(cmp: (a: T, b: T) => number, array: T[], value: T) {
        /* Implementation Hidden */
    }

	private _createUpsertDocument(selector: Filter<T>, modifier: UpdateFilter<T>): T {
        /* Implementation Hidden */
    }

	private _findInOrderedResults(query: Query<T>, doc: T): number {
        /* Implementation Hidden */
    }

	private _idsMatchedBySelector(selector: Filter<T> | T['_id']): readonly T['_id'][] | null {
        /* Implementation Hidden */
    }

	private _insertInSortedList(cmp: (a: T, b: T) => number, array: T[], value: T) {
        /* Implementation Hidden */
    }

	private _removeFromResults(query: Query<T>, doc: T) {
        /* Implementation Hidden */
    }

	private async _removeFromResultsAsync(query: Query<T>, doc: T) {
        /* Implementation Hidden */
    }

	private _updateInResults(query: Query<T>, doc: T, oldDoc: T) {
        /* Implementation Hidden */
    }

	private async _updateInResultsAsync(query: Query<T>, doc: T, oldDoc: T) {
        /* Implementation Hidden */
    }
}

```