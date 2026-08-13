## File: packages/ui-client/src/components/GenericTable/hooks/useItemsPerPage.ts

```typescript
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

type UseItemsPerPageValue = 25 | 50 | 100;

export const useItemsPerPage = (
	itemsPerPageInitialValue: UseItemsPerPageValue = 25,
): [UseItemsPerPageValue, Dispatch<SetStateAction<UseItemsPerPageValue>>] => {
    /* Implementation Hidden */
};

```