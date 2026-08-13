## File: apps/meteor/client/components/ImageGallery/ImageGalleryError.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { IconButton, ModalBackdrop } from '@rocket.chat/fuselage';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import GenericError from '../GenericError/GenericError';

const closeButtonStyle = css`
	position: absolute;
	z-index: 10;
	top: 10px;
	right: 10px;
`;

export const ImageGalleryError = ({ onClose }: { onClose: () => void }) => {
    /* Implementation Hidden */
};

```