## File: packages/ui-voip/src/views/PermissionFlow/PermissionFlowModal.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import {
	Box,
	Button,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useAbsoluteUrl, useSetModal } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

export type PermissionFlowModalType = 'denied' | 'incomingPrompt' | 'outgoingPrompt' | 'deviceChangePrompt';

type PermissionFlowModalProps = {
	onCancel: () => void;
	onConfirm: () => void;
	type: PermissionFlowModalType;
};

// MarkdownText is a bit overkill for this
// This css rules ensures that `\n` actually breaks lines.
const breakSpaces = css`
	white-space: break-spaces;
`;

const getFooter = (
	type: PermissionFlowModalProps['type'],
	{
		onCancel,
		onConfirm,
		onClose,
		t,
	}: { onCancel: () => void; onConfirm: () => void; onClose: () => void; t: ReturnType<typeof useTranslation>['t'] },
) => {
    /* Implementation Hidden */
};

const PermissionFlowModal = ({ onCancel, onConfirm, type }: PermissionFlowModalProps) => {
    /* Implementation Hidden */
};

export default PermissionFlowModal;

```