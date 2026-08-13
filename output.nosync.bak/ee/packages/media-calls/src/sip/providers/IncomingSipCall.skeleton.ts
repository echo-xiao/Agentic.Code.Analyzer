## File: ee/packages/media-calls/src/sip/providers/IncomingSipCall.ts

```typescript
import type {
	MediaCallSignedContact,
	IMediaCall,
	MediaCallContactInformation,
	MediaCallContact,
	IMediaCallChannel,
} from '@rocket.chat/core-typings';
import { isBusyState, type ClientMediaSignalBody } from '@rocket.chat/media-signaling';
import { MediaCallNegotiations, MediaCalls } from '@rocket.chat/models';
import type { SipMessage, SrfRequest, SrfResponse } from 'drachtio-srf';
import type Srf from 'drachtio-srf';

import { BaseSipCall } from './BaseSipCall';
import { SIP_CALL_FEATURES } from '../../constants';
import { logger } from '../../logger';
import { BroadcastActorAgent } from '../../server/BroadcastAgent';
import { mediaCallDirector } from '../../server/CallDirector';
import { getMediaCallServer } from '../../server/injection';
import type { SipServerSession } from '../Session';
import { SipError, SipErrorCodes } from '../errorCodes';

type IncomingSipCallNegotiation = {
	id: string;
	req: SrfRequest;
	res: SrfResponse;
	isFirst: boolean;
	offer: RTCSessionDescriptionInit | null;
	answer: RTCSessionDescriptionInit | null;
};

export class IncomingSipCall extends BaseSipCall {
	private sipDialog: Srf.Dialog | null;

	private inboundRenegotiations: Map<string, IncomingSipCallNegotiation>;

	private processedTransfer: boolean;

	constructor(
		session: SipServerSession,
		call: IMediaCall,
		protected override readonly agent: BroadcastActorAgent,
		channel: IMediaCallChannel,
		private readonly srf: Srf,
		private readonly req: SrfRequest,
		private readonly res: SrfResponse,
	) {
        /* Implementation Hidden */
    }

	public static async processInvite(session: SipServerSession, srf: Srf, req: SrfRequest, res: SrfResponse): Promise<IncomingSipCall> {
        /* Implementation Hidden */
    }

	public async createDialog(localSdp: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected cancel(res: SipMessage): void {
        /* Implementation Hidden */
    }

	protected async reflectCall(call: IMediaCall, params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processTransferredCall(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	protected async processEndedCall(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private async getPendingInboundNegotiation(): Promise<IncomingSipCallNegotiation | null> {
        /* Implementation Hidden */
    }

	private async processNegotiations(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private async processCalleeNegotiation(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private cancelPendingInvites(errorCode: number): void {
        /* Implementation Hidden */
    }

	private hangupPendingCall(errorCode: number): void {
        /* Implementation Hidden */
    }

	private static async getCalleeFromInvite(req: SrfRequest): Promise<MediaCallContact> {
        /* Implementation Hidden */
    }

	private static async getRocketChatCallerFromInvite(req: SrfRequest): Promise<MediaCallContact | null> {
        /* Implementation Hidden */
    }

	private static async getCallerContactFromInvite(sessionId: string, req: SrfRequest): Promise<MediaCallSignedContact<'sip'>> {
        /* Implementation Hidden */
    }
}

```