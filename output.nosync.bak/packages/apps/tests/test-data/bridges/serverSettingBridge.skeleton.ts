## File: packages/apps/tests/test-data/bridges/serverSettingBridge.ts

```typescript
import { SettingType, type ISetting } from '@rocket.chat/apps-engine/definition/settings';

import { ServerSettingBridge } from '../../../src/server/bridges';

export class TestsServerSettingBridge extends ServerSettingBridge {
	public getAll(appId: string): Promise<Array<ISetting>> {
        /* Implementation Hidden */
    }

	public getOneById(id: string, appId: string): Promise<ISetting> {
        /* Implementation Hidden */
    }

	public hideGroup(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	public hideSetting(id: string): Promise<void> {
        /* Implementation Hidden */
    }

	public isReadableById(id: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public updateOne(setting: ISetting, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public incrementValue(id: ISetting['id'], value: number, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```