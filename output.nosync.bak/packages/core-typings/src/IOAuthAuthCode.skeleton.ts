## File: packages/core-typings/src/IOAuthAuthCode.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface IOAuthAuthCode extends IRocketChatRecord {
	authCode: string;
	clientId: string;
	userId: string;
	expires: Date;
	redirectUri: string;
}

```