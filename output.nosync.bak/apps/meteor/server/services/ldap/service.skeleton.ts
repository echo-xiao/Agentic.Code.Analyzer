## File: apps/meteor/server/services/ldap/service.ts

```typescript
import type { ILDAPService } from '@rocket.chat/core-services';
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { LDAPLoginResult } from '@rocket.chat/core-typings';

import { LDAPManager } from '../../lib/ldap/Manager';

export class LDAPService extends ServiceClassInternal implements ILDAPService {
	protected name = 'ldap';

	async loginRequest(username: string, password: string): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	async loginAuthenticatedUserRequest(username: string): Promise<LDAPLoginResult> {
        /* Implementation Hidden */
    }

	async testConnection(): Promise<void> {
        /* Implementation Hidden */
    }

	async testSearch(username: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```