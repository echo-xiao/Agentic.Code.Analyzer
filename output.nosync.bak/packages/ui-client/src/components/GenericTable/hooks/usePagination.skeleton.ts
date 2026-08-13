## File: packages/ui-client/src/components/GenericTable/hooks/usePagination.ts

```typescript
import { useEffect, useMemo } from 'react';

import { useCurrent } from './useCurrent';
import { useItemsPerPage } from './useItemsPerPage';
import { useItemsPerPageLabel } from './useItemsPerPageLabel';
import { useShowingResultsLabel } from './useShowingResultsLabel';

/**
 * TODO: Move `usePagination` outside from `GenericTable` folder
 */
export const usePagination = (): {
	current: ReturnType<typeof useCurrent>[0];
	setCurrent: ReturnType<typeof useCurrent>[1];
	itemsPerPage: ReturnType<typeof useItemsPerPage>[0];
	setItemsPerPage: ReturnType<typeof useItemsPerPage>[1];
	itemsPerPageLabel: ReturnType<typeof useItemsPerPageLabel>;
	showingResultsLabel: ReturnType<typeof useShowingResultsLabel>;
} => {
    /* Implementation Hidden */
};

```