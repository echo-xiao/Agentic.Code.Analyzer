## File: apps/meteor/client/components/dashboards/PeriodSelector.tsx

```typescript
import { Select } from '@rocket.chat/fuselage';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Period } from './periods';
import { getPeriod } from './periods';

type PeriodSelectorProps<TPeriod extends Period['key']> = {
	periods: TPeriod[];
	value: TPeriod;
	name?: string;
	onChange: (value: TPeriod) => void;
};

const PeriodSelector = <TPeriod extends Period['key']>({ periods, value, name, onChange }: PeriodSelectorProps<TPeriod>) => {
    /* Implementation Hidden */
};

export default PeriodSelector;

```