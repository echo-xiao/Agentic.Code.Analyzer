## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseEditWithData.tsx

```typescript
import type { IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import CannedResponseEdit from './CannedResponseEdit';
import CannedResponseEditWithDepartmentData from './CannedResponseEditWithDepartmentData';
import { useRemoveCannedResponse } from './useRemoveCannedResponse';
import { FormSkeleton } from '../../../../components/Skeleton';

export type CannedResponseEditWithDataProps = { cannedResponseId: IOmnichannelCannedResponse['_id'] };

const CannedResponseEditWithData = ({ cannedResponseId }: CannedResponseEditWithDataProps) => {
    /* Implementation Hidden */
};

export default CannedResponseEditWithData;

```