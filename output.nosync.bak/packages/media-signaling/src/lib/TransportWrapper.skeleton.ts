## File: packages/media-signaling/src/lib/TransportWrapper.ts

```typescript
import type { CallAnswer, CallFeature, CallHangupReason } from '../definition';
import type { IMediaSignalLogger } from '../definition/logger';
import type {
	MediaSignalTransport,
	ClientMediaSignalType,
	ClientMediaSignalBody,
	GenericClientMediaSignal,
	ClientMediaSignal,
	ClientMediaSignalError,
} from '../definition/signals';

export class MediaSignalTransportWrapper {
	constructor(
		public readonly contractId: string,
		private sendSignalFn: MediaSignalTransport<ClientMediaSignal>,
		private logger?: IMediaSignalLogger,
	) {
        /* Implementation Hidden */
    }

	public sendToServer<T extends ClientMediaSignalType>(callId: string, type: T, signal: ClientMediaSignalBody<T>) {
        /* Implementation Hidden */
    }

	public sendError(callId: string, { errorType, errorCode, negotiationId, critical, errorDetails }: Partial<ClientMediaSignalError>) {
        /* Implementation Hidden */
    }

	public answer(callId: string, answer: CallAnswer, extraData: { supportedFeatures?: CallFeature[] } = {}) {
        /* Implementation Hidden */
    }

	public hangup(callId: string, reason: CallHangupReason) {
        /* Implementation Hidden */
    }

	public requestRenegotiation(callId: string, oldNegotiationId: string) {
        /* Implementation Hidden */
    }

	public sendSignal(signal: ClientMediaSignal): void {
        /* Implementation Hidden */
    }
}

```