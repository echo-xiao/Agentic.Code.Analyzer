## File: apps/meteor/server/lib/systemMessage/hideSystemMessage.ts

```typescript
import type { MessageTypesValues } from '@rocket.chat/core-typings';

export const isMutedUnmuted = (messageType: string): boolean => {
    /* Implementation Hidden */
};

export const isMessageRemoved = (messageType: string): boolean => messageType === 'rm';

export const shouldHideSystemMessage = (messageType: MessageTypesValues, hideSystemMessage?: MessageTypesValues[]): boolean => {
    /* Implementation Hidden */
};

```