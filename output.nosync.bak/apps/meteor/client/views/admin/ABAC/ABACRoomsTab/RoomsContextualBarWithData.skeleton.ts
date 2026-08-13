## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomsContextualBarWithData.tsx

```typescript
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import RoomsContextualBar from './RoomsContextualBar';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export type RoomsContextualBarWithDataProps = {
	id: string;
	onClose: () => void;
};

const RoomsContextualBarWithData = ({ id, onClose }: RoomsContextualBarWithDataProps) => {
    /* Implementation Hidden */
};

export default RoomsContextualBarWithData;

```