## File: apps/meteor/client/hooks/useUserInfoQuery.ts

```typescript
import type { UsersInfoParamsGet } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type UserInfoQueryOptions = {
	enabled?: boolean;
	placeholderData?: <T>(previousData: T | undefined) => T | undefined;
};

// a hook using tanstack useQuery and useEndpoint that fetches user information from the `users.info` endpoint
export const useUserInfoQuery = (params: UsersInfoParamsGet, options: UserInfoQueryOptions = { placeholderData: keepPreviousData }) => {
    /* Implementation Hidden */
};

```