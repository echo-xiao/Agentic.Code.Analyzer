## File: apps/meteor/client/views/omnichannel/modals/CloseChatModal.tsx

```typescript
import type { ILivechatDepartment, Serialized } from '@rocket.chat/core-typings';
import {
	Field,
	FieldGroup,
	Button,
	TextInput,
	Modal,
	Box,
	CheckBox,
	Divider,
	EmailInput,
	FieldLabel,
	FieldRow,
	FieldError,
	ModalHeader,
	ModalIcon,
	ModalTitle,
	ModalClose,
	ModalFooter,
	ModalFooterControllers,
	ModalContent,
} from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { usePermission, useSetting, useUserPreference, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import Tags from '../components/Tags';

type CloseChatModalFormData = {
	comment: string;
	tags: string[];
	transcriptPDF: boolean;
	transcriptEmail: boolean;
	subject: string;
};

type CloseChatModalProps = {
	department?: Serialized<ILivechatDepartment | null>;
	visitorEmail?: string;
	onCancel: () => void;
	onConfirm: (
		comment?: string,
		tags?: string[],
		preferences?: { omnichannelTranscriptPDF: boolean; omnichannelTranscriptEmail: boolean },
		requestData?: { email: string; subject: string },
	) => Promise<void>;
};

const CloseChatModal = ({ department, visitorEmail, onCancel, onConfirm }: CloseChatModalProps) => {
    /* Implementation Hidden */
};

export default CloseChatModal;

```