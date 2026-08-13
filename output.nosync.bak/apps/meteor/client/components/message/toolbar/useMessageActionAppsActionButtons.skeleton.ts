## File: apps/meteor/client/components/message/toolbar/useMessageActionAppsActionButtons.ts

```typescript
import { type IUIActionButton, MessageActionContext as AppsEngineMessageActionContext } from '@rocket.chat/apps-engine/definition/ui';
import type { IMessage } from '@rocket.chat/core-typings';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UiKitTriggerTimeoutError } from '../../../../app/ui-message/client/UiKitTriggerTimeoutError';
import type { MessageActionContext, MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { Utilities } from '../../../../ee/lib/misc/Utilities';
import { useAppActionButtons, getIdForActionButton } from '../../../hooks/useAppActionButtons';
import { useApplyButtonFilters } from '../../../hooks/useApplyButtonFilters';
import { useUiKitActionManager } from '../../../uikit/hooks/useUiKitActionManager';

const filterActionsByContext = (context: string | undefined, action: IUIActionButton) => {
    /* Implementation Hidden */
};

export const useMessageActionAppsActionButtons = (message: IMessage, context?: MessageActionContext, category?: string) => {
    /* Implementation Hidden */
};

```