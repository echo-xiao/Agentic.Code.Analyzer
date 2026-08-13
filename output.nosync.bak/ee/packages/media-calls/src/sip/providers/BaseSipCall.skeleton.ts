## File: ee/packages/media-calls/src/sip/providers/BaseSipCall.ts

```typescript
import type { IMediaCall, IMediaCallChannel } from '@rocket.chat/core-typings';
import type { ClientMediaSignalBody } from '@rocket.chat/media-signaling';
import { MediaCalls } from '@rocket.chat/models';
import type Srf from 'drachtio-srf';

import { BaseCallProvider } from '../../base/BaseCallProvider';
import { logger } from '../../logger';
import type { BroadcastActorAgent } from '../../server/BroadcastAgent';
import type { SipServerSession } from '../Session';

export abstract class BaseSipCall extends BaseCallProvider {
	protected lastCallState: IMediaCall['state'];

	constructor(
		protected readonly session: SipServerSession,
		call: IMediaCall,
		protected readonly agent: BroadcastActorAgent,
		protected readonly channel: IMediaCallChannel,
	) {
        /* Implementation Hidden */
    }

	public override async reactToCallChanges(params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract reflectCall(call: IMediaCall, params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void>;

	protected async sendDTMF(dialog: Srf.Dialog, dtmf: string, duration: number): Promise<void> {
        /* Implementation Hidden */
    }
}

```