## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppStatus/AppStatus.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box, Button, Tag, Margins, Icon } from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { useRouteParameter, usePermission, useSetModal } from '@rocket.chat/ui-contexts';
import { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import semver from 'semver';

import AppStatusPriceDisplay from './AppStatusPriceDisplay';
import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import { useIsEnterprise } from '../../../../../hooks/useIsEnterprise';
import AddonRequiredModal from '../../../AppsList/AddonRequiredModal';
import type { appStatusSpanResponseProps } from '../../../helpers';
import { appButtonProps, appMultiStatusProps } from '../../../helpers';
import type { AppInstallationHandlerParams } from '../../../hooks/useAppInstallationHandler';
import { useAppInstallationHandler } from '../../../hooks/useAppInstallationHandler';
import { useMarketplaceActions } from '../../../hooks/useMarketplaceActions';

export type AppStatusProps = {
	app: App;
	showStatus?: boolean;
	isAppDetailsPage: boolean;
	installed?: boolean;
};

const AppStatus = ({ app, showStatus = true, isAppDetailsPage, installed, ...props }: AppStatusProps) => {
    /* Implementation Hidden */
};

export default memo(AppStatus);

```