## File: apps/meteor/server/modules/streamer/streamer.module.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { StreamerEvents } from '@rocket.chat/ddp-client';
import { EventEmitter } from 'eventemitter3';

import type { IPublication, Rule, Connection, DDPSubscription, IStreamer, IRules, TransformMessage } from './types';
import { SystemLogger } from '../../lib/logger/system';

class StreamerCentralClass<N extends keyof StreamerEvents> extends EventEmitter {
	public instances: Record<string, Streamer<N>> = {};

	constructor() {
        /* Implementation Hidden */
    }
}

type ActivePublication = IPublication & { _session: NonNullable<IPublication['_session']> };

export const StreamerCentral = new StreamerCentralClass();

export abstract class Streamer<N extends keyof StreamerEvents> extends EventEmitter implements IStreamer<N> {
	public subscriptions = new Set<DDPSubscription>();

	protected subscriptionsByEventName = new Map<string, Set<DDPSubscription>>();

	public retransmit = true;

	public retransmitToSelf = false;

	public serverOnly = false;

	private _allowRead: IRules = {};

	private _allowWrite: IRules = {};

	private _allowEmit: IRules = {};

	constructor(
		public name: string,
		{ retransmit = true, retransmitToSelf = false }: { retransmit?: boolean; retransmitToSelf?: boolean } = {},
	) {
        /* Implementation Hidden */
    }

	get subscriptionName(): string {
		return `stream-${this.name}`;
	}

	private allow(rules: IRules, name: string) {
        /* Implementation Hidden */
    }

	allowRead(eventName: string | boolean | Rule, fn?: Rule | 'all' | 'none' | 'logged'): void {
        /* Implementation Hidden */
    }

	allowWrite(eventName: string | boolean | Rule, fn?: Rule | 'all' | 'none' | 'logged'): void {
        /* Implementation Hidden */
    }

	allowEmit(eventName: string | boolean | Rule, fn?: Rule | 'all' | 'none' | 'logged'): void {
        /* Implementation Hidden */
    }

	private isAllowed(rules: IRules) {
        /* Implementation Hidden */
    }

	async isReadAllowed(scope: IPublication, eventName: string, args: any): Promise<boolean | object> {
        /* Implementation Hidden */
    }

	async isEmitAllowed(scope: IPublication, eventName: string, ...args: any[]): Promise<boolean | object> {
        /* Implementation Hidden */
    }

	async isWriteAllowed(scope: IPublication, eventName: string, args: any): Promise<boolean | object> {
        /* Implementation Hidden */
    }

	addSubscription(subscription: DDPSubscription, eventName: string): void {
        /* Implementation Hidden */
    }

	removeSubscription(subscription: DDPSubscription, eventName: string): void {
        /* Implementation Hidden */
    }

	async _publish(
		publication: IPublication,
		eventName: string,
		options: boolean | { useCollection?: boolean; args?: any } = false,
	): Promise<void> {
        /* Implementation Hidden */
    }

	abstract registerPublication(
		name: string,
		fn: (eventName: string, options: boolean | { useCollection?: boolean; args?: any }) => Promise<void>,
	): void;

	iniPublication(): void {
        /* Implementation Hidden */
    }

	abstract registerMethod(methods: Record<string, (eventName: string, ...args: any[]) => any>): void;

	initMethod(): void {
        /* Implementation Hidden */
    }

	abstract changedPayload(collection: string, id: string, fields: Record<string, any>): string | false;

	_emit(eventName: string, args: any[], origin: Connection | undefined, broadcast: boolean, transform?: TransformMessage): boolean {
        /* Implementation Hidden */
    }

	static isPublicationActive(publication: IPublication): publication is ActivePublication {
        /* Implementation Hidden */
    }

	async sendToManySubscriptions(
		subscriptions: Set<DDPSubscription>,
		origin: Connection | undefined,
		eventName: string,
		args: any[],
		getMsg: string | TransformMessage,
	): Promise<void> {
        /* Implementation Hidden */
    }

	override emit(eventName: string | symbol, ...args: any[]): boolean {
        /* Implementation Hidden */
    }

	__emit(eventName: string, ...args: any[]): boolean {
        /* Implementation Hidden */
    }

	emitWithoutBroadcast(eventName: string, ...args: any[]): void {
        /* Implementation Hidden */
    }
}

```