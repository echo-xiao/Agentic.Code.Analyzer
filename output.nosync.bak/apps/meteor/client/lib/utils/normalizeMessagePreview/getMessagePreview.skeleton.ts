## File: apps/meteor/client/lib/utils/normalizeMessagePreview/getMessagePreview.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isDirectMessageRoom, isE2EEMessage, isMultipleDirectMessageRoom, isVideoConfMessage } from '@rocket.chat/core-typings';
import { escapeHTML } from '@rocket.chat/string-helpers';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';

import { normalizeMessagePreview } from './normalizeMessagePreview';

export const getMessagePreview = (room: SubscriptionWithRoom, lastMessage: IMessage | undefined, t: TFunction): string | undefined => {
    /* Implementation Hidden */
};

```