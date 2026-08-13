## File: apps/meteor/app/apps/server/converters/roles.ts

```typescript
import type { IAppRolesConverter } from '@rocket.chat/apps';
import type { IRole as AppsEngineRole } from '@rocket.chat/apps-engine/definition/roles';
import type { IRole } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

import { transformMappedData } from './transformMappedData';

export class AppRolesConverter implements IAppRolesConverter {
	async convertById(roleId: string): Promise<AppsEngineRole | undefined> {
        /* Implementation Hidden */
    }

	async convertRole(role: IRole): Promise<AppsEngineRole> {
        /* Implementation Hidden */
    }
}

```