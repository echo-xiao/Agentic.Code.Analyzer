## File: apps/meteor/client/views/marketplace/AppMenu.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { MenuItem, MenuItemContent, MenuSection, Menu, Skeleton } from '@rocket.chat/fuselage';
import { useHandleMenuAction } from '@rocket.chat/ui-client';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { AppMenuOption } from './hooks/useAppMenu';
import { useAppMenu } from './hooks/useAppMenu';

export type AppMenuProps = {
	app: App;
	isAppDetailsPage: boolean;
};

const AppMenu = ({ app, isAppDetailsPage }: AppMenuProps) => {
    /* Implementation Hidden */
};

export default memo(AppMenu);

```