## File: apps/meteor/app/apps/server/bridges/details.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { AppDetailChangesBridge as DetailChangesBridge } from '@rocket.chat/apps/dist/server/bridges/AppDetailChangesBridge';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

export class AppDetailChangesBridge extends DetailChangesBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected onAppSettingsChange(appId: string, setting: ISetting): void {
        /* Implementation Hidden */
    }
}

```