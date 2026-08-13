## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentImage.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useAttachmentDimensions } from '@rocket.chat/ui-contexts';
import { memo, useState, useMemo } from 'react';

import ImageBox from './image/ImageBox';
import Load from './image/Load';
import Retry from './image/Retry';

export type AttachmentImageProps = {
	previewUrl?: string;
	dataSrc?: string;
	src: string;
	loadImage?: boolean;
	setLoadImage: () => void;
	id: string | undefined;
	width: number;
	height: number;
	alt?: string;
} & ({ loadImage: true } | { loadImage: false; setLoadImage: () => void });

const getDimensions = (
	originalWidth: number,
	originalHeight: number,
	limits: { width: number; height: number },
): { width: number; height: number; ratio: number } => {
    /* Implementation Hidden */
};

const AttachmentImage = ({ id, previewUrl, dataSrc, loadImage = true, setLoadImage, src, alt = '', ...size }: AttachmentImageProps) => {
    /* Implementation Hidden */
};

export default memo(AttachmentImage);

```