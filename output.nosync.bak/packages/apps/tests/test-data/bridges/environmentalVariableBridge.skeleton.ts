## File: packages/apps/tests/test-data/bridges/environmentalVariableBridge.ts

```typescript
import { EnvironmentalVariableBridge } from '../../../src/server/bridges/EnvironmentalVariableBridge';

export class TestsEnvironmentalVariableBridge extends EnvironmentalVariableBridge {
	public getValueByName(envVarName: string, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public isReadable(envVarName: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public isSet(envVarName: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```