## File: packages/livechat/src/history.ts

```typescript
import type { MemoryHistory } from 'history';
import { createMemoryHistory } from 'history';
import type { CustomHistory } from 'preact-router';

export const createHistoryAdapter = (memoryHistory: MemoryHistory): CustomHistory => {
    /* Implementation Hidden */
};

export const history = createHistoryAdapter(createMemoryHistory());

export default history;

```