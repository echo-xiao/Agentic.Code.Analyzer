## File: apps/meteor/client/views/omnichannel/analytics/AnalyticsPage.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Select, Margins, Field, FieldLabel, FieldRow, Label, Option } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AgentOverview from './AgentOverview';
import DateRangePicker from './DateRangePicker';
import InterchangeableChart from './InterchangeableChart';
import Overview from './Overview';
import AutoCompleteDepartment from '../components/AutoCompleteDepartment';

const useOptions = (type: string): SelectOption[] => {
    /* Implementation Hidden */
};

const AnalyticsPage = () => {
    /* Implementation Hidden */
};

export default AnalyticsPage;

```