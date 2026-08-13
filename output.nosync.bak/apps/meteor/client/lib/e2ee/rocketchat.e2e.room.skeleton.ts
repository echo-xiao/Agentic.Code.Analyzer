## File: apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts

```typescript
import { Base64 } from '@rocket.chat/base64';
import type {
	IE2EEMessage,
	IMessage,
	IRoom,
	ISubscription,
	IUser,
	AtLeast,
	EncryptedMessageContent,
	EncryptedContent,
} from '@rocket.chat/core-typings';
import { isEncryptedMessageContent, isFileAttachment, isRemovedFileAttachment } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type { Optional } from '@tanstack/react-query';
import EJSON from 'ejson';

import type { E2ERoomState } from './E2ERoomState';
import { Binary } from './binary';
import { decodeEncryptedContent } from './content';
import * as Aes from './crypto/aes';
import * as Rsa from './crypto/rsa';
import { encryptAESCTR, generateAESCTRKey, sha256HashFromArrayBuffer, createSha256HashFromText } from './helper';
import { createLogger } from './logger';
import { PrefixedBase64 } from './prefixed';
import { e2e } from './rocketchat.e2e';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { t } from '../../../app/utils/lib/i18n';
import { RoomSettingsEnum } from '../../../definition/IRoomTypeConfig';
import { Messages, Rooms, Subscriptions } from '../../stores';
import { roomCoordinator } from '../rooms/roomCoordinator';

const log = createLogger('E2E:Room');

const KEY_ID = Symbol('keyID');
const PAUSED = Symbol('PAUSED');

type Mutations = { [k in E2ERoomState]?: E2ERoomState[] };

const permitedMutations: Mutations = {
	NOT_STARTED: ['ESTABLISHING', 'DISABLED', 'KEYS_RECEIVED'],
	READY: ['DISABLED', 'CREATING_KEYS', 'WAITING_KEYS'],
	ERROR: ['KEYS_RECEIVED', 'NOT_STARTED'],
	WAITING_KEYS: ['KEYS_RECEIVED', 'ERROR', 'DISABLED'],
	ESTABLISHING: ['READY', 'KEYS_RECEIVED', 'ERROR', 'DISABLED', 'WAITING_KEYS', 'CREATING_KEYS'],
};

const filterMutation = (currentState: E2ERoomState | undefined, nextState: E2ERoomState): E2ERoomState | false => {
    /* Implementation Hidden */
};

export class E2ERoom extends Emitter {
	state: E2ERoomState | undefined = undefined;

	[PAUSED]: boolean | undefined = undefined;

	[KEY_ID]: string;

	userId: string;

	roomId: string;

	typeOfRoom: string;

	roomKeyId: string | undefined;

	groupSessionKey: Aes.Key | null = null;

	oldKeys: { E2EKey: Aes.Key | null; ts: Date; e2eKeyId: string }[] | undefined;

	sessionKeyExportedString: string | undefined;

	sessionKeyExported: Aes.Jwk | undefined;

	constructor(userId: string, room: IRoom) {
        /* Implementation Hidden */
    }

	hasSessionKey() {
        /* Implementation Hidden */
    }

	getState() {
        /* Implementation Hidden */
    }

	setState(requestedState: E2ERoomState) {
        /* Implementation Hidden */
    }

	isReady() {
        /* Implementation Hidden */
    }

	isDisabled() {
        /* Implementation Hidden */
    }

	enable() {
        /* Implementation Hidden */
    }

	disable() {
        /* Implementation Hidden */
    }

	pause() {
        /* Implementation Hidden */
    }

	resume() {
        /* Implementation Hidden */
    }

	keyReceived() {
        /* Implementation Hidden */
    }

	async shouldConvertSentMessages(message: { msg?: string }) {
        /* Implementation Hidden */
    }

	shouldConvertReceivedMessages() {
        /* Implementation Hidden */
    }

	isWaitingKeys() {
        /* Implementation Hidden */
    }

	get keyID() {
		return this[KEY_ID];
	}

	set keyID(keyID) {
		this[KEY_ID] = keyID;
	}

	async decryptSubscription() {
        /* Implementation Hidden */
    }

	async decryptOldRoomKeys() {
        /* Implementation Hidden */
    }

	async exportOldRoomKeys(oldKeys: ISubscription['oldRoomKeys']) {
        /* Implementation Hidden */
    }

	async decryptPendingMessages() {
        /* Implementation Hidden */
    }

	// Initiates E2E Encryption
	async handshake() {
        /* Implementation Hidden */
    }

	isSupportedRoomType(type: string) {
        /* Implementation Hidden */
    }

	async decryptSessionKey(key: string) {
        /* Implementation Hidden */
    }

	async exportSessionKey(key: string) {
        /* Implementation Hidden */
    }

	async importGroupKey(groupKey: string) {
        /* Implementation Hidden */
    }

	async createNewGroupKey() {
        /* Implementation Hidden */
    }

	async createGroupKey() {
        /* Implementation Hidden */
    }

	async resetRoomKey() {
        /* Implementation Hidden */
    }

	onRoomKeyReset(keyID: string) {
        /* Implementation Hidden */
    }

	async encryptKeyForOtherParticipants() {
        /* Implementation Hidden */
    }

	async encryptOldKeysForParticipant(publicKey: string, oldRoomKeys: { E2EKey: string; e2eKeyId: string; ts: Date }[]) {
        /* Implementation Hidden */
    }

	async encryptGroupKeyForParticipant(publicKey: string) {
        /* Implementation Hidden */
    }

	// Encrypts files before upload. I/O is in arraybuffers.
	async encryptFile(file: File) {
        /* Implementation Hidden */
    }

	// Encrypts messages
	async encryptText(data: Uint8Array<ArrayBuffer>) {
        /* Implementation Hidden */
    }

	// Helper function for encryption of content
	async encryptMessageContent(
		contentToBeEncrypted: Pick<IMessage, 'attachments' | 'files' | 'file'> & Optional<Pick<IMessage, 'msg'>, 'msg'>,
	) {
        /* Implementation Hidden */
    }

	// Helper function for encryption of content
	async encryptMessage(message: AtLeast<IMessage, '_id' | 'rid' | 'msg'>): Promise<IE2EEMessage> {
        /* Implementation Hidden */
    }

	async decryptContent<T extends EncryptedMessageContent>(data: T) {
        /* Implementation Hidden */
    }

	async decryptMessageContent(message: IE2EEMessage): Promise<IE2EEMessage> {
        /* Implementation Hidden */
    }

	// Decrypt messages
	async decryptMessage(message: IMessage | IE2EEMessage): Promise<IE2EEMessage | IMessage> {
        /* Implementation Hidden */
    }

	async decrypt(message: string | EncryptedContent): Promise<Pick<Partial<IMessage>, 'attachments' | 'files' | 'file' | 'msg'>> {
        /* Implementation Hidden */
    }

	private retrieveDecryptionKey(kid: string): Aes.Key | null {
        /* Implementation Hidden */
    }

	provideKeyToUser(keyId: string) {
        /* Implementation Hidden */
    }

	onStateChange(cb: () => void) {
        /* Implementation Hidden */
    }

	async encryptGroupKeyForParticipantsWaitingForTheKeys(users: { _id: IUser['_id']; public_key: string }[]) {
        /* Implementation Hidden */
    }
}

```