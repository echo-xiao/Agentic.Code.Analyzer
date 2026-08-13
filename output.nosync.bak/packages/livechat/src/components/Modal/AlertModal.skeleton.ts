## File: packages/livechat/src/components/Modal/AlertModal.tsx

```typescript
import type { ComponentProps } from 'preact';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import ModalMessage from './MessageModal';
import Modal from './Modal';

export type AlertModalProps = {
	text: string;
	buttonText?: string;
	onConfirm: () => void;
} & Omit<ComponentProps<typeof Modal>, 'open' | 'onDismiss'>;

const AlertModal = ({ text, buttonText, onConfirm, ...props }: AlertModalProps) => {
    /* Implementation Hidden */
};

export default AlertModal;

```