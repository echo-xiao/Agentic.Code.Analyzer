## File: apps/meteor/client/views/omnichannel/slaPolicies/SlaEditWithData.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import SlaEdit from './SlaEdit';
import { FormSkeleton } from '../../../components/Skeleton';

type SlaEditProps = {
	slaId: string;
	reload: () => void;
};

function SlaEditWithData({ slaId, reload }: SlaEditProps) {
    /* Implementation Hidden */
}

export default SlaEditWithData;

```