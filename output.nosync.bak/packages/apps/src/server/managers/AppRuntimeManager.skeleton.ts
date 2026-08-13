## File: packages/apps/src/server/managers/AppRuntimeManager.ts

```typescript
import type { AppManager } from '../AppManager';
import type { IParseAppPackageResult } from '../compiler';
import type { IRuntimeController } from '../runtime/IRuntimeController';
import { DenoRuntimeSubprocessController } from '../runtime/deno/AppsEngineDenoRuntime';
import { NodeRuntimeSubprocessController } from '../runtime/node/AppsEngineNodeRuntime';
import type { IAppStorageItem } from '../storage';

export type AppRuntimeParams = {
	appId: string;
	appSource: string;
};

export type ExecRequestContext = {
	method: string;
	params: unknown[];
};

export type ExecRequestOptions = {
	timeout?: number;
};

const { APPS_ENGINE_RUNTIME_BACKEND = 'deno' } = process.env;

export const nodeRuntimeFactory = (manager: AppManager, appPackage: IParseAppPackageResult, storageItem: IAppStorageItem) =>
	new NodeRuntimeSubprocessController(manager, appPackage, storageItem);

export const denoRuntimeFactory = (manager: AppManager, appPackage: IParseAppPackageResult, storageItem: IAppStorageItem) =>
	new DenoRuntimeSubprocessController(manager, appPackage, storageItem);

const defaultRuntimeFactory = APPS_ENGINE_RUNTIME_BACKEND === 'node' ? nodeRuntimeFactory : denoRuntimeFactory;

export class AppRuntimeManager {
	private readonly subprocesses: Record<string, IRuntimeController> = {};

	constructor(
		private readonly manager: AppManager,
		private readonly runtimeFactory = defaultRuntimeFactory,
	) {
        /* Implementation Hidden */
    }

	public async startRuntimeForApp(
		appPackage: IParseAppPackageResult,
		storageItem: IAppStorageItem,
		options = { force: false },
	): Promise<IRuntimeController> {
        /* Implementation Hidden */
    }

	public async runInSandbox(appId: string, execRequest: ExecRequestContext, options?: ExecRequestOptions): Promise<unknown> {
        /* Implementation Hidden */
    }

	public async stopRuntime(controller: IRuntimeController): Promise<void> {
        /* Implementation Hidden */
    }
}

```