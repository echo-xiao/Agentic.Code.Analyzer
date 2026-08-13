## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useTimestampAction.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { TimestampPickerModal } from '../../../../../../components/message/toolbar/items/actions/Timestamp/TimestampPicker/TimestampPickerModal';
import type { ComposerAPI } from '../../../../../../lib/chats/ChatAPI';

export const useTimestampAction = (composer: ComposerAPI | undefined): GenericMenuItemProps | undefined => {
    /* Implementation Hidden */
};

```