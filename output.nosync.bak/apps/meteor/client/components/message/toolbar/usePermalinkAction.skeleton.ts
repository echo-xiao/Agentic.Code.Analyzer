## File: apps/meteor/client/components/message/toolbar/usePermalinkAction.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { isE2EEMessage } from '@rocket.chat/core-typings';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { MessageActionConfig, MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';
import { getPermaLink } from '../../../lib/getPermaLink';

export const usePermalinkAction = (
	message: IMessage,
	{ id, context, type, order }: { context: MessageActionContext[]; order: number } & Pick<MessageActionConfig, 'id' | 'type'>,
	{ room }: { room: IRoom },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```