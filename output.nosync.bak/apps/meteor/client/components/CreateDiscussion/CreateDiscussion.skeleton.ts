## File: apps/meteor/client/components/CreateDiscussion/CreateDiscussion.tsx

```typescript
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { Icon, Box } from '@rocket.chat/fuselage';
import {
	Field,
	FieldGroup,
	ToggleSwitch,
	TextInput,
	TextAreaInput,
	FieldHint,
	FieldLabel,
	FieldRow,
	FieldError,
} from '@rocket.chat/fuselage-forms';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useEncryptedRoomDescription } from '../../navbar/NavBarPagesGroup/actions/useEncryptedRoomDescription';
import { useGoToRoom } from '../../views/room/hooks/useGoToRoom';
import RoomAutoComplete from '../RoomAutoComplete';
import UserAutoCompleteMultiple from '../UserAutoCompleteMultiple';
import DefaultParentRoomField from './DefaultParentRoomField';

type CreateDiscussionFormValues = {
	name: string;
	parentRoom: IRoom['_id'];
	encrypted: boolean;
	usernames: Array<IUser['username']>;
	firstMessage: string;
	topic: string;
};

export type CreateDiscussionProps = {
	parentMessageId?: IMessage['_id'];
	encryptedParentRoom?: boolean;
	onClose: () => void;
	defaultParentRoom?: IRoom['_id'];
	nameSuggestion?: string;
};

const CreateDiscussion = ({
	onClose,
	defaultParentRoom,
	parentMessageId,
	nameSuggestion,
	encryptedParentRoom = false,
}: CreateDiscussionProps) => {
    /* Implementation Hidden */
};

export default CreateDiscussion;

```