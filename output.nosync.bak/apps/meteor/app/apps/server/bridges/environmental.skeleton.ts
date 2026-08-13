## File: apps/meteor/app/apps/server/bridges/environmental.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { EnvironmentalVariableBridge } from '@rocket.chat/apps/dist/server/bridges/EnvironmentalVariableBridge';

export class AppEnvironmentalVariableBridge extends EnvironmentalVariableBridge {
	allowed: Array<string>;

	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getValueByName(envVarName: string, appId: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	protected async isReadable(envVarName: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected isAppsOwnVariable(envVarName: string, appId: string): boolean {
        /* Implementation Hidden */
    }

	protected async isSet(envVarName: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```