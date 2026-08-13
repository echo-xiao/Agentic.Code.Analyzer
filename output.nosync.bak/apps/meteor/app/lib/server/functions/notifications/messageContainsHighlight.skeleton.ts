## File: apps/meteor/app/lib/server/functions/notifications/messageContainsHighlight.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';

/**
 * Checks if a message contains a user highlight
 *
 * @param {string} message
 * @param {array|undefined} highlights
 *
 * @returns {boolean}
 */
export function messageContainsHighlight(message: Pick<IMessage, 'msg'>, highlights: string[] | undefined): boolean {
    /* Implementation Hidden */
}

```