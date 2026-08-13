## File: apps/meteor/client/components/GenericResourceUsage/GenericResourceUsageSkeleton.tsx

```typescript
import { Box, Skeleton } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

export type GenericResourceUsageSkeletonProps = {
	title?: string;
} & ComponentProps<typeof Box>;

const GenericResourceUsageSkeleton = ({ title, ...props }: GenericResourceUsageSkeletonProps) => {
    /* Implementation Hidden */
};

export default GenericResourceUsageSkeleton;

```