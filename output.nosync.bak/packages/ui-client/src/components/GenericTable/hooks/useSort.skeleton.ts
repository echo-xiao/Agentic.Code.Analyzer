## File: packages/ui-client/src/components/GenericTable/hooks/useSort.ts

```typescript
import { useCallback, useState } from 'react';

type Direction = 'asc' | 'desc';

export const useSort = <T extends string>(
	by: T,
	initialDirection: Direction = 'asc',
): {
	sortBy: T;
	sortDirection: Direction;
	setSort: (sortBy: T, direction?: Direction | undefined) => void;
} => {
    /* Implementation Hidden */
};

```