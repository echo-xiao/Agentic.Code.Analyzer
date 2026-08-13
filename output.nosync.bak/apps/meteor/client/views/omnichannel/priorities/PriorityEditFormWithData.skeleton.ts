## File: apps/meteor/client/views/omnichannel/priorities/PriorityEditFormWithData.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import type { PriorityEditFormProps } from './PriorityEditForm';
import PriorityEditForm from './PriorityEditForm';
import { FormSkeleton } from '../../../components/Skeleton';
import { usePriorityInfo } from '../directory/hooks/usePriorityInfo';

type PriorityEditFormWithDataProps = Omit<PriorityEditFormProps, 'data'> & {
	priorityId: string;
};

function PriorityEditFormWithData({ priorityId, ...props }: PriorityEditFormWithDataProps) {
    /* Implementation Hidden */
}

export default PriorityEditFormWithData;

```