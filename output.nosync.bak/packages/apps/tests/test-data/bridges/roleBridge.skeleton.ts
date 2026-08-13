## File: packages/apps/tests/test-data/bridges/roleBridge.ts

```typescript
import type { IRole } from '@rocket.chat/apps-engine/definition/roles';

import { RoleBridge } from '../../../src/server/bridges';

export class TestsRoleBridge extends RoleBridge {
	public getOneByIdOrName(idOrName: IRole['id'] | IRole['name'], appId: string): Promise<IRole | null> {
        /* Implementation Hidden */
    }

	public getCustomRoles(appId: string): Promise<Array<IRole>> {
        /* Implementation Hidden */
    }
}

```