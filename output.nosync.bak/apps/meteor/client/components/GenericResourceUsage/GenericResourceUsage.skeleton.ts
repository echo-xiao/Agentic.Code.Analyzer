## File: apps/meteor/client/components/GenericResourceUsage/GenericResourceUsage.tsx

```typescript
import { Box, ProgressBar } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ReactNode } from 'react';

const GenericResourceUsage = ({
	title,
	value,
	max,
	percentage,
	threshold = 80,
	variant = percentage < threshold ? 'success' : 'danger',
	subTitle,
	tooltip,
	...props
}: {
	title: string;
	subTitle?: ReactNode;
	value: number;
	max: number;
	percentage: number;
	threshold?: number;
	variant?: 'warning' | 'danger' | 'success';
	tooltip?: string;
}) => {
    /* Implementation Hidden */
};

export default GenericResourceUsage;

```