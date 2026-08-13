## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseEditWithDepartmentData.tsx

```typescript
import type { IOmnichannelCannedResponse, Serialized } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CannedResponseEdit from './CannedResponseEdit';
import { FormSkeleton } from '../../../../components/Skeleton';
import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

const CannedResponseEditWithDepartmentData = ({
	cannedResponseData,
	onDelete,
}: {
	cannedResponseData: Serialized<IOmnichannelCannedResponse>;
	onDelete: () => void;
}) => {
    /* Implementation Hidden */
};

export default CannedResponseEditWithDepartmentData;

```