## File: apps/meteor/client/components/ImageGallery/ImageGalleryLoading.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { IconButton, ModalBackdrop, Throbber } from '@rocket.chat/fuselage';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const closeButtonStyle = css`
	position: absolute;
	z-index: 10;
	top: 10px;
	right: 10px;
`;

export const ImageGalleryLoading = ({ onClose }: { onClose: () => void }) => {
    /* Implementation Hidden */
};

```