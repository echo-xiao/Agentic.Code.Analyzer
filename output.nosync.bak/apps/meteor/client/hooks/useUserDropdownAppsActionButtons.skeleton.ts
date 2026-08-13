## File: apps/meteor/client/hooks/useUserDropdownAppsActionButtons.ts

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppActionButtons } from './useAppActionButtons';
import { useApplyButtonAuthFilter } from './useApplyButtonFilters';
import { UiKitTriggerTimeoutError } from '../../app/ui-message/client/UiKitTriggerTimeoutError';
import { Utilities } from '../../ee/lib/misc/Utilities';
import { useUiKitActionManager } from '../uikit/hooks/useUiKitActionManager';

export const useUserDropdownAppsActionButtons = () => {
    /* Implementation Hidden */
};

```