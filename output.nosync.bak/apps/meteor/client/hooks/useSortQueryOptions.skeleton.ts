## File: apps/meteor/client/hooks/useSortQueryOptions.ts

```typescript
import { useUserPreference, useSetting } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

export const useSortQueryOptions = (): {
	sort:
		| {
				lm?: -1 | 1 | undefined;
		  }
		| {
				lowerCaseFName: -1 | 1;
				lm?: -1 | 1 | undefined;
		  }
		| {
				lowerCaseName: -1 | 1;
				lm?: -1 | 1 | undefined;
		  };
} => {
    /* Implementation Hidden */
};

```