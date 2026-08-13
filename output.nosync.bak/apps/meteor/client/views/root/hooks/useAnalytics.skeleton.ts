## File: apps/meteor/client/views/root/hooks/useAnalytics.ts

```typescript
import { useSetting, useUserId } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface Window {
		_paq?: [string, ...unknown[]][];
		GoogleAnalyticsObject: unknown;
		ga?: qa;
	}

	type qa = {
		(...args: unknown[]): void;
		l?: number;
		q?: unknown[];
	};
}

export const useAnalytics = (): void => {
    /* Implementation Hidden */
};

```