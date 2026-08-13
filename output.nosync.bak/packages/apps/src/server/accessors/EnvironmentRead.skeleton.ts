## File: packages/apps/src/server/accessors/EnvironmentRead.ts

```typescript
import type {
	IEnvironmentalVariableRead,
	IEnvironmentRead,
	IServerSettingRead,
	ISettingRead,
} from '@rocket.chat/apps-engine/definition/accessors';

export class EnvironmentRead implements IEnvironmentRead {
	constructor(
		private readonly settings: ISettingRead,
		private readonly serverSettings: IServerSettingRead,
		private readonly envRead: IEnvironmentalVariableRead,
	) {
        /* Implementation Hidden */
    }

	public getSettings(): ISettingRead {
        /* Implementation Hidden */
    }

	public getServerSettings(): IServerSettingRead {
        /* Implementation Hidden */
    }

	public getEnvironmentVariables(): IEnvironmentalVariableRead {
        /* Implementation Hidden */
    }
}

```