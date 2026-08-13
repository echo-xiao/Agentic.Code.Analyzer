## File: apps/meteor/client/views/mediaCallHistory/CallHistoryRowUnknownUser.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import { CallHistoryTableRow } from '@rocket.chat/ui-voip';
import type { CallHistoryTableRowProps, CallHistoryUnknownContact } from '@rocket.chat/ui-voip';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type CallHistoryRowUnknownUserProps = Omit<CallHistoryTableRowProps<CallHistoryUnknownContact>, 'onClick' | 'menu'> & {
	onClick: (historyId: string) => void;
};

const CallHistoryRowUnknownUser = ({ _id, contact, type, status, duration, timestamp, onClick }: CallHistoryRowUnknownUserProps) => {
    /* Implementation Hidden */
};
export default CallHistoryRowUnknownUser;

```