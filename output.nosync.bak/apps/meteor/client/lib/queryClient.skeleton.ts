## File: apps/meteor/client/lib/queryClient.ts

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: process.env.TEST_MODE === 'true' || process.env.TEST_MODE === 'api',
		},
		mutations: {
			onError: console.warn,
		},
	},
});

```