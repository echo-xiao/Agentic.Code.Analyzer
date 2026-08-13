## File: apps/meteor/client/views/omnichannel/hooks/useMonitorsList.ts

```typescript
import type { Serialized, ILivechatMonitor } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

type MonitorsListOptions = {
	filter: string;
	limit?: number;
};

type MonitorListItem = {
	_id: string;
	label: string;
	value: string;
};

const DEFAULT_QUERY_LIMIT = 25;

export const useMonitorsList = (options: MonitorsListOptions) => {
    /* Implementation Hidden */
};

```