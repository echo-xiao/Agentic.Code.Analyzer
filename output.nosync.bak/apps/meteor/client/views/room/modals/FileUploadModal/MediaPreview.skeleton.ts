## File: apps/meteor/client/views/room/modals/FileUploadModal/MediaPreview.tsx

```typescript
import { AudioPlayer, Box, Icon } from '@rocket.chat/fuselage';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FilePreviewType } from './FilePreview';
import ImagePreview from './ImagePreview';
import PreviewSkeleton from './PreviewSkeleton';
import { userAgentMIMETypeFallback } from '../../../../lib/utils/userAgentMIMETypeFallback';
import { useFileAsDataURL } from '../../hooks/useFileAsDataURL';

export type MediaPreviewProps = {
	file: File;
	fileType: FilePreviewType;
	altText?: string;
};

const MediaPreview = ({ file, fileType, altText }: MediaPreviewProps) => {
    /* Implementation Hidden */
};

export default memo(MediaPreview);

```