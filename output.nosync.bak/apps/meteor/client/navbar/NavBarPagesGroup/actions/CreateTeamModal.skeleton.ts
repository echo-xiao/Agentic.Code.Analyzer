## File: apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateTeamModal.tsx

```typescript
import {
	Box,
	Button,
	Icon,
	Modal,
	Accordion,
	AccordionItem,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { TextInput, ToggleSwitch, Field, FieldGroup, FieldLabel, FieldRow, FieldError, FieldHint } from '@rocket.chat/fuselage-forms';
import {
	useEndpoint,
	usePermission,
	usePermissionWithScopedRoles,
	useSetting,
	useToastMessageDispatch,
	useTranslation,
} from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useId, memo, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useEncryptedRoomDescription } from './useEncryptedRoomDescription';
import UserAutoCompleteMultiple from '../../../components/UserAutoCompleteMultiple';
import { useCreateChannelTypePermission } from '../../../hooks/useCreateChannelTypePermission';
import { useGoToRoom } from '../../../views/room/hooks/useGoToRoom';

type CreateTeamModalInputs = {
	name: string;
	topic: string;
	isPrivate: boolean;
	readOnly: boolean;
	encrypted: boolean;
	broadcast: boolean;
	members?: string[];
};

export type CreateTeamModalProps = { onClose: () => void };

const CreateTeamModal = ({ onClose }: CreateTeamModalProps) => {
    /* Implementation Hidden */
};

export default memo(CreateTeamModal);

```