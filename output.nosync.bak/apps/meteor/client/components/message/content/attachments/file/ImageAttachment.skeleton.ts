## File: apps/meteor/client/components/message/content/attachments/file/ImageAttachment.tsx

```typescript
import type { ImageAttachmentProps } from '@rocket.chat/core-typings';
import { useMediaUrl } from '@rocket.chat/ui-contexts';

import { useLoadImage } from './hooks/useLoadImage';
import MarkdownText from '../../../../MarkdownText';
import MessageCollapsible from '../../../MessageCollapsible';
import MessageContentBody from '../../../MessageContentBody';
import AttachmentImage from '../structure/AttachmentImage';

const ImageAttachment = ({
	id,
	title,
	image_url: url,
	image_preview: imagePreview,
	image_size: size,
	image_dimensions: imageDimensions = {
		width: 368,
		height: 368,
	},
	image_alt: altText,
	description,
	descriptionMd,
	title_link: link,
	title_link_download: hasDownload,
	collapsed,
}: ImageAttachmentProps) => {
    /* Implementation Hidden */
};

export default ImageAttachment;

```