## File: apps/meteor/server/lib/users/saveUser/handleBio.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/model-typings';

import type { SaveUserData } from './saveUser';

const MAX_BIO_LENGTH = 260;

export const handleBio = (userUpdater: Updater<IUser>, bio: SaveUserData['bio']) => {
    /* Implementation Hidden */
};

```