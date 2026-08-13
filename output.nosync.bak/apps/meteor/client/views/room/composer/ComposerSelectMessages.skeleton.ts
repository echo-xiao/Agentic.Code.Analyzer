## File: apps/meteor/client/views/room/composer/ComposerSelectMessages.tsx

```typescript
import { Button, ButtonGroup } from '@rocket.chat/fuselage';
import { MessageFooterCallout, MessageFooterCalloutContent } from '@rocket.chat/ui-composer';
import { useTranslation } from 'react-i18next';

import type { ComposerMessageProps } from './ComposerMessage';
import { useCountSelected, useClearSelection, useAvailableMessagesCount } from '../MessageList/contexts/SelectedMessagesContext';

const ComposerSelectMessages = ({ onClickSelectAll }: ComposerMessageProps) => {
    /* Implementation Hidden */
};

export default ComposerSelectMessages;

```