## File: packages/apps/src/server/accessors/EnvironmentalVariableRead.ts

```typescript
import type { IEnvironmentalVariableRead } from '@rocket.chat/apps-engine/definition/accessors';

import type { EnvironmentalVariableBridge } from '../bridges';

export class EnvironmentalVariableRead implements IEnvironmentalVariableRead {
	constructor(
		private readonly bridge: EnvironmentalVariableBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getValueByName(envVarName: string): Promise<string> {
        /* Implementation Hidden */
    }

	public isReadable(envVarName: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public isSet(envVarName: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```