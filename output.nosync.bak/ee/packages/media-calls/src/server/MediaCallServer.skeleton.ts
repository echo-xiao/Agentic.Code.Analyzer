## File: ee/packages/media-calls/src/server/MediaCallServer.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type {
	CallFeature,
	CallRejectedReason,
	ClientMediaSignal,
	ClientMediaSignalBody,
	ServerMediaSignal,
} from '@rocket.chat/media-signaling';

import { mediaCallDirector } from './CallDirector';
import { getDefaultSettings } from './getDefaultSettings';
import { stripSensitiveDataFromSignal } from './stripSensitiveData';
import type {
	IMediaCallServer,
	IMediaCallServerSettings,
	MediaCallServerEvents,
	VoipPushNotificationEventType,
} from '../definition/IMediaCallServer';
import { CallRejectedError } from '../definition/common';
import type { SignalProcessingOptions, GetActorContactOptions, InternalCallParams } from '../definition/common';
import { InternalCallProvider } from '../internal/InternalCallProvider';
import { GlobalSignalProcessor } from '../internal/SignalProcessor';
import { logger } from '../logger';
import { SipServerSession } from '../sip/Session';

/**
 * Class used as gateway to send and receive signals to/from clients
 * The actual function used to send the signals needs to be set by the server
 */
export class MediaCallServer implements IMediaCallServer {
	private session: SipServerSession;

	private signalProcessor: GlobalSignalProcessor;

	private settings: IMediaCallServerSettings;

	public emitter: Emitter<MediaCallServerEvents>;

	constructor() {
        /* Implementation Hidden */
    }

	public async receiveSignal(fromUid: IUser['_id'], signal: ClientMediaSignal, options: SignalProcessingOptions = {}): Promise<void> {
        /* Implementation Hidden */
    }

	public sendSignal(toUid: IUser['_id'], signal: ServerMediaSignal): void {
        /* Implementation Hidden */
    }

	public reportCallUpdate(params: { callId: string; dtmf?: ClientMediaSignalBody<'dtmf'> }): void {
        /* Implementation Hidden */
    }

	public updateCallHistory(params: { callId: string }): void {
        /* Implementation Hidden */
    }

	public sendPushNotification(params: { callId: string; event: VoipPushNotificationEventType }): void {
        /* Implementation Hidden */
    }

	public async requestCall(params: InternalCallParams): Promise<void> {
        /* Implementation Hidden */
    }

	public async createCall(params: InternalCallParams): Promise<void> {
        /* Implementation Hidden */
    }

	public receiveCallUpdate(params: { callId: string; dtmf?: ClientMediaSignalBody<'dtmf'> }): void {
        /* Implementation Hidden */
    }

	public async hangupExpiredCalls(): Promise<void> {
        /* Implementation Hidden */
    }

	public scheduleExpirationCheck(): void {
        /* Implementation Hidden */
    }

	public configure(settings: IMediaCallServerSettings): void {
        /* Implementation Hidden */
    }

	public async permissionCheck(uid: IUser['_id'], callType: 'internal' | 'external' | 'any'): Promise<boolean> {
        /* Implementation Hidden */
    }

	public isFeatureAvailableForUser(uid: IUser['_id'], feature: CallFeature): boolean {
        /* Implementation Hidden */
    }

	/**
	 * Receives params for a call a client wishes to do, with actors needing only their basic identification
	 * Returns params for a call that should actually be done, according to server routing rules
	 * Returned value also include full contact information for the actors, when such information is available on the server
	 *
	 * Will throw if a call can't be routed or if one of the user lacks permission for it.
	 * Blocked permissions do not affect the routing rules, meaning a call may be blocked even if it would have been allowed through a different route.
	 * */
	private async parseCallContacts(params: InternalCallParams): Promise<InternalCallParams> {
        /* Implementation Hidden */
    }

	private getCalleeContactOptions(): GetActorContactOptions {
        /* Implementation Hidden */
    }
}

```