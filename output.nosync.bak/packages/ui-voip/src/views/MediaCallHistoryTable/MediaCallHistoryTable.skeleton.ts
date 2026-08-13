## File: packages/ui-voip/src/views/MediaCallHistoryTable/MediaCallHistoryTable.tsx

```typescript
import { GenericTable, GenericTableHeaderCell, GenericTableHeader, GenericTableBody, GenericTableCell } from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type SortBy = 'contact' | 'type' | 'status' | 'timestamp';

type SortProps = {
	sortBy: SortBy;
	sortDirection: 'asc' | 'desc';
	setSort: (sortBy: SortBy, direction?: 'asc' | 'desc') => void;
};

type MediaCallHistoryTableProps = {
	sort: SortProps;
	children: ReactNode;
};

const MediaCallHistoryTable = ({ sort, children }: MediaCallHistoryTableProps) => {
    /* Implementation Hidden */
};

export default MediaCallHistoryTable;

```