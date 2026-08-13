## File: packages/ui-voip/src/views/MediaCallHistoryTable/CallHistoryTableStatus.tsx

```typescript
import type { CallHistoryItemState } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { getCallDurationText } from '../../ui-kit/getHistoryMessagePayload';

type CallHistoryTableStatusProps = {
	status: CallHistoryItemState;
	duration: number;
};

const getCallStateText = (status: CallHistoryItemState, t: TFunction) => {
    /* Implementation Hidden */
};

const getIcon = (status: CallHistoryItemState) => {
    /* Implementation Hidden */
};

const getVariant = (status: CallHistoryItemState) => {
    /* Implementation Hidden */
};

const CallHistoryTableStatus = ({ status, duration }: CallHistoryTableStatusProps) => {
    /* Implementation Hidden */
};

export default CallHistoryTableStatus;

```