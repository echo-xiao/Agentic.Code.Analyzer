## File: packages/ui-client/src/hooks/useLicense.ts

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint, useStream, useUserId } from '@rocket.chat/ui-contexts';
import type { QueryClient, UseQueryResult } from '@tanstack/react-query';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

type LicenseDataType = Serialized<Awaited<OperationResult<'GET', '/v1/licenses.info'>>>;

type LicenseParams = {
	loadValues?: boolean;
};

const invalidateQueryClientLicenses = (() => {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return (queryClient: QueryClient, milliseconds = 5000) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = undefined;
			void queryClient.invalidateQueries({
				queryKey: ['licenses'],
			});
		}, milliseconds);
	};
})();

export const useLicenseBase = <TData = LicenseDataType>({
	params,
	enabled = true,
	select,
}: {
	params?: LicenseParams;
	enabled?: boolean;
	select: (data: LicenseDataType) => TData;
}) => {
    /* Implementation Hidden */
};

export const useLicense = (params?: LicenseParams) => {
    /* Implementation Hidden */
};

export const useLicenseWithCloudAnnouncement = (params?: LicenseParams) => {
    /* Implementation Hidden */
};

export const useHasLicense = (): UseQueryResult<boolean> => {
    /* Implementation Hidden */
};

export const useLicenseName = (params?: LicenseParams) => {
    /* Implementation Hidden */
};

export const useInvalidateLicense = () => {
    /* Implementation Hidden */
};

```