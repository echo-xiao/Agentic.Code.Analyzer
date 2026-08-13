## File: apps/meteor/client/views/admin/ABAC/ABACAttributesTab/AttributesContextualBarWithData.tsx

```typescript
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import AttributesContextualBar from './AttributesContextualBar';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export type AttributesContextualBarWithDataProps = {
	id: string;
	onClose: () => void;
};

const AttributesContextualBarWithData = ({ id, onClose }: AttributesContextualBarWithDataProps) => {
    /* Implementation Hidden */
};

export default AttributesContextualBarWithData;

```