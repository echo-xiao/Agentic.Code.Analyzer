## File: apps/meteor/client/lib/clickableItem.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import type { Box } from '@rocket.chat/fuselage';
import { Palette } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

// TODO remove border from here
export function clickableItem<TProps extends Pick<ComponentPropsWithoutRef<typeof Box>, 'className' | 'tabIndex'>>(
	Component: ComponentType<TProps>,
) {
    /* Implementation Hidden */
}

```