## File: packages/agenda/src/JobProcessingQueue.ts

```typescript
import type { Job } from './Job';
import type { JobDefinition } from './definition/JobDefinition';

export class JobProcessingQueue {
	private _queue: Job[] = [];

	get length(): number {
		return this._queue.length;
	}

	/**
	 * Pops and returns last queue element (next job to be processed) without checking concurrency.
	 * @returns {Job} Next Job to be processed
	 */
	pop(): Job | undefined {
        /* Implementation Hidden */
    }

	/**
	 * Inserts job in first queue position
	 */
	push(job: Job): void {
        /* Implementation Hidden */
    }

	/**
	 * Inserts job in queue where it will be order from left to right in decreasing
	 * order of nextRunAt and priority (in case of same nextRunAt), if all values
	 * are even the first jobs to be introduced will have priority
	 */
	insert(job: Job): void {
        /* Implementation Hidden */
    }

	/**
	 * Returns (does not pop, element remains in queue) first element (always from the right)
	 * that can be processed (not blocked by concurrency execution)
	 */
	returnNextConcurrencyFreeJob(agendaDefinitions: Record<string, JobDefinition>): Job {
        /* Implementation Hidden */
    }
}

```