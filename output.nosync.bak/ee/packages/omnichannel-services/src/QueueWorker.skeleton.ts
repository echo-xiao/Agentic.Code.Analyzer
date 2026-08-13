## File: ee/packages/omnichannel-services/src/QueueWorker.ts

```typescript
import { ServiceClass, api } from '@rocket.chat/core-services';
import type { IQueueWorkerService, HealthAggResult } from '@rocket.chat/core-services';
import type { Logger } from '@rocket.chat/logger';
import type { Actions, ValidResult, Work } from 'mongo-message-queue';
import MessageQueue from 'mongo-message-queue';
import type { Db } from 'mongodb';

export class QueueWorker extends ServiceClass implements IQueueWorkerService {
	protected name = 'queue-worker';

	protected retryCount = 5;

	// Default delay is 5 seconds
	protected retryDelay = Number(process.env.RETRY_DELAY) || 5000;

	protected queue: MessageQueue;

	private logger: Logger;

	constructor(
		private readonly db: Db,
		loggerClass: typeof Logger,
	) {
        /* Implementation Hidden */
    }

	isServiceNotFoundMessage(message: string): boolean {
        /* Implementation Hidden */
    }

	isServiceRetryError(message: string): boolean {
        /* Implementation Hidden */
    }

	override async created(): Promise<void> {
        /* Implementation Hidden */
    }

	async createIndexes(): Promise<void> {
        /* Implementation Hidden */
    }

	override async stopped(): Promise<void> {
        /* Implementation Hidden */
    }

	private isRetryableError(error: string): boolean {
        /* Implementation Hidden */
    }

	private async workerCallback(queueItem: Work<{ to: string; data: any }>): Promise<ValidResult> {
        /* Implementation Hidden */
    }

	// Registers the actual workers, the actions lib will try to fetch elements to work on
	private registerWorkers(): void {
        /* Implementation Hidden */
    }

	private matchServiceCall(service: string): boolean {
        /* Implementation Hidden */
    }

	// Queues an action of type "X" to be processed by the workers
	// Action receives a record of unknown data that will be passed to the actual service
	// `to` is a service name that will be called, including namespace + action
	// This is a "generic" job that allows you to call any service
	async queueWork<T extends Record<string, unknown>>(queue: Actions, to: string, data: T): Promise<void> {
        /* Implementation Hidden */
    }

	async queueInfo(): Promise<HealthAggResult[]> {
        /* Implementation Hidden */
    }
}

```