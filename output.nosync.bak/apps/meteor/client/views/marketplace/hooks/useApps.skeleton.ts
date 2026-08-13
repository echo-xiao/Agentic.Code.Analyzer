## File: apps/meteor/client/views/marketplace/hooks/useApps.ts

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { useInvalidateLicense } from '@rocket.chat/ui-client';
import { usePermission, useStream } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { useInvalidateAppsCountQueryCallback } from './useAppsCountQuery';
import { AppsContext } from '../../../contexts/AppsContext';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import { marketplaceQueryKeys } from '../../../lib/queryKeys';
import type { App } from '../types';

const sortByName = (apps: App[]): App[] => apps.toSorted((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

/**
 * Aggregates result data from marketplace request and instance installed into their appropriate lists
 *
 * Exporting for better testing
 */
export const storeQueryFunction = (
	marketplace: UseQueryResult<App[], unknown>,
	instance: UseQueryResult<App[], unknown>,
): [App[], App[], App[]] => {
    /* Implementation Hidden */
};

export const useApps = <
	TData = {
		installedApps: App[];
		marketplaceApps: App[];
		privateApps: App[];
	},
>(
	options?: Omit<
		UseQueryOptions<
			{
				installedApps: App[];
				marketplaceApps: App[];
				privateApps: App[];
			},
			Error,
			TData,
			ReturnType<typeof marketplaceQueryKeys.appsStored>
		>,
		'queryKey' | 'queryFn' | 'enabled' | 'placeholderData'
	>,
) => {
    /* Implementation Hidden */
};

```