## File: apps/uikit-playground/src/Components/ScreenThumbnail/Thumbnail.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode, ComponentProps } from 'react';
import { useRef, useState, useEffect } from 'react';

type ThumbnailProps = ComponentProps<typeof Box> & {
	of: ReactNode;
};

const Thumbnail = ({ of, ...props }: ThumbnailProps) => {
    /* Implementation Hidden */
};

export default Thumbnail;

```