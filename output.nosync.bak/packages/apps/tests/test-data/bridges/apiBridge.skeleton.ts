## File: packages/apps/tests/test-data/bridges/apiBridge.ts

```typescript
import type { IApi } from '@rocket.chat/apps-engine/definition/api';

import { ApiBridge } from '../../../src/server/bridges';
import type { AppApi } from '../../../src/server/managers/AppApi';
import { TestData } from '../utilities';

export class TestsApiBridge extends ApiBridge {
	public apis: Map<string, Map<string, IApi>>;

	constructor() {
        /* Implementation Hidden */
    }

	public async registerApi(api: AppApi, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unregisterApis(appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```