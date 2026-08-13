## File: apps/meteor/client/navbar/NavBarSettingsToolbar/UserMenu/UserMenu.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { GenericMenu, useHandleMenuAction } from '@rocket.chat/ui-client';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UserMenuButton from './UserMenuButton';
import { useUserMenu } from './hooks/useUserMenu';

export type UserMenuProps = { user: IUser } & Omit<ComponentProps<typeof GenericMenu>, 'sections' | 'items' | 'title'>;

const UserMenu = function UserMenu({ user, ...props }: UserMenuProps) {
    /* Implementation Hidden */
};

export default memo(UserMenu);

```