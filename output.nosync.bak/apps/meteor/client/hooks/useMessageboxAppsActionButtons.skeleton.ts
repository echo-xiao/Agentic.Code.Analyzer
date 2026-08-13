## File: apps/meteor/client/hooks/useMessageboxAppsActionButtons.ts

```typescript
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppActionButtons, getIdForActionButton } from './useAppActionButtons';
import { useApplyButtonFilters } from './useApplyButtonFilters';
import { UiKitTriggerTimeoutError } from '../../app/ui-message/client/UiKitTriggerTimeoutError';
import type { MessageBoxAction } from '../../app/ui-utils/client/lib/messageBox';
import { Utilities } from '../../ee/lib/misc/Utilities';
import { useUiKitActionManager } from '../uikit/hooks/useUiKitActionManager';

export const useMessageboxAppsActionButtons = () => {
    /* Implementation Hidden */
};

```