## File: apps/meteor/client/navbar/NavBarSettingsToolbar/UserMenu/hooks/useUserMenu.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useLogout } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import UserMenuHeader from '../UserMenuHeader';
import { useAccountItems } from './useAccountItems';
import { useKeyboardShortcutsModalHandler } from './useKeyboardShortcutsModalHandler';
import { useStatusItems } from './useStatusItems';
import { useUserDropdownAppsActionButtons } from '../../../../hooks/useUserDropdownAppsActionButtons';

export const useUserMenu = (user: IUser) => {
    /* Implementation Hidden */
};

```