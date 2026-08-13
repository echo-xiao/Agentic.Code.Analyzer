## File: ee/packages/license/src/events/overwriteClassOnLicense.ts

```typescript
import type { LicenseModule } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { onLicense } from './deprecated';

interface IOverrideClassProperties {
	[key: string]: (...args: any[]) => any;
}

type Class = { new (...args: any[]): any };

export async function overwriteClassOnLicense(
	this: LicenseManager,

	license: LicenseModule,
	original: Class,
	overwrite: IOverrideClassProperties,
): Promise<void> {
    /* Implementation Hidden */
}

```