## File: apps/meteor/server/modules/notifications/notifications.module.ts

```typescript
import { Authorization, MediaCall, VideoConf, Settings } from '@rocket.chat/core-services';
import type { ISubscription, IOmnichannelRoom, IUser, IUserDataEvent, PresenceSource, PresenceStatusCode } from '@rocket.chat/core-typings';
import type { StreamerCallbackArgs, StreamKeys, StreamNames } from '@rocket.chat/ddp-client';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';

import type { ImporterProgress } from '../../../app/importer/server/classes/ImporterProgress';
import { emit, StreamPresence } from '../../../app/notifications/server/lib/Presence';
import { SystemLogger } from '../../lib/logger/system';
import { getCachedUserForPublication } from '../streamer/publication-user-cache';
import { Streamer as StreamerModule } from '../streamer/streamer.module';
import type { IStreamer, IStreamerConstructor } from '../streamer/types';

export class NotificationsModule {
	public readonly streamLogged: IStreamer<'notify-logged'>;

	public readonly streamAll: IStreamer<'notify-all'>;

	public readonly streamRoom: IStreamer<'notify-room'>;

	public readonly streamRoomUsers: IStreamer<'notify-room-users'>;

	public readonly streamUser: IStreamer<'notify-user'> & {
		on(event: string, fn: (...data: any[]) => void): void;
	};

	public readonly streamRoomMessage: IStreamer<'room-messages'>;

	public readonly streamImporters: IStreamer<'importers'>;

	public readonly streamRoles: IStreamer<'roles'>;

	public readonly streamApps: IStreamer<'apps'>;

	public readonly streamAppsEngine: IStreamer<'apps-engine'>;

	public readonly streamCannedResponses: IStreamer<'canned-responses'>;

	public readonly streamIntegrationHistory: IStreamer<'integrationHistory'>;

	public readonly streamLivechatRoom: IStreamer<'livechat-room'>;

	public readonly streamLivechatQueueData: IStreamer<'livechat-inquiry-queue-observer'>;

	public readonly streamRoomData: IStreamer<'room-data'>;

	public readonly streamLocal: IStreamer<'local'>;

	public readonly streamPresence: IStreamer<'user-presence'>;

	constructor(private Streamer: IStreamerConstructor) {
        /* Implementation Hidden */
    }

	configure(): void {
        /* Implementation Hidden */
    }

	// notifyAll<E extends StreamKeys<'notify-all'>>(eventName: E, ...args: StreamerCallbackArgs<'notify-all', E>): void {
	// 	return this.streamAll.emit(eventName, ...args);
	// }

	notifyLogged<E extends StreamKeys<'notify-logged'>>(eventName: E, ...args: StreamerCallbackArgs<'notify-logged', E>): void {
        /* Implementation Hidden */
    }

	notifyRoom<P extends string, E extends string>(
		room: P,
		eventName: E extends ExtractNotifyUserEventName<'notify-room', P> ? E : never,
		...args: E extends ExtractNotifyUserEventName<'notify-room', P> ? StreamerCallbackArgs<'notify-room', `${P}/${E}`> : never
	): void {
        /* Implementation Hidden */
    }

	notifyUser<P extends string, E extends string>(
		userId: P,
		eventName: E extends ExtractNotifyUserEventName<'notify-user', P> ? E : never,
		...args: E extends ExtractNotifyUserEventName<'notify-user', P> ? StreamerCallbackArgs<'notify-user', `${P}/${E}`> : never
	): void {
        /* Implementation Hidden */
    }

	notifyAllInThisInstance<E extends StreamKeys<'notify-all'>>(eventName: E, ...args: StreamerCallbackArgs<'notify-all', E>): void {
        /* Implementation Hidden */
    }

	notifyLoggedInThisInstance<E extends StreamKeys<'notify-logged'>>(eventName: E, ...args: StreamerCallbackArgs<'notify-logged', E>): void {
        /* Implementation Hidden */
    }

	notifyRoomInThisInstance<P extends string, E extends string>(
		room: P,
		eventName: E extends ExtractNotifyUserEventName<'notify-room', P> ? E : never,
		...args: E extends ExtractNotifyUserEventName<'notify-room', P> ? StreamerCallbackArgs<'notify-room', `${P}/${E}`> : never
	): void {
        /* Implementation Hidden */
    }

	notifyUserInThisInstance<P extends string, E extends string>(
		userId: P,
		eventName: E extends ExtractNotifyUserEventName<'notify-user', P> ? E : never,
		...args: E extends ExtractNotifyUserEventName<'notify-user', P> ? StreamerCallbackArgs<'notify-user', `${P}/${E}`> : never
	): void {
        /* Implementation Hidden */
    }

	sendPresence(
		uid: string,
		...args: [username: string, status?: PresenceStatusCode, statusText?: string, statusSource?: PresenceSource, statusExpiresAt?: Date]
	): void {
        /* Implementation Hidden */
    }

	progressUpdated(progress: { rate: number } | ImporterProgress): void {
        /* Implementation Hidden */
    }
}

type ExtractNotifyUserEventName<
	T extends StreamNames,
	P extends string,
	E extends StreamKeys<T> = StreamKeys<T>,
> = E extends `${infer X}/${infer I}` ? (P extends X ? I : never) : never;

```