## File: apps/meteor/client/components/dashboards/usePeriodSelectorStorage.ts

```typescript
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';

import type { Period } from './periods';

export const usePeriodSelectorStorage = <TPeriod extends Period['key']>(
	storageKey: string,
	periods: TPeriod[],
): [
	period: TPeriod,
	periodSelectorProps: {
		periods: TPeriod[];
		value: TPeriod;
		onChange: (value: TPeriod) => void;
	},
] => {
    /* Implementation Hidden */
};

```