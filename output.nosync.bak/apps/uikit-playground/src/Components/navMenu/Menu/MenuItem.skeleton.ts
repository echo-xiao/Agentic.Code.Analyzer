## File: apps/uikit-playground/src/Components/navMenu/Menu/MenuItem.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Label } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

type MenuItemProps = {
	name: string;
} & ComponentProps<typeof Box>;

const MenuItem = ({ name, ...props }: MenuItemProps) => {
    /* Implementation Hidden */
};

export default MenuItem;

```