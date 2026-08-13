## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupStepOneModal.tsx

```typescript
import {
	Modal,
	Box,
	Field,
	FieldLabel,
	FieldRow,
	TextInput,
	CheckBox,
	ButtonGroup,
	Button,
	ModalHeader,
	ModalHeaderText,
	ModalTagline,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
} from '@rocket.chat/fuselage';
import { ExternalLink } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { links } from '../../../../../../lib/links';
import WorkspaceRegistrationModal from '../RegisterWorkspaceModal';

type Props = {
	email: string;
	setEmail: (email: string) => void;
	step: number;
	setStep: (step: number) => void;
	terms: boolean;
	setTerms: (terms: boolean) => void;
	onClose: () => void;
	validInfo: boolean;
	setIntentData: (intentData: any) => void;
};

const RegisterWorkspaceSetupStepOneModal = ({
	email,
	setEmail,
	step,
	setStep,
	terms,
	setTerms,
	onClose,
	validInfo,
	setIntentData,
	...props
}: Props) => {
    /* Implementation Hidden */
};

export default RegisterWorkspaceSetupStepOneModal;

```