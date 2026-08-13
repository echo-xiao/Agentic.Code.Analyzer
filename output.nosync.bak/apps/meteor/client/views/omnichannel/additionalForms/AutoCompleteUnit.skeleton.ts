## File: apps/meteor/client/views/omnichannel/additionalForms/AutoCompleteUnit.tsx

```typescript
import { PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UnitOption } from '../hooks/useUnitsList';
import { useUnitsList } from '../hooks/useUnitsList';

export type AutoCompleteUnitProps = Omit<
	ComponentProps<typeof PaginatedSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem'
> & {
	haveNone?: boolean;
	value: string | undefined;
	onChange: (value: string) => void;
	onLoadItems?: (list: UnitOption[]) => void;
};

const AutoCompleteUnit = ({
	id,
	value,
	disabled = false,
	error,
	placeholder,
	haveNone,
	onChange,
	onLoadItems = () => undefined,
}: AutoCompleteUnitProps) => {
    /* Implementation Hidden */
};

export default AutoCompleteUnit;

```