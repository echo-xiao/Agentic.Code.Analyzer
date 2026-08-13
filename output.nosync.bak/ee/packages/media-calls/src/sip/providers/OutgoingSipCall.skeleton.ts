## File: ee/packages/media-calls/src/sip/providers/OutgoingSipCall.ts

```typescript
import type { IMediaCall, IMediaCallChannel, MediaCallSignedContact } from '@rocket.chat/core-typings';
import { isBusyState, type ClientMediaSignalBody, type CallHangupReason } from '@rocket.chat/media-signaling';
import { MediaCallNegotiations, MediaCalls } from '@rocket.chat/models';
import type Srf from 'drachtio-srf';
import type { SrfRequest, SrfResponse } from 'drachtio-srf';

import { BaseSipCall } from './BaseSipCall';
import { SIP_CALL_FEATURES } from '../../constants';
import type { InternalCallParams } from '../../definition/common';
import { logger } from '../../logger';
import { BroadcastActorAgent } from '../../server/BroadcastAgent';
import { mediaCallDirector } from '../../server/CallDirector';
import type { SipServerSession } from '../Session';
import { SipError, SipErrorCodes } from '../errorCodes';

type OutgoingSipCallNegotiation = {
	id: string;
	req: SrfRequest;
	res: SrfResponse;
	isFirst: boolean;
	offer: RTCSessionDescriptionInit | null;
	answer: RTCSessionDescriptionInit | null;
};

export class OutgoingSipCall extends BaseSipCall {
	private sipDialog: Srf.Dialog | null;

	private sipDialogReq: SrfRequest | null;

	private inboundRenegotiations: Map<string, OutgoingSipCallNegotiation>;

	private processedTransfer: boolean;

	constructor(
		session: SipServerSession,
		call: IMediaCall,
		protected override readonly agent: BroadcastActorAgent,
		channel: IMediaCallChannel,
	) {
        /* Implementation Hidden */
    }

	public static async createCall(session: SipServerSession, params: InternalCallParams): Promise<IMediaCall> {
        /* Implementation Hidden */
    }

	protected async reflectCall(call: IMediaCall, params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void> {
        /* Implementation Hidden */
    }

	protected async createDialog(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	protected async getPendingInboundNegotiation(): Promise<OutgoingSipCallNegotiation | null> {
        /* Implementation Hidden */
    }

	protected async processNegotiations(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processCalleeNegotiations(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processTransferredCall(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processEndedCall(): Promise<void> {
        /* Implementation Hidden */
    }

	private getSipErrorCode(error: unknown): number | null {
        /* Implementation Hidden */
    }

	private getHangupReasonForSipErrorCode(errorCode: number | null): CallHangupReason | null {
        /* Implementation Hidden */
    }

	private cancelAnyPendingRequest(): void {
        /* Implementation Hidden */
    }
}

```