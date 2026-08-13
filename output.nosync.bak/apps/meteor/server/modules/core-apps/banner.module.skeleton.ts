## File: apps/meteor/server/modules/core-apps/banner.module.ts

```typescript
import { Banner } from '@rocket.chat/core-services';
import type { IUiKitCoreApp, UiKitCoreAppViewClosedPayload } from '@rocket.chat/core-services';
import type * as UiKit from '@rocket.chat/ui-kit';

export class BannerModule implements IUiKitCoreApp {
	appId = 'banner-core';

	// when banner view is closed we need to dismiss that banner for that user
	async viewClosed(payload: UiKitCoreAppViewClosedPayload): Promise<UiKit.ServerInteraction> {
        /* Implementation Hidden */
    }
}

```