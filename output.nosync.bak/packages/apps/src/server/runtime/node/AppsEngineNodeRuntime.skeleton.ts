## File: packages/apps/src/server/runtime/node/AppsEngineNodeRuntime.ts

```typescript
import * as path from 'node:path';

import type { AppManager } from '../../AppManager';
import type { IParseAppPackageResult } from '../../compiler';
import type { IAppStorageItem } from '../../storage';
import { BaseRuntimeSubprocessController, type ProcessConfiguration } from '../base/BaseRuntimeSubprocessController';

export class NodeRuntimeSubprocessController extends BaseRuntimeSubprocessController {
	private readonly nodeBin = 'node';

	private readonly scriptRuntimePath: string;

	constructor(manager: AppManager, appPackage: IParseAppPackageResult, storageItem: IAppStorageItem) {
        /* Implementation Hidden */
    }

	protected buildProcessConfiguration(): ProcessConfiguration {
        /* Implementation Hidden */
    }
}

```