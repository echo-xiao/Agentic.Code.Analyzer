## File: apps/meteor/client/views/admin/subscription/components/cards/AppsUsageCard/AppsUsageCardSection.tsx

```typescript
import { Box, ProgressBar } from '@rocket.chat/fuselage';
import { useId, type ReactNode } from 'react';

export type AppsUsageCardSectionProps = {
	title: ReactNode;
	tip?: string;
	appsCount: number;
	appsMaxCount: number;
	warningThreshold: number;
};

const AppsUsageCardSection = ({ title, tip, appsCount, appsMaxCount, warningThreshold }: AppsUsageCardSectionProps) => {
    /* Implementation Hidden */
};

export default AppsUsageCardSection;

```