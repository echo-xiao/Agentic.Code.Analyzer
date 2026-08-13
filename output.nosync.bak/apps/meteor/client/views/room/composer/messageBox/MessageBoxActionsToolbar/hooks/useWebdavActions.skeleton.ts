## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useWebdavActions.tsx

```typescript
import type { IWebdavAccountIntegration } from '@rocket.chat/core-typings';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetModal, useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useWebDAVAccountIntegrationsQuery } from '../../../../../../hooks/webdav/useWebDAVAccountIntegrationsQuery';
import { useChat } from '../../../../contexts/ChatContext';
import AddWebdavAccountModal from '../../../../webdav/AddWebdavAccountModal';
import WebdavFilePickerModal from '../../../../webdav/WebdavFilePickerModal';

export const useWebdavActions = (disabled: boolean): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```