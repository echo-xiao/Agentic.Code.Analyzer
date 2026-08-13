## File: apps/meteor/app/notifications/server/lib/Presence.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { StreamerEvents } from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';

import { Streamer } from '../../../../server/modules/streamer/streamer.module';
import type { IPublication, IStreamerConstructor, Connection, IStreamer } from '../../../../server/modules/streamer/types';

type UserPresenceStreamProps = {
	added: IUser['_id'][];
	removed: IUser['_id'][];
};

type UserPresenceStreamArgs = {
	uid: string;
	args: StreamerEvents['user-presence'][number]['args'];
};

const e = new Emitter<{
	[key: string]: UserPresenceStreamArgs;
}>();

const clients = new WeakMap<Connection, UserPresence>();

class UserPresence {
	private readonly streamer: IStreamer<'user-presence'>;

	private readonly publication: IPublication;

	private readonly listeners: Set<string>;

	constructor(publication: IPublication, streamer: IStreamer<'user-presence'>) {
        /* Implementation Hidden */
    }

	listen(uid: string): void {
        /* Implementation Hidden */
    }

	off = (uid: string): void => {
		e.off(uid, this.run);
		this.listeners.delete(uid);
	};

	run = (args: UserPresenceStreamArgs): void => {
		const payload = this.streamer.changedPayload(this.streamer.subscriptionName, args.uid, { ...args, eventName: args.uid }); // there is no good explanation to keep eventName, I just want to save one 'DDPCommon.parseDDP' on the client side, so I'm trying to fit the Meteor Streamer's payload
		if (!payload) {
			return;
		}
		// after meteor 3.4.1 immediately after a disconnection session becomes null (which is not wrong)
		// we were just not counting on this, session is _session so we actually should not use it
		// now after any await, the session can potentially be null, so we need to check for that
		if (!Streamer.isPublicationActive(this.publication)) {
			return;
		}

		this.publication._session.socket.send(payload);
	};

	stop(): void {
        /* Implementation Hidden */
    }

	static getClient(publication: IPublication, streamer: IStreamer<'user-presence'>): [UserPresence, boolean] {
        /* Implementation Hidden */
    }
}

export class StreamPresence {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	static getInstance(Streamer: IStreamerConstructor, name = 'user-presence'): IStreamer<'user-presence'> {
        /* Implementation Hidden */
    }
}

export const emit = (uid: string, args: UserPresenceStreamArgs['args']): void => {
    /* Implementation Hidden */
};

```