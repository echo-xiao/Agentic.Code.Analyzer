## File: packages/ddp-client/src/livechat/LivechatClientImpl.ts

```typescript
import { RestClient } from '@rocket.chat/api-client';
import type { IOmnichannelRoom, Serialized } from '@rocket.chat/core-typings';
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
import type { StreamKeys, StreamNames, StreamerCallbackArgs } from '../types/streams';
import type { LivechatEndpoints, LivechatRoomEvents, LivechatStream } from './types/LivechatSDK';

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

declare module '../DDPSDK' {
	interface DDPSDK {
		stream<N extends StreamNames, K extends StreamKeys<N>>(
			streamName: N,
			data: K | [K, unknown],
			callback: (...args: StreamerCallbackArgs<N, K>) => void,
		): ReturnType<ClientStream['subscribe']>;
	}
}

export class LivechatClientImpl extends DDPSDK implements LivechatStream, LivechatEndpoints {
	public token?: string;

	public readonly credentials: { token?: string } = { token: this.token };

	private ev = new Emitter<{
		userActivity: StreamerCallbackArgs<'notify-room', `${string}/user-activity`>;
		message: StreamerCallbackArgs<'room-messages', string>;
		delete: StreamerCallbackArgs<'notify-room', `${string}/deleteMessage`>;
	}>();

	subscribeRoom(rid: string) {
        /* Implementation Hidden */
    }

	onMessage(cb: (...args: StreamerCallbackArgs<'room-messages', string>) => void): () => void {
        /* Implementation Hidden */
    }

	onUserActivity(cb: (username: string, events: string[]) => void): () => void {
        /* Implementation Hidden */
    }

	onRoomMessage(rid: string, cb: (...args: StreamerCallbackArgs<'room-messages', string>) => void) {
        /* Implementation Hidden */
    }

	onRoomUserActivity(rid: string, cb: (...args: StreamerCallbackArgs<'notify-room', `${string}/user-activity`>) => void) {
        /* Implementation Hidden */
    }

	onRoomDeleteMessage(rid: string, cb: (...args: StreamerCallbackArgs<'notify-room', `${string}/deleteMessage`>) => void) {
        /* Implementation Hidden */
    }

	onAgentChange(rid: string, cb: (data: LivechatRoomEvents<'agentData'>) => void): () => void {
        /* Implementation Hidden */
    }

	onAgentStatusChange(rid: string, cb: (data: LivechatRoomEvents<'agentStatus'>) => void): () => void {
        /* Implementation Hidden */
    }

	onQueuePositionChange(rid: string, cb: (data: LivechatRoomEvents<'queueData' | 'agentData'>) => void): () => void {
        /* Implementation Hidden */
    }

	onVisitorChange(rid: string, cb: (data: LivechatRoomEvents<'visitorData'>) => void): () => void {
        /* Implementation Hidden */
    }

	notifyVisitorActivity(rid: string, username: string, activity: string[]) {
        /* Implementation Hidden */
    }

	notifyCallDeclined(rid: string) {
        /* Implementation Hidden */
    }

	// API GETTERS

	async config(
		params: OperationParams<'GET', '/v1/livechat/config'>,
	): Promise<Serialized<OperationResult<'GET', '/v1/livechat/config'>['config']>> {
        /* Implementation Hidden */
    }

	async room(params: OperationParams<'GET', '/v1/livechat/room'>): Promise<Serialized<IOmnichannelRoom>> {
        /* Implementation Hidden */
    }

	visitor(
		params: OperationParams<'GET', '/v1/livechat/visitor'>,
	): Promise<Serialized<OperationResult<'GET', '/v1/livechat/visitor'>['visitor']>> {
        /* Implementation Hidden */
    }

	nextAgent(
		params: OperationParams<'GET', '/v1/livechat/agent.next/:token'>,
	): Promise<Serialized<OperationResult<'GET', '/v1/livechat/agent.next/:token'>>> {
        /* Implementation Hidden */
    }

	async agent(rid: string): Promise<Serialized<OperationResult<'GET', '/v1/livechat/agent.info/:rid/:token'>['agent']>> {
        /* Implementation Hidden */
    }

	message(
		id: string,
		params: OperationParams<'GET', '/v1/livechat/message/:_id'>,
	): Promise<Serialized<OperationResult<'GET', '/v1/livechat/message/:_id'>>> {
        /* Implementation Hidden */
    }

	async loadMessages(
		rid: string,
		params: OperationParams<'GET', '/v1/livechat/messages.history/:rid'>,
	): Promise<Serialized<OperationResult<'GET', '/v1/livechat/messages.history/:rid'>['messages']>> {
        /* Implementation Hidden */
    }

	// API POST

	transferChat({
		rid,
		department,
	}: {
		rid: string;
		department: string;
	}): Promise<Serialized<OperationResult<'POST', '/v1/livechat/visitor/department.transfer'>>> {
        /* Implementation Hidden */
    }

	async grantVisitor(
		guest: OperationParams<'POST', '/v1/livechat/visitor'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/visitor'>>> {
        /* Implementation Hidden */
    }

	login(guest: OperationParams<'POST', '/v1/livechat/visitor'>) {
        /* Implementation Hidden */
    }

	closeChat({ rid }: { rid: string }): Promise<Serialized<OperationResult<'POST', '/v1/livechat/room.close'>>> {
        /* Implementation Hidden */
    }

	chatSurvey(
		params: OperationParams<'POST', '/v1/livechat/room.survey'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/room.survey'>>> {
        /* Implementation Hidden */
    }

	sendMessage(
		params: OperationParams<'POST', '/v1/livechat/message'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/message'>>> {
        /* Implementation Hidden */
    }

	sendOfflineMessage(
		params: OperationParams<'POST', '/v1/livechat/offline.message'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/offline.message'>>> {
        /* Implementation Hidden */
    }

	sendVisitorNavigation(
		params: OperationParams<'POST', '/v1/livechat/page.visited'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/page.visited'>>> {
        /* Implementation Hidden */
    }

	requestTranscript(email: string, { rid }: { rid: string }): Promise<Serialized<OperationResult<'POST', '/v1/livechat/transcript'>>> {
        /* Implementation Hidden */
    }

	sendCustomField(
		params: OperationParams<'POST', '/v1/livechat/custom.field'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/custom.field'>>> {
        /* Implementation Hidden */
    }

	sendCustomFields(
		params: OperationParams<'POST', '/v1/livechat/custom.fields'>,
	): Promise<Serialized<OperationResult<'POST', '/v1/livechat/custom.fields'>>> {
        /* Implementation Hidden */
    }

	async updateVisitorStatus(newStatus: string): Promise<Serialized<OperationResult<'POST', '/v1/livechat/visitor.status'>['status']>> {
        /* Implementation Hidden */
    }

	uploadFile(rid: string, file: File): Promise<ProgressEvent<EventTarget>> {
        /* Implementation Hidden */
    }

	async sendUiInteraction(
		payload: OperationParams<'POST', '/apps/ui.interaction/:id'>,
		appId: string,
	): Promise<Serialized<OperationResult<'POST', '/apps/ui.interaction/:id'>>> {
        /* Implementation Hidden */
    }

	// API DELETE

	deleteMessage(id: string, { rid }: { rid: string }): Promise<Serialized<OperationResult<'DELETE', '/v1/livechat/message/:_id'>>> {
        /* Implementation Hidden */
    }

	deleteVisitor(): Promise<Serialized<OperationResult<'DELETE', '/v1/livechat/visitor'>>> {
        /* Implementation Hidden */
    }

	// API PUT

	editMessage(
		id: string,
		params: OperationParams<'PUT', '/v1/livechat/message/:_id'>,
	): Promise<Serialized<OperationResult<'PUT', '/v1/livechat/message/:_id'>>> {
        /* Implementation Hidden */
    }

	unsubscribeAll(): Promise<unknown> {
        /* Implementation Hidden */
    }

	static override create(url: string, retryOptions = { retryCount: 3, retryTime: 10000 }): LivechatClientImpl {
        /* Implementation Hidden */
    }
}

```