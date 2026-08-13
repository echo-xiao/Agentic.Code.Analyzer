## File: ee/packages/license/src/modules.ts

```typescript
import type { LicenseModule, InternalModuleName, ExternalModule } from '@rocket.chat/core-typings';
import { CoreModules } from '@rocket.chat/core-typings';

import { moduleRemoved, moduleValidated } from './events/emitter';
import type { LicenseManager } from './license';

export function isInternalModuleName(module: string): module is InternalModuleName {
    /* Implementation Hidden */
}

export function notifyValidatedModules(this: LicenseManager, licenseModules: LicenseModule[]) {
    /* Implementation Hidden */
}

export function notifyInvalidatedModules(this: LicenseManager, licenseModules: LicenseModule[]) {
    /* Implementation Hidden */
}

export function invalidateAll(this: LicenseManager) {
    /* Implementation Hidden */
}

export function getModules(this: LicenseManager) {
    /* Implementation Hidden */
}

export function getModuleDefinition(this: LicenseManager, moduleName: LicenseModule) {
    /* Implementation Hidden */
}

export function getExternalModules(this: LicenseManager): ExternalModule[] {
    /* Implementation Hidden */
}

export function hasModule(this: LicenseManager, module: LicenseModule) {
    /* Implementation Hidden */
}

export function replaceModules(this: LicenseManager, newModules: LicenseModule[]): boolean {
    /* Implementation Hidden */
}

```