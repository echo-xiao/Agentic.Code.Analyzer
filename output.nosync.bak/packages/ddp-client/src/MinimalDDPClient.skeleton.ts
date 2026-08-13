## File: packages/ddp-client/src/MinimalDDPClient.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { DDPClient } from './types/DDPClient';
import type { IncomingPayload } from './types/IncomingPayload';
import type { OutgoingPayload } from './types/OutgoingPayload';
import type { RemoveListener } from './types/RemoveListener';
import type { ConnectedPayload, ConnectPayload, FailedPayload } from './types/connectionPayloads';
import type { PongPayload } from './types/heartbeatsPayloads';
import type { MethodPayload, ResultPayload, UpdatedPayload } from './types/methodsPayloads';
import type {
	AddedPayload,
	ChangedPayload,
	NosubPayload,
	PublicationPayloads,
	ReadyPayload,
	RemovedPayload,
	ServerPublicationPayloads,
	SubscribePayload,
	UnsubscribePayload,
} from './types/publicationPayloads';

/**
 * Creates a unique id for a DDP client.
 * @returns {string} - A unique id for a DDP client.
 */
const getUniqueId = (() => {
	let id = 0;
	return () => `rc-ddp-client-${++id}`;
})();

const SUPPORTED_DDP_VERSIONS = ['1', 'pre2', 'pre1'];

export interface DDPDispatchOptions {
	wait?: boolean;
}

interface MinimalDDPClientEvents {
	pong: PongPayload;
	connection: ConnectedPayload | FailedPayload;
	message: IncomingPayload;
	send: OutgoingPayload;
	[x: `publication/${string}`]: NosubPayload | ReadyPayload;
	[x: `nosub/${string}`]: NosubPayload;
	[x: `collection/${string}`]: AddedPayload | ChangedPayload | RemovedPayload;
	[x: `result/${string}`]: ResultPayload;
	[x: `updated/${string}`]: UpdatedPayload;
}

/**
 * This class was created to be used together with the `WebSocket` class.
 * It is responsible for low-level communication with the server.
 * It is responsible for sending and receiving messages.
 * It does not provide any procedures for connecting or reconnecting.
 * It does not provide any procedure to handle collections.
 * @example
 * ```ts
 * const socket = new WebSocket('ws://localhost:3000/websocket');
 * const ddp = new MinimalDDPClient(socket.send.bind(socket));
 * ddp.on('message', (data) => {
 *  console.log('Received message', data);
 * });
 * socket.onmessage = ({ data }) => {
 * ddp.handleMessage(data);
 * };
 * ```
 */
export class MinimalDDPClient extends Emitter<MinimalDDPClientEvents> implements DDPClient {
	constructor(
		send?: (params: string) => void,
		readonly encode = JSON.stringify,
		readonly decode = JSON.parse,
	) {
        /* Implementation Hidden */
    }

	/**
	 * @remarks
	 * if the received message is a valid DDP message, it will be emitted as an event.
	 *
	 * @param payload - The incoming message as a string.
	 * @throws {Error} - If the message is not a string.
	 * @throws {Error} - If the message is not a valid JSON.
	 */
	handleMessage(payload: string): void {
        /* Implementation Hidden */
    }

	onDispatchMessage(callback: (msg: string) => void): RemoveListener {
        /* Implementation Hidden */
    }

	protected dispatch(payload: OutgoingPayload): void {
        /* Implementation Hidden */
    }

	call(method: string, params: any[] = []) {
        /* Implementation Hidden */
    }

	subscribe(name: string, params?: any[]): string {
        /* Implementation Hidden */
    }

	subscribeWithId(id: string, name: string, params?: any[]): string {
        /* Implementation Hidden */
    }

	unsubscribe(id: string): void {
        /* Implementation Hidden */
    }

	connect(): void {
        /* Implementation Hidden */
    }

	onPublish(name: string, callback: (payload: ServerPublicationPayloads) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onResult(id: string, callback: (payload: ResultPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onUpdate(id: string, callback: (payload: UpdatedPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onNoSub(id: string, callback: (payload: NosubPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onCollection(name: string, callback: (payload: PublicationPayloads) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onConnection(callback: (payload: ConnectedPayload | FailedPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onceMessage(callback: (payload: IncomingPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	onMessage(callback: (payload: IncomingPayload) => void): RemoveListener {
        /* Implementation Hidden */
    }

	ping(id?: string): void {
        /* Implementation Hidden */
    }

	private pong(id?: string): void {
        /* Implementation Hidden */
    }
}

```