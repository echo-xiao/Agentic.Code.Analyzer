## File: apps/meteor/client/lib/cachedStores/applyQueryOptions.ts

```typescript
import type { FindOptions } from '@rocket.chat/ui-contexts';

import { pipe } from './pipe';

type OriginalStructure = FindOptions['sort'];

type SortField = 'lm' | 'lowerCaseFName' | 'lowerCaseName';
type SortDirection = -1 | 1;

type SortObject = {
	field: SortField;
	direction: SortDirection;
}[];

/**
 * Converts a MongoDB-style sort structure to a sort object.
 */
const convertSort = (original: OriginalStructure): SortObject => {
    /* Implementation Hidden */
};

export const applyQueryOptions = <T extends Record<string, any>>(records: T[], options: FindOptions): T[] => {
    /* Implementation Hidden */
};

```