## File: apps/meteor/client/meteor/minimongo/DiffSequence.ts

```typescript
import { Meteor } from 'meteor/meteor';

import type { IdMap } from './IdMap';
import { clone, hasOwn, equals } from './common';
import type { Observer, OrderedObserver, UnorderedObserver } from './observers';
import { entriesOf } from '../../lib/objectUtils';

function isObjEmpty(obj: Record<string, unknown>): boolean {
    /* Implementation Hidden */
}

export class DiffSequence {
	static diffQueryChanges<T extends { _id: string }>(
		ordered: true,
		oldResults: T[],
		newResults: T[],
		observer: OrderedObserver<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void;

	static diffQueryChanges<T extends { _id: string }>(
		ordered: false,
		oldResults: IdMap<T['_id'], T>,
		newResults: IdMap<T['_id'], T>,
		observer: UnorderedObserver<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void;

	static diffQueryChanges<T extends { _id: string }>(
		ordered: boolean,
		oldResults: T[] | IdMap<T['_id'], T>,
		newResults: T[] | IdMap<T['_id'], T>,
		observer: Observer<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void;

	static diffQueryChanges<T extends { _id: string }>(
		ordered: boolean,
		oldResults: T[] | IdMap<T['_id'], T>,
		newResults: T[] | IdMap<T['_id'], T>,
		observer: Observer<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void {
        /* Implementation Hidden */
    }

	private static diffQueryUnorderedChanges<T extends { _id: string }>(
		oldResults: IdMap<T['_id'], T>,
		newResults: IdMap<T['_id'], T>,
		observer: UnorderedObserver<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void {
        /* Implementation Hidden */
    }

	private static diffQueryOrderedChanges<T extends { _id: string }>(
		oldResults: T[],
		newResults: T[],
		observer: OrderedObserver<T>,
		options?: { projectionFn?: (doc: T | Omit<T, '_id'>) => Partial<T> },
	): void {
        /* Implementation Hidden */
    }

	private static diffObjects<T extends object>(
		left: T,
		right: T,
		callbacks: {
			leftOnly?: (key: keyof T, leftValue: T[keyof T]) => void;
			rightOnly?: (key: keyof T, rightValue: T[keyof T]) => void;
			both?: (key: keyof T, leftValue: T[keyof T], rightValue: T[keyof T]) => void;
		},
	): void {
        /* Implementation Hidden */
    }

	static makeChangedFields<T extends object>(newDoc: T, oldDoc: T): Partial<T> {
        /* Implementation Hidden */
    }

	static applyChanges<T extends object>(doc: T, changeFields: T): void {
        /* Implementation Hidden */
    }
}

```