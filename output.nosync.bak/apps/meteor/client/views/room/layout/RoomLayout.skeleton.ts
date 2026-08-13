## File: apps/meteor/client/views/room/layout/RoomLayout.tsx

```typescript
/* eslint-disable no-nested-ternary */
import { Box } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import breakpointsDefinitions from '@rocket.chat/fuselage-tokens/breakpoints.json';
import { LayoutContext, useLayout } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactNode } from 'react';
import { Suspense, useMemo } from 'react';

import HeaderSkeleton from '../Header/HeaderSkeleton';

export type RoomLayoutProps = {
	header?: ReactNode;
	body?: ReactNode;
	footer?: ReactNode;
	aside?: ReactNode;
} & ComponentProps<typeof Box>;

const useBreakpointsElement = () => {
    /* Implementation Hidden */
};

const RoomLayout = ({ header, body, footer, aside, ...props }: RoomLayoutProps) => {
    /* Implementation Hidden */
};

export default RoomLayout;

```