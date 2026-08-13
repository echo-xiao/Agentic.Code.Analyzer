## File: packages/ui-voip/src/views/TransferModal.tsx

```typescript
import {
	Box,
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PeerAutocomplete, PeerInfo } from '../components';
import { usePeerAutocomplete, type PeerInfo as PeerInfoType } from '../context';

type TransferModalProps = {
	onCancel(): void;
	onConfirm(kind: 'user' | 'sip', peer: { displayName: string; id: string }): void;
};

const TransferModal = ({ onCancel, onConfirm }: TransferModalProps) => {
    /* Implementation Hidden */
};

export default TransferModal;

```