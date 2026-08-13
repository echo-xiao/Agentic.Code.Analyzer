## File: packages/core-typings/src/IEmailMessageHistory.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface IEmailMessageHistory extends IRocketChatRecord {
	email: string;
	createdAt?: Date;
}

```