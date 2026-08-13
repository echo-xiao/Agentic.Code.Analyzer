## File: apps/meteor/app/notifications/server/lib/Notifications.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { DDPCommon } from 'meteor/ddp-common';
import { Meteor } from 'meteor/meteor';

import { NotificationsModule } from '../../../../server/modules/notifications/notifications.module';
import { Streamer } from '../../../../server/modules/streamer/streamer.module';

import './Presence';

class Stream extends Streamer<'local'> {
	registerPublication(name: string, fn: (eventName: string, options: boolean | { useCollection?: boolean; args?: any }) => void): void {
        /* Implementation Hidden */
    }

	registerMethod(methods: Partial<ServerMethods>): void {
        /* Implementation Hidden */
    }

	changedPayload(collection: string, id: string, fields: Record<string, any>): string | false {
        /* Implementation Hidden */
    }
}

const notifications = new NotificationsModule(Stream);

notifications.configure();

notifications.streamLocal.on('broadcast', ({ eventName, args }) => {
	void api.broadcastLocal(eventName, ...args);
});

export default notifications;

```