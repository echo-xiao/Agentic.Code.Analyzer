## File: packages/core-services/src/types/ServiceClass.ts

```typescript
import { EventEmitter } from 'node:events';

import type { ISetting } from '@rocket.chat/core-typings';

import type { IApiService } from './IApiService';
import type { IBroker, IBrokerNode } from './IBroker';
import type { ClientAction, EventSignatures } from '../events/Events';
import { asyncLocalStorage } from '../lib/asyncLocalStorage';

export interface IServiceContext {
	id: string; // Context ID
	broker: IBroker; // Instance of the broker.
	nodeID: string | null; // The caller or target Node ID.
	// action: Object; // Instance of action definition.
	// event: Object; // Instance of event definition.
	// eventName: Object; // The emitted event name.
	// eventType: String; // Type of event (“emit” or “broadcast”).
	// eventGroups: Array; // String>	Groups of event.
	// caller: String; // Service full name of the caller. E.g.: v3.myService
	requestID: string | null; // Request ID. If you make nested-calls, it will be the same ID.
	// parentID: String; // Parent context ID (in nested-calls).
	// params: Any; // Request params. Second argument from broker.call.
	// meta: Any; // Request metadata. It will be also transferred to nested-calls.
	// locals: any; // Local data.
	// level: Number; // Request level (in nested-calls). The first level is 1.
	// span: Span; // Current active span.
	ctx?: any;
}

export interface IServiceClass {
	getName(): string;
	onNodeConnected?({ node, reconnected }: { node: IBrokerNode; reconnected: boolean }): void;
	onNodeUpdated?({ node }: { node: IBrokerNode }): void;
	onNodeDisconnected?({ node, unexpected }: { node: IBrokerNode; unexpected: boolean }): Promise<void>;
	getEvents(): { eventName: keyof EventSignatures; listeners: { (...args: any[]): void }[] }[];
	removeAllListeners(): void;

	setApi(api: IApiService): void;

	onEvent<T extends keyof EventSignatures>(event: T, handler: EventSignatures[T]): void;
	emit<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): void;
	onSettingChanged(
		settingId: ISetting['_id'],
		cb: (data: { clientAction: ClientAction; setting: ISetting }) => Promise<void>,
		ignoreActions?: ClientAction[],
	): void;

	isInternal(): boolean;

	created(): Promise<void>;
	started(): Promise<void>;
	stopped(): Promise<void>;
}

export abstract class ServiceClass implements IServiceClass {
	protected abstract name: string;

	protected events = new EventEmitter();

	protected settings = new EventEmitter();

	protected internal = false;

	protected api?: IApiService;

	protected settingListenerActive = false;

	constructor() {
        /* Implementation Hidden */
    }

	setApi(api: IApiService): void {
        /* Implementation Hidden */
    }

	getEvents(): { eventName: keyof EventSignatures; listeners: { (...args: any[]): void }[] }[] {
        /* Implementation Hidden */
    }

	removeAllListeners(): void {
        /* Implementation Hidden */
    }

	getName(): string {
        /* Implementation Hidden */
    }

	isInternal(): boolean {
        /* Implementation Hidden */
    }

	get context(): IServiceContext | undefined {
		return asyncLocalStorage.getStore();
	}

	public onEvent<T extends keyof EventSignatures>(event: T, handler: EventSignatures[T]): void {
        /* Implementation Hidden */
    }

	public emit<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): void {
        /* Implementation Hidden */
    }

	private registerEventListener() {
        /* Implementation Hidden */
    }

	public onSettingChanged(
		settingId: ISetting['_id'],
		cb: (data: { clientAction: ClientAction; setting: ISetting }) => Promise<void>,
		ignoreActions: ClientAction[] = ['removed'],
	): void {
        /* Implementation Hidden */
    }

	async created(): Promise<void> {
        /* Implementation Hidden */
    }

	async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async stopped(): Promise<void> {
        /* Implementation Hidden */
    }
}

/**
 * An internal service is a service that is registered only on monolith node.
 * Services that run on their own node should use @ServiceClass instead.
 */
export abstract class ServiceClassInternal extends ServiceClass {
	protected override internal = true;
}

```