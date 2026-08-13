## File: packages/apps/src/server/accessors/EnvironmentWrite.ts

```typescript
import type { IEnvironmentWrite, IServerSettingUpdater, ISettingUpdater } from '@rocket.chat/apps-engine/definition/accessors';

export class EnvironmentWrite implements IEnvironmentWrite {
	constructor(
		private readonly settings: ISettingUpdater,
		private readonly serverSettings: IServerSettingUpdater,
	) {
        /* Implementation Hidden */
    }

	public getSettings(): ISettingUpdater {
        /* Implementation Hidden */
    }

	public getServerSettings(): IServerSettingUpdater {
        /* Implementation Hidden */
    }
}

```