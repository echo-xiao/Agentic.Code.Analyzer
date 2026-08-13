## File: ee/packages/media-calls/src/server/CallDirector.ts

```typescript
import { randomUUID } from 'node:crypto';

import type {
	IMediaCall,
	IMediaCallNegotiation,
	MediaCallContact,
	MediaCallSignedContact,
	ServerActor,
	MediaCallNegotiationStream,
} from '@rocket.chat/core-typings';
import type { CallFeature, CallHangupReason, CallRole } from '@rocket.chat/media-signaling';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { MediaCallNegotiations, MediaCalls } from '@rocket.chat/models';

import { getCastDirector, getMediaCallServer } from './injection';
import type { IMediaCallAgent } from '../definition/IMediaCallAgent';
import type { IMediaCallCastDirector } from '../definition/IMediaCallCastDirector';
import type { InternalCallParams, MediaCallHeader } from '../definition/common';
import { logger } from '../logger';

const EXPIRATION_TIME = 120000;
const EXPIRATION_CHECK_TIMEOUT = EXPIRATION_TIME + 1000;

export type CreateCallParams = InternalCallParams & {
	callerAgent: IMediaCallAgent;
	calleeAgent: IMediaCallAgent;
};

// expiration checks by call id
const scheduledExpirationChecks = new Map<string, ReturnType<typeof setTimeout>>();

class MediaCallDirector {
	public async hangup(call: IMediaCall, actorAgent: IMediaCallAgent, reason: CallHangupReason): Promise<void> {
        /* Implementation Hidden */
    }

	public async hangupByServer(call: MediaCallHeader, serverErrorCode: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async activate(call: IMediaCall, actorAgent: IMediaCallAgent): Promise<void> {
        /* Implementation Hidden */
    }

	public async acceptCall(
		call: MediaCallHeader,
		calleeAgent: IMediaCallAgent,
		data: { calleeContractId: string; webrtcAnswer?: RTCSessionDescriptionInit; supportedFeatures: CallFeature[] },
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async startFirstNegotiation(
		call: MediaCallHeader,
		offer?: RTCSessionDescriptionInit,
	): Promise<IMediaCallNegotiation['_id'] | null> {
        /* Implementation Hidden */
    }

	public async startNewNegotiation(
		call: MediaCallHeader,
		offerer: CallRole,
		offer?: RTCSessionDescriptionInit,
	): Promise<IMediaCallNegotiation['_id']> {
        /* Implementation Hidden */
    }

	public get cast(): IMediaCallCastDirector {
		try {
			return getCastDirector();
		} catch (err) {
			logger.error({ msg: 'Failed to access castDirector', err });
			throw err;
		}
	}

	public async saveWebrtcSession(
		call: IMediaCall,
		fromAgent: IMediaCallAgent,
		session: { sdp: RTCSessionDescriptionInit; negotiationId: string; streams?: MediaCallNegotiationStream[] },
		contractId: string,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async createCall(params: CreateCallParams): Promise<IMediaCall> {
        /* Implementation Hidden */
    }

	public async transferCall(
		call: MediaCallHeader,
		to: MediaCallContact,
		by: MediaCallSignedContact,
		agent: IMediaCallAgent,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async hangupTransferredCallById(callId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async hangupExpiredCalls(): Promise<void>;

	public async hangupExpiredCalls(expectedCallId: string): Promise<boolean>;

	public async hangupExpiredCalls(expectedCallId?: string): Promise<boolean | void> {
        /* Implementation Hidden */
    }

	public getNewExpirationTime(): Date {
        /* Implementation Hidden */
    }

	public async renewCallId(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public scheduleExpirationCheckByCallId(callId: string): void {
        /* Implementation Hidden */
    }

	public scheduleExpirationCheck(): void {
        /* Implementation Hidden */
    }

	public async runOnCallCreatedForAgent(call: IMediaCall, agent: IMediaCallAgent, agentToNotifyIfItFails?: IMediaCallAgent): Promise<void> {
        /* Implementation Hidden */
    }

	public async hangupCallById(callId: string, params?: { endedBy?: IMediaCall['endedBy']; reason?: string }): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async hangupCallByIdAndNotifyAgents(
		callId: string,
		agents: IMediaCallAgent[],
		params?: { endedBy?: IMediaCall['endedBy']; reason?: string },
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async hangupDetachedCall(call: MediaCallHeader, params?: { endedBy?: IMediaCall['endedBy']; reason?: string }): Promise<boolean> {
        /* Implementation Hidden */
    }
}

export const mediaCallDirector = new MediaCallDirector();

```