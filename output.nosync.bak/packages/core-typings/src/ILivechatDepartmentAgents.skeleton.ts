## File: packages/core-typings/src/ILivechatDepartmentAgents.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface ILivechatDepartmentAgents extends IRocketChatRecord {
	departmentId: string;
	departmentEnabled: boolean;
	agentId: string;
	username: string;
	count: number;
	order: number;
}

```