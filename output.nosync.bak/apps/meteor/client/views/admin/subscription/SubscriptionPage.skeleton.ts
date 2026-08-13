## File: apps/meteor/client/views/admin/subscription/SubscriptionPage.tsx

```typescript
import { Accordion, AccordionItem, Box, Button, ButtonGroup, Callout, Grid, GridItem } from '@rocket.chat/fuselage';
import { useDebouncedValue, useSessionStorage } from '@rocket.chat/fuselage-hooks';
import {
	Page,
	PageScrollableContentWithShadow,
	PageHeaderNoShadow,
	PageBlockWithBorder,
	useInvalidateLicense,
	useLicenseWithCloudAnnouncement,
} from '@rocket.chat/ui-client';
import { useSearchParameter, useRouter } from '@rocket.chat/ui-contexts';
import { t } from 'i18next';
import { memo, useCallback, useEffect } from 'react';
import tinykeys from 'tinykeys';

import { SubscriptionCalloutLimits } from './SubscriptionCalloutLimits';
import SubscriptionPageSkeleton from './SubscriptionPageSkeleton';
import UpgradeButton from './components/UpgradeButton';
import UpgradeToGetMore from './components/UpgradeToGetMore';
import ActiveSessionsCard from './components/cards/ActiveSessionsCard';
import ActiveSessionsPeakCard from './components/cards/ActiveSessionsPeakCard';
import AppsUsageCard from './components/cards/AppsUsageCard';
import CountMACCard from './components/cards/CountMACCard';
import CountSeatsCard from './components/cards/CountSeatsCard';
import FeaturesCard from './components/cards/FeaturesCard';
import MACCard from './components/cards/MACCard';
import PlanCard from './components/cards/PlanCard';
import SeatsCard from './components/cards/SeatsCard';
import { useCancelSubscriptionModal } from './hooks/useCancelSubscriptionModal';
import { useWorkspaceSync } from './hooks/useWorkspaceSync';
import UiKitSubscriptionLicense from './surface/UiKitSubscriptionLicense';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import { useRegistrationStatus } from '../../../hooks/useRegistrationStatus';

function useShowLicense() {
    /* Implementation Hidden */
}

const SubscriptionPage = () => {
    /* Implementation Hidden */
};

export default memo(SubscriptionPage);

```