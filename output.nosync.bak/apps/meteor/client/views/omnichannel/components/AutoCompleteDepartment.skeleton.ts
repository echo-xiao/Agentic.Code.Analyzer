## File: apps/meteor/client/views/omnichannel/components/AutoCompleteDepartment.tsx

```typescript
import { Option, PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDepartmentsList } from '../hooks/useDepartmentsList';

export type AutoCompleteDepartmentProps = {
	value?: string;
	onChange: (value: string) => void;
	excludeId?: string;
	onlyMyDepartments?: boolean;
	haveAll?: boolean;
	haveNone?: boolean;
	showArchived?: boolean;
	unitId?: string;
} & Omit<ComponentProps<typeof PaginatedSelectFiltered>, 'options' | 'setFilter'>;

const AutoCompleteDepartment = ({
	value,
	excludeId,
	onlyMyDepartments,
	unitId,
	onChange,
	haveAll,
	haveNone,
	showArchived = false,
	disabled,
	...props
}: AutoCompleteDepartmentProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteDepartment);

```