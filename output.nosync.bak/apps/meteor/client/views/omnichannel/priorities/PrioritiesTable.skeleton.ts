## File: apps/meteor/client/views/omnichannel/priorities/PrioritiesTable.tsx

```typescript
import type { ILivechatPriority, Serialized } from '@rocket.chat/core-typings';
import {
	GenericTable,
	GenericTableHeaderCell,
	GenericTableHeader,
	GenericTableBody,
	GenericTableLoadingTable,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import PrioritiesTableRow from './PrioritiesTableRow';
import GenericNoResults from '../../../components/GenericNoResults';

type PrioritiesTableProps = {
	priorities?: Serialized<ILivechatPriority>[];
	onRowClick: (id: string) => void;
	isLoading: boolean;
};

export const PrioritiesTable = ({ priorities, onRowClick, isLoading }: PrioritiesTableProps) => {
    /* Implementation Hidden */
};

```