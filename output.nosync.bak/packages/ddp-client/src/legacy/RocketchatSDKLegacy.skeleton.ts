## File: packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts

```typescript
/* eslint-disable @typescript-eslint/no-this-alias */

import { RestClient } from '@rocket.chat/api-client';
import type { IMessage, Serialized } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type { OperationParams, OperationResult } from '@rocket.chat/rest-typings';

import { ClientStreamImpl } from '../ClientStream';
import { ConnectionImpl } from '../Connection';
import { DDPDispatcher } from '../DDPDispatcher';
import { DDPSDK } from '../DDPSDK';
import { TimeoutControl } from '../TimeoutControl';
import { AccountImpl } from '../types/Account';
import type { ClientStream } from '../types/ClientStream';
import type { DDPDispatchOptions } from '../types/DDPClient';
import type { ServerMethodReturn, ServerMethods } from '../types/methods';
import type { StreamNames, StreamKeys, StreamerCallbackArgs } from '../types/streams';
import type {
	APILegacy,
	DPPLegacy,
	RocketchatSdkLegacyEvents,
	RocketchatSdkLegacyEventsKeys,
	RocketchatSdkLegacyEventsValues,
} from './types/SDKLegacy';

declare module '../ClientStream' {
	interface ClientStream {
		callAsync<MethodName extends keyof ServerMethods>(
			methodName: MethodName,
			...params: Parameters<ServerMethods[MethodName]>
		): Promise<ServerMethodReturn<MethodName>>;
		callAsyncWithOptions<MethodName extends keyof ServerMethods>(
			methodName: MethodName,
			options: DDPDispatchOptions,
			...params: Parameters<ServerMethods[MethodName]>
		): Promise<ServerMethodReturn<MethodName>>;
	}
}

declare module '../types/SDK' {
	interface SDK {
		stream<N extends StreamNames, K extends StreamKeys<N>>(
			streamName: N,
			key: K,
			callback: (...args: StreamerCallbackArgs<N, K>) => void,
		): ReturnType<ClientStream['subscribe']>;
	}
}

interface RocketchatSDKLegacy extends APILegacy, DPPLegacy {}

export class RocketchatSdkLegacyImpl extends DDPSDK implements RocketchatSDKLegacy {
	private ev = new Emitter<RocketchatSdkLegacyEvents>();

	get url(): string {
		return this.connection.url;
	}

	get users() {
		const self = this;
		return {
			all(fields?: { name: 1; username: 1; status: 1; type: 1 }): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', { fields: JSON.stringify(fields) });
			},
			allNames(): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', { fields: JSON.stringify({ name: 1 }) });
			},
			allIDs(): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', { fields: JSON.stringify({ _id: 1 }) });
			},
			online(fields?: { name: 1; username: 1; status: 1; type: 1 }): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', { fields: JSON.stringify(fields), query: JSON.stringify({ status: { $ne: 'offline' } }) });
			},
			onlineNames(): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', {
					fields: JSON.stringify({ name: 1 }),
					query: JSON.stringify({ status: { $ne: 'offline' } }),
				});
			},
			onlineIds(): Promise<Serialized<OperationResult<'GET', '/v1/users.list'>>> {
				return self.rest.get('/v1/users.list', {
					fields: JSON.stringify({ _id: 1 }),
					query: JSON.stringify({ status: { $ne: 'offline' } }),
				});
			},
			info(username: string): Promise<Serialized<OperationResult<'GET', '/v1/users.info'>>> {
				return self.rest.get('/v1/users.info', { username });
			},
		};
	}

	get rooms() {
		const self = this;
		return {
			info: (
				args:
					| {
							roomId: string;
					  }
					| {
							roomName: string;
					  },
			): Promise<Serialized<OperationResult<'GET', '/v1/rooms.info'>>> => {
				return self.rest.get('/v1/rooms.info', args);
			},
			join: (rid: string): Promise<Serialized<OperationResult<'POST', '/v1/channels.join'>>> => {
				return self.rest.post('/v1/channels.join', { roomId: rid });
			},
			load: (rid: string, lastUpdate: Date): Promise<Serialized<OperationResult<'GET', '/v1/chat.syncMessages'>>> => {
				return self.rest.get('/v1/chat.syncMessages', { roomId: rid, lastUpdate: lastUpdate.toISOString() });
			},
			leave: (rid: string): Promise<Serialized<OperationResult<'POST', '/v1/channels.leave'>>> => {
				return self.rest.post('/v1/channels.leave', { roomId: rid });
			},
		};
	}

	joinRoom(args: { rid: string }): Promise<Serialized<OperationResult<'POST', '/v1/channels.join'>>> {
        /* Implementation Hidden */
    }

	loadHistory(rid: string, lastUpdate: Date): Promise<Serialized<OperationResult<'GET', '/v1/chat.syncMessages'>>> {
        /* Implementation Hidden */
    }

	leaveRoom(rid: string): Promise<Serialized<OperationResult<'POST', '/v1/channels.leave'>>> {
        /* Implementation Hidden */
    }

	get dm() {
		const self = this;
		return {
			create(username: string): Promise<Serialized<OperationResult<'POST', '/v1/im.create'>>> {
				return self.rest.post('/v1/im.create', { username });
			},
		};
	}

	channelInfo(args: { roomName: string } | { roomId: string }): Promise<Serialized<OperationResult<'GET', '/v1/channels.info'>>> {
        /* Implementation Hidden */
    }

	privateInfo(args: { roomName: string } | { roomId: string }): Promise<Serialized<OperationResult<'GET', '/v1/groups.info'>>> {
        /* Implementation Hidden */
    }

	editMessage(args: OperationParams<'POST', '/v1/chat.update'>): Promise<Serialized<OperationResult<'POST', '/v1/chat.update'>>> {
        /* Implementation Hidden */
    }

	setReaction(emoji: string, messageId: string): Promise<Serialized<OperationResult<'POST', '/v1/chat.react'>>> {
        /* Implementation Hidden */
    }

	createDirectMessage(username: string): Promise<Serialized<OperationResult<'POST', '/v1/im.create'>>> {
        /* Implementation Hidden */
    }

	sendMessage(message: IMessage | string, rid: string): Promise<Serialized<OperationResult<'POST', '/v1/chat.sendMessage'>>> {
        /* Implementation Hidden */
    }

	resume({ token }: { token: string }): Promise<unknown> {
        /* Implementation Hidden */
    }

	login(credentials: { username: string; password: string }): Promise<unknown> {
        /* Implementation Hidden */
    }

	onMessage(cb: (data: any) => void) {
        /* Implementation Hidden */
    }

	methodCall(method: string, ...args: any[]) {
        /* Implementation Hidden */
    }

	subscribe(topic: string, ...args: any[]) {
        /* Implementation Hidden */
    }

	subscribeRoom(rid: string): Promise<unknown> {
        /* Implementation Hidden */
    }

	subscribeNotifyAll(): Promise<any> {
        /* Implementation Hidden */
    }

	subscribeLoggedNotify(): Promise<any> {
        /* Implementation Hidden */
    }

	subscribeNotifyUser = (): Promise<any> => {
		return Promise.all([
			this.stream('notify-user', `${this.account.uid}/message`, (...args) => this.ev.emit('user-message', args)),
			this.stream('notify-user', `${this.account.uid}/notification`, (...args) => this.ev.emit('notification', args)),
			this.stream('notify-user', `${this.account.uid}/rooms-changed`, (...args) => this.ev.emit('rooms-changed', args)),
			this.stream('notify-user', `${this.account.uid}/subscriptions-changed`, (...args) => this.ev.emit('subscriptions-changed', args)),
			this.stream('notify-user', `${this.account.uid}/uiInteraction`, (...args) => this.ev.emit('uiInteraction', args)),
		]);
	};

	onStreamData<E extends RocketchatSdkLegacyEventsKeys>(event: E, cb: (...data: RocketchatSdkLegacyEventsValues<E>) => void): () => void {
        /* Implementation Hidden */
    }

	async disconnect(): Promise<unknown> {
        /* Implementation Hidden */
    }

	connect(_options: { useSsl: boolean; host: string; port: number }) {
        /* Implementation Hidden */
    }

	unsubscribe(subscription: string): Promise<unknown> {
        /* Implementation Hidden */
    }

	unsubscribeAll(): Promise<unknown> {
        /* Implementation Hidden */
    }

	static override create(url: string, retryOptions = { retryCount: 1, retryTime: 100 }): RocketchatSdkLegacyImpl {
        /* Implementation Hidden */
    }
}

```