## File: apps/meteor/ee/server/sdk/types/IMessageReadsService.ts

```typescript
export interface IMessageReadsService {
	readThread(userId: string, threadId: string): Promise<void>;
}

```