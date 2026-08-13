## File: ee/packages/media-calls/src/internal/agents/CallSignalProcessor.ts

```typescript
import type {
	IMediaCall,
	IMediaCallChannel,
	MediaCallActorType,
	MediaCallNegotiationStream,
	MediaCallSignedActor,
	MediaCallSignedContact,
} from '@rocket.chat/core-typings';
import { isPendingState, isBusyState } from '@rocket.chat/media-signaling';
import type {
	ClientMediaSignalTransfer,
	CallHangupReason,
	CallRole,
	ClientMediaSignal,
	ClientMediaSignalError,
	ClientMediaSignalLocalState,
	ServerMediaSignal,
	ClientMediaSignalAnswer,
	CallFeature,
} from '@rocket.chat/media-signaling';
import { MediaCallChannels, MediaCallNegotiations, MediaCalls } from '@rocket.chat/models';

import { DEFAULT_CALL_FEATURES } from '../../constants';
import type { IMediaCallAgent } from '../../definition/IMediaCallAgent';
import type { SignalProcessingOptions } from '../../definition/common';
import { logger } from '../../logger';
import { mediaCallDirector } from '../../server/CallDirector';
import { getMediaCallServer } from '../../server/injection';
import { stripSensitiveDataFromSignal } from '../../server/stripSensitiveData';

export class UserActorSignalProcessor {
	public get contractId(): string {
		return this.channel.contractId;
	}

	public get callId(): string {
		return this.channel.callId;
	}

	public get actorId(): string {
		return this.channel.actorId;
	}

	public get actorType(): MediaCallActorType {
		return this.channel.actorType;
	}

	public get role(): CallRole {
		return this.channel.role;
	}

	public get actor(): MediaCallSignedActor {
		return {
			type: this.actorType,
			id: this.actorId,
			contractId: this.contractId,
		};
	}

	public readonly signed: boolean;

	public readonly ignored: boolean;

	private throwIfSkipped: boolean;

	constructor(
		protected readonly agent: IMediaCallAgent,
		protected readonly call: IMediaCall,
		protected readonly channel: IMediaCallChannel,
	) {
        /* Implementation Hidden */
    }

	public async requestWebRTCOffer(params: { negotiationId: string }): Promise<void> {
        /* Implementation Hidden */
    }

	public async processSignal(signal: ClientMediaSignal, options: SignalProcessingOptions = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected async hangup(reason: CallHangupReason): Promise<void> {
        /* Implementation Hidden */
    }

	protected async saveLocalDescription(
		sdp: RTCSessionDescriptionInit,
		negotiationId: string,
		streams?: MediaCallNegotiationStream[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async processAnswer(signal: ClientMediaSignalAnswer): Promise<void> {
        /* Implementation Hidden */
    }

	private async processError(signal: ClientMediaSignalError): Promise<void> {
        /* Implementation Hidden */
    }

	private async processNegotiationNeeded(oldNegotiationId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async startNewNegotiation(): Promise<void> {
        /* Implementation Hidden */
    }

	private async processCallTransfer(to: ClientMediaSignalTransfer['to']): Promise<void> {
        /* Implementation Hidden */
    }

	private async processDTMF(dtmf: string, duration?: number): Promise<void> {
        /* Implementation Hidden */
    }

	protected async clientIsReachable(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async clientHasRejected(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async clientIsUnavailable(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async clientHasAccepted(supportedFeatures: CallFeature[]): Promise<void> {
        /* Implementation Hidden */
    }

	protected async clientIsActive(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async sendSignal(signal: ServerMediaSignal): Promise<void> {
        /* Implementation Hidden */
    }

	protected isCallPending(): boolean {
        /* Implementation Hidden */
    }

	protected isPastNegotiation(): boolean {
        /* Implementation Hidden */
    }

	protected validatePendingCallee(): boolean {
        /* Implementation Hidden */
    }

	private async reviewLocalState(signal: ClientMediaSignalLocalState): Promise<void> {
        /* Implementation Hidden */
    }
}

```