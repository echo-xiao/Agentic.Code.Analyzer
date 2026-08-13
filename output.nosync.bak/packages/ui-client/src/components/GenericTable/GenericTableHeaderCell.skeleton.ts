## File: packages/ui-client/src/components/GenericTable/GenericTableHeaderCell.tsx

```typescript
import { Box, TableCell } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';

import SortIcon from './SortIcon';

type GenericTableHeaderCellProps<T extends string> = Omit<ComponentProps<typeof Box>, 'onClick'> & {
	active?: boolean;
	direction?: 'asc' | 'desc';
	sort?: T;
	onClick?: (sort: T) => void;
};

export const GenericTableHeaderCell = <T extends string = string>({
	children,
	active,
	direction,
	sort,
	onClick,
	...props
}: GenericTableHeaderCellProps<T>) => {
    /* Implementation Hidden */
};

```