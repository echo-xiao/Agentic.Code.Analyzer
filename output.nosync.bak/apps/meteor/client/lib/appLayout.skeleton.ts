## File: apps/meteor/client/lib/appLayout.tsx

```typescript
import { Emitter } from '@rocket.chat/emitter';
import type { ReactNode } from 'react';
import { lazy } from 'react';

const ConnectionStatusBar = lazy(() => import('../components/connectionStatus/ConnectionStatusBar'));
const BannerRegion = lazy(() => import('../views/banners/BannerRegion'));
const ModalRegion = lazy(() => import('@rocket.chat/ui-client').then(({ ModalRegion }) => ({ default: ModalRegion })));
const ActionManagerBusyState = lazy(() => import('../components/ActionManagerBusyState'));
const AppLayoutThemeWrapper = lazy(() => import('../components/AppLayoutThemeWrapper'));
const CloudAnnouncementsRegion = lazy(() => import('../views/cloud/CloudAnnouncementsRegion'));

class AppLayoutSubscription extends Emitter<{ update: void }> {
	private descriptor: ReactNode = null;

	getSnapshot = (): ReactNode => this.descriptor;

	subscribe = (onStoreChange: () => void): (() => void) => this.on('update', onStoreChange);

	setCurrentValue(descriptor: ReactNode): void {
        /* Implementation Hidden */
    }

	render(element: ReactNode): void {
        /* Implementation Hidden */
    }

	wrap(element: ReactNode): ReactNode {
        /* Implementation Hidden */
    }
}

export const appLayout = new AppLayoutSubscription();

```