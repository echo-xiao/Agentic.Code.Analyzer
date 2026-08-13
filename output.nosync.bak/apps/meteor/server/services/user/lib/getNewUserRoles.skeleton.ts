## File: apps/meteor/server/services/user/lib/getNewUserRoles.ts

```typescript
import type { IRole } from '@rocket.chat/core-typings';

import { settings } from '../../../../app/settings/server';
import { parseCSV } from '../../../../lib/utils/parseCSV';

export function getNewUserRoles(previousRoles?: IRole['_id'][]): IRole['_id'][] {
    /* Implementation Hidden */
}

```