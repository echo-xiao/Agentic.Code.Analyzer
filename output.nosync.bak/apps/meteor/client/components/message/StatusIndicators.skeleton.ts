## File: apps/meteor/client/components/message/StatusIndicators.tsx

```typescript
import type { IMessage, ITranslatedMessage } from '@rocket.chat/core-typings';
import { isEditedMessage, isE2EEMessage, isE2EEPinnedMessage } from '@rocket.chat/core-typings';
import { MessageStatusIndicator, MessageStatusIndicatorItem } from '@rocket.chat/fuselage';
import { useUserId } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useMessageDateFormatter, useShowStarred, useShowTranslated, useShowFollowing } from './list/MessageListContext';

export type StatusIndicatorsProps = {
	message: IMessage & Partial<ITranslatedMessage>;
};

const StatusIndicators = ({ message }: StatusIndicatorsProps) => {
    /* Implementation Hidden */
};

export default StatusIndicators;

```