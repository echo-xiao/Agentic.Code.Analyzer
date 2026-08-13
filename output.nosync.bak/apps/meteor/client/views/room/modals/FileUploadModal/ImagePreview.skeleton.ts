## File: apps/meteor/client/views/room/modals/FileUploadModal/ImagePreview.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useState } from 'react';

import GenericPreview from './GenericPreview';
import PreviewSkeleton from './PreviewSkeleton';

export type ImagePreviewProps = {
	url: string;
	file: File;
	altText?: string;
};

const ImagePreview = ({ url, file, altText = '' }: ImagePreviewProps) => {
    /* Implementation Hidden */
};

export default ImagePreview;

```