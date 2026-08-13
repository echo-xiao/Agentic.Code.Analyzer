## File: apps/meteor/client/navbar/NavBarPagesGroup/NavBarItemSort.tsx

```typescript
import { SidebarV2Action } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useSortMenu } from './hooks/useSortMenu';

export type NavBarItemSortProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarItemSort = (props: NavBarItemSortProps) => {
    /* Implementation Hidden */
};

export default NavBarItemSort;

```