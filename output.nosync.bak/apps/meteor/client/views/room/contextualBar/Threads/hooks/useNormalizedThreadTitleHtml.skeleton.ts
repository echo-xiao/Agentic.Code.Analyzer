## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useNormalizedThreadTitleHtml.ts

```typescript
import type { IThreadMainMessage } from '@rocket.chat/core-typings';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { useUser, useSetting } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { emojiParser } from '../../../../../../app/emoji/client/emojiParser';
import { filterMarkdown } from '../../../../../../app/markdown/lib/markdown';
import { MentionsParser } from '../../../../../../app/mentions/lib/MentionsParser';

export const useNormalizedThreadTitleHtml = (mainMessage: IThreadMainMessage) => {
    /* Implementation Hidden */
};

```