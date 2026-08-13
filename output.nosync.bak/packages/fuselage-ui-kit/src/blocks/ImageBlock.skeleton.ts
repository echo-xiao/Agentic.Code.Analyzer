## File: packages/fuselage-ui-kit/src/blocks/ImageBlock.tsx

```typescript
import { Box, Skeleton } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import { memo, useEffect, useState } from 'react';

import { Image } from './ImageBlock.styles';
import { useSurfaceType } from '../hooks/useSurfaceType';
import type { BlockProps } from '../utils/BlockProps';

const maxSize = 360;

const fetchImageState = (img: HTMLImageElement) => {
    /* Implementation Hidden */
};

export type ImageBlockProps = BlockProps<UiKit.ImageBlock>;

const ImageBlock = ({ className, block, surfaceRenderer }: ImageBlockProps) => {
    /* Implementation Hidden */
};

export default memo(ImageBlock);

```