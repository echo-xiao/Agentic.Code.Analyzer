## File: packages/core-typings/src/IPermission.ts

```typescript
import type { IRocketChatRecord } from './IRocketChatRecord';

export interface IPermission extends IRocketChatRecord {
	roles: string[];
	// TODO: migrate settings with group and section with null to undefined
	group?: string | null;
	section?: string | null;
	groupPermissionId?: string;
	level?: 'settings';
	sectionPermissionId?: string;
	settingId?: string;
	sorter?: number;
}

```