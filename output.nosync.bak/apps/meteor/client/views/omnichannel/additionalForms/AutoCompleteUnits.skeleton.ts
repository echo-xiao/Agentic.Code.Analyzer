## File: apps/meteor/client/views/omnichannel/additionalForms/AutoCompleteUnits.tsx

```typescript
import { PaginatedMultiSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUnitsList } from '../hooks/useUnitsList';

export type AutoCompleteUnitsProps = Omit<
	ComponentProps<typeof PaginatedMultiSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem'
>;

const AutoCompleteUnits = ({ value, placeholder, onChange, ...props }: AutoCompleteUnitsProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteUnits);

```