## File: packages/ddp-client/src/Connection.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { DDPClient } from './types/DDPClient';

// type Subscription = {
// 	name: string;
// 	params: unknown[];
// 	id: string;
// 	status: 'queued' | 'subscribing' | 'ready' | 'error';
// };

// type Method = {
// 	method: string;
// 	params: unknown[];
// 	id: string;
// 	status: 'queued' | 'calling' | 'ready' | 'error';
// };

type RetryOptions = {
	retryCount: number;
	retryTimer?: NodeJS.Timeout;
	retryTime: number;
};

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed' | 'closed' | 'disconnected' | 'reconnecting';

export interface Connection
	extends Emitter<{
		connection: ConnectionStatus;
		connecting: void;
		connected: string;
		disconnected: void;
		reconnecting: void;
		close: void;
	}> {
	url: string;
	ssl: boolean;

	session?: string;

	status: ConnectionStatus;

	connect(): Promise<boolean>;

	reconnect(): Promise<boolean>;

	close(): void;
}

interface WebSocketConstructor {
	new (url: string | URL, protocols?: string | string[]): WebSocket;
}

export class ConnectionImpl
	extends Emitter<{
		connection: ConnectionStatus;
		connecting: void;
		connected: string;
		disconnected: void;
		reconnecting: void;
		close: void;
	}>
	implements Connection
{
	ssl: boolean;

	url: string;

	session?: string;

	status: ConnectionStatus = 'idle';

	ws: WebSocket | undefined;

	retryCount = 0;

	private connectPromise?: Promise<boolean>;

	public queue = new Set<string>();

	constructor(
		url: string,
		private WS: WebSocketConstructor,
		private client: DDPClient,
		readonly retryOptions: RetryOptions = { retryCount: 0, retryTime: 1000 },
	) {
        /* Implementation Hidden */
    }

	private emitStatus() {
        /* Implementation Hidden */
    }

	reconnect(): Promise<boolean> {
        /* Implementation Hidden */
    }

	connect() {
        /* Implementation Hidden */
    }

	close() {
        /* Implementation Hidden */
    }

	static create(
		url: string,
		webSocketImpl: WebSocketConstructor,
		client: DDPClient,
		retryOptions: RetryOptions = { retryCount: 0, retryTime: 1000 },
	): ConnectionImpl {
        /* Implementation Hidden */
    }
}

```