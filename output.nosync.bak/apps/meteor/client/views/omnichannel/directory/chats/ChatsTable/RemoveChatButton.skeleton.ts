## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/RemoveChatButton.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useRemoveCurrentChatMutation } from './hooks/useRemoveCurrentChatMutation';

type RemoveChatButtonProps = { _id: string };

const RemoveChatButton = ({ _id }: RemoveChatButtonProps) => {
    /* Implementation Hidden */
};

export default RemoveChatButton;

```