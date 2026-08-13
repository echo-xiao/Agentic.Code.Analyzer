## File: packages/mongo-adapter/src/filter.ts

```typescript
import type { Filter, FilterOperators } from 'mongodb';

import { compareBSONValues, getBSONType } from './bson';
import { isBinary, isIndexable, isPlainObject, isTruthy, equals } from './common';
import { createLookupFunction } from './lookups';
import type { ArrayIndices, LookupBranch } from './types';

type Match = {
	readonly result: boolean;
	arrayIndices?: ArrayIndices;
};

const everyMatches = <T>(arr: T[], fn: (item: T) => Match): Match =>
	arr.reduce((acc: Match, item) => (acc.result ? fn(item) : acc), { result: true });

const someMatches = <T>(arr: T[], fn: (item: T) => Match): Match =>
	arr.reduce((acc: Match, item) => (acc.result ? acc : fn(item)), { result: false });

const regexpElementMatcher =
	(regexp: RegExp) =>
	(value: unknown): boolean => {
		if (value instanceof RegExp) {
			return value.toString() === regexp.toString();
		}

		if (typeof value !== 'string') {
			return false;
		}

		regexp.lastIndex = 0;

		return regexp.test(value);
	};

const equalityElementMatcher = (elementSelector: unknown) => {
    /* Implementation Hidden */
};

const invertBranchedMatcher =
	(branchedMatcher: (branches: LookupBranch[]) => Match) =>
	(branches: LookupBranch[]): Match => ({
		result: !branchedMatcher(branches).result,
	});

const getValueBitmask = (value: unknown, length: number): Uint8Array | false => {
    /* Implementation Hidden */
};

const getOperandBitmask = (operand: unknown, selector: string) => {
    /* Implementation Hidden */
};

const expandArraysInBranches = (branches: LookupBranch[], skipTheArrays?: boolean) => {
    /* Implementation Hidden */
};

const convertElementMatcherToBranchedMatcher = (
	elementMatcher: (value: unknown) => boolean | number,
	options: { dontExpandLeafArrays?: boolean; dontIncludeLeafArrays?: boolean } = {},
) => {
    /* Implementation Hidden */
};

const operatorBranchedMatcher = <T>(valueSelector: FilterOperators<T>) => {
    /* Implementation Hidden */
};

const $in = (operand: unknown): ((value: unknown) => boolean) => {
    /* Implementation Hidden */
};

const $eq = (operand: unknown) => convertElementMatcherToBranchedMatcher(equalityElementMatcher(operand));

const $not = (operand: unknown) => {
    /* Implementation Hidden */
};

const $ne = (operand: unknown) => invertBranchedMatcher(convertElementMatcherToBranchedMatcher(equalityElementMatcher(operand)));

const $nin = (operand: unknown) => invertBranchedMatcher(convertElementMatcherToBranchedMatcher($in(operand)));

const $exists = (operand: unknown) => {
    /* Implementation Hidden */
};

const $options = <T>(_operand: unknown, valueSelector: FilterOperators<T>) => {
    /* Implementation Hidden */
};

const $all = (operand: unknown) => {
    /* Implementation Hidden */
};

const valueOperators = {
	$eq,
	$not,
	$ne,
	$nin,
	$exists,
	$options,
	$all,
} as const;

const isValueOperator = (operator: string): operator is keyof typeof valueOperators => operator in valueOperators;

function createInequalityOperator(selector: (compValue: number) => boolean) {
    /* Implementation Hidden */
}

const $lt = createInequalityOperator((cmpValue: number) => cmpValue < 0);

const $gt = createInequalityOperator((cmpValue: number) => cmpValue > 0);

const $lte = createInequalityOperator((cmpValue: number) => cmpValue <= 0);

const $gte = createInequalityOperator((cmpValue: number) => cmpValue >= 0);

const $mod = (operand: unknown) => {
    /* Implementation Hidden */
};

const $size = (operand: unknown) => {
    /* Implementation Hidden */
};

const $type = (operand: unknown) => {
    /* Implementation Hidden */
};

const $bitsAllSet = (operand: unknown) => {
    /* Implementation Hidden */
};

const $bitsAnySet = (operand: unknown) => {
    /* Implementation Hidden */
};

const $bitsAllClear = (operand: unknown) => {
    /* Implementation Hidden */
};

const $bitsAnyClear = (operand: unknown) => {
    /* Implementation Hidden */
};

const $regex = <T>(operand: unknown, valueSelector: FilterOperators<T>) => {
    /* Implementation Hidden */
};

const $elemMatch = <T>(operand: unknown) => {
    /* Implementation Hidden */
};

const elementOperators = {
	$lt,
	$gt,
	$lte,
	$gte,
	$mod,
	$in,
	$size,
	$type,
	$bitsAllSet,
	$bitsAnySet,
	$bitsAllClear,
	$bitsAnyClear,
	$regex,
	$elemMatch,
} as const;

const isElementOperator = (operator: string): operator is keyof typeof elementOperators => operator in elementOperators;

const $and = <T>(subSelector: Filter<T>[]) => {
    /* Implementation Hidden */
};

const $or = <T>(subSelector: Filter<T>[]) => {
    /* Implementation Hidden */
};

const $nor = <T>(subSelector: Filter<T>[]) => {
    /* Implementation Hidden */
};

const $where = <T>(selectorValue: string | ((this: T, doc: T) => boolean)) => {
    /* Implementation Hidden */
};

const logicalOperators = {
	$and,
	$or,
	$nor,
	$where,
} as const;

const isLogicalOperator = (operator: string): operator is keyof typeof logicalOperators => operator in logicalOperators;

const isOperatorObject = <TOperator extends `$${string}`>(
	valueSelector: unknown,
	inconsistentOK = false,
): valueSelector is Record<TOperator, any> => {
    /* Implementation Hidden */
};

const compileValueSelector = (valueSelector: unknown) => {
    /* Implementation Hidden */
};

const compileArrayOfDocumentSelectors = <T>(selectors: Filter<T>[]) => {
    /* Implementation Hidden */
};

export const createDocumentMatcherFromFilter = <T>(filter: Filter<T>) => {
    /* Implementation Hidden */
};

export const createPredicateFromFilter = <T>(filter: Filter<T>): ((doc: T) => boolean) => {
    /* Implementation Hidden */
};

```