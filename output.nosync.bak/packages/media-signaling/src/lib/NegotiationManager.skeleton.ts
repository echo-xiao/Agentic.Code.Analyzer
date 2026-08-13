## File: packages/media-signaling/src/lib/NegotiationManager.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { IClientMediaCall, IWebRTCProcessor, NegotiationManagerEvents, NegotiationManagerConfig } from '../definition';
import { Negotiation } from './services/webrtc/Negotiation';

export class NegotiationManager {
	public readonly emitter: Emitter<NegotiationManagerEvents>;

	public get currentNegotiationId(): string | null {
		return this.currentNegotiation?.negotiationId || this.highestNegotiationId;
	}

	public get hasFinishedAnyNegotiation(): boolean {
		return Boolean(this.highestFinishedNegotiationId);
	}

	protected negotiations: Map<string, Negotiation>;

	/** negotiation actively being processed, null once completed */
	protected currentNegotiation: Negotiation | null;

	protected highestProcessedSequence: number;

	protected highestImpoliteSequence: number;

	protected highestSequence: number;

	protected webrtcProcessor: IWebRTCProcessor | null;

	/** id of the newest negotiation that has reached the processing state */
	protected highestNegotiationId: string | null;

	/** id of the newest negotiation, regardless of state */
	protected highestKnownNegotiationId: string | null;

	/** id of the newest negotiation that has finished processing */
	protected highestFinishedNegotiationId: string | null;

	constructor(
		protected readonly call: IClientMediaCall,
		protected readonly config: NegotiationManagerConfig,
	) {
        /* Implementation Hidden */
    }

	public async addNegotiation(
		negotiationId: string,
		remoteOffer: RTCSessionDescriptionInit | null = null,
		negotiationSequence: number | null = null,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async setRemoteDescription(
		negotiationId: string,
		remoteDescription: RTCSessionDescriptionInit,
		negotiationSequence: number | null = null,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public setWebRTCProcessor(webrtcProcessor: IWebRTCProcessor) {
        /* Implementation Hidden */
    }

	public async processNegotiations(): Promise<void> {
        /* Implementation Hidden */
    }

	protected isPoliteClient(): boolean {
        /* Implementation Hidden */
    }

	protected addToQueue(negotiation: Negotiation): void {
        /* Implementation Hidden */
    }

	protected getNextInQueue(): Negotiation | null {
        /* Implementation Hidden */
    }

	protected async processNegotiation(this: WebRTCNegotiationManager, negotiation: Negotiation): Promise<void> {
        /* Implementation Hidden */
    }

	public isConfigured(): this is WebRTCNegotiationManager {
        /* Implementation Hidden */
    }

	protected isFulfillingNegotiationQueued(): boolean {
        /* Implementation Hidden */
    }

	protected onWebRTCNegotiationNeeded(): void {
        /* Implementation Hidden */
    }

	protected onWebRTCInternalError({ critical, error }: { critical: boolean; error: string | Error; errorDetails?: string }): void {
        /* Implementation Hidden */
    }
}

abstract class WebRTCNegotiationManager extends NegotiationManager {
	protected abstract override webrtcProcessor: IWebRTCProcessor;
}

```