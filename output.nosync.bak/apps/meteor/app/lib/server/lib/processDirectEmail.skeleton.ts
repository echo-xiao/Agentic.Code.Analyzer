## File: apps/meteor/app/lib/server/lib/processDirectEmail.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Messages, Subscriptions, Users, Rooms } from '@rocket.chat/models';
import type { ParsedMail } from 'mailparser';
import moment from 'moment';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { sendMessage } from '../../../../server/lib/messages/sendMessage';
import { canAccessRoomAsync } from '../../../authorization/server';
import { metrics } from '../../../metrics/server';
import { settings } from '../../../settings/server';

const isParsedEmail = (email: ParsedMail): email is Required<ParsedMail> => 'date' in email && 'html' in email;

export const processDirectEmail = async function (email: ParsedMail): Promise<void> {
    /* Implementation Hidden */
};

```