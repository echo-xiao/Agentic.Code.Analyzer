## File: apps/meteor/client/views/admin/subscription/components/FeatureUsageCard.tsx

```typescript
import { Card, CardControls, CardTitle } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { memo } from 'react';

import InfoTextIconModal from './InfoTextIconModal';

export type FeatureUsageCardProps = {
	children?: ReactNode;
	card: CardProps;
};

export type CardProps = {
	title: string;
	infoText?: ReactNode;
	upgradeButton?: ReactNode;
};

const FeatureUsageCard = ({ children, card }: FeatureUsageCardProps) => {
    /* Implementation Hidden */
};

export default memo(FeatureUsageCard);

```