## File: packages/apps/src/server/compiler/AppCompiler.ts

```typescript
import * as path from 'node:path';

import type { AppManager } from '../AppManager';
import { ProxiedApp } from '../ProxiedApp';
import type { IAppStorageItem } from '../storage';
import type { IParseAppPackageResult } from './IParseAppPackageResult';

export class AppCompiler {
	public normalizeStorageFiles(files: { [key: string]: string }): { [key: string]: string } {
        /* Implementation Hidden */
    }

	public async toSandBox(manager: AppManager, storage: IAppStorageItem, packageResult: IParseAppPackageResult): Promise<ProxiedApp> {
        /* Implementation Hidden */
    }
}

```