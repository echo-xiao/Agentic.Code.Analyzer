## File: apps/meteor/client/views/omnichannel/components/outboundMessage/hooks/useOutboundProvidersList.ts

```typescript
import type { IOutboundProvider, Serialized } from '@rocket.chat/core-typings';
import type { OperationResult } from '@rocket.chat/rest-typings';
import { useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import { omnichannelQueryKeys } from '../../../../../lib/queryKeys';
import { useOmnichannelEnterpriseEnabled } from '../../../hooks/useOmnichannelEnterpriseEnabled';

type OutboundProvidersResponse = Serialized<OperationResult<'GET', '/v1/omnichannel/outbound/providers'>>;

type UseOutboundProvidersListProps<TData> = Omit<UseQueryOptions<OutboundProvidersResponse, Error, TData>, 'queryKey' | 'queryFn'> & {
	type?: IOutboundProvider['providerType'];
};

const useOutboundProvidersList = <TData = OutboundProvidersResponse>(options?: UseOutboundProvidersListProps<TData>) => {
    /* Implementation Hidden */
};

export default useOutboundProvidersList;

```