## File: packages/fuselage-ui-kit/src/elements/ButtonElement.tsx

```typescript
import { Button, Throbber } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import type { MouseEventHandler } from 'react';

import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type ButtonElementProps = BlockProps<UiKit.ButtonElement>;

const ButtonElement = ({ block, context, surfaceRenderer }: ButtonElementProps) => {
    /* Implementation Hidden */
};

export default ButtonElement;

```