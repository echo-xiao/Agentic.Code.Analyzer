## File: apps/meteor/server/lib/dataExport/sendEmail.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import * as Mailer from '../../../app/mailer/server/api';
import { settings } from '../../../app/settings/server';
import { getUserEmailAddress } from '../../../lib/getUserEmailAddress';

export const sendEmail = async (userData: Pick<IUser, 'name' | 'emails'>, subject: string, body: string): Promise<void> => {
    /* Implementation Hidden */
};

```