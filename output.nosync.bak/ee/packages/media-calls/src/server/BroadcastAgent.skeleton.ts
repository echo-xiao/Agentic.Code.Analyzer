## File: ee/packages/media-calls/src/server/BroadcastAgent.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import type { ClientMediaSignalBody } from '@rocket.chat/media-signaling';

import { BaseMediaCallAgent } from '../base/BaseAgent';
import { logger } from '../logger';
import { getMediaCallServer } from './injection';
import type { BaseCallProvider } from '../base/BaseCallProvider';

/**
 * This agent doesn't implement any logic
 * What it does is send a notification to other instances reporting that a call has been updated;
 * Then if any server instance is keeping track of this call, it'll load its data from mongo and check what changed
 */
export class BroadcastActorAgent extends BaseMediaCallAgent {
	public provider: BaseCallProvider | null = null;

	public async onCallAccepted(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	public async onCallEnded(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onCallActive(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onCallCreated(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	public async onRemoteDescriptionChanged(callId: string, _negotiationId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onCallTransferred(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onDTMF(callId: string, dtmf: string, duration: number): Promise<void> {
        /* Implementation Hidden */
    }

	protected reportCallUpdated(params: { callId: string; dtmf?: ClientMediaSignalBody<'dtmf'> }): void {
        /* Implementation Hidden */
    }
}

```