## File: packages/core-typings/src/ISmarshHistory.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface ISmarshHistory extends IRocketChatRecord {
	lastRan: Date;
	lastResult: string;
}

```