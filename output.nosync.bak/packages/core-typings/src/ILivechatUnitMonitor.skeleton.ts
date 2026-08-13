## File: packages/core-typings/src/ILivechatUnitMonitor.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface ILivechatUnitMonitor extends IRocketChatRecord {
	monitorId: string;
	unitId: string;
	username: string;
}

```