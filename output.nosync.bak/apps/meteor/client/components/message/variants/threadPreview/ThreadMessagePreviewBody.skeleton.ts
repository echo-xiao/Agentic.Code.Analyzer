## File: apps/meteor/client/components/message/variants/threadPreview/ThreadMessagePreviewBody.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isQuoteAttachment, isE2EEMessage } from '@rocket.chat/core-typings';
import { PreviewMarkup } from '@rocket.chat/gazzodown';
import type { Root } from '@rocket.chat/message-parser';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import GazzodownText from '../../../GazzodownText';

export type ThreadMessagePreviewBodyProps = {
	message: IMessage;
};

const ThreadMessagePreviewBody = ({ message }: ThreadMessagePreviewBodyProps) => {
    /* Implementation Hidden */
};

export default memo(ThreadMessagePreviewBody);

```