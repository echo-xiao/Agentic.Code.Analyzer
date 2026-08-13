## File: apps/meteor/server/modules/core-apps/nps.module.ts

```typescript
import type { IUiKitCoreApp, UiKitCoreAppBlockActionPayload, UiKitCoreAppViewSubmitPayload } from '@rocket.chat/core-services';
import { Banner, NPS } from '@rocket.chat/core-services';
import type * as UiKit from '@rocket.chat/ui-kit';

import { createModal } from './nps/createModal';

export class Nps implements IUiKitCoreApp {
	appId = 'nps-core';

	async blockAction(payload: UiKitCoreAppBlockActionPayload): Promise<UiKit.ServerInteraction> {
        /* Implementation Hidden */
    }

	async viewSubmit(payload: UiKitCoreAppViewSubmitPayload): Promise<undefined> {
        /* Implementation Hidden */
    }
}

```