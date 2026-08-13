## File: apps/meteor/client/components/ListSkeleton.tsx

```typescript
import { Box, Skeleton } from '@rocket.chat/fuselage';
import { memo, useMemo } from 'react';

const availablePercentualWidths = [47, 68, 75, 82];

export type ListSkeletonProps = {
	listCount?: number;
};

const ListSkeleton = ({ listCount = 2 }: ListSkeletonProps) => {
    /* Implementation Hidden */
};

export default memo(ListSkeleton);

```