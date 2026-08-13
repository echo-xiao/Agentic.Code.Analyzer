## File: apps/meteor/server/modules/core-apps/videoconf.module.ts

```typescript
import type { IUiKitCoreApp, UiKitCoreAppBlockActionPayload } from '@rocket.chat/core-services';
import { VideoConf } from '@rocket.chat/core-services';
import type * as UiKit from '@rocket.chat/ui-kit';

import { i18n } from '../../lib/i18n';

export class VideoConfModule implements IUiKitCoreApp {
	appId = 'videoconf-core';

	async blockAction(payload: UiKitCoreAppBlockActionPayload): Promise<UiKit.ServerInteraction | undefined> {
        /* Implementation Hidden */
    }
}

```