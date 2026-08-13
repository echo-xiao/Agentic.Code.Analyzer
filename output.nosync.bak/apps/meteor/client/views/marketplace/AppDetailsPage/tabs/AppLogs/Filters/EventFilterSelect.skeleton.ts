## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/EventFilterSelect.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { InputBoxSkeleton, Select } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogsDistinctValues } from '../../../../hooks/useLogsDistinctValues';

export type EventFilterSelectProps = Omit<ComponentProps<typeof Select>, 'options'> & { appId: string };

export const EventFilterSelect = ({ appId, ...props }: EventFilterSelectProps) => {
    /* Implementation Hidden */
};

```