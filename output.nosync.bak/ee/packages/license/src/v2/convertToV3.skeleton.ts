## File: ee/packages/license/src/v2/convertToV3.ts

```typescript
/**
 * FromV2ToV3
 * Transform a License V2 into a V3 representation.
 */

import type { ILicenseV2, ILicenseV3, InternalModuleName } from '@rocket.chat/core-typings';

import { isBundle, getBundleFromModule, getBundleModules } from './bundles';
import { getTagColor } from './getTagColor';

export const convertToV3 = (v2: ILicenseV2): ILicenseV3 => {
    /* Implementation Hidden */
};

```