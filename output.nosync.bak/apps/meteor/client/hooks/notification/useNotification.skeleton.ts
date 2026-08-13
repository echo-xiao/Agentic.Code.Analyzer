## File: apps/meteor/client/hooks/notification/useNotification.ts

```typescript
import type { INotificationDesktop } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Random } from '@rocket.chat/random';
import { useRouter, useUserPreference } from '@rocket.chat/ui-contexts';

import { useNotificationAllowed } from './useNotificationAllowed';
import { getUserAvatarURL } from '../../../app/utils/client';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { stripTags } from '../../../lib/utils/stringUtils';
import { onClientMessageReceived } from '../../lib/onClientMessageReceived';

export const useNotification = () => {
    /* Implementation Hidden */
};

```