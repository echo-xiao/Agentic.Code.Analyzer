## File: ee/packages/license/src/v2/bundles.ts

```typescript
import { CoreModules, type LicenseModule } from '@rocket.chat/core-typings';

interface IBundle {
	[key: string]: readonly LicenseModule[];
}

const bundles: IBundle = {
	enterprise: CoreModules,
	pro: [],
};

export const getBundleFromModule = (moduleName: string): string | undefined => {
    /* Implementation Hidden */
};

export function isBundle(moduleName: string): boolean {
    /* Implementation Hidden */
}

export function getBundleModules(moduleName: string): readonly string[] {
    /* Implementation Hidden */
}

```