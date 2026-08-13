## File: apps/meteor/client/views/admin/integrations/outgoing/history/HistoryContent.tsx

```typescript
import type { IIntegrationHistory, Serialized } from '@rocket.chat/core-typings';
import { Skeleton, Box, Accordion } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import HistoryItem from './HistoryItem';

export type HistoryContentProps = { data: Serialized<IIntegrationHistory>[]; isLoading: boolean };

const HistoryContent = ({ data, isLoading }: HistoryContentProps) => {
    /* Implementation Hidden */
};

export default HistoryContent;

```