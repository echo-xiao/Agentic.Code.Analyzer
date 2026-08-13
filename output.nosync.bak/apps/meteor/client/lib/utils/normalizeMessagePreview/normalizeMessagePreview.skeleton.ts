## File: apps/meteor/client/lib/utils/normalizeMessagePreview/normalizeMessagePreview.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { escapeHTML } from '@rocket.chat/string-helpers';
import emojione from 'emojione';
import type { TFunction } from 'i18next';

import { filterMarkdown } from '../../../../app/markdown/lib/markdown';

export const normalizeMessagePreview = (message: IMessage, t: TFunction): string | undefined => {
    /* Implementation Hidden */
};

```