## File: packages/apps/src/server/runtime/base/ProcessMessenger.ts

```typescript
import type { ChildProcess } from 'node:child_process';

import type { JsonRpc } from 'jsonrpc-lite';

import type { COMMAND_PING } from './LivenessManager';
import type { Encoder } from './codec';
import { newEncoder } from './codec';

type Message = JsonRpc | typeof COMMAND_PING;

export class ProcessMessenger {
	private process: ChildProcess | undefined;

	private encoder: Encoder | undefined;

	private _sendStrategy: (message: Message) => void;

	constructor() {
        /* Implementation Hidden */
    }

	public send(message: Message) {
        /* Implementation Hidden */
    }

	public setReceiver(process: ChildProcess) {
        /* Implementation Hidden */
    }

	public clearReceiver() {
        /* Implementation Hidden */
    }

	private switchStrategy() {
        /* Implementation Hidden */
    }

	private strategyError(_message: Message) {
        /* Implementation Hidden */
    }

	private strategySend(message: Message) {
        /* Implementation Hidden */
    }
}

```