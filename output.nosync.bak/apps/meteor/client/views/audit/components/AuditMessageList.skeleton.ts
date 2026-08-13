## File: apps/meteor/client/views/audit/components/AuditMessageList.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageDivider } from '@rocket.chat/fuselage';
import { MessageTypes } from '@rocket.chat/message-types';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { Fragment, memo } from 'react';

import RoomMessage from '../../../components/message/variants/RoomMessage';
import SystemMessage from '../../../components/message/variants/SystemMessage';
import { useFormatDate } from '../../../hooks/useFormatDate';
import { isMessageNewDay } from '../../room/MessageList/lib/isMessageNewDay';

export type AuditMessageListProps = {
	messages: IMessage[];
};

const AuditMessageList = ({ messages }: AuditMessageListProps) => {
    /* Implementation Hidden */
};

export default memo(AuditMessageList);

```