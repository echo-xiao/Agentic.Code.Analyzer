## File: apps/meteor/server/startup/ensureMessagesTextIndex.ts

```typescript
import { Messages } from '@rocket.chat/models';

import { SystemLogger } from '../lib/logger/system';

const { USE_ROOM_SEARCH_INDEX = 'false' } = process.env;

// MongoDB stores a text index's key with `_fts: 'text'` / `_ftsx: 1` placeholders
// and tracks the original text fields in `weights`. Classify by looking at the
// non-placeholder prefix fields plus weights.
const classifyTextIndex = (idx: { key: Record<string, unknown>; weights?: Record<string, number> }) => {
    /* Implementation Hidden */
};

export const ensureMessagesTextIndex = async (): Promise<void> => {
    /* Implementation Hidden */
};

```