## File: packages/core-typings/src/migrations/IControl.ts

```typescript
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IControl extends IRocketChatRecord {
	version: number;
	locked: boolean;
	hash?: string;
	buildAt?: string | Date;
	lockedAt?: string | Date;
}

```