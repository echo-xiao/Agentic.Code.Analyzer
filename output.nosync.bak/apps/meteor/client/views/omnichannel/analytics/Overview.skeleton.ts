## File: apps/meteor/client/views/omnichannel/analytics/Overview.tsx

```typescript
import { Box, Skeleton } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CounterItem from '../realTimeMonitoring/counter/CounterItem';
import CounterRow from '../realTimeMonitoring/counter/CounterRow';

const initialData: { title?: string; value: string | number }[] = Array.from({ length: 3 }).map(() => ({ title: undefined, value: '' }));

const conversationsInitialData = [initialData, initialData];
const productivityInitialData = [initialData];

export type OverviewProps = { type: string; dateRange: { start: string; end: string }; departmentId: string };

const Overview = ({ type, dateRange, departmentId }: OverviewProps) => {
    /* Implementation Hidden */
};

export default Overview;

```