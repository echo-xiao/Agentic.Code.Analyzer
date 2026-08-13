## File: ee/apps/ddp-streamer/src/Streamer.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { StreamNames } from '@rocket.chat/ddp-client';
import WebSocket from 'ws';

import { server } from './configureServer';
import { DDP_EVENTS } from './constants';
import { isEmpty } from './lib/utils';
import { Streamer, StreamerCentral } from '../../../../apps/meteor/server/modules/streamer/streamer.module';
import type { DDPSubscription, Connection, TransformMessage } from '../../../../apps/meteor/server/modules/streamer/types';

StreamerCentral.on('broadcast', (name, eventName, args) => {
	void api.broadcast('stream', [name, eventName, args]);
});

export class Stream<N extends StreamNames> extends Streamer<N> {
	registerPublication(name: string, fn: (eventName: string, options: boolean | { useCollection?: boolean; args?: any }) => void): void {
        /* Implementation Hidden */
    }

	registerMethod(methods: Record<string, (eventName: string, ...args: any[]) => any>): void {
        /* Implementation Hidden */
    }

	changedPayload(collection: string, id: string, fields: Record<string, any>): string | false {
        /* Implementation Hidden */
    }

	override async sendToManySubscriptions(
		subscriptions: Set<DDPSubscription>,
		origin: Connection | undefined,
		eventName: string,
		args: any[],
		getMsg: string | TransformMessage,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```