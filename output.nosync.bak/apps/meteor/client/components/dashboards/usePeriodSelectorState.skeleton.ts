## File: apps/meteor/client/components/dashboards/usePeriodSelectorState.ts

```typescript
import { useState } from 'react';

import type { Period } from './periods';

export const usePeriodSelectorState = <TPeriod extends Period['key']>(
	...periods: TPeriod[]
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