## File: apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts

```typescript
import type { IMessage, ISubscription, ITranslatedMessage } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useCallback, useMemo } from 'react';

import { AutoTranslate } from '../../../../../app/autotranslate/client';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { hasTranslationLanguageInAttachments, hasTranslationLanguageInMessage } from '../lib/autoTranslate';
import { isOwnUserMessage } from '../lib/isOwnUserMessage';

export type AutoTranslateOptions = {
	autoTranslateEnabled: boolean;
	autoTranslateLanguage?: string;
	showAutoTranslate: (message: IMessage & Partial<ITranslatedMessage>) => boolean;
};

export const useAutoTranslate = (subscription?: ISubscription): AutoTranslateOptions => {
    /* Implementation Hidden */
};

```