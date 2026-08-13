## File: apps/meteor/client/views/admin/subscription/components/cards/AppsUsageCard/AppsUsageCard.tsx

```typescript
import { Skeleton } from '@rocket.chat/fuselage';
import { ExternalLink } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

import AppsUsageCardSection from './AppsUsageCardSection';
import { PRICING_LINK } from '../../../utils/links';
import type { CardProps } from '../../FeatureUsageCard';
import FeatureUsageCard from '../../FeatureUsageCard';
import FeatureUsageCardBody from '../../FeatureUsageCardBody';
import UpgradeButton from '../../UpgradeButton';

// Magic numbers
const marketplaceAppsMaxCountFallback = 5;
const privateAppsMaxCountFallback = 0;
const defaultWarningThreshold = 80;

export type AppsUsageCardProps = {
	privateAppsLimit?: { value?: number; max: number };
	marketplaceAppsLimit?: { value?: number; max: number };
};

const AppsUsageCard = ({ privateAppsLimit, marketplaceAppsLimit }: AppsUsageCardProps) => {
    /* Implementation Hidden */
};

export default AppsUsageCard;

```