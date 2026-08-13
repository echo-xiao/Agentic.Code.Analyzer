## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useCreateDiscussionAction.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useTranslation, useSetting, usePermission, useSetModal } from '@rocket.chat/ui-contexts';

import CreateDiscussion from '../../../../../../components/CreateDiscussion';

export const useCreateDiscussionAction = (room?: IRoom): GenericMenuItemProps => {
    /* Implementation Hidden */
};

```