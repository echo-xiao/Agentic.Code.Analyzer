## File: packages/ui-client/src/components/FeaturePreview/FeaturePreview.tsx

```typescript
import type { ReactElement } from 'react';
import { Children, Suspense, cloneElement } from 'react';

import { useFeaturePreview } from '../../hooks/useFeaturePreview';
import type { FeaturesAvailable } from '../../hooks/useFeaturePreviewList';

export type FeaturePreviewProps = {
	feature: FeaturesAvailable;
	disabled?: boolean;
	children: ReactElement<{ featureToggleEnabled?: boolean }>[];
};

const FeaturePreview = ({ feature, disabled = false, children }: FeaturePreviewProps) => {
    /* Implementation Hidden */
};

export default FeaturePreview;

```