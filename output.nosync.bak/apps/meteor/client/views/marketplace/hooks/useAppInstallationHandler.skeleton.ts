## File: apps/meteor/client/views/marketplace/hooks/useAppInstallationHandler.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { useEndpoint, useRouteParameter, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { isMarketplaceRouteContext, useAppsCountQuery } from './useAppsCountQuery';
import { useOpenAppPermissionsReviewModal } from './useOpenAppPermissionsReviewModal';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { useCheckoutUrl } from '../../admin/subscription/hooks/useCheckoutUrl';
import IframeModal from '../IframeModal';
import AppInstallModal from '../components/AppInstallModal/AppInstallModal';
import type { Actions } from '../helpers';
import { useAppsOrchestration } from './useAppsOrchestration';
import { useOpenIncompatibleModal } from './useOpenIncompatibleModal';
import { handleAPIError } from '../helpers/handleAPIError';

export type AppInstallationHandlerParams = {
	app: App;
	action: Actions | '';
	isAppPurchased?: boolean;
	onDismiss: () => void;
	onSuccess: (action: Actions | '', appPermissions?: App['permissions']) => void;
	setIsPurchased: (purchased: boolean) => void;
};

export function useAppInstallationHandler({
	app,
	action,
	isAppPurchased,
	onDismiss,
	onSuccess,
	setIsPurchased,
}: AppInstallationHandlerParams) {
    /* Implementation Hidden */
}

```