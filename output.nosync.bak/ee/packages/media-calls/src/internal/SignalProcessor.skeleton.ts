## File: ee/packages/media-calls/src/internal/SignalProcessor.ts

```typescript
import type { IMediaCall, IUser } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { isPendingState } from '@rocket.chat/media-signaling';
import type {
	ClientMediaSignal,
	ClientMediaSignalRegister,
	ClientMediaSignalRequestCall,
	ServerMediaSignal,
	ServerMediaSignalRejectedCallRequest,
} from '@rocket.chat/media-signaling';
import { MediaCalls } from '@rocket.chat/models';

import { DEFAULT_CALL_FEATURES } from '../constants';
import type { InternalCallParams, SignalProcessingOptions } from '../definition/common';
import { logger } from '../logger';
import { mediaCallDirector } from '../server/CallDirector';
import { UserActorAgent } from './agents/UserActorAgent';
import { getCallRoleForUser } from '../server/getCallRoleForUser';
import { getNewCallSignal } from '../server/signals/getNewCallSignal';
import { getSignalsForExistingCall } from '../server/signals/getSignalsForExistingCall';
import { stripSensitiveDataFromSignal } from '../server/stripSensitiveData';

export type SignalProcessorEvents = {
	signalRequest: { toUid: IUser['_id']; signal: ServerMediaSignal };
	callRequest: { params: InternalCallParams };
};

export class GlobalSignalProcessor {
	public readonly emitter: Emitter<SignalProcessorEvents>;

	constructor() {
        /* Implementation Hidden */
    }

	public async processSignal(uid: IUser['_id'], signal: ClientMediaSignal, options: SignalProcessingOptions): Promise<void> {
        /* Implementation Hidden */
    }

	protected sendSignal(toUid: IUser['_id'], signal: ServerMediaSignal): void {
        /* Implementation Hidden */
    }

	protected createCall(params: InternalCallParams): void {
        /* Implementation Hidden */
    }

	private async processCallSignal(
		uid: IUser['_id'],
		signal: Exclude<ClientMediaSignal, ClientMediaSignalRegister | ClientMediaSignalRequestCall>,
		{ throwIfSkipped }: SignalProcessingOptions,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async processRegisterSignal(uid: IUser['_id'], signal: ClientMediaSignalRegister): Promise<void> {
        /* Implementation Hidden */
    }

	private async reactToUnknownCall(uid: IUser['_id'], call: IMediaCall, signal: ClientMediaSignalRegister): Promise<void> {
        /* Implementation Hidden */
    }

	private async processRequestCallSignal(uid: IUser['_id'], signal: ClientMediaSignalRequestCall): Promise<void> {
        /* Implementation Hidden */
    }

	private async getExistingRequestedCall(uid: IUser['_id'], signal: ClientMediaSignalRequestCall): Promise<IMediaCall | null> {
        /* Implementation Hidden */
    }

	private rejectCallRequest(uid: IUser['_id'], rejection: Omit<ServerMediaSignalRejectedCallRequest, 'type'>): never {
        /* Implementation Hidden */
    }
}

```