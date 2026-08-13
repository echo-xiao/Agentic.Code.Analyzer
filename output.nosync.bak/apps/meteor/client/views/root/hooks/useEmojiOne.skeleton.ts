## File: apps/meteor/client/views/root/hooks/useEmojiOne.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { useEffect, useLayoutEffect } from 'react';

import { emoji } from '../../../../app/emoji/client';
import { getEmojiConfig } from '../../../../app/emoji-emojione/lib/getEmojiConfig';
import { isSetNotNull } from '../../../../app/emoji-emojione/lib/isSetNotNull';

const config = getEmojiConfig();

export const useEmojiOne = () => {
    /* Implementation Hidden */
};

```