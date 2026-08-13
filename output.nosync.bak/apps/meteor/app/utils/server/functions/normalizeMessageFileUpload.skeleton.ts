## File: apps/meteor/app/utils/server/functions/normalizeMessageFileUpload.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Uploads } from '@rocket.chat/models';

import { FileUpload } from '../../../file-upload/server';
import { getURL } from '../getURL';

export const normalizeMessageFileUpload = async (message: Omit<IMessage, '_updatedAt'>): Promise<Omit<IMessage, '_updatedAt'>> => {
    /* Implementation Hidden */
};

```