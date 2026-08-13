## File: apps/meteor/server/services/user/service.ts

```typescript
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IUserService } from '@rocket.chat/core-services';
import { Users } from '@rocket.chat/models';

import { getMaxLoginTokens } from '../../lib/getMaxLoginTokens';

// TODO merge this service with Account service
export class UserService extends ServiceClassInternal implements IUserService {
	protected name = 'user';

	async ensureLoginTokensLimit(uid: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```