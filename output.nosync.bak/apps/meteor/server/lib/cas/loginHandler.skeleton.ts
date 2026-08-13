## File: apps/meteor/server/lib/cas/loginHandler.ts

```typescript
import { CredentialTokens, Users } from '@rocket.chat/models';
import { getObjectKeys, wrapExceptions } from '@rocket.chat/tools';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { createNewUser } from './createNewUser';
import { findExistingCASUser } from './findExistingCASUser';
import { logger } from './logger';
import { settings } from '../../../app/settings/server';
import { setRealName } from '../users/setRealName';

export const loginHandlerCAS = async (options: any): Promise<undefined | Accounts.LoginMethodResult> => {
    /* Implementation Hidden */
};

```