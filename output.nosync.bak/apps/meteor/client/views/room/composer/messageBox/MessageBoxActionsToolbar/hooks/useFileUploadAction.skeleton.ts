## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useFileUploadAction.ts

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useFileInput } from '../../../../../../hooks/useFileInput';
import { useChat } from '../../../../contexts/ChatContext';

const fileInputProps = { type: 'file', multiple: true };

export const useFileUploadAction = (disabled: boolean): GenericMenuItemProps => {
    /* Implementation Hidden */
};

```