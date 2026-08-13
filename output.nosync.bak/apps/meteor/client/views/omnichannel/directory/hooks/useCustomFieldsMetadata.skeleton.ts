## File: apps/meteor/client/views/omnichannel/directory/hooks/useCustomFieldsMetadata.ts

```typescript
import { useQuery } from '@tanstack/react-query';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';
import { useCustomFieldsQuery } from '../../hooks/useCustomFieldsQuery';
import { formatCustomFieldsMetadata } from '../utils/formatCustomFieldsMetadata';

type UseCustomFieldsMetadataOptions = {
	enabled?: boolean;
	scope: 'visitor' | 'room';
};

export const useCustomFieldsMetadata = ({ enabled = true, scope }: UseCustomFieldsMetadataOptions) => {
    /* Implementation Hidden */
};

```