## File: apps/meteor/client/hooks/useDecryptedMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isE2EEMessage } from '@rocket.chat/core-typings';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { e2e } from '../lib/e2ee/rocketchat.e2e';

export const useDecryptedMessage = (message: IMessage): string => {
    /* Implementation Hidden */
};

```