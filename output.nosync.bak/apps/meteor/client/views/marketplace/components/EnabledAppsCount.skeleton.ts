## File: apps/meteor/client/views/marketplace/components/EnabledAppsCount.tsx

```typescript
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericResourceUsage } from '../../../components/GenericResourceUsage';

const EnabledAppsCount = ({
	limit,
	enabled,
	context,
	tooltip,
}: {
	limit: number;
	enabled: number;
	context: 'private' | 'explore' | 'installed' | 'premium' | 'requested';
	tooltip?: string;
}) => {
    /* Implementation Hidden */
};

export default EnabledAppsCount;

```