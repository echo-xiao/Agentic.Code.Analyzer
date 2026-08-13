## File: packages/ddp-client/src/DDPDispatcher.ts

```typescript
/**
 * A queue of ddp blocking methods that are waiting to be sent to the server.
 */

import { MinimalDDPClient } from './MinimalDDPClient';
import type { OutgoingPayload } from './types/OutgoingPayload';
import type { MethodPayload } from './types/methodsPayloads';

type Blocks = {
	wait: boolean;
	items: MethodPayload[];
};

type Queue = Blocks[];

export class DDPDispatcher extends MinimalDDPClient {
	queue: Queue = [];

	override dispatch(payload: OutgoingPayload, options?: { wait?: boolean }) {
        /* Implementation Hidden */
    }

	wait(block: MethodPayload) {
        /* Implementation Hidden */
    }

	private pushItem(item: MethodPayload) {
        /* Implementation Hidden */
    }

	private tail() {
        /* Implementation Hidden */
    }

	private sendOutstandingBlocks() {
        /* Implementation Hidden */
    }

	removeItem(item: MethodPayload) {
        /* Implementation Hidden */
    }
}

```