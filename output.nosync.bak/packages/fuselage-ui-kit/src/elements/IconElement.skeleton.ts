## File: packages/fuselage-ui-kit/src/elements/IconElement.tsx

```typescript
import { Icon, FramedIcon } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { ComponentProps } from 'react';

import type { BlockProps } from '../utils/BlockProps';

export type IconElementProps = BlockProps<UiKit.FrameableIconElement>;

const getVariantColor = (variant: UiKit.FrameableIconElement['variant']): string => {
    /* Implementation Hidden */
};

const getFramedIconProps = (
	variant: UiKit.FrameableIconElement['variant'],
): Pick<ComponentProps<typeof FramedIcon>, 'warning' | 'danger' | 'neutral'> => {
    /* Implementation Hidden */
};

const IconElement = ({ block }: IconElementProps) => {
    /* Implementation Hidden */
};

export default IconElement;

```