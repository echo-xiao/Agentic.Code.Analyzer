## File: apps/meteor/client/views/omnichannel/queueList/QueueListFilter.tsx

```typescript
import { Box, Select, Label } from '@rocket.chat/fuselage';
import { useStableCallback, useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { Dispatch, FormEvent, Key, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AutoCompleteAgent from '../components/AutoCompleteAgent';
import AutoCompleteDepartment from '../components/AutoCompleteDepartment';

type QueueListFilterProps = {
	setFilter: Dispatch<SetStateAction<any>>;
};

export const QueueListFilter = ({ setFilter, ...props }: QueueListFilterProps) => {
    /* Implementation Hidden */
};

```