## File: ee/apps/ddp-streamer/src/Publication.ts

```typescript
import { EventEmitter } from 'events';

import type { Client } from './Client';
import type { Server } from './Server';
import type { IPacket } from './types/IPacket';
import type { IPublication } from '../../../../apps/meteor/server/modules/streamer/types';

export class Publication extends EventEmitter implements IPublication {
	_session: IPublication['_session'];

	connection: IPublication['connection'];

	constructor(
		public client: Client,
		private packet: IPacket,
		private server: Server,
	) {
        /* Implementation Hidden */
    }

	_isDeactivated(): this is IPublication & { _session: null } {
        /* Implementation Hidden */
    }

	error(_error: Error): void {
        /* Implementation Hidden */
    }

	unblock(): void {
        /* Implementation Hidden */
    }

	ready(): void {
        /* Implementation Hidden */
    }

	stop(): void {
        /* Implementation Hidden */
    }

	onStop(fn: (...args: any[]) => void): void {
        /* Implementation Hidden */
    }

	added(collection: string, id: string, fields: any): void {
        /* Implementation Hidden */
    }

	changed(collection: string, id: string, fields: any): void {
        /* Implementation Hidden */
    }

	removed(collection: string, id: string): void {
        /* Implementation Hidden */
    }

	get userId() {
		return this.client.userId ?? null;
	}
}

```