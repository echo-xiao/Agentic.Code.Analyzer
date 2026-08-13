## File: apps/meteor/client/navbar/NavBarSettingsToolbar/NavBarItemAdministrationMenu.tsx

```typescript
import { NavBarItem } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useCurrentRoutePath } from '@rocket.chat/ui-contexts';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useAdministrationMenu } from './hooks/useAdministrationMenu';
import { useAuditMenu } from './hooks/useAuditMenu';

export type NavBarItemAdministrationMenuProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarItemAdministrationMenu = (props: NavBarItemAdministrationMenuProps) => {
    /* Implementation Hidden */
};

export default NavBarItemAdministrationMenu;

```