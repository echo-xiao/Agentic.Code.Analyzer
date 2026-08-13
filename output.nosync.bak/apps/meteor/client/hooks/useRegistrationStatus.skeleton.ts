## File: apps/meteor/client/hooks/useRegistrationStatus.ts

```typescript
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type useRegistrationStatusReturnType = {
	canViewRegistrationStatus: boolean;
	isRegistered?: boolean;
} & UseQueryResult<OperationResult<'GET', '/v1/cloud.registrationStatus'>>;

export const useRegistrationStatus = (): useRegistrationStatusReturnType => {
    /* Implementation Hidden */
};

```