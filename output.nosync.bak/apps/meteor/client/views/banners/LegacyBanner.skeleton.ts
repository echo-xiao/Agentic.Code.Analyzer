## File: apps/meteor/client/views/banners/LegacyBanner.tsx

```typescript
import { Banner, Icon } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';
import { useCallback, useEffect } from 'react';

import type { LegacyBannerPayload } from '../../lib/banners';
import * as banners from '../../lib/banners';

export type LegacyBannerProps = {
	config: LegacyBannerPayload;
};

const LegacyBanner = ({ config }: LegacyBannerProps) => {
    /* Implementation Hidden */
};

export default LegacyBanner;

```