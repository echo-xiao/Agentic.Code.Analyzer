## File: packages/core-services/src/lib/Api.ts

```typescript
import type { EventSignatures } from '../events/Events';
import type { IApiService } from '../types/IApiService';
import type { CallingOptions, IBroker, IBrokerNode } from '../types/IBroker';
import type { IServiceClass } from '../types/ServiceClass';

export class Api implements IApiService {
	private services: Set<IServiceClass> = new Set<IServiceClass>();

	private broker?: IBroker;

	// set a broker for the API and registers all services in the broker
	setBroker(broker: IBroker): void {
        /* Implementation Hidden */
    }

	async destroyService(instance: IServiceClass): Promise<void> {
        /* Implementation Hidden */
    }

	registerService(instance: IServiceClass, serviceDependencies?: string[]): void {
        /* Implementation Hidden */
    }

	async call(method: string, data?: unknown, options?: CallingOptions): Promise<any> {
        /* Implementation Hidden */
    }

	async broadcast<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastToServices<T extends keyof EventSignatures>(
		services: string[],
		event: T,
		...args: Parameters<EventSignatures[T]>
	): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastLocal<T extends keyof EventSignatures>(event: T, ...args: Parameters<EventSignatures[T]>): Promise<void> {
        /* Implementation Hidden */
    }

	nodeList(): Promise<IBrokerNode[]> {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }
}

```