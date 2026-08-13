## File: apps/meteor/client/views/admin/subscription/components/cards/SeatsCard.tsx

```typescript
import { Palette } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import type { CardProps } from '../FeatureUsageCard';
import FeatureUsageCard from '../FeatureUsageCard';
import FeatureUsageCardBody from '../FeatureUsageCardBody';
import UpgradeButton from '../UpgradeButton';
import UsagePieGraph from '../UsagePieGraph';

export type SeatsCardProps = {
	value: number;
	max: number;
	hideManageSubscription?: boolean;
};

const SeatsCard = ({ value, max, hideManageSubscription }: SeatsCardProps) => {
    /* Implementation Hidden */
};

export default SeatsCard;

```