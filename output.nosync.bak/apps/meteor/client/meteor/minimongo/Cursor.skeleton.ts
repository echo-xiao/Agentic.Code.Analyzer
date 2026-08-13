## File: apps/meteor/client/meteor/minimongo/Cursor.ts

```typescript
import type { Optional } from '@rocket.chat/core-typings';
import { createComparatorFromSort, createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import { Tracker } from 'meteor/tracker';
import type { Filter, Sort } from 'mongodb';

import { DiffSequence } from './DiffSequence';
import { IdMap } from './IdMap';
import type { LocalCollection } from './LocalCollection';
import { MinimongoError } from './MinimongoError';
import { ObserveHandle, ReactiveObserveHandle } from './ObserveHandle';
import { OrderedDict } from './OrderedDict';
import { isPlainObject, clone, hasOwn } from './common';
import type { OrderedObserver, UnorderedObserver } from './observers';
import type { Query, OrderedQuery, UnorderedQuery } from './queries';

type Transform<T> = ((doc: T) => any) | null | undefined;

type FieldSpecifier = {
	[id: string]: number | boolean;
};

export type Options<T> = {
	/** Sort order (default: natural order) */
	sort?: Sort | undefined;
	/** Number of results to skip at the beginning */
	skip?: number | undefined;
	/** Maximum number of results to return */
	limit?: number | undefined;
	/**
	 * Dictionary of fields to return or exclude.
	 * @deprecated use projection instead
	 */
	fields?: FieldSpecifier | undefined;
	/** Dictionary of fields to return or exclude. */
	projection?: FieldSpecifier | undefined;
	/** Default `true`; pass `false` to disable reactivity */
	reactive?: boolean | undefined;
	/**  Overrides `transform` on the  [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation. */
	transform?: Transform<Partial<T>> | null | undefined;
};

type DispatchTransform<TTransform, T> = TTransform extends (...args: any) => any
	? ReturnType<TTransform>
	: TTransform extends null
		? T
		: Partial<T>;

type ObserveChangesOptions<T extends { _id: string }> = Partial<OrderedObserver<T, ICachingChangeObserver<T>>> & {
	_allow_unordered?: boolean;
	_suppress_initial?: boolean;
	_fromObserve?: boolean;
};

type ObserveOptions<T> = {
	addedAt?: (document: T, atIndex: number | null, before: unknown) => void;
	added?: (document: T) => void;
	changedAt?: (newDocument: T, oldDocument: T, atIndex: number) => void;
	changed?: (newDocument: T, oldDocument: T) => void;
	removedAt?: (document: T, atIndex: number) => void;
	removed?: (document: T) => void;
	movedTo?: (document: T, oldIndex: number, newIndex: number, before: unknown) => void;
	_suppress_initial?: boolean;
	_no_indices?: boolean;
};

export class Cursor<T extends { _id: string }, TOptions extends Options<T>> {
	private readonly predicate: (doc: T) => boolean;

	private readonly comparator: ((a: T, b: T) => number) | null;

	readonly skip: number;

	readonly limit: number | undefined;

	private readonly fields: FieldSpecifier | undefined;

	private readonly _projectionFn: (doc: T | Omit<T, '_id'>) => Partial<T>;

	private readonly _transform: Transform<Partial<T>> | null;

	private readonly reactive: boolean;

	constructor(
		protected collection: LocalCollection<T>,
		selector: Filter<T> | T['_id'],
		options?: TOptions,
	) {
        /* Implementation Hidden */
    }

	private _compileProjection(fields: FieldSpecifier) {
        /* Implementation Hidden */
    }

	private _checkSupportedProjection(fields: FieldSpecifier) {
        /* Implementation Hidden */
    }

	private projectionDetails(fields: FieldSpecifier) {
        /* Implementation Hidden */
    }

	private pathsToTree(
		paths: string[],
		newLeafFn: (path: string) => unknown,
		conflictFn: (node: unknown, path: string, fullPath: string) => unknown,
		root: Record<string, unknown> = {},
	) {
        /* Implementation Hidden */
    }

	private wrapTransform(transform: (Transform<Partial<T>> & { __wrappedTransform__?: boolean }) | null | undefined) {
        /* Implementation Hidden */
    }

	count(): number {
        /* Implementation Hidden */
    }

	fetch(): DispatchTransform<TOptions['transform'], T>[] {
        /* Implementation Hidden */
    }

	[Symbol.iterator](): Iterator<DispatchTransform<TOptions['transform'], T>> {
        /* Implementation Hidden */
    }

	[Symbol.asyncIterator](): AsyncIterator<DispatchTransform<TOptions['transform'], T>> {
        /* Implementation Hidden */
    }

	forEach<TIterationCallback extends (doc: DispatchTransform<TOptions['transform'], T>, index: number, cursor: this) => void>(
		callback: TIterationCallback,
		thisArg?: ThisParameterType<TIterationCallback>,
	): void {
        /* Implementation Hidden */
    }

	getTransform() {
        /* Implementation Hidden */
    }

	map<TIterationCallback extends (doc: DispatchTransform<TOptions['transform'], T>, index: number, cursor: this) => unknown>(
		callback: TIterationCallback,
		thisArg?: ThisParameterType<TIterationCallback>,
	): ReturnType<TIterationCallback>[] {
        /* Implementation Hidden */
    }

	observe(options: ObserveOptions<T>) {
        /* Implementation Hidden */
    }

	observeAsync(options: ObserveOptions<T>) {
        /* Implementation Hidden */
    }

	private _observeFromObserveChanges(observeCallbacks: ObserveOptions<T>) {
        /* Implementation Hidden */
    }

	observeChanges(options: ObserveChangesOptions<T>) {
        /* Implementation Hidden */
    }

	async observeChangesAsync(options: ObserveChangesOptions<T>) {
        /* Implementation Hidden */
    }

	private _depend(
		changers: Partial<Record<'added' | 'addedBefore' | 'changed' | 'movedBefore' | 'removed', boolean>>,
		_allowUnordered?: boolean,
	) {
        /* Implementation Hidden */
    }

	_getRawObjects(options: { ordered: true; applySkipLimit?: boolean }): T[];

	_getRawObjects(options: { ordered: false; applySkipLimit?: boolean }): IdMap<T['_id'], T>;

	_getRawObjects(options?: { ordered?: boolean; applySkipLimit?: boolean }): IdMap<T['_id'], T> | T[];

	_getRawObjects(options: { ordered?: boolean; applySkipLimit?: boolean } = {}): IdMap<T['_id'], T> | T[] {
        /* Implementation Hidden */
    }

	countAsync(): Promise<number> {
        /* Implementation Hidden */
    }

	fetchAsync(): Promise<DispatchTransform<TOptions['transform'], T>[]> {
        /* Implementation Hidden */
    }

	forEachAsync<TIterationCallback extends (doc: DispatchTransform<TOptions['transform'], T>, index: number, cursor: this) => void>(
		callback: TIterationCallback,
		thisArg: ThisParameterType<TIterationCallback>,
	): Promise<void> {
        /* Implementation Hidden */
    }

	mapAsync<TIterationCallback extends (doc: DispatchTransform<TOptions['transform'], T>, index: number, cursor: this) => any>(
		callback: TIterationCallback,
		thisArg: ThisParameterType<TIterationCallback>,
	): Promise<ReturnType<TIterationCallback>[]> {
        /* Implementation Hidden */
    }

	private _observeCallbacksAreOrdered(callbacks: ObserveOptions<T>) {
        /* Implementation Hidden */
    }

	static _observeChangesCallbacksAreOrdered<T extends { _id: string }>(callbacks: ObserveChangesOptions<T>) {
        /* Implementation Hidden */
    }
}

interface ICachingChangeObserver<T extends { _id: string }> {
	readonly applyChange: ObserveChangesOptions<T>;
}

class _CachingChangeOrderedObserver<T extends { _id: string }> implements ICachingChangeObserver<T> {
	readonly docs = new OrderedDict<T['_id'], Partial<T>>();

	readonly applyChange: ObserveChangesOptions<T>;

	constructor({ addedBefore, changed, movedBefore, removed }: Omit<OrderedObserver<T, _CachingChangeOrderedObserver<T>>, 'added'>) {
        /* Implementation Hidden */
    }
}

class _CachingChangeUnorderedObserver<T extends { _id: string }> implements ICachingChangeObserver<T> {
	readonly docs = new IdMap<T['_id'], Partial<T>>();

	readonly applyChange: ObserveChangesOptions<T>;

	constructor({ added, changed, removed }: UnorderedObserver<T, _CachingChangeUnorderedObserver<T>>) {
        /* Implementation Hidden */
    }
}

```