## File: apps/meteor/client/navbar/NavBarPagesGroup/NavBarItemCreateNew.tsx

```typescript
import { SidebarV2Action } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateNewMenu } from './hooks/useCreateNewMenu';

type CreateRoomProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarItemCreateNew = (props: CreateRoomProps) => {
    /* Implementation Hidden */
};

export default NavBarItemCreateNew;

```