## File: apps/meteor/client/lib/cachedStores/CachedStore.ts

```typescript
import type { IRocketChatRecord } from '@rocket.chat/core-typings';
import type { StreamNames } from '@rocket.chat/ddp-client';
import { isTruthy } from '@rocket.chat/tools';
import localforage from 'localforage';
import { Meteor } from 'meteor/meteor';
import { create, type StoreApi, type UseBoundStore } from 'zustand';

import { baseURI } from '../baseURI';
import { onLoggedIn } from '../loggedIn';
import { CachedStoresManager } from './CachedStoresManager';
import type { IDocumentMapStore } from './DocumentMapStore';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { withDebouncing } from '../../../lib/utils/highOrderFunctions';
import { getDdpSdk } from '../sdk/ddpSdk';
import { STORAGE_KEYS, getStoredItem } from '../sdk/storage';
import { getUserId } from '../user';
import { getConfig } from '../utils/getConfig';

type Name = 'rooms' | 'subscriptions' | 'permissions' | 'public-settings' | 'private-settings';

const hasId = <T>(record: T): record is T & { _id: string } => typeof record === 'object' && record !== null && '_id' in record;
const hasUpdatedAt = <T>(record: T): record is T & { _updatedAt: Date } =>
	typeof record === 'object' &&
	record !== null &&
	'_updatedAt' in record &&
	(record as unknown as { _updatedAt: unknown })._updatedAt instanceof Date;
const hasDeletedAt = <T>(record: T): record is T & { _deletedAt: Date } =>
	typeof record === 'object' &&
	record !== null &&
	'_deletedAt' in record &&
	(record as unknown as { _deletedAt: unknown })._deletedAt instanceof Date;
const hasUnserializedUpdatedAt = <T>(record: T): record is T & { _updatedAt: ConstructorParameters<typeof Date>[0] } =>
	typeof record === 'object' &&
	record !== null &&
	'_updatedAt' in record &&
	!((record as unknown as { _updatedAt: unknown })._updatedAt instanceof Date);

localforage.config({ name: baseURI });

export interface IWithManageableCache {
	clearCacheOnLogout(): void;
}

export abstract class CachedStore<T extends IRocketChatRecord, U = T> implements IWithManageableCache {
	private static readonly MAX_CACHE_TIME = 60 * 60 * 24 * 30;

	readonly store: UseBoundStore<StoreApi<IDocumentMapStore<T>>>;

	protected name: Name;

	protected eventType: StreamNames;

	// Bumped from 18 → 19 to invalidate caches populated before the DDPSDK
	// wire encoding was switched from JSON to EJSON. Entries written by the
	// JSON window stored dates as ISO strings instead of Date instances, so
	// fields like subscription.ls would fail `.getTime()` when read back.
	private readonly version = 19;

	private updatedAt = new Date(0);

	protected log: (...args: any[]) => void;

	private timer: ReturnType<typeof setTimeout>;

	readonly useReady = create(() => false);

	constructor({ name, eventType, store }: { name: Name; eventType: StreamNames; store: UseBoundStore<StoreApi<IDocumentMapStore<T>>> }) {
        /* Implementation Hidden */
    }

	protected get eventName(): `${Name}-changed` | `${string}/${Name}-changed` {
		if (this.eventType === 'notify-user') {
			return `${getUserId()}/${this.name}-changed`;
		}
		return `${this.name}-changed`;
	}

	protected abstract getToken(): unknown;

	private async loadFromCache() {
        /* Implementation Hidden */
    }

	protected deserializeFromCache(record: unknown): T | undefined {
        /* Implementation Hidden */
    }

	private async callLoad() {
        /* Implementation Hidden */
    }

	private async callSync(updatedSince: Date) {
        /* Implementation Hidden */
    }

	private async loadFromServer() {
        /* Implementation Hidden */
    }

	protected mapRecord(record: U): T {
        /* Implementation Hidden */
    }

	protected handleLoadedFromServer(_records: T[]): void {
        /* Implementation Hidden */
    }

	protected handleSyncEvent(_action: 'removed' | 'changed', _record: T): void {
        /* Implementation Hidden */
    }

	private async loadFromServerAndPopulate() {
        /* Implementation Hidden */
    }

	private save = withDebouncing({ wait: 1000 })(async () => {
		this.log('saving cache');
		await localforage.setItem(this.name, {
			updatedAt: this.updatedAt,
			version: this.version,
			token: this.getToken(),
			records: Array.from(this.store.getState().records.values()),
		});
		this.log('saving cache (done)');
	});

	abstract clearCacheOnLogout(): void;

	protected async clearCache() {
        /* Implementation Hidden */
    }

	protected setupListener() {
        /* Implementation Hidden */
    }

	protected async handleRecordEvent(action: 'removed' | 'changed', record: U) {
        /* Implementation Hidden */
    }

	private trySync(delay = 10) {
        /* Implementation Hidden */
    }

	protected async sync() {
        /* Implementation Hidden */
    }

	private listenerUnsubscriber: (() => void) | undefined;

	private async performInitialization() {
        /* Implementation Hidden */
    }

	private initializationPromise: Promise<void> | undefined;

	init() {
        /* Implementation Hidden */
    }

	async release() {
        /* Implementation Hidden */
    }

	private reconnectionUnsubscribe: (() => void) | undefined;

	setReady(ready: boolean) {
        /* Implementation Hidden */
    }
}

export class PublicCachedStore<T extends IRocketChatRecord, U = T> extends CachedStore<T, U> {
	protected override getToken() {
        /* Implementation Hidden */
    }

	override clearCacheOnLogout() {
        /* Implementation Hidden */
    }
}

export class PrivateCachedStore<T extends IRocketChatRecord, U = T> extends CachedStore<T, U> {
	protected override getToken() {
        /* Implementation Hidden */
    }

	override clearCacheOnLogout() {
        /* Implementation Hidden */
    }

	listen() {
        /* Implementation Hidden */
    }
}

```