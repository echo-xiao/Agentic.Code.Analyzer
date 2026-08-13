## File: apps/meteor/server/lib/messages/extractUrlsFromMessageAST.ts

```typescript
import type { Root } from '@rocket.chat/message-parser';

/**
 * Extracts all URLs from parsed message AST (message-parser output)
 * Looks for LINK nodes and extracts the src URL
 */
export const extractUrlsFromMessageAST = (md?: Root | Root[number] | Root[number]['value']): string[] => {
    /* Implementation Hidden */
};

```