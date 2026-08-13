## File: apps/meteor/client/views/room/contextualBar/RoomMembers/AddUsers/AddUsers.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldLabel, Button, ButtonGroup, FieldGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	ContextualbarHeader,
	ContextualbarBack,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useSetModal, useEndpoint, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddMatrixUsers } from './AddMatrixUsers/useAddMatrixUsers';
import BannedUsersUnbanModal from './BannedUsersUnbanModal';
import UserAutoCompleteMultiple from '../../../../../components/UserAutoCompleteMultiple';
import { useRoom } from '../../../contexts/RoomContext';

const hasExternalUsers = (users: string[]): boolean => users.some((user) => user.startsWith('@'));

type AddUsersProps = {
	rid: IRoom['_id'];
	onClickBack: () => void;
	reload: () => void;
};

const AddUsers = ({ rid, onClickBack, reload }: AddUsersProps) => {
    /* Implementation Hidden */
};

export default AddUsers;

```