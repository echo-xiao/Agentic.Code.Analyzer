## File: packages/ui-client/src/components/GenericMenu/GenericMenu.tsx

```typescript
import { IconButton, MenuItem, MenuSection, Menu } from '@rocket.chat/fuselage';
import { cloneElement, type ComponentProps, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import type { GenericMenuItemProps } from './GenericMenuItem';
import GenericMenuItem from './GenericMenuItem';
import { useHandleMenuAction } from './hooks/useHandleMenuAction';

type GenericMenuCommonProps = {
	title: string;
	icon?: ComponentProps<typeof IconButton>['icon'];
	disabled?: boolean;
	callbackAction?: () => void;
	isOpen?: boolean;
};

type GenericMenuConditionalProps =
	| {
			sections?: {
				title?: ReactNode;
				items: GenericMenuItemProps[];
				permission?: boolean | '' | 0 | null | undefined;
			}[];
			items?: never;
	  }
	| {
			items?: GenericMenuItemProps[];
			sections?: never;
	  };

type GenericMenuProps = GenericMenuCommonProps & GenericMenuConditionalProps & Omit<ComponentProps<typeof Menu>, 'children'>;

const GenericMenu = ({ title, icon = 'menu', disabled, onAction, callbackAction, button, className, ...props }: GenericMenuProps) => {
    /* Implementation Hidden */
};

export default GenericMenu;

```