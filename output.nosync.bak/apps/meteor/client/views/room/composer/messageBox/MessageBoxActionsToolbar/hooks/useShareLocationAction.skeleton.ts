## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useShareLocationAction.tsx

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetting, useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ShareLocationModal from '../../../../ShareLocation/ShareLocationModal';

export const useShareLocationAction = (room?: IRoom, tmid?: IMessage['tmid']): GenericMenuItemProps => {
    /* Implementation Hidden */
};

```