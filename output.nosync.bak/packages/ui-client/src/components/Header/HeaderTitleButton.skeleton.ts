## File: packages/ui-client/src/components/Header/HeaderTitleButton.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Palette } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

type HeaderTitleButtonProps = Omit<ComponentPropsWithoutRef<typeof Box>, 'className'> & { className?: string };

const HeaderTitleButton = ({ className, ...props }: HeaderTitleButtonProps) => {
    /* Implementation Hidden */
};

export default HeaderTitleButton;

```