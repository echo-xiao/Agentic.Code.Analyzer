## File: packages/models/src/models/Permissions.ts

```typescript
import type { IPermission, IRole, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IPermissionsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, FindCursor, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class PermissionsRaw extends BaseRaw<IPermission> implements IPermissionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IPermission>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async createOrUpdate(name: string, roles: IRole['_id'][]): Promise<IPermission['_id']> {
        /* Implementation Hidden */
    }

	async create(id: string, roles: IRole['_id'][]): Promise<IPermission['_id']> {
        /* Implementation Hidden */
    }

	async addRole(permission: string, role: IRole['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	async setRoles(permission: string, roles: IRole['_id'][]): Promise<void> {
        /* Implementation Hidden */
    }

	async removeRole(permission: string, role: IRole['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	findByLevel(level: 'settings', settingId?: string): FindCursor<IPermission> {
        /* Implementation Hidden */
    }
}

```