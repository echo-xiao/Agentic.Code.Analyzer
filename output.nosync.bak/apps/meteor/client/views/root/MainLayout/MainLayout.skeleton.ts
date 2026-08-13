## File: apps/meteor/client/views/root/MainLayout/MainLayout.tsx

```typescript
import { useEmbeddedLayout } from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import AuthenticationCheck from './AuthenticationCheck';
import EmbeddedPreload from './EmbeddedPreload';
import Preload from './Preload';
import { useCustomScript } from './useCustomScript';

type MainLayoutProps = {
	children?: ReactNode;
};

const MainLayout = ({ children = null }: MainLayoutProps) => {
    /* Implementation Hidden */
};

export default MainLayout;

```