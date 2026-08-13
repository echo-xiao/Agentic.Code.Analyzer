## File: apps/meteor/app/apps/server/bridges/settings.ts

```typescript
import { Apps, type IAppServerOrchestrator } from '@rocket.chat/apps';
import { ServerSettingBridge } from '@rocket.chat/apps/dist/server/bridges/ServerSettingBridge';
import type { IReadSettingPermission } from '@rocket.chat/apps-engine/definition/permissions/IPermission';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import { Settings } from '@rocket.chat/models';

import { updateAuditedByApp } from '../../../../server/settings/lib/auditedSettingUpdates';
import { notifyOnSettingChanged, notifyOnSettingChangedById } from '../../../lib/server/lib/notifyListener';

export class AppSettingBridge extends ServerSettingBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getAll(appId: string): Promise<Array<ISetting>> {
        /* Implementation Hidden */
    }

	protected async getOneById(id: string, appId: string): Promise<ISetting> {
        /* Implementation Hidden */
    }

	protected async hideGroup(name: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async hideSetting(id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async isReadableById(id: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async getReadableSettingById(id: string, appId: string): Promise<ISetting | null> {
        /* Implementation Hidden */
    }

	protected async updateOne(setting: ISetting & { id: string }, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async incrementValue(id: string, value: number, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```