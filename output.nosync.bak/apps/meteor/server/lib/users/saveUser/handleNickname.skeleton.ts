## File: apps/meteor/server/lib/users/saveUser/handleNickname.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/model-typings';

import type { SaveUserData } from './saveUser';

const MAX_NICKNAME_LENGTH = 120;

export const handleNickname = (userUpdater: Updater<IUser>, nickname: SaveUserData['nickname']) => {
    /* Implementation Hidden */
};

```