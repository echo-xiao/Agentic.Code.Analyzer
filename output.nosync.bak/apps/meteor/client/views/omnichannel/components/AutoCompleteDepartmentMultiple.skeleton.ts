## File: apps/meteor/client/views/omnichannel/components/AutoCompleteDepartmentMultiple.tsx

```typescript
import { CheckOption, Option, PaginatedMultiSelectFiltered } from '@rocket.chat/fuselage';
import type { PaginatedMultiSelectOption } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDepartmentsList } from '../hooks/useDepartmentsList';

export type AutoCompleteDepartmentMultipleProps = Omit<
	ComponentProps<typeof PaginatedMultiSelectFiltered>,
	'options' | 'renderItem' | 'setFilter' | 'filter' | 'placeholder' | 'endReached'
> & {
	value?: PaginatedMultiSelectOption[];
	onChange: (value: PaginatedMultiSelectOption[]) => void;
	onlyMyDepartments?: boolean;
	showArchived?: boolean;
	enabled?: boolean;
	withCheckbox?: boolean;
	excludeId?: string;
	unitId?: string;
};

const AutoCompleteDepartmentMultiple = ({
	value = [],
	onlyMyDepartments = false,
	showArchived = false,
	enabled = false,
	withCheckbox = false,
	excludeId,
	unitId,
	onChange = () => undefined,
	...props
}: AutoCompleteDepartmentMultipleProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteDepartmentMultiple);

```