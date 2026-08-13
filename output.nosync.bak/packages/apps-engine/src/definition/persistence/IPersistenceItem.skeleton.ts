## File: packages/apps-engine/src/definition/persistence/IPersistenceItem.ts

```typescript
import type { RocketChatAssociationRecord } from '../metadata';

export interface IPersistenceItem {
	appId: string;
	data: Record<string, unknown>;
	associations?: Array<RocketChatAssociationRecord>;
}

```