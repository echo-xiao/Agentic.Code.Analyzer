## File: packages/ui-client/src/components/Contextualbar/ContextualbarResizable.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Palette, Box } from '@rocket.chat/fuselage';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import { Resizable } from 're-resizable';
import type { ComponentProps } from 'react';

type ContextualbarResizableProps = { defaultWidth: string } & ComponentProps<typeof Resizable>;

const ContextualbarResizable = ({ defaultWidth, children, ...props }: ContextualbarResizableProps) => {
    /* Implementation Hidden */
};

export default ContextualbarResizable;

```