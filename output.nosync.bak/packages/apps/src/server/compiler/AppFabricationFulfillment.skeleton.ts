## File: packages/apps/src/server/compiler/AppFabricationFulfillment.ts

```typescript
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

import type { ProxiedApp } from '../ProxiedApp';
import { AppLicenseValidationResult } from '../marketplace/license';

export class AppFabricationFulfillment {
	public info: IAppInfo;

	public app: ProxiedApp;

	public implemented: { [int: string]: boolean };

	public licenseValidationResult: AppLicenseValidationResult;

	public storageError: string;

	public appUserError: object;

	constructor() {
        /* Implementation Hidden */
    }

	public setAppInfo(information: IAppInfo): void {
        /* Implementation Hidden */
    }

	public getAppInfo(): IAppInfo {
        /* Implementation Hidden */
    }

	public setApp(application: ProxiedApp): void {
        /* Implementation Hidden */
    }

	public getApp(): ProxiedApp {
        /* Implementation Hidden */
    }

	public setImplementedInterfaces(interfaces: { [int: string]: boolean }): void {
        /* Implementation Hidden */
    }

	public getImplementedInferfaces(): { [int: string]: boolean } {
        /* Implementation Hidden */
    }

	public setStorageError(errorMessage: string): void {
        /* Implementation Hidden */
    }

	public setAppUserError(error: object): void {
        /* Implementation Hidden */
    }

	public getStorageError(): string {
        /* Implementation Hidden */
    }

	public getAppUserError(): object {
        /* Implementation Hidden */
    }

	public hasStorageError(): boolean {
        /* Implementation Hidden */
    }

	public hasAppUserError(): boolean {
        /* Implementation Hidden */
    }

	public getLicenseValidationResult(): AppLicenseValidationResult {
        /* Implementation Hidden */
    }
}

```