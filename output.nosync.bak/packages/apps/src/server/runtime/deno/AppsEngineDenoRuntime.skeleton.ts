## File: packages/apps/src/server/runtime/deno/AppsEngineDenoRuntime.ts

```typescript
import * as fs from 'node:fs';
import * as path from 'node:path';

import type { DenoConfigurationFileSchema } from './typings';
import type { AppManager } from '../../AppManager';
import type { IParseAppPackageResult } from '../../compiler';
import type { IAppStorageItem } from '../../storage';
import { BaseRuntimeSubprocessController, type ProcessConfiguration } from '../base/BaseRuntimeSubprocessController';

// Trying to access environment variables in Deno throws an error where in vm2 it simply returned `undefined`
// So here we define the allowed envvars to prevent the process (and the compatibility) from breaking
export const ALLOWED_ENVIRONMENT_VARIABLES = [
	'NODE_EXTRA_CA_CERTS', // Accessed by the `https` node module
];

function getDenoConfigPath(): string {
    /* Implementation Hidden */
}

/**
 * Generates a runtime deno.jsonc at `<tempDir>/deno_runtime.jsonc` by reading
 * the static config and injecting the resolved absolute path for
 * `@rocket.chat/apps-engine/`. This makes deno-runtime location-independent:
 * the path is always correct regardless of where this package is installed.
 *
 * Returns the path to the generated config file.
 */
function generateEphemeralDenoConfig(targetPath: string, denoConfigPath: string, appsEnginePath: string): void {
    /* Implementation Hidden */
}

export class DenoRuntimeSubprocessController extends BaseRuntimeSubprocessController {
	private readonly denoBin = 'deno';

	private readonly denoRuntimePath: string;

	private readonly denoConfigPath: string;

	private readonly denoEphemeralConfigPath: string;

	private readonly denoDir: string;

	private readonly packagePath: string;

	constructor(manager: AppManager, appPackage: IParseAppPackageResult, storageItem: IAppStorageItem) {
        /* Implementation Hidden */
    }

	protected buildProcessConfiguration(): ProcessConfiguration {
        /* Implementation Hidden */
    }
}

```