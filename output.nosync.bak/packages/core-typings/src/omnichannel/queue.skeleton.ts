## File: packages/core-typings/src/omnichannel/queue.ts

```typescript
export interface IOmnichannelQueue {
	start(): Promise<void>;
	shouldStart(): void;
	stop(): Promise<void>;
	isRunning(): boolean;
}

```