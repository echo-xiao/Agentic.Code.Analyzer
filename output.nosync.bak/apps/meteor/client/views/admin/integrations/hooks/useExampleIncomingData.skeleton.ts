## File: apps/meteor/client/views/admin/integrations/hooks/useExampleIncomingData.ts

```typescript
import type { INewIncomingIntegration } from '@rocket.chat/core-typings';
import { useAbsoluteUrl } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

type UseExampleDataParams = {
	additionalFields: Partial<INewIncomingIntegration>;
	url: string;
};

export function useExampleData({
	additionalFields,
	url,
}: UseExampleDataParams): [integrationObj: Partial<INewIncomingIntegration>, curl: string] {
    /* Implementation Hidden */
}

```