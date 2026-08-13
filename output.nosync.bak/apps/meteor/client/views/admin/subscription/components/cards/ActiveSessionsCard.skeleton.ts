## File: apps/meteor/client/views/admin/subscription/components/cards/ActiveSessionsCard.tsx

```typescript
import { Box, Skeleton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useActiveConnections } from '../../../../hooks/useActiveConnections';
import type { CardProps } from '../FeatureUsageCard';
import FeatureUsageCard from '../FeatureUsageCard';
import FeatureUsageCardBody from '../FeatureUsageCardBody';
import UpgradeButton from '../UpgradeButton';

const getLimits = ({ max, current }: { max: number; current: number }) => {
    /* Implementation Hidden */
};

const ActiveSessionsCard = () => {
    /* Implementation Hidden */
};

export default ActiveSessionsCard;

```