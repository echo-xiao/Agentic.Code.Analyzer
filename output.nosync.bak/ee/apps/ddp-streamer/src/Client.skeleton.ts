## File: ee/apps/ddp-streamer/src/Client.ts

```typescript
import { EventEmitter } from 'events';
import type { IncomingMessage } from 'http';

import { Presence } from '@rocket.chat/core-services';
import type { ISocketConnection } from '@rocket.chat/core-typings';
import { throttle } from 'underscore';
import { v1 as uuidv1 } from 'uuid';
import type WebSocket from 'ws';

import { SERVER_ID } from './Server';
import { server } from './configureServer';
import { DDP_EVENTS, WS_ERRORS, WS_ERRORS_MESSAGES, TIMEOUT } from './constants';
import type { IPacket } from './types/IPacket';

// TODO why localhost not as 127.0.0.1?
// based on Meteor's implementation (link)
const getClientAddress = (req: IncomingMessage): string | undefined => {
    /* Implementation Hidden */
};

export const clientMap = new WeakMap<WebSocket, Client>();

export class Client extends EventEmitter {
	private chain = Promise.resolve();

	protected timeout: NodeJS.Timeout;

	public readonly session = uuidv1();

	public subscriptions = new Map();

	public connection: ISocketConnection;

	public wait = false;

	public userId?: string;

	public userToken?: string;

	private updatePresence = throttle(
		() => {
			if (this.userId) {
				void Presence.updateConnection(this.userId, this.connection.id).catch((err) => {
					console.error('Error updating connection presence:', err);
				});
			}
		},
		TIMEOUT,
		{ leading: true, trailing: false },
	);

	constructor(
		public ws: WebSocket,
		public meteorClient = false,
		req: IncomingMessage,
	) {
        /* Implementation Hidden */
    }

	greeting(): void {
        /* Implementation Hidden */
    }

	async callMethod(packet: IPacket): Promise<void> {
        /* Implementation Hidden */
    }

	async callSubscribe(packet: IPacket): Promise<void> {
        /* Implementation Hidden */
    }

	process(action: string, packet: IPacket): void {
        /* Implementation Hidden */
    }

	closeTimeout = (): void => {
		this.ws.close(WS_ERRORS.TIMEOUT, WS_ERRORS_MESSAGES.TIMEOUT);
	};

	ping(id?: string): void {
        /* Implementation Hidden */
    }

	pong(id?: string): void {
        /* Implementation Hidden */
    }

	handleIdle = (): void => {
		this.ping();
		this.timeout = setTimeout(this.closeTimeout, TIMEOUT);
	};

	renewTimeout(timeout = TIMEOUT): void {
        /* Implementation Hidden */
    }

	handler = async (payload: WebSocket.Data, isBinary: boolean): Promise<void> => {
		try {
			const packet = server.parse(payload, isBinary);
			this.updatePresence();
			this.emit('message', packet);
			if (this.wait) {
				return new Promise((resolve) => this.once(DDP_EVENTS.LOGGED, () => resolve(this.process(packet.msg, packet))));
			}
			this.process(packet.msg, packet);
		} catch (err) {
			console.error(err);
			return this.ws.close(WS_ERRORS.UNSUPPORTED_DATA, WS_ERRORS_MESSAGES.UNSUPPORTED_DATA);
		}
	};

	encodePayload(payload: string): string {
        /* Implementation Hidden */
    }

	send(payload: string): void {
        /* Implementation Hidden */
    }
}

```