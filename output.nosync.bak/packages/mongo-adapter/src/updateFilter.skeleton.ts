## File: packages/mongo-adapter/src/updateFilter.ts

```typescript
import type { Document, Filter, FilterOperators, Sort, UpdateFilter } from 'mongodb';

import { getBSONType } from './bson';
import { assertHasValidFieldNames, assertIsValidFieldName, clone, isIndexable, isNumericKey, isPlainObject, equals } from './common';
import { createPredicateFromFilter } from './filter';
import { createComparatorFromSort } from './sort';
import { BSONType, type ArrayIndices } from './types';

const isUpdateModifiers = <T>(mod: UpdateFilter<T>): boolean => {
    /* Implementation Hidden */
};

const $currentDate = <TField extends string>(target: Record<TField, Date>, field: TField, arg: { $type: 'date' } | true) => {
    /* Implementation Hidden */
};

const $inc = <TField extends string>(target: Record<TField, number>, field: TField, arg: number) => {
    /* Implementation Hidden */
};

const $min = <TField extends string>(target: Record<TField, number>, field: TField, arg: number) => {
    /* Implementation Hidden */
};

const $max = <TField extends string>(target: Record<TField, number>, field: TField, arg: number) => {
    /* Implementation Hidden */
};

const $mul = <TField extends string>(target: Record<TField, number>, field: TField, arg: number) => {
    /* Implementation Hidden */
};

const $rename = <TField extends string>(
	target: Record<TField, object>,
	field: TField,
	arg: string,
	keypath: string,
	doc: Record<string, any>,
) => {
    /* Implementation Hidden */
};

const $set = <TField extends string>(target: Record<TField, object>, field: TField, arg: object) => {
    /* Implementation Hidden */
};

const $unset = <TField extends number | string>(target: Record<TField, object> | (object | null)[], field: TField) => {
    /* Implementation Hidden */
};

const $push = <TField extends string, TItem>(
	target: Record<TField, TItem[]>,
	field: TField,
	arg: TItem | { $each?: TItem; $position?: number; $slice?: number; $sort?: Sort },
) => {
    /* Implementation Hidden */
};

const $addToSet = <TField extends string, TItem>(target: Record<TField, TItem[]>, field: TField, arg: TItem | { $each: TItem[] }) => {
    /* Implementation Hidden */
};

const $pop = <TField extends string>(target: Record<TField, unknown[]>, field: TField, arg: number | undefined) => {
    /* Implementation Hidden */
};

const $pull = <TField extends string, TDocument extends object>(
	target: Record<TField, TDocument[]>,
	field: TField,
	arg: Filter<TDocument> | undefined,
) => {
    /* Implementation Hidden */
};

const $pullAll = <TField extends string, TDocument extends object>(
	target: Record<TField, TDocument[]>,
	field: TField,
	arg: TDocument[],
) => {
    /* Implementation Hidden */
};

const $bit = () => {
    /* Implementation Hidden */
};

const modifiers = {
	$currentDate,
	$inc,
	$min,
	$max,
	$mul,
	$rename,
	$set,
	$unset,
	$push,
	$addToSet,
	$pop,
	$pull,
	$pullAll,
	$bit,
} as const;

const findModTarget = (
	doc: Record<string, any> | unknown[],
	keyparts: (number | string)[],
	options: {
		noCreate?: boolean;
		forbidArray?: boolean;
		arrayIndices?: ArrayIndices;
	} = {},
) => {
    /* Implementation Hidden */
};

export const createTransformFromUpdateFilter = <T extends { _id: string }>(modifier: UpdateFilter<T>) => {
    /* Implementation Hidden */
};

export const createUpsertDocument = <T extends { _id: string }>(selector: Filter<T>, modifier: UpdateFilter<T>): T => {
    /* Implementation Hidden */
};

const insertIntoDocument = (document: Document, key: any, value: any) => {
    /* Implementation Hidden */
};

const populateDocumentWithKeyValue = <T extends { _id: string }>(document: Partial<T>, key: string, value: unknown) => {
    /* Implementation Hidden */
};

const populateDocumentWithObject = <T extends { _id: string }>(document: Partial<T>, key: string, value: FilterOperators<T>) => {
    /* Implementation Hidden */
};

const populateDocumentWithQueryFields = <T extends { _id: string }>(query: T['_id'] | Filter<T>, document: Partial<T> = {}) => {
    /* Implementation Hidden */
};

const validateKeyInPath = (key: string, path: string) => {
    /* Implementation Hidden */
};

const validateObject = (object: Record<string, unknown>, path: string) => {
    /* Implementation Hidden */
};

```