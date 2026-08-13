## File: ee/packages/network-broker/src/NetworkBroker.ts

```typescript
import Stream from 'node:stream';

import { asyncLocalStorage } from '@rocket.chat/core-services';
import type { CallingOptions, IBroker, IBrokerNode, IServiceMetrics, IServiceClass, EventSignatures } from '@rocket.chat/core-services';
import { injectCurrentContext, tracerSpan } from '@rocket.chat/tracing';
import type { ServiceBroker, Context, ServiceSchema } from 'moleculer';

import { EnterpriseCheck } from './EnterpriseCheck';

const events: { [k: string]: string } = {
	onNodeConnected: '$node.connected',
	onNodeUpdated: '$node.updated',
	onNodeDisconnected: '$node.disconnected',
};

const lifecycle: { [k: string]: string } = {
	created: 'created',
	started: 'started',
	stopped: 'stopped',
};

export class NetworkBroker implements IBroker {
	private broker: ServiceBroker;

	private started: Promise<boolean> = Promise.resolve(false);

	private defaultDependencies = ['settings', 'license'];

	metrics: IServiceMetrics;

	constructor(broker: ServiceBroker) {
        /* Implementation Hidden */
    }

	async call(method: string, data: any, options?: CallingOptions): Promise<any> {
        /* Implementation Hidden */
    }

	async destroyService(instance: IServiceClass): Promise<void> {
        /* Implementation Hidden */
    }

	createService(instance: IServiceClass, serviceDependencies: string[] = []): void {
        /* Implementation Hidden */
    }

	async broadcast<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastLocal<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastToServices<T extends keyof EventSignatures>(
		services: string[],
		event: T,
		...args: Parameters<EventSignatures[T]>
	): Promise<void> {
        /* Implementation Hidden */
    }

	async nodeList(): Promise<IBrokerNode[]> {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }
}

```