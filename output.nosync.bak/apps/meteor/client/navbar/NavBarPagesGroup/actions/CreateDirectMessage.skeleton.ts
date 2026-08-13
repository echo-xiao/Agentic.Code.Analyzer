## File: apps/meteor/client/navbar/NavBarPagesGroup/actions/CreateDirectMessage.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import {
	Box,
	Modal,
	Button,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { FieldGroup, Field, FieldLabel, FieldRow, FieldError, FieldHint } from '@rocket.chat/fuselage-forms';
import { useTranslation, useEndpoint, useToastMessageDispatch, useSetting } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useId, memo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import UserAutoCompleteMultiple from '../../../components/UserAutoCompleteMultiple';
import { useGoToRoom } from '../../../views/room/hooks/useGoToRoom';

export type CreateDirectMessageProps = { onClose: () => void };

const CreateDirectMessage = ({ onClose }: CreateDirectMessageProps) => {
    /* Implementation Hidden */
};

export default memo(CreateDirectMessage);

```