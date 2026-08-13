## File: apps/meteor/client/views/omnichannel/directory/hooks/useDisplayFilters.ts

```typescript
import type { PaginatedMultiSelectOption } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useFormatDate } from '../../../../hooks/useFormatDate';
import type { ChatsFiltersQuery } from '../contexts/ChatsContext';

const statusTextMap: { [key: string]: TranslationKey } = {
	all: 'All',
	closed: 'Closed',
	opened: 'Room_Status_Open',
	onhold: 'On_Hold_Chats',
	queued: 'Queued',
};

export const useDisplayFilters = (filtersQuery: ChatsFiltersQuery) => {
    /* Implementation Hidden */
};

const parseMultiSelect = (data: PaginatedMultiSelectOption[]) => {
    /* Implementation Hidden */
};

```