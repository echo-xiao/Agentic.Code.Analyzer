## File: apps/meteor/server/api/lib/projectionAllowsAttribute.ts

```typescript
import type { IRocketChatRecord } from '@rocket.chat/core-typings';
import type { FindOptions } from 'mongodb';

export function projectionAllowsAttribute(attributeName: string, options?: FindOptions<IRocketChatRecord>): boolean {
    /* Implementation Hidden */
}

```