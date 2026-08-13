## File: apps/meteor/server/modules/core-apps/cloudSubscriptionCommunication.module.ts

```typescript
import type { UiKitCoreAppViewClosedPayload } from '@rocket.chat/core-services';
import type * as UiKit from '@rocket.chat/ui-kit';

import { CloudAnnouncementsModule } from './cloudAnnouncements.module';

export class CloudSubscriptionCommunication extends CloudAnnouncementsModule {
	override appId = 'cloud-communication-core';

	override async viewClosed(payload: UiKitCoreAppViewClosedPayload): Promise<UiKit.ServerInteraction> {
        /* Implementation Hidden */
    }
}

```