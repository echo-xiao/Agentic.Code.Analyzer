## File: apps/meteor/client/navbar/NavBarControls/NavBarControlsMenu.tsx

```typescript
import { NavBarItem } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useOmnichannelEnabled } from '../../views/omnichannel/hooks/useOmnichannelEnabled';

export type NavBarControlsMenuProps = Omit<HTMLAttributes<HTMLElement>, 'is'> & {
	omnichannelItems: GenericMenuItemProps[];
	isPressed: boolean;
	callItem?: GenericMenuItemProps;
	callHistoryItem?: GenericMenuItemProps;
};

const NavBarControlsMenu = ({ omnichannelItems, isPressed, callItem, callHistoryItem, ...props }: NavBarControlsMenuProps) => {
    /* Implementation Hidden */
};

export default NavBarControlsMenu;

```