## File: apps/meteor/client/views/oauth/hooks/useOAuthAppQuery.ts

```typescript
import type { IOAuthApps } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type UseOAuthAppQueryOptions = Omit<
	UseQueryOptions<IOAuthApps, unknown, IOAuthApps, readonly ['oauth-app', { readonly clientId: string | undefined }]>,
	'queryKey' | 'queryFn'
>;

export const useOAuthAppQuery = (clientId: string | undefined, options?: UseOAuthAppQueryOptions) => {
    /* Implementation Hidden */
};

```