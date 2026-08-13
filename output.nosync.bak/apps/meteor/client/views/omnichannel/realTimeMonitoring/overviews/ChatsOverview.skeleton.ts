## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/overviews/ChatsOverview.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import type { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentPropsWithoutRef } from 'react';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';
import CounterContainer from '../counter/CounterContainer';

const initialData = [
	{ title: '', value: 0 },
	{ title: '', value: '0%' },
	{ title: '', value: '00:00:00' },
];

type ChatsOverviewProps = {
	departmentId: ILivechatDepartment['_id'];
	dateRange: { start: string; end: string };
} & ComponentPropsWithoutRef<typeof Box>;

const ChatsOverview = ({ departmentId, dateRange, ...props }: ChatsOverviewProps) => {
    /* Implementation Hidden */
};

export default ChatsOverview;

```