## File: ee/apps/ddp-streamer/src/DDPStreamer.ts

```typescript
import crypto from 'crypto';

import { MeteorService, Presence, ServiceClass } from '@rocket.chat/core-services';
import { InstanceStatus } from '@rocket.chat/instance-status';
import { Users } from '@rocket.chat/models';
import polka from 'polka';
import { throttle } from 'underscore';
import WebSocket from 'ws';

import { Client, clientMap } from './Client';
import { events, server } from './configureServer';
import { DDP_EVENTS } from './constants';
import { Autoupdate } from './lib/Autoupdate';
import { proxy } from './proxy';
import { ListenersModule } from '../../../../apps/meteor/server/modules/listeners/listeners.module';
import type { NotificationsModule } from '../../../../apps/meteor/server/modules/notifications/notifications.module';
import { invalidate as invalidatePublicationUserCache } from '../../../../apps/meteor/server/modules/streamer/publication-user-cache';
import { StreamerCentral } from '../../../../apps/meteor/server/modules/streamer/streamer.module';

const { PORT = 4000 } = process.env;

export class DDPStreamer extends ServiceClass {
	protected name = 'streamer';

	private app?: polka.Polka;

	private wss?: WebSocket.Server;

	constructor(notifications: NotificationsModule) {
        /* Implementation Hidden */
    }

	// update connections count every 30 seconds
	updateConnections = throttle(() => {
		void InstanceStatus.updateConnections(this.wss?.clients.size ?? 0);
	}, 30000);

	override async created(): Promise<void> {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	override async stopped(): Promise<void> {
        /* Implementation Hidden */
    }
}

```