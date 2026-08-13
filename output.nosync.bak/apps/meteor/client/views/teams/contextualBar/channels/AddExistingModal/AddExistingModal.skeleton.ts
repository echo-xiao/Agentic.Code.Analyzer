## File: apps/meteor/client/views/teams/contextualBar/channels/AddExistingModal/AddExistingModal.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import {
	Box,
	Button,
	Field,
	FieldLabel,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { memo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RoomsAvailableForTeamsAutoComplete from './RoomsAvailableForTeamsAutoComplete';

type AddExistingModalFormData = {
	rooms: IRoom['_id'][];
};

type AddExistingModalProps = {
	teamId: string;
	onClose: () => void;
	reload?: () => void;
};

// TODO: Use GenericModal instead of Modal
const AddExistingModal = ({ teamId, onClose, reload }: AddExistingModalProps) => {
    /* Implementation Hidden */
};

export default memo(AddExistingModal);

```