## File: apps/meteor/client/stories/contexts/QueryClientProviderMock.tsx

```typescript
import type { DefaultError, Query } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { dispatchToastMessage } from '../../lib/toast';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			gcTime: Infinity,
			refetchOnWindowFocus: false,
		},
	},
});

export type QueryClientProviderMockProps = {
	children?: ReactNode;
};

const QueryClientProviderMock = ({ children }: QueryClientProviderMockProps) => {
    /* Implementation Hidden */
};

export default QueryClientProviderMock;

```