## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/overviews/AgentsOverview.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import type { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentPropsWithoutRef } from 'react';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';
import CounterContainer from '../counter/CounterContainer';

const overviewInitalValue = {
	title: '',
	value: '-',
};

type AgentsOverviewChartsProps = {
	departmentId: ILivechatDepartment['_id'];
	dateRange: { start: string; end: string };
} & ComponentPropsWithoutRef<typeof Box>;

const initialData = [overviewInitalValue, overviewInitalValue, overviewInitalValue];

const AgentsOverview = ({ departmentId, dateRange, ...props }: AgentsOverviewChartsProps) => {
    /* Implementation Hidden */
};

export default AgentsOverview;

```