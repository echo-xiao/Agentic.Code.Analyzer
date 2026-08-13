## File: apps/meteor/client/views/audit/hooks/useAuditTab.ts

```typescript
import type { IAuditLog } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRoute, useRouteParameter } from '@rocket.chat/ui-contexts';
import type { SetStateAction } from 'react';
import { useMemo } from 'react';

const typeToTabMap: Record<IAuditLog['fields']['type'], string> = {
	'': 'rooms',
	'u': 'users',
	'd': 'direct',
	'l': 'omnichannel',
};

const tabToTabMap = new Map(Object.entries(typeToTabMap).map(([type, tab]) => [tab, type as IAuditLog['fields']['type']]));

export const useAuditTab = () => {
    /* Implementation Hidden */
};

```