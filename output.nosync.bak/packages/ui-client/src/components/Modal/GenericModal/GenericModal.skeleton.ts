## File: packages/ui-client/src/components/Modal/GenericModal/GenericModal.tsx

```typescript
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
	ModalHeader,
	ModalHeaderText,
	ModalIcon,
	ModalTagline,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { ReactElement, ReactNode, ComponentPropsWithoutRef } from 'react';
import { useId, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { RequiredModalProps } from './withDoNotAskAgain';
import { withDoNotAskAgain } from './withDoNotAskAgain';
import { modalStore } from '../../../providers/ModalProvider/ModalStore';

type VariantType = 'danger' | 'secondary-danger' | 'warning' | 'info' | 'success' | 'upsell';

type GenericModalProps = RequiredModalProps & {
	variant?: VariantType;
	children?: ReactNode;
	cancelText?: ReactNode;
	confirmText?: ReactNode;
	title?: string | ReactElement<any>;
	icon?: IconName | ReactElement<any> | null;
	confirmDisabled?: boolean;
	confirmLoading?: boolean;
	tagline?: ReactNode;
	onCancel?: () => Promise<void> | void;
	onClose?: () => Promise<void> | void;
	onDismiss?: () => Promise<void> | void;
	annotation?: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Modal>, 'title'>;

const iconMap: Record<string, IconName> = {
	danger: 'modal-warning',
	warning: 'modal-warning',
	info: 'info',
	success: 'check',
};

const getButtonProps = (variant: VariantType): ComponentPropsWithoutRef<typeof Button> => {
    /* Implementation Hidden */
};

const renderIcon = (icon: GenericModalProps['icon'], variant: VariantType): ReactNode => {
    /* Implementation Hidden */
};

const GenericModal = ({
	variant = 'info',
	children,
	cancelText,
	confirmText,
	title,
	icon,
	onCancel,
	onClose = onCancel,
	onDismiss = onClose,
	onConfirm,
	dontAskAgain,
	confirmDisabled,
	confirmLoading,
	tagline,
	wrapperFunction,
	annotation,
	...props
}: GenericModalProps) => {
    /* Implementation Hidden */
};

export const GenericModalDoNotAskAgain = withDoNotAskAgain<GenericModalProps>(GenericModal);

export default GenericModal;

```