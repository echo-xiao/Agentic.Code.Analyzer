## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Components/CollapseButton.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Chevron, Palette } from '@rocket.chat/fuselage';
import type { CSSProperties, ReactNode } from 'react';

export type CollapseButtonProps = {
	children: ReactNode;
	regionId: string;
	expanded?: boolean;
	onClick: () => void;
};

export const CollapseButton = ({ regionId, children, expanded, onClick }: CollapseButtonProps) => {
    /* Implementation Hidden */
};

```