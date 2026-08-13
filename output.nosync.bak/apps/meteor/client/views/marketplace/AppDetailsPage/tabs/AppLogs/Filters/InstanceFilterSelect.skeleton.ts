## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/InstanceFilterSelect.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { InputBoxSkeleton, Select } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogsDistinctValues } from '../../../../hooks/useLogsDistinctValues';

export type InstanceFilterSelectProps = Omit<ComponentProps<typeof Select>, 'options'> & { appId: string };

export const InstanceFilterSelect = ({ appId, ...props }: InstanceFilterSelectProps) => {
    /* Implementation Hidden */
};

```