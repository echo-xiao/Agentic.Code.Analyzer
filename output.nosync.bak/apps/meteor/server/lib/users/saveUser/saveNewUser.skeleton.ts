## File: apps/meteor/server/lib/users/saveUser/saveNewUser.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import Gravatar from 'gravatar';
import { Accounts } from 'meteor/accounts-base';

import { notifyOnUserChangeById } from '../../../../app/lib/server/lib/notifyListener';
import { validateEmailDomain } from '../../../../app/lib/server/lib/validateEmailDomain';
import { setUserAvatar } from '../setUserAvatar';
import { handleBio } from './handleBio';
import { handleNickname } from './handleNickname';
import type { SaveUserData } from './saveUser';
import { sendPasswordEmail, sendWelcomeEmail } from './sendUserEmail';
import { settings } from '../../../../app/settings/server';
import { getNewUserRoles } from '../../../services/user/lib/getNewUserRoles';

export const saveNewUser = async function (userData: SaveUserData, sendPassword: boolean, performedBy: IUser) {
    /* Implementation Hidden */
};

```