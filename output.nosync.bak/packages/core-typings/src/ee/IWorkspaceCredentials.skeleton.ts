## File: packages/core-typings/src/ee/IWorkspaceCredentials.ts

```typescript
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IWorkspaceCredentials extends IRocketChatRecord {
	scope: string;
	expirationDate: Date;
	accessToken: string;
}

```