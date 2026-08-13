## File: apps/meteor/client/views/admin/moderation/MessageContextFooter.tsx

```typescript
import { Button, ButtonGroup, Box } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import useDeactivateUserAction from './hooks/useDeactivateUserAction';
import useDeleteMessagesAction from './hooks/useDeleteMessagesAction';
import useDismissUserAction from './hooks/useDismissUserAction';
import useResetAvatarAction from './hooks/useResetAvatarAction';

export type MessageContextFooterProps = { userId: string; deleted: boolean };

const MessageContextFooter = ({ userId, deleted }: MessageContextFooterProps) => {
    /* Implementation Hidden */
};

export default MessageContextFooter;

```