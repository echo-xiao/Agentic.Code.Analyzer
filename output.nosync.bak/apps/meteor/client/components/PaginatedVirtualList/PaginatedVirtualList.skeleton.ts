## File: apps/meteor/client/components/PaginatedVirtualList/PaginatedVirtualList.tsx

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { CustomVirtuaScrollbars } from '@rocket.chat/ui-client';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import type { VirtualizerHandle } from 'virtua';
import { Virtualizer } from 'virtua';

import { VirtuaListContainer } from './VirtuaListContainer';

const NEAR_BOTTOM_THRESHOLD = -20;

const scrollViewportStyle = {
	height: '100%',
	width: '100%',
	overflow: 'auto',
} as const;

type PaginatedVirtualListProps<T extends { _id: string }> = {
	items: T[];
	totalCount: number;
	renderItem: (item: T, index: number) => ReactNode;
	overscan?: number;
	onEndReached?: UseInfiniteQueryResult['fetchNextPage'];
};

function PaginatedVirtualList<T extends { _id: string }>({
	items,
	totalCount,
	renderItem,
	overscan,
	onEndReached,
}: PaginatedVirtualListProps<T>) {
    /* Implementation Hidden */
}

export default PaginatedVirtualList;

```