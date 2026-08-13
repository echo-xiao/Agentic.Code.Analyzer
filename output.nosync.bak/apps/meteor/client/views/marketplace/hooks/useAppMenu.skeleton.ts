## File: apps/meteor/client/views/marketplace/hooks/useAppMenu.tsx

```typescript
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { App, AppPermission } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import {
	useSetModal,
	useEndpoint,
	useTranslation,
	useRouteParameter,
	useToastMessageDispatch,
	usePermission,
	useRouter,
} from '@rocket.chat/ui-contexts';
import type { MouseEvent, ReactNode } from 'react';
import { useMemo, useCallback, useState } from 'react';
import semver from 'semver';

import { useAppInstallationHandler } from './useAppInstallationHandler';
import type { MarketplaceRouteContext } from './useAppsCountQuery';
import { useAppsCountQuery } from './useAppsCountQuery';
import { useMarketplaceActions } from './useMarketplaceActions';
import { useOpenAppPermissionsReviewModal } from './useOpenAppPermissionsReviewModal';
import { useOpenIncompatibleModal } from './useOpenIncompatibleModal';
import WarningModal from '../../../components/WarningModal';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import type { AddonActionType } from '../AppsList/AddonRequiredModal';
import AddonRequiredModal from '../AppsList/AddonRequiredModal';
import IframeModal from '../IframeModal';
import UninstallGrandfatheredAppModal from '../components/UninstallGrandfatheredAppModal/UninstallGrandfatheredAppModal';
import type { Actions } from '../helpers';
import { appEnabledStatuses, appButtonProps } from '../helpers';
import { handleAPIError } from '../helpers/handleAPIError';
import { warnEnableDisableApp } from '../helpers/warnEnableDisableApp';

export type AppMenuOption = {
	id: string;
	section: number;
	content: ReactNode;
	disabled?: boolean;
	onClick?: (e?: MouseEvent<HTMLElement>) => void;
};

type AppMenuSections = {
	items: AppMenuOption[];
}[];

export const useAppMenu = (app: App, isAppDetailsPage: boolean) => {
    /* Implementation Hidden */
};

```