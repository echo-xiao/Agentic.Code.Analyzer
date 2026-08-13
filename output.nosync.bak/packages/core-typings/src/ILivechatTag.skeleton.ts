## File: packages/core-typings/src/ILivechatTag.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface ILivechatTag extends IRocketChatRecord {
	name: string;
	description?: string;
	numDepartments: number;
	departments: Array<string>;
}

export type FindTagsResult = {
	tags: ILivechatTag[];
	count: number;
	offset: number;
	total: number;
};

```