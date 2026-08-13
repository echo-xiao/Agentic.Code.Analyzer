## File: ee/packages/media-calls/src/internal/agents/UserActorAgent.ts

```typescript
import type { IMediaCall, MediaCallSignedContact } from '@rocket.chat/core-typings';
import { isBusyState } from '@rocket.chat/media-signaling';
import type { ClientMediaSignal, ServerMediaSignal, CallFeature } from '@rocket.chat/media-signaling';
import { MediaCallNegotiations, MediaCalls } from '@rocket.chat/models';

import { UserActorSignalProcessor } from './CallSignalProcessor';
import { BaseMediaCallAgent } from '../../base/BaseAgent';
import type { VoipPushNotificationEventType } from '../../definition/IMediaCallServer';
import type { SignalProcessingOptions } from '../../definition/common';
import { logger } from '../../logger';
import { getMediaCallServer } from '../../server/injection';
import { getInitialOfferSignal } from '../../server/signals/getInitialOfferSignal';
import { getNewCallSignal } from '../../server/signals/getNewCallSignal';
import { getStateNotification } from '../../server/signals/getStateNotification';

export class UserActorAgent extends BaseMediaCallAgent {
	public async processSignal(call: IMediaCall, signal: ClientMediaSignal, options?: SignalProcessingOptions): Promise<void> {
        /* Implementation Hidden */
    }

	public async sendSignal(signal: ServerMediaSignal): Promise<void> {
        /* Implementation Hidden */
    }

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

	public async onRemoteDescriptionChanged(callId: string, negotiationId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onCallTransferred(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async onDTMF(callId: string, dtmf: string, duration: number): Promise<void> {
        /* Implementation Hidden */
    }

	private sendPushNotification(params: { callId: string; event: VoipPushNotificationEventType }): void {
        /* Implementation Hidden */
    }
}

```