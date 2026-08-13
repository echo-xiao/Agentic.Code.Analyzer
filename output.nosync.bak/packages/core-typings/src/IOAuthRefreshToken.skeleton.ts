## File: packages/core-typings/src/IOAuthRefreshToken.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface IOAuthRefreshToken extends IRocketChatRecord {
	refreshToken: string;
	expires?: Date;
	clientId: string;
	userId: string;
}

```