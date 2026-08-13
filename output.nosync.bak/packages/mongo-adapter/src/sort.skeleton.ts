## File: packages/mongo-adapter/src/sort.ts

```typescript
import type { Sort } from 'mongodb';

import { compareBSONValues } from './bson';
import { isEmptyArray } from './common';
import { createLookupFunction } from './lookups';
import type { LookupBranch } from './types';

const createSortSpecParts = <T>(
	spec: Sort,
): {
	lookup: (doc: T) => LookupBranch[];
	ascending: boolean;
}[] => {
    /* Implementation Hidden */
};

const reduceValue = (branchValues: LookupBranch[], ascending: boolean): unknown =>
	branchValues
		.flatMap(({ value }) => {
			if (!Array.isArray(value)) {
				return [value];
			}

			if (isEmptyArray(value)) {
				return [undefined];
			}

			return value;
		})
		.reduce((reduced, value) => {
			const cmp = compareBSONValues(reduced, value);
			if ((ascending && cmp > 0) || (!ascending && cmp < 0)) {
				return value;
			}

			return reduced;
		});

export const createComparatorFromSort = (spec: Sort): ((a: unknown, b: unknown) => number) => {
    /* Implementation Hidden */
};

```