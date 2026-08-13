## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupStepTwoModal.tsx

```typescript
import {
	Modal,
	Box,
	Field,
	FieldLabel,
	FieldRow,
	TextInput,
	ModalHeader,
	ModalHeaderText,
	ModalTagline,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
} from '@rocket.chat/fuselage';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

type Props = {
	email: string;
	step: number;
	setStep: (step: number) => void;
	onClose: () => void;
	intentData: {
		device_code: string;
		interval: number;
		user_code: string;
	};
	onSuccess: () => void;
};

const setIntervalTime = (interval?: number): number => (interval ? interval * 1000 : 0);

const RegisterWorkspaceSetupStepTwoModal = ({ email, step, setStep, onClose, intentData, onSuccess, ...props }: Props) => {
    /* Implementation Hidden */
};

export default RegisterWorkspaceSetupStepTwoModal;

```