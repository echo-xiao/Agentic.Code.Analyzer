## File: apps/meteor/client/lib/onToggledFeature.ts

```typescript
import type { LicenseModule } from '@rocket.chat/core-typings';
import { QueryObserver } from '@tanstack/react-query';

import { fetchFeatures } from './fetchFeatures';
import { queryClient } from './queryClient';

export const onToggledFeature = (
	feature: LicenseModule,
	{
		up,
		down,
	}: {
		up?: () => void;
		down?: () => void;
	},
): (() => void) => {
    /* Implementation Hidden */
};

```