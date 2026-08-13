## File: apps/meteor/server/bridges/smarsh/functions/sendEmail.ts

```typescript
// Expects the following details:
// {
// 	body: '<table>',
// 	subject: 'Rocket.Chat, 17 Users, 24 Messages, 1 File, 799504 Minutes, in #random',
//  files: ['i3nc9l3mn']
// }
import { Uploads } from '@rocket.chat/models';

import * as Mailer from '../../../../app/mailer/server/api';
import { settings } from '../../../../app/settings/server';
import { UploadFS } from '../../../ufs';

export const sendEmail = async (data: { files: string[]; subject: string; body: string }) => {
    /* Implementation Hidden */
};

```