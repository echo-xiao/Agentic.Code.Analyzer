## File: apps/meteor/client/views/omnichannel/components/AutoCompleteMonitors.tsx

```typescript
import { CheckOption, PaginatedMultiSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMonitorsList } from '../hooks/useMonitorsList';

export type AutoCompleteMonitorsProps = Omit<
	ComponentProps<typeof PaginatedMultiSelectFiltered>,
	'options' | 'setFilter' | 'endReached' | 'filter' | 'renderItem'
>;

const AutoCompleteMonitors = ({ value = [], onBlur, onChange, ...props }: AutoCompleteMonitorsProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteMonitors);

```