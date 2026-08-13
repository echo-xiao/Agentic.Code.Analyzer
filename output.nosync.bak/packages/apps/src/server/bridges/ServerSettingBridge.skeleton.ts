## File: packages/apps/src/server/bridges/ServerSettingBridge.ts

```typescript
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class ServerSettingBridge extends BaseBridge {
	public async doGetAll(appId: string): Promise<Array<ISetting>> {
        /* Implementation Hidden */
    }

	public async doGetOneById(id: string, appId: string): Promise<ISetting> {
        /* Implementation Hidden */
    }

	public async doHideGroup(name: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doHideSetting(id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doIsReadableById(id: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async doUpdateOne(setting: ISetting, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doIncrementValue(id: ISetting['id'], value: number, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract getAll(appId: string): Promise<Array<ISetting>>;

	protected abstract getOneById(id: string, appId: string): Promise<ISetting>;

	protected abstract hideGroup(name: string, appId: string): Promise<void>;

	protected abstract hideSetting(id: string, appId: string): Promise<void>;

	protected abstract isReadableById(id: string, appId: string): Promise<boolean>;

	protected abstract updateOne(setting: ISetting, appId: string): Promise<void>;

	protected abstract incrementValue(id: ISetting['id'], value: number, appId: string): Promise<void>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```