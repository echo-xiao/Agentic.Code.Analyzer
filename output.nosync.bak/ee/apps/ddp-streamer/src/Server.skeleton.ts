## File: ee/apps/ddp-streamer/src/Server.ts

```typescript
import { EventEmitter } from 'events';

import type { IServiceMetrics } from '@rocket.chat/core-services';
import { MeteorService, isMeteorError, MeteorError } from '@rocket.chat/core-services';
import { Logger } from '@rocket.chat/logger';
import ejson from 'ejson';
import { v1 as uuidv1 } from 'uuid';
import WebSocket from 'ws';

import type { Client } from './Client';
import { Publication } from './Publication';
import { DDP_EVENTS } from './constants';
import type { IPacket } from './types/IPacket';

const logger = new Logger('DDP-Streamer');

type SubscriptionFn = (this: Publication, eventName: string, options: object) => void;
type MethodFn = (this: Client, ...args: any[]) => any;
type Methods = {
	[k: string]: MethodFn;
};

const handleInternalException = (err: unknown, msg: string): MeteorError => {
    /* Implementation Hidden */
};

export const SERVER_ID = ejson.stringify({ msg: 'server_id', server_id: '0' });

export class Server extends EventEmitter {
	private _subscriptions = new Map<string, SubscriptionFn>();

	private _methods = new Map<string, MethodFn>();

	private metrics?: IServiceMetrics;

	public readonly id = uuidv1();

	serialize = ejson.stringify;

	parse = (data: WebSocket.Data, isBinary: boolean): IPacket => {
		if (isBinary) {
			throw new MeteorError(500, 'Binary data not supported');
		}
		const packet = data.toString();

		const payload = packet.startsWith('[') ? JSON.parse(packet)[0] : packet;
		return ejson.parse(payload);
	};

	setMetrics(metrics: IServiceMetrics): void {
        /* Implementation Hidden */
    }

	async call(client: Client, packet: IPacket): Promise<void> {
        /* Implementation Hidden */
    }

	methods(obj: Methods): void {
        /* Implementation Hidden */
    }

	async subscribe(client: Client, packet: IPacket): Promise<void> {
        /* Implementation Hidden */
    }

	publish(name: string, fn: SubscriptionFn): void {
        /* Implementation Hidden */
    }

	stream(stream: string, fn: SubscriptionFn): void {
        /* Implementation Hidden */
    }

	result(client: Client, { id }: IPacket, result?: any, error?: Error | MeteorError): void {
        /* Implementation Hidden */
    }

	nosub(client: Client, { id }: IPacket, error?: Error | MeteorError): void {
        /* Implementation Hidden */
    }

	ready(client: Client, packet: IPacket): void {
        /* Implementation Hidden */
    }

	added(client: Client, collection: string, id: string, fields: any): void {
        /* Implementation Hidden */
    }

	changed(client: Client, collection: string, id: string, fields: any): void {
        /* Implementation Hidden */
    }

	removed(client: Client, collection: string, id: string): void {
        /* Implementation Hidden */
    }
}

```