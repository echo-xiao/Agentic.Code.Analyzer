## File: apps/meteor/server/services/media-call/service.ts

```typescript
import { api, Presence, ServiceClassInternal, type IMediaCallService, Authorization } from '@rocket.chat/core-services';
import type {
	IMediaCall,
	IUser,
	IRoom,
	IInternalMediaCallHistoryItem,
	CallHistoryItemState,
	IExternalMediaCallHistoryItem,
} from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';
import { callServer, type IMediaCallServerSettings, getSignalsForExistingCall } from '@rocket.chat/media-calls';
import type {
	CallFeature,
	ClientMediaSignal,
	ServerMediaSignal,
	ServerMediaCallSignal,
	ClientMediaSignalAnswer,
} from '@rocket.chat/media-signaling';
import { isClientMediaSignal } from '@rocket.chat/media-signaling';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { CallHistory, MediaCalls, Rooms, Users } from '@rocket.chat/models';
import { callStateToTranslationKey, getHistoryMessagePayload } from '@rocket.chat/ui-voip/dist/ui-kit/getHistoryMessagePayload';

import { logger } from './logger';
import { sendVoipPushNotification } from './push/sendVoipPushNotification';
import { settings } from '../../../app/settings/server';
import { i18n } from '../../lib/i18n';
import { sendMessage } from '../../lib/messages/sendMessage';
import { createDirectMessage } from '../../methods/createDirectMessage';

export class MediaCallService extends ServiceClassInternal implements IMediaCallService {
	protected name = 'media-call';

	constructor() {
        /* Implementation Hidden */
    }

	public async answerCall(uid: IUser['_id'], params: Omit<ClientMediaSignalAnswer, 'type'>): Promise<IMediaCall> {
        /* Implementation Hidden */
    }

	public async processSignal(uid: IUser['_id'], signal: ClientMediaSignal): Promise<void> {
        /* Implementation Hidden */
    }

	public async processSerializedSignal(uid: IUser['_id'], signal: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async hangupExpiredCalls(): Promise<void> {
        /* Implementation Hidden */
    }

	public async getUserStateSignals(uid: IUser['_id'], contractId: string): Promise<ServerMediaCallSignal[]> {
        /* Implementation Hidden */
    }

	private async saveCallToHistory(callId: IMediaCall['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async saveExternalCallToHistory(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private getContactDataForInternalHistory(
		contact: IMediaCall['caller'] | IMediaCall['callee'],
	): Pick<IInternalMediaCallHistoryItem, 'contactId' | 'contactName' | 'contactUsername'> {
        /* Implementation Hidden */
    }

	private async saveInternalCallToHistory(call: IMediaCall): Promise<void> {
        /* Implementation Hidden */
    }

	private getLanguageForUser(language?: string): string {
        /* Implementation Hidden */
    }

	private async sendHistoryMessage(call: IMediaCall, room: IRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private getCallDuration(call: IMediaCall): number {
        /* Implementation Hidden */
    }

	private getCallHistoryItemState(call: IMediaCall): CallHistoryItemState {
        /* Implementation Hidden */
    }

	private async getRoomIdForInternalCall(call: IMediaCall): Promise<IRoom> {
        /* Implementation Hidden */
    }

	private async setPresenceForUsers(uids: IUser['_id'][], callId: IMediaCall['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async clearPresenceForUsers(uids: IUser['_id'][], callId: IMediaCall['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async sendSignal(toUid: IUser['_id'], signal: ServerMediaSignal): Promise<void> {
        /* Implementation Hidden */
    }

	private configureMediaCallServer(): void {
        /* Implementation Hidden */
    }

	private getMediaServerSettings(): IMediaCallServerSettings {
        /* Implementation Hidden */
    }

	private userHasFeaturePermission(_uid: IUser['_id'], feature: CallFeature): boolean {
        /* Implementation Hidden */
    }

	private async userHasMediaCallPermission(uid: IUser['_id'], callType: 'internal' | 'external' | 'any'): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async deserializeClientSignal(serialized: string): Promise<ClientMediaSignal> {
        /* Implementation Hidden */
    }
}

```