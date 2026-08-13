## File: apps/meteor/app/ui-message/client/messageBox/createComposerAPI.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type { RefObject } from 'react';

import { limitQuoteChain } from './limitQuoteChain';
import type { FormattingButton } from './messageBoxFormatting';
import { formattingButtons } from './messageBoxFormatting';
import type { ComposerAPI } from '../../../../client/lib/chats/ChatAPI';
import { createUploadsAPI } from '../../../../client/lib/chats/uploads';
import { settings } from '../../../../client/lib/settings';
import { withDebouncing } from '../../../../lib/utils/highOrderFunctions';

export const createComposerAPI = (
	input: HTMLTextAreaElement,
	persistDraft: (value: string) => void,
	initialDraft: string,
	quoteChainLimit: number,
	composerRef: RefObject<HTMLElement | null>,
	{ rid, tmid }: { rid: string; tmid?: string },
): ComposerAPI => {
    /* Implementation Hidden */
};

```