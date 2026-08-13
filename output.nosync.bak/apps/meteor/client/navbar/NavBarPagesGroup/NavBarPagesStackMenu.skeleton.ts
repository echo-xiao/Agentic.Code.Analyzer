## File: apps/meteor/client/navbar/NavBarPagesGroup/NavBarPagesStackMenu.tsx

```typescript
import { NavBarItem } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useCurrentRoutePath, useLayout, useRouter, useSetting } from '@rocket.chat/ui-contexts';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export type NavBarPagesStackMenuProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarPagesStackMenu = (props: NavBarPagesStackMenuProps) => {
    /* Implementation Hidden */
};

export default NavBarPagesStackMenu;

```