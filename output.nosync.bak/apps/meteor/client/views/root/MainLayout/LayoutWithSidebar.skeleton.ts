## File: apps/meteor/client/views/root/MainLayout/LayoutWithSidebar.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { FeaturePreview, FeaturePreviewOff, FeaturePreviewOn } from '@rocket.chat/ui-client';
import type { IRouterPaths } from '@rocket.chat/ui-contexts';
import { useLayout, useSetting, useCurrentRoutePath, useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import AccessibilityShortcut from './AccessibilityShortcut';
import MainContent from './MainContent';
import { MainLayoutStyleTags } from './MainLayoutStyleTags';
import NavBar from '../../../navbar';
import Sidebar from '../../../sidebar';
import NavigationRegion from '../../navigation';
import RoomsNavigationProvider from '../../navigation/providers/RoomsNavigationProvider';

const INVALID_ROOM_NAME_PREFIXES = ['#', '?'] as const;

const LayoutWithSidebar = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default LayoutWithSidebar;

```