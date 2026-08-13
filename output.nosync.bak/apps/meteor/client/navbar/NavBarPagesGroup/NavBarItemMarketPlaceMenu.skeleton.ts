## File: apps/meteor/client/navbar/NavBarPagesGroup/NavBarItemMarketPlaceMenu.tsx

```typescript
import { NavBarItem } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useCurrentRoutePath } from '@rocket.chat/ui-contexts';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useMarketPlaceMenu } from './hooks/useMarketPlaceMenu';

export type NavBarItemMarketPlaceMenuProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarItemMarketPlaceMenu = (props: NavBarItemMarketPlaceMenuProps) => {
    /* Implementation Hidden */
};

export default NavBarItemMarketPlaceMenu;

```