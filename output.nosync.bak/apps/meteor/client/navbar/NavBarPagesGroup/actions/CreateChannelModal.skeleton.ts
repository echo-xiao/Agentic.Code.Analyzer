## File: apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateChannelModal.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import {
	Box,
	Modal,
	Button,
	Icon,
	Accordion,
	AccordionItem,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { TextInput, Field, ToggleSwitch, FieldGroup, FieldLabel, FieldRow, FieldError, FieldHint } from '@rocket.chat/fuselage-forms';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import {
	useSetting,
	useTranslation,
	useEndpoint,
	useToastMessageDispatch,
	usePermissionWithScopedRoles,
	usePermission,
} from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useId, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useEncryptedRoomDescription } from './useEncryptedRoomDescription';
import UserAutoCompleteMultiple from '../../../components/UserAutoCompleteMultiple';
import { useCreateChannelTypePermission } from '../../../hooks/useCreateChannelTypePermission';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { useIsFederationEnabled } from '../../../hooks/useIsFederationEnabled';
import { useGoToRoom } from '../../../views/room/hooks/useGoToRoom';

export type CreateChannelModalProps = {
	teamId?: string;
	mainRoom?: IRoom;
	onClose: () => void;
	reload?: () => void;
};

type CreateChannelModalPayload = {
	name: string;
	isPrivate: boolean;
	topic?: string;
	members: string[];
	readOnly: boolean;
	encrypted: boolean;
	broadcast: boolean;
	federated: boolean;
};

const getFederationHintKey = (federationModule: boolean, featureToggle: boolean, federationAccessPermission: boolean): TranslationKey => {
    /* Implementation Hidden */
};

const hasExternalMembers = (members: string[]): boolean => members.some((member) => member.startsWith('@'));

const CreateChannelModal = ({ teamId = '', mainRoom, onClose, reload }: CreateChannelModalProps) => {
    /* Implementation Hidden */
};

export default CreateChannelModal;

```