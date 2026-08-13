## File: apps/meteor/client/lib/chats/flows/sendMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { runOptimisticSendMessage } from '../../../../app/lib/client/methods/sendMessage';
import { sdk } from '../../../../app/utils/client/lib/SDKClient';
import { t } from '../../../../app/utils/lib/i18n';
import { closeUnclosedCodeBlock } from '../../../../lib/utils/closeUnclosedCodeBlock';
import { Messages } from '../../../stores';
import { onClientBeforeSendMessage } from '../../onClientBeforeSendMessage';
import { dispatchToastMessage } from '../../toast';
import type { ChatAPI } from '../ChatAPI';
import { afterSendMessageCallback } from './afterSendMessageCallback';
import { processMessageEditing } from './processMessageEditing';
import { processMessageUploads } from './processMessageUploads';
import { processSetReaction } from './processSetReaction';
import { processSlashCommand } from './processSlashCommand';
import { processTooLongMessage } from './processTooLongMessage';

const process = async (chat: ChatAPI, message: IMessage, previewUrls?: string[], isSlashCommandAllowed?: boolean): Promise<void> => {
    /* Implementation Hidden */
};

export const sendMessage = async (
	chat: ChatAPI,
	{
		text,
		tshow,
		previewUrls,
		isSlashCommandAllowed,
	}: { text: string; tshow?: boolean; previewUrls?: string[]; isSlashCommandAllowed?: boolean; tmid?: IMessage['tmid'] },
): Promise<boolean> => {
    /* Implementation Hidden */
};

```