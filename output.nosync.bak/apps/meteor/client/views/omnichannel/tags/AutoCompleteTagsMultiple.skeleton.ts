## File: apps/meteor/client/views/omnichannel/tags/AutoCompleteTagsMultiple.tsx

```typescript
import { PaginatedMultiSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTagsList } from '../hooks/useTagsList';

type AutoCompleteTagsMultipleProps = Omit<
	ComponentProps<typeof PaginatedMultiSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem'
> & {
	department?: string;
	viewAll?: boolean;
};

const AutoCompleteTagsMultiple = ({
	value = [],
	onChange = () => undefined,
	department,
	viewAll = false,
	placeholder,
	...props
}: AutoCompleteTagsMultipleProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteTagsMultiple);

```