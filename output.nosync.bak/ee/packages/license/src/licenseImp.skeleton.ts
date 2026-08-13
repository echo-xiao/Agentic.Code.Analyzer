## File: ee/packages/license/src/licenseImp.ts

```typescript
import type { LicenseLimitKind, LimitContext } from '@rocket.chat/core-typings';

import { getAppsConfig, getMaxActiveUsers, getUnmodifiedLicenseAndModules } from './deprecated';
import { onLicense } from './events/deprecated';
import {
	onBehaviorToggled,
	onBehaviorTriggered,
	onInvalidFeature,
	onInvalidateLicense,
	onLimitReached,
	onModule,
	onChange,
	onToggledFeature,
	onValidFeature,
	onValidateLicense,
	onInstall,
	onInvalidate,
	onRemoveLicense,
} from './events/listeners';
import { overwriteClassOnLicense } from './events/overwriteClassOnLicense';
import { LicenseManager } from './license';
import { logger } from './logger';
import { getExternalModules, getModuleDefinition, getModules, hasModule } from './modules';
import { showLicense } from './showLicense';
import { getTags } from './tags';
import { getCurrentValueForLicenseLimit, setLicenseLimitCounter } from './validation/getCurrentValueForLicenseLimit';
import { validateFormat } from './validation/validateFormat';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class LicenseImp extends LicenseManager {
	constructor() {
        /* Implementation Hidden */
    }

	validateFormat = validateFormat;

	hasModule = hasModule;

	getModules = getModules;

	getModuleDefinition = getModuleDefinition;

	getExternalModules = getExternalModules;

	getTags = getTags;

	overwriteClassOnLicense = overwriteClassOnLicense;

	public setLicenseLimitCounter = setLicenseLimitCounter;

	getCurrentValueForLicenseLimit = getCurrentValueForLicenseLimit;

	public async isLimitReached<T extends LicenseLimitKind>(action: T, context?: Partial<LimitContext<T>>): Promise<boolean> {
        /* Implementation Hidden */
    }

	onChange = onChange;

	onInstall = onInstall;

	onRemoveLicense = onRemoveLicense;

	onInvalidate = onInvalidate;

	onValidFeature = onValidFeature;

	onInvalidFeature = onInvalidFeature;

	onToggledFeature = onToggledFeature;

	onModule = onModule;

	onValidateLicense = onValidateLicense;

	onInvalidateLicense = onInvalidateLicense;

	onLimitReached = onLimitReached;

	onBehaviorTriggered = onBehaviorTriggered;

	onBehaviorToggled = onBehaviorToggled;

	// Deprecated:
	onLicense = onLicense;

	// Deprecated:
	getMaxActiveUsers = getMaxActiveUsers;

	// Deprecated:
	getAppsConfig = getAppsConfig;

	// Deprecated:
	getUnmodifiedLicenseAndModules = getUnmodifiedLicenseAndModules;
}

const license = new LicenseImp();

export { license as License };

```