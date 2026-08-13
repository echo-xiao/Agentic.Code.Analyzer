## File: apps/meteor/client/components/message/content/BroadcastMetrics.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageBlock, MessageMetrics, MessageMetricsReply } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useChat } from '../../../views/room/contexts/ChatContext';

export type BroadcastMetricsProps = {
	username: string;
	message: IMessage;
};

const BroadcastMetrics = ({ username, message }: BroadcastMetricsProps) => {
    /* Implementation Hidden */
};

export default BroadcastMetrics;

```