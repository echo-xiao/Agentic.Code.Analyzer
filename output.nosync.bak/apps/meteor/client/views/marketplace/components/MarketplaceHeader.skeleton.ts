## File: apps/meteor/client/views/marketplace/components/MarketplaceHeader.tsx

```typescript
import { Button, ButtonGroup, Margins } from '@rocket.chat/fuselage';
import { PageHeader } from '@rocket.chat/ui-client';
import { usePermission, useRoute, useRouteParameter, useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { GenericResourceUsageSkeleton } from '../../../components/GenericResourceUsage';
import UpgradeButton from '../../admin/subscription/components/UpgradeButton';
import UnlimitedAppsUpsellModal from '../UnlimitedAppsUpsellModal';
import EnabledAppsCount from './EnabledAppsCount';
import { useAppsCountQuery } from '../hooks/useAppsCountQuery';
import { usePrivateAppsEnabled } from '../hooks/usePrivateAppsEnabled';
import PrivateAppInstallModal from './PrivateAppInstallModal/PrivateAppInstallModal';
import UpdateRocketChatButton from './UpdateRocketChatButton';

export type MarketplaceHeaderProps = { title: string; unsupportedVersion: boolean };

const MarketplaceHeader = ({ title, unsupportedVersion }: MarketplaceHeaderProps) => {
    /* Implementation Hidden */
};

export default MarketplaceHeader;

```