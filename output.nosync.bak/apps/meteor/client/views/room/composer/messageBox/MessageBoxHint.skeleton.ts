## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxHint.tsx

```typescript
import { MessageComposerHint } from '@rocket.chat/ui-composer';
import { memo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { useRoom } from '../../contexts/RoomContext';
import { useE2EERoomState } from '../../hooks/useE2EERoomState';

type MessageBoxHintProps = {
	isEditing?: boolean;
	e2eEnabled?: boolean;
	unencryptedMessagesAllowed?: boolean;
	isMobile?: boolean;
};

const MessageBoxHint = ({ isEditing, e2eEnabled, unencryptedMessagesAllowed, isMobile }: MessageBoxHintProps) => {
    /* Implementation Hidden */
};

export default memo(MessageBoxHint);

```