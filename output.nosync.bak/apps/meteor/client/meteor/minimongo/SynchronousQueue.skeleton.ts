## File: apps/meteor/client/meteor/minimongo/SynchronousQueue.ts

```typescript
export class SynchronousQueue {
	private tasks: (() => void)[] = [];

	private running = false;

	private runTimeout: ReturnType<typeof setTimeout> | null = null;

	private runTask(task: () => void) {
        /* Implementation Hidden */
    }

	queueTask(task: () => void) {
        /* Implementation Hidden */
    }

	private flush() {
        /* Implementation Hidden */
    }

	async drain(): Promise<void> {
        /* Implementation Hidden */
    }

	private safeToRunTask() {
        /* Implementation Hidden */
    }
}

```