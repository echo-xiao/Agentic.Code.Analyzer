## File: apps/meteor/client/views/admin/subscription/components/cards/MACCard.tsx

```typescript
import { Palette } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import type { CardProps } from '../FeatureUsageCard';
import FeatureUsageCard from '../FeatureUsageCard';
import FeatureUsageCardBody from '../FeatureUsageCardBody';
import UpgradeButton from '../UpgradeButton';
import UsagePieGraph from '../UsagePieGraph';

export type MACCardProps = { value: number; max: number; hideManageSubscription?: boolean };

const MACCard = ({ value = 0, max, hideManageSubscription }: MACCardProps) => {
    /* Implementation Hidden */
};

export default MACCard;

```