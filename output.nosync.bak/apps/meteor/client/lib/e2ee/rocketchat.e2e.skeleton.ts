## File: apps/meteor/client/lib/e2ee/rocketchat.e2e.ts

```typescript
import QueryString from 'querystring';
import URL from 'url';

import type { IE2EEMessage, IMessage, IRoom, IUser, IUploadWithUser, Serialized, IE2EEPinnedMessage } from '@rocket.chat/core-typings';
import { isE2EEMessage, isEncryptedMessageContent } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { isTruthy } from '@rocket.chat/tools';
import { imperativeModal } from '@rocket.chat/ui-client';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import sampleSize from 'lodash/sampleSize';

import type { E2EEState } from './E2EEState';
import * as Rsa from './crypto/rsa';
import { generatePassphrase } from './helper';
import { Keychain } from './keychain';
import { createLogger } from './logger';
import { E2ERoom } from './rocketchat.e2e.room';
import { limitQuoteChain } from '../../../app/ui-message/client/messageBox/limitQuoteChain';
import { getUserAvatarURL } from '../../../app/utils/client';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { t } from '../../../app/utils/lib/i18n';
import { createQuoteAttachment } from '../../../lib/createQuoteAttachment';
import { getMessageUrlRegex } from '../../../lib/getMessageUrlRegex';
import { Rooms, Subscriptions } from '../../stores';
import EnterE2EPasswordModal from '../../views/e2e/EnterE2EPasswordModal';
import SaveE2EPasswordModal from '../../views/e2e/SaveE2EPasswordModal';
import * as banners from '../banners';
import type { LegacyBannerPayload } from '../banners';
import { getDdpSdk } from '../sdk/ddpSdk';
import { STORAGE_KEYS, getStoredItem, removeStoredItem, setStoredItem } from '../sdk/storage';
import { settings } from '../settings';
import { dispatchToastMessage } from '../toast';
import { mapMessageFromApi } from '../utils/mapMessageFromApi';

let failedToDecodeKey = false;

const log = createLogger('E2E');

type KeyPair = {
	public_key: string | null;
	private_key: string | null;
};

const ROOM_KEY_EXCHANGE_SIZE = 10;

class E2E extends Emitter {
	private userId: string | false = false;

	private keychain: Keychain;

	private instancesByRoomId: Record<IRoom['_id'], E2ERoom> = {};

	private db_public_key: string | null | undefined;

	private db_private_key: string | null | undefined;

	public privateKey: Rsa.PrivateKey | undefined;

	public publicKey: string | undefined;

	private keyDistributionInterval: ReturnType<typeof setInterval> | null = null;

	private state: E2EEState;

	constructor() {
        /* Implementation Hidden */
    }

	getState() {
        /* Implementation Hidden */
    }

	isEnabled(): boolean {
        /* Implementation Hidden */
    }

	isReady(): boolean {
        /* Implementation Hidden */
    }

	async onE2EEReady() {
        /* Implementation Hidden */
    }

	async onSubscriptionChanged(sub: SubscriptionWithRoom): Promise<void> {
        /* Implementation Hidden */
    }

	private unsubscribeFromSubscriptions: (() => void) | undefined;

	observeSubscriptions() {
        /* Implementation Hidden */
    }

	setState(nextState: E2EEState) {
        /* Implementation Hidden */
    }

	async handleAsyncE2EESuggestedKey() {
        /* Implementation Hidden */
    }

	private waitForRoom(rid: IRoom['_id']): Promise<IRoom> {
        /* Implementation Hidden */
    }

	async getInstanceByRoomId(rid: IRoom['_id']): Promise<E2ERoom | null> {
        /* Implementation Hidden */
    }

	removeInstanceByRoomId(rid: IRoom['_id']): void {
        /* Implementation Hidden */
    }

	private async persistKeys(
		{ public_key, private_key }: KeyPair,
		password: string,
		{ force }: { force: boolean } = { force: false },
	): Promise<void> {
        /* Implementation Hidden */
    }

	async acceptSuggestedKey(rid: string): Promise<void> {
        /* Implementation Hidden */
    }

	async rejectSuggestedKey(rid: string): Promise<void> {
        /* Implementation Hidden */
    }

	getKeysFromLocalStorage(): KeyPair {
        /* Implementation Hidden */
    }

	initiateHandshake() {
        /* Implementation Hidden */
    }

	openSaveE2EEPasswordModal(randomPassword: string) {
        /* Implementation Hidden */
    }

	async startClient(userId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async stopClient(): Promise<void> {
        /* Implementation Hidden */
    }

	async changePassword(newPassword: string): Promise<void> {
        /* Implementation Hidden */
    }

	async loadKeysFromDB(): Promise<void> {
        /* Implementation Hidden */
    }

	async loadKeys({ public_key, private_key }: { public_key: string; private_key: string }): Promise<void> {
        /* Implementation Hidden */
    }

	async createAndLoadKeys(): Promise<void> {
        /* Implementation Hidden */
    }

	async requestSubscriptionKeys(): Promise<void> {
        /* Implementation Hidden */
    }

	async createRandomPassword(): Promise<string> {
        /* Implementation Hidden */
    }

	openEnterE2EEPasswordModal(onEnterE2EEPassword: (password: string) => Promise<void>) {
        /* Implementation Hidden */
    }

	async requestPasswordAlert(validatePassword: (password: string) => Promise<void>): Promise<void> {
        /* Implementation Hidden */
    }

	async requestPasswordModal(validatePassword: (password: string) => Promise<void>): Promise<void> {
        /* Implementation Hidden */
    }

	async decodePrivateKeyFlow() {
        /* Implementation Hidden */
    }

	async decodePrivateKey(privateKey: string): Promise<string> {
        /* Implementation Hidden */
    }

	async decryptFileContent(file: IUploadWithUser): Promise<IUploadWithUser> {
        /* Implementation Hidden */
    }

	async decryptMessage(message: IMessage | IE2EEMessage): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async decryptPinnedMessage(message: IE2EEPinnedMessage) {
        /* Implementation Hidden */
    }

	async decryptSubscription(subscription: SubscriptionWithRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async decryptSubscriptions(): Promise<void> {
        /* Implementation Hidden */
    }

	openAlert(config: Omit<LegacyBannerPayload, 'id'>): void {
        /* Implementation Hidden */
    }

	closeAlert(): void {
        /* Implementation Hidden */
    }

	async parseQuoteAttachment(message: IE2EEMessage): Promise<IE2EEMessage> {
        /* Implementation Hidden */
    }

	async getSuggestedE2EEKeys(usersWaitingForE2EKeys: Record<IRoom['_id'], { _id: IUser['_id']; public_key: string }[]>) {
        /* Implementation Hidden */
    }

	async getSample(roomIds: string[], limit = 3): Promise<string[]> {
        /* Implementation Hidden */
    }

	getUserId(): string {
        /* Implementation Hidden */
    }

	async initiateKeyDistribution() {
        /* Implementation Hidden */
    }
}

export const e2e = new E2E();

getDdpSdk().account.onLogout(() => {
	void e2e.stopClient();
});

```