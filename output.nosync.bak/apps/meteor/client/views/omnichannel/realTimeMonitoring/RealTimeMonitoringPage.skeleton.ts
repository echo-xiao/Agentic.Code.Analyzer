## File: apps/meteor/client/views/omnichannel/realTimeMonitoring/RealTimeMonitoringPage.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Select, Margins, Option } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useQueryClient } from '@tanstack/react-query';
import type { Key } from 'react';
import { useState, useMemo, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { getDateRange } from '../../../lib/utils/getDateRange';
import AutoCompleteDepartment from '../components/AutoCompleteDepartment';
import Label from '../components/Label';
import AgentStatusChart from './charts/AgentStatusChart';
import ChatDurationChart from './charts/ChatDurationChart';
import ChatsChart from './charts/ChatsChart';
import ChatsPerAgentChart from './charts/ChatsPerAgentChart';
import ChatsPerDepartmentChart from './charts/ChatsPerDepartmentChart';
import ResponseTimesChart from './charts/ResponseTimesChart';
import AgentsOverview from './overviews/AgentsOverview';
import ChatsOverview from './overviews/ChatsOverview';
import ConversationOverview from './overviews/ConversationOverview';
import ProductivityOverview from './overviews/ProductivityOverview';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

const dateRange = getDateRange();

const RealTimeMonitoringPage = () => {
    /* Implementation Hidden */
};

export default RealTimeMonitoringPage;

```