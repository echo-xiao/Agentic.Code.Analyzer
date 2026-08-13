## File: apps/meteor/client/views/mediaCallHistory/CallHistoryRowExternalUser.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import type { CallHistoryExternalContact, CallHistoryTableRowProps } from '@rocket.chat/ui-voip';
import { CallHistoryTableRow, usePeekMediaSessionState, useWidgetExternalControls } from '@rocket.chat/ui-voip';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type CallHistoryRowExternalUserProps = Omit<CallHistoryTableRowProps<CallHistoryExternalContact>, 'onClick' | 'menu'> & {
	onClick: (historyId: string) => void;
};

const CallHistoryRowExternalUser = ({ _id, contact, type, status, duration, timestamp, onClick }: CallHistoryRowExternalUserProps) => {
    /* Implementation Hidden */
};
export default CallHistoryRowExternalUser;

```