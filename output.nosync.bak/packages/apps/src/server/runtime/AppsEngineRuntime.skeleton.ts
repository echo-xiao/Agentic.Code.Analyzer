## File: packages/apps/src/server/runtime/AppsEngineRuntime.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

export const APPS_ENGINE_RUNTIME_DEFAULT_TIMEOUT = 1000;

export const APPS_ENGINE_RUNTIME_FILE_PREFIX = '$RocketChat_App$';

export function getFilenameForApp(filename: string): string {
    /* Implementation Hidden */
}

export abstract class AppsEngineRuntime {
	public static async runCode(_code: string, _sandbox?: Record<string, any>, _options?: IAppsEngineRuntimeOptions): Promise<any> {
        /* Implementation Hidden */
    }

	public static runCodeSync(_code: string, _sandbox?: Record<string, any>, _options?: IAppsEngineRuntimeOptions): any {
        /* Implementation Hidden */
    }

	constructor(_app: App, _customRequire: (module: string) => any) {
        /* Implementation Hidden */
    }

	public abstract runInSandbox(code: string, sandbox?: Record<string, any>, options?: IAppsEngineRuntimeOptions): Promise<any>;
}

export interface IAppsEngineRuntimeOptions {
	timeout?: number;
	filename?: string;
	returnAllExports?: boolean;
}

```