## File: apps/meteor/ee/server/local-services/ldap/service.ts

```typescript
import { ServiceClassInternal, type ILDAPEEService } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { FindCursor } from 'mongodb';

import { LDAPEEManager } from '../../lib/ldap/Manager';

export class LDAPEEService extends ServiceClassInternal implements ILDAPEEService {
	protected name = 'ldap-enterprise';

	async sync(): Promise<void> {
        /* Implementation Hidden */
    }

	async syncAvatars(): Promise<void> {
        /* Implementation Hidden */
    }

	async syncAvatarAndAbacAttributes(): Promise<void> {
        /* Implementation Hidden */
    }

	async syncLogout(): Promise<void> {
        /* Implementation Hidden */
    }

	async syncAbacAttributes(): Promise<void> {
        /* Implementation Hidden */
    }

	async syncUsersAbacAttributes(users: FindCursor<IUser>): Promise<void> {
        /* Implementation Hidden */
    }

	async syncUsersAbacAttributesByIds(userIds: string[]): Promise<void> {
        /* Implementation Hidden */
    }
}

```