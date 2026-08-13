## File: packages/ddp-client/src/ClientStream.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import { DDPDispatcher } from './DDPDispatcher';
import type { DDPDispatchOptions } from './MinimalDDPClient';
import type { ClientStream } from './types/ClientStream';
import type { DDPClient } from './types/DDPClient';
import type { Subscription } from './types/Subscription';
import type { MethodPayload } from './types/methodsPayloads';
import type { PublicationPayloads } from './types/publicationPayloads';

export class ClientStreamImpl extends Emitter implements ClientStream {
	subscriptions = new Map<string, Subscription>();

	constructor(
		private ddp: DDPClient,
		readonly dispatcher: DDPDispatcher = new DDPDispatcher(),
	) {
        /* Implementation Hidden */
    }

	private apply({
		payload: ddpCallPayload,
		options,
		callback,
	}: {
		payload: MethodPayload;
		callback?: (...args: any[]) => void;
		options?: DDPDispatchOptions;
	}): string {
        /* Implementation Hidden */
    }

	call(method: string, ...params: any[]): string {
        /* Implementation Hidden */
    }

	callWithOptions(method: string, options: DDPDispatchOptions, ...params: any[]): string {
        /* Implementation Hidden */
    }

	callAsync(method: string, ...params: any[]) {
        /* Implementation Hidden */
    }

	callAsyncWithOptions(
		method: string,
		options: DDPDispatchOptions,
		...params: any[]
	): Promise<any> & {
		id: string;
	} {
        /* Implementation Hidden */
    }

	subscribe(name: string, ...params: any[]) {
        /* Implementation Hidden */
    }

	unsubscribe(id: string): Promise<any> {
        /* Implementation Hidden */
    }

	connect(): Promise<any> {
        /* Implementation Hidden */
    }

	onCollection(id: string, callback: (data: PublicationPayloads) => void) {
        /* Implementation Hidden */
    }
}

```