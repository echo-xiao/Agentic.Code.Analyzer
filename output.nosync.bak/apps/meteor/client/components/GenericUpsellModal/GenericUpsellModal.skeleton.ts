## File: apps/meteor/client/components/GenericUpsellModal/GenericUpsellModal.tsx

```typescript
import { Box, ModalHeroImage } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import type { ComponentProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type GenericUpsellModalProps = Omit<ComponentProps<typeof GenericModal>, 'variant' | 'children' | 'onClose' | 'onDismiss'> & {
	subtitle?: ReactNode;
	description?: ReactNode;
	img: ComponentProps<typeof ModalHeroImage>['src'];
	imgWidth?: ComponentProps<typeof ModalHeroImage>['width'];
	imgHeight?: ComponentProps<typeof ModalHeroImage>['height'];
	imgAlt?: string;
	onClose: () => void;
	onConfirm?: () => void;
};

const GenericUpsellModal = ({
	tagline,
	subtitle,
	img,
	imgAlt = '',
	imgWidth,
	imgHeight,
	description,
	confirmText,
	icon = null,
	...props
}: GenericUpsellModalProps) => {
    /* Implementation Hidden */
};

export default GenericUpsellModal;

```