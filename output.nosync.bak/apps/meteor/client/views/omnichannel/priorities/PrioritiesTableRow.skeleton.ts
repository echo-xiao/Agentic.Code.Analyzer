## File: apps/meteor/client/views/omnichannel/priorities/PrioritiesTableRow.tsx

```typescript
import type { LivechatPriorityWeight } from '@rocket.chat/core-typings';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { PriorityIcon } from './PriorityIcon';

type PrioritiesTableRowProps = {
	id: string;
	name?: string;
	i18n: string;
	sortItem: LivechatPriorityWeight;
	dirty: boolean;
	onClick: () => void;
};

const PrioritiesTableRow = ({ id, name, i18n, sortItem, dirty, onClick }: PrioritiesTableRowProps) => {
    /* Implementation Hidden */
};

export default PrioritiesTableRow;

```