## File: apps/meteor/server/api/lib/isValidQuery.ts

```typescript
import { isRecord } from '@rocket.chat/tools';

import { removeDangerousProps } from './cleanQuery';

type Query = { [k: string]: any };

export const isValidQuery: {
	(query: Query, allowedAttributes: string[], allowedOperations: string[]): boolean;
	errors: string[];
} = Object.assign(
	(query: Query, allowedAttributes: string[], allowedOperations: string[]): boolean => {
		isValidQuery.errors = [];
		// query is an object with null prototype, so it wont be instance of Object
		if (!isRecord(query)) {
			throw new Error('query must be an object');
		}

		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		return verifyQuery(query, allowedAttributes, allowedOperations);
	},
	{
		errors: [],
	},
);

const verifyQuery = (query: Query, allowedAttributes: string[], allowedOperations: string[], parent = ''): boolean => {
    /* Implementation Hidden */
};

```