## File: apps/meteor/client/views/room/contextualBar/PruneMessages/PruneMessagesWithData.tsx

```typescript
import { isDirectMessageRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useEndpoint, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useCallback, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import PruneMessages from './PruneMessages';
import { formatDate } from '../../../../lib/utils/dateFormat';
import { useRoom } from '../../contexts/RoomContext';

const getTimeZoneOffset = (): string => {
    /* Implementation Hidden */
};

export const initialValues = {
	newer: {
		date: '',
		time: '',
	},
	older: {
		date: '',
		time: '',
	},
	users: [],
	inclusive: false,
	pinned: false,
	discussion: false,
	threads: false,
	attached: false,
};

const DEFAULT_PRUNE_LIMIT = 2000;

const PruneMessagesWithData = () => {
    /* Implementation Hidden */
};

export default PruneMessagesWithData;

```