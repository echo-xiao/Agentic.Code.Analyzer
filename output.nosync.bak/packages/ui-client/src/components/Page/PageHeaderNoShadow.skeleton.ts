## File: packages/ui-client/src/components/Page/PageHeaderNoShadow.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useDocumentTitle } from '../../hooks';
import { HeaderToolbar } from '../Header';
import { SidebarToggler } from '../SidebarToggler';

type PageHeaderProps = {
	title: ReactNode;
	onClickBack?: () => void;
	borderBlockEndColor?: string;
} & Omit<ComponentPropsWithoutRef<typeof Box>, 'title'>;

const PageHeaderNoShadow = ({ children = undefined, title, onClickBack, ...props }: PageHeaderProps) => {
    /* Implementation Hidden */
};

export default PageHeaderNoShadow;

```