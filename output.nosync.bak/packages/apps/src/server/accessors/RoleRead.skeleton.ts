## File: packages/apps/src/server/accessors/RoleRead.ts

```typescript
import type { IRoleRead } from '@rocket.chat/apps-engine/definition/accessors/IRoleRead';
import type { IRole } from '@rocket.chat/apps-engine/definition/roles';

import type { RoleBridge } from '../bridges';

export class RoleRead implements IRoleRead {
	constructor(
		private roleBridge: RoleBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getOneByIdOrName(idOrName: string): Promise<IRole | null> {
        /* Implementation Hidden */
    }

	public getCustomRoles(): Promise<Array<IRole>> {
        /* Implementation Hidden */
    }
}

```