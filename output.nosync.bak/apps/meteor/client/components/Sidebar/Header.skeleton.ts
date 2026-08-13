## File: apps/meteor/client/components/Sidebar/Header.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type HeaderProps = {
	children?: ReactNode;
	title?: ReactNode;
	onClose?: () => void;
};

const Header = ({ title, onClose, children, ...props }: HeaderProps) => {
    /* Implementation Hidden */
};

export default Header;

```