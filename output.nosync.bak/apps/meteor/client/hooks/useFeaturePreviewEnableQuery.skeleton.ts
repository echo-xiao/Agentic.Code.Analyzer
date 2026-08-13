## File: apps/meteor/client/hooks/useFeaturePreviewEnableQuery.ts

```typescript
import type { FeaturePreviewProps } from '@rocket.chat/ui-client';
import { useMemo } from 'react';

const handleFeaturePreviewEnableQuery = (item: FeaturePreviewProps, _: any, features: FeaturePreviewProps[]) => {
    /* Implementation Hidden */
};

const groupFeaturePreview = (features: FeaturePreviewProps[]) =>
	Object.entries(
		features.reduce(
			(result, currentValue) => {
				(result[currentValue.group] = result[currentValue.group] || []).push(currentValue);
				return result;
			},
			{} as Record<FeaturePreviewProps['group'], FeaturePreviewProps[]>,
		),
	);

export const useFeaturePreviewEnableQuery = (features: FeaturePreviewProps[]) => {
    /* Implementation Hidden */
};

```