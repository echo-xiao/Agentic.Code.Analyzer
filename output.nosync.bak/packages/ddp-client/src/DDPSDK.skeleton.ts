## File: packages/ddp-client/src/DDPSDK.ts

```typescript
import { RestClient } from '@rocket.chat/api-client';

import { ClientStreamImpl } from './ClientStream';
import type { Connection } from './Connection';
import { ConnectionImpl } from './Connection';
import { DDPDispatcher } from './DDPDispatcher';
import { TimeoutControl } from './TimeoutControl';
import type { Account } from './types/Account';
import { AccountImpl } from './types/Account';
import type { ClientStream } from './types/ClientStream';
import type { SDK } from './types/SDK';

interface PublicationPayloads {
	collection: string;
	id: string;
	msg: 'added' | 'changed' | 'removed';
	fields: {
		eventName: string;
		args: [unknown];
	};
}

const isValidPayload = (data: unknown): data is PublicationPayloads => {
    /* Implementation Hidden */
};

export class DDPSDK implements SDK {
	constructor(
		readonly connection: Connection,
		readonly client: ClientStream,
		readonly account: Account,
		readonly timeoutControl: TimeoutControl,
		readonly rest: RestClient,
	) {
        /* Implementation Hidden */
    }

	call(method: string, ...params: unknown[]) {
        /* Implementation Hidden */
    }

	stream(name: string, data: unknown, cb: (...data: PublicationPayloads['fields']['args']) => void) {
        /* Implementation Hidden */
    }

	/**
	 * Compounds the Objects responsible for the SDK and returns it through
	 * SDK interface
	 *
	 * @param url - The URL of the server to connect to
	 * @param retryOptions - The options for the retry strategy of the connection
	 * @param retryOptions.retryCount - The number of times to retry the connection
	 * @param retryOptions.retryTime - The time to wait between retries
	 * @returns The SDK interface
	 *
	 * @example
	 * ```ts
	 * const sdk = DDPSDK.create('wss://open.rocket.chat/websocket');
	 * sdk.connection.connect();
	 * ```
	 */
	static create(url: string, retryOptions = { retryCount: 1, retryTime: 100 }): DDPSDK {
        /* Implementation Hidden */
    }

	/**
	 * Same as `DDPSDK.create`, but also connects to the server and waits for the connection to be established
	 * @param url - The URL of the server to connect to
	 * @param retryOptions - The options for the retry strategy of the connection
	 * @param retryOptions.retryCount - The number of times to retry the connection
	 * @param retryOptions.retryTime - The time to wait between retries
	 * @returns A promise that resolves to the SDK interface
	 * @example
	 * ```ts
	 * const sdk = await DDPSDK.createAndConnect('wss://open.rocket.chat/websocket');
	 * ```
	 */

	static async createAndConnect(url: string, retryOptions = { retryCount: 1, retryTime: 100 }): Promise<DDPSDK> {
        /* Implementation Hidden */
    }
}

```