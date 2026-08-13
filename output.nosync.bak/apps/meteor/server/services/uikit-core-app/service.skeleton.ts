## File: apps/meteor/server/services/uikit-core-app/service.ts

```typescript
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type {
	IUiKitCoreApp,
	IUiKitCoreAppService,
	UiKitCoreAppBlockActionPayload,
	UiKitCoreAppViewClosedPayload,
	UiKitCoreAppViewSubmitPayload,
} from '@rocket.chat/core-services';

const registeredApps = new Map<string, IUiKitCoreApp>();

const getAppModule = (appId: string) => {
    /* Implementation Hidden */
};

export const registerCoreApp = (module: IUiKitCoreApp): void => {
    /* Implementation Hidden */
};

export class UiKitCoreAppService extends ServiceClassInternal implements IUiKitCoreAppService {
	protected name = 'uikit-core-app';

	async isRegistered(appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async blockAction(payload: UiKitCoreAppBlockActionPayload) {
        /* Implementation Hidden */
    }

	async viewClosed(payload: UiKitCoreAppViewClosedPayload) {
        /* Implementation Hidden */
    }

	async viewSubmit(payload: UiKitCoreAppViewSubmitPayload) {
        /* Implementation Hidden */
    }
}

```