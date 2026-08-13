## File: packages/apps/src/server/runtime/AppsEngineEmptyRuntime.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

import type { IAppsEngineRuntimeOptions } from './AppsEngineRuntime';
import { AppsEngineRuntime } from './AppsEngineRuntime';

export class AppsEngineEmptyRuntime extends AppsEngineRuntime {
	public static async runCode(_code: string, _sandbox?: Record<string, any>, _options?: IAppsEngineRuntimeOptions): Promise<any> {
        /* Implementation Hidden */
    }

	public static runCodeSync(_code: string, _sandbox?: Record<string, any>, _options?: IAppsEngineRuntimeOptions): any {
        /* Implementation Hidden */
    }

	constructor(readonly app: App) {
        /* Implementation Hidden */
    }

	public async runInSandbox(_code: string, _sandbox?: Record<string, any>, _options?: IAppsEngineRuntimeOptions): Promise<any> {
        /* Implementation Hidden */
    }
}

```