## File: packages/mongo-adapter/src/lookups.ts

```typescript
import { isIndexable, isNumericKey, isPlainObject } from './common';
import type { ArrayIndices, LookupBranch } from './types';

const buildResult = (arrayIndices: ArrayIndices | undefined, dontIterate: boolean, value: unknown): [LookupBranch] => {
    /* Implementation Hidden */
};

export const createLookupFunction = (
	key: string,
	options: { forSort?: boolean } = {},
): (<T>(doc: T, arrayIndices?: ArrayIndices) => LookupBranch[]) => {
    /* Implementation Hidden */
};

```