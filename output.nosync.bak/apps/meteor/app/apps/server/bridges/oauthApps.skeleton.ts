## File: apps/meteor/app/apps/server/bridges/oauthApps.ts

```typescript
import { randomUUID } from 'node:crypto';

import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { OAuthAppsBridge } from '@rocket.chat/apps/dist/server/bridges/OAuthAppsBridge';
import type { IOAuthApp, IOAuthAppParams } from '@rocket.chat/apps-engine/definition/accessors/IOAuthApp';
import type { IOAuthApps } from '@rocket.chat/core-typings';
import { OAuthApps, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';

export class AppOAuthAppsBridge extends OAuthAppsBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async create(oAuthApp: IOAuthAppParams, appId: string): Promise<string | null> {
        /* Implementation Hidden */
    }

	protected async getById(id: string, appId: string): Promise<IOAuthApp | null> {
        /* Implementation Hidden */
    }

	protected async getByName(name: string, appId: string): Promise<Array<IOAuthApp>> {
        /* Implementation Hidden */
    }

	protected async update(oAuthApp: IOAuthAppParams, id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async delete(id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async purge(appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```