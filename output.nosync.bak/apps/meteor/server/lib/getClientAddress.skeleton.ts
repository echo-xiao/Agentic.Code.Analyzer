## File: apps/meteor/server/lib/getClientAddress.ts

```typescript
import type { ISocketConnection } from '@rocket.chat/core-typings';

export function getClientAddress(connection: Pick<ISocketConnection, 'clientAddress' | 'httpHeaders'>): string {
    /* Implementation Hidden */
}

```