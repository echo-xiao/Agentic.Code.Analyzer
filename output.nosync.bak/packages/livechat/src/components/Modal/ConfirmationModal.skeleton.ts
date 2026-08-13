## File: packages/livechat/src/components/Modal/ConfirmationModal.tsx

```typescript
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import ModalMessage from './MessageModal';
import Modal from './Modal';

export type ConfirmationModalProps = {
	text: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
	onConfirm: () => void;
	onCancel: () => void;
} & Omit<ComponentProps<typeof Modal>, 'open' | 'onDismiss'>;

const ConfirmationModal = ({ text, confirmButtonText, cancelButtonText, onConfirm, onCancel, ...props }: ConfirmationModalProps) => {
    /* Implementation Hidden */
};

export default ConfirmationModal;

```