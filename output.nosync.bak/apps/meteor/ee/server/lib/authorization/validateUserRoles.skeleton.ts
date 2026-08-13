## File: apps/meteor/ee/server/lib/authorization/validateUserRoles.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';

import { i18n } from '../../../../server/lib/i18n';

export async function validateUserRoles(userData: Partial<IUser>, currentUserData?: Partial<IUser>) {
    /* Implementation Hidden */
}

```