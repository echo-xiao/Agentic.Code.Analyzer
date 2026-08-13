## File: apps/meteor/client/components/message/content/MessageActions.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Box, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import MessageAction from './actions/MessageAction';
import { actionLinks } from '../../../lib/actionLinks';

type MessageActionOptions = {
	icon: IconName;
	i18nLabel?: TranslationKey;
	label?: string;
	methodId: string;
	runAction?: (action: string) => () => void;
	actionLinksAlignment?: string;
};

export type MessageActionsProps = {
	message: IMessage;
	actions: MessageActionOptions[];
};

const MessageActions = ({ message, actions }: MessageActionsProps) => {
    /* Implementation Hidden */
};

export default MessageActions;

```