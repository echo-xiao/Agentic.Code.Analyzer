## File: packages/ddp-client/src/TimeoutControl.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { Connection } from './Connection';
import type { DDPClient } from './types/DDPClient';

export interface TimeoutControlEvents
	extends Emitter<{
		timeout: void;
		heartbeat: void;
	}> {
	reset(): void;
	stop(): void;
	readonly timeout: number;
	readonly heartbeat: number;
}

export class TimeoutControl
	extends Emitter<{
		timeout: void;
		heartbeat: void;
	}>
	implements TimeoutControlEvents
{
	private timeoutId: ReturnType<typeof setTimeout> | undefined;

	private heartbeatId: ReturnType<typeof setTimeout> | undefined;

	constructor(
		readonly timeout: number = 60_000,
		readonly heartbeat: number = timeout / 2,
	) {
        /* Implementation Hidden */
    }

	reset() {
        /* Implementation Hidden */
    }

	stop() {
        /* Implementation Hidden */
    }

	static create(ddp: DDPClient, connection: Connection, timeout?: number, heartbeat?: number): TimeoutControl {
        /* Implementation Hidden */
    }
}

```