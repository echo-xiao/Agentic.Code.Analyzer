## File: apps/meteor/client/views/marketplace/BundleChips.tsx

```typescript
import { Tag } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import type { App } from './types';

export type BundleChipsProps = {
	bundledIn: {
		bundleId: string;
		bundleName: string;
		apps: App[];
	}[];
};

const BundleChips = ({ bundledIn }: BundleChipsProps) => {
    /* Implementation Hidden */
};

export default BundleChips;

```