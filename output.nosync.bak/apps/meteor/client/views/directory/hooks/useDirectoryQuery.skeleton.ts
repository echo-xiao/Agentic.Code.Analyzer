## File: apps/meteor/client/views/directory/hooks/useDirectoryQuery.ts

```typescript
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useMemo } from 'react';

export function useDirectoryQuery(
	{ text, itemsPerPage, current }: { text: string; current: number; itemsPerPage: number },
	[column, direction]: [string, 'asc' | 'desc'],
	type: string,
	workspace = 'local',
): { sort: string; offset?: number | undefined; count?: number; query?: string; text?: string; type?: string; workspace?: string } {
    /* Implementation Hidden */
}

```