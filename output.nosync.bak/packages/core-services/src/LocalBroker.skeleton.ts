## File: packages/core-services/src/LocalBroker.ts

```typescript
import { EventEmitter } from 'node:events';

import { Logger } from '@rocket.chat/logger';
import { InstanceStatus } from '@rocket.chat/models';
import { injectCurrentContext, tracerActiveSpan } from '@rocket.chat/tracing';

import { asyncLocalStorage } from '.';
import type { EventSignatures } from './events/Events';
import type { CallingOptions, IBroker, IBrokerNode } from './types/IBroker';
import type { ServiceClass, IServiceClass } from './types/ServiceClass';

type ExtendedServiceClass = { instance: IServiceClass; dependencies: string[]; isStarted: boolean };

const logger = new Logger('LocalBroker');

const INTERVAL = 1000;
const TIMEOUT = INTERVAL * 10;

export class LocalBroker implements IBroker {
	private started = false;

	private methods = new Map<string, (...params: any) => any>();

	private events = new EventEmitter();

	private services = new Map<string, ExtendedServiceClass>();

	private pendingServices: Set<string> = new Set();

	private defaultDependencies = ['settings'];

	async call(method: string, data: any, options?: CallingOptions): Promise<any> {
        /* Implementation Hidden */
    }

	async destroyService(instance: ServiceClass): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Creates a service and adds it to the local broker. In case of the broker is already started, it will start the service automatically.
	 */
	createService(instance: IServiceClass, serviceDependencies: string[] = []): void {
        /* Implementation Hidden */
    }

	onBroadcast(callback: (eventName: string, args: unknown[]) => void): void {
        /* Implementation Hidden */
    }

	async broadcast<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastLocal<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastToServices<T extends keyof EventSignatures>(
		_services: string[],
		event: T,
		...args: Parameters<EventSignatures[T]>
	): Promise<void> {
        /* Implementation Hidden */
    }

	async nodeList(): Promise<IBrokerNode[]> {
        /* Implementation Hidden */
    }

	/**
	 * Registers services to be started. We're assuming that each service will only have one level of dependencies.
	 */
	private registerPendingServices(services: string[] = []): void {
        /* Implementation Hidden */
    }

	/**
	 * Removes a service from the pending services set.
	 */
	private removePendingService(service: string): void {
        /* Implementation Hidden */
    }

	private async startService(service: ExtendedServiceClass): Promise<void> {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }
}

```