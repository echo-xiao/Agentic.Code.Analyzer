## File: packages/media-signaling/src/lib/services/webrtc/Negotiation.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { IMediaSignalLogger, IWebRTCProcessor, NegotiationData, NegotiationEvents } from '../../../definition';

export class Negotiation {
	public readonly emitter: Emitter<NegotiationEvents>;

	public get started() {
		return this._startedProcessing;
	}

	/** Returns true when the negotiation will no longer process anything, no matter the reason */
	public get ended() {
		return this._ended;
	}

	public get isLocal(): boolean {
		return !this.remoteOffer;
	}

	public get finished(): boolean {
		return this._finished;
	}

	public readonly negotiationId: string;

	public readonly sequence: number;

	public readonly isPolite: boolean;

	protected webrtcProcessor: IWebRTCProcessor | null;

	protected remoteOffer: RTCSessionDescriptionInit | null;

	protected _ended: boolean;

	protected _startedProcessing: boolean;

	protected _failed: boolean;

	protected _finished: boolean;

	constructor(
		negotiation: NegotiationData,
		protected readonly logger?: IMediaSignalLogger | null,
	) {
        /* Implementation Hidden */
    }

	public end(finished = false): void {
        /* Implementation Hidden */
    }

	public async process(webrtcProcessor: IWebRTCProcessor): Promise<void> {
        /* Implementation Hidden */
    }

	public async setRemoteAnswer(sdp: RTCSessionDescriptionInit): Promise<void> {
        /* Implementation Hidden */
    }

	protected async setLocalDescription(this: WebRTCNegotiation, sdp: RTCSessionDescriptionInit): Promise<void> {
        /* Implementation Hidden */
    }

	protected setWebRTCProcessor(webrtcProcessor: IWebRTCProcessor): asserts this is WebRTCNegotiation {
        /* Implementation Hidden */
    }

	protected isWebRTCNegotiation(): this is WebRTCNegotiation {
        /* Implementation Hidden */
    }

	protected assertNegotiationIsActive(): void {
        /* Implementation Hidden */
    }

	protected async createLocalOffer(this: WebRTCNegotiation): Promise<void> {
        /* Implementation Hidden */
    }

	protected async createLocalAnswer(this: WebRTCNegotiation, remoteOffer: RTCSessionDescriptionInit): Promise<void> {
        /* Implementation Hidden */
    }

	protected fail(errorCode: string): void {
        /* Implementation Hidden */
    }

	protected async setPeerRemoteDescription(this: WebRTCNegotiation, remoteDescription: RTCSessionDescriptionInit): Promise<void> {
        /* Implementation Hidden */
    }

	protected async createEarlyAnswer(this: WebRTCNegotiation): Promise<RTCSessionDescriptionInit> {
        /* Implementation Hidden */
    }

	protected async setPeerLocalDescription(this: WebRTCNegotiation, localDescription: RTCSessionDescriptionInit): Promise<void> {
        /* Implementation Hidden */
    }

	protected getPeerLocalDescription(this: WebRTCNegotiation): RTCSessionDescriptionInit {
        /* Implementation Hidden */
    }
}

export abstract class WebRTCNegotiation extends Negotiation {
	protected abstract override webrtcProcessor: IWebRTCProcessor;
}

```