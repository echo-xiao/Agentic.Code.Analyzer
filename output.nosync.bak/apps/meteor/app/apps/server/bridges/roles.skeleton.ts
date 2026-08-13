## File: apps/meteor/app/apps/server/bridges/roles.ts

```typescript
import type { IAppServerOrchestrator, IAppsRole } from '@rocket.chat/apps';
import { RoleBridge } from '@rocket.chat/apps/dist/server/bridges/RoleBridge';
import type { IRole } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

export class AppRoleBridge extends RoleBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getOneByIdOrName(idOrName: IAppsRole['id'] | IAppsRole['name'], appId: string): Promise<IAppsRole | null> {
        /* Implementation Hidden */
    }

	protected async getCustomRoles(appId: string): Promise<Array<IAppsRole>> {
        /* Implementation Hidden */
    }
}

```