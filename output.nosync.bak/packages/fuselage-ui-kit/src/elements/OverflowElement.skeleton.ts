## File: packages/fuselage-ui-kit/src/elements/OverflowElement.tsx

```typescript
import type { OptionType } from '@rocket.chat/fuselage';
import { IconButton, PositionAnimated, Options, useCursor } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useRef, useCallback, useMemo } from 'react';

import { useStringFromTextObject } from '../hooks/useStringFromTextObject';
import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type OverflowElementProps = BlockProps<UiKit.OverflowElement>;

const OverflowElement = ({ block, context }: OverflowElementProps) => {
    /* Implementation Hidden */
};

export default OverflowElement;

```