## File: apps/meteor/client/views/admin/rooms/EditRoom.tsx

```typescript
import type { IRoom, RoomAdminFieldsType } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import {
	Box,
	Button,
	ButtonGroup,
	TextInput,
	Field,
	FieldLabel,
	FieldRow,
	FieldHint,
	ToggleSwitch,
	TextAreaInput,
	FieldError,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEditAdminRoomPermissions } from './useEditAdminRoomPermissions';
import RoomAvatarEditor from '../../../components/avatar/RoomAvatarEditor';
import { getDirtyFields } from '../../../lib/getDirtyFields';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { useArchiveRoom } from '../../hooks/roomActions/useArchiveRoom';
import { useDeleteRoom } from '../../hooks/roomActions/useDeleteRoom';

export type EditRoomProps = {
	room: IRoom;
	onChange: () => void;
	onDelete: () => void;
	onClose: () => void;
};

type EditRoomFormData = {
	roomName: IRoom['name'];
	roomTopic: string;
	roomType: IRoom['t'];
	readOnly: boolean;
	isDefault: boolean;
	favorite: boolean;
	featured: boolean;
	reactWhenReadOnly: boolean;
	roomDescription: string;
	roomAnnouncement: string;
	roomAvatar: IRoom['avatarETag'];
	archived: boolean;
};

const getInitialValues = (room: Pick<IRoom, RoomAdminFieldsType>): EditRoomFormData => ({
	roomName: room.t === 'd' ? room.usernames?.join(' x ') : roomCoordinator.getRoomName(room.t, room),
	roomType: room.t,
	readOnly: !!room.ro,
	archived: !!room.archived,
	isDefault: !!room.default,
	favorite: !!room.favorite,
	featured: !!room.featured,
	reactWhenReadOnly: !!room.reactWhenReadOnly,
	roomTopic: room.topic ?? '',
	roomDescription: room.description ?? '',
	roomAnnouncement: room.announcement ?? '',
	roomAvatar: undefined,
});

const EditRoom = ({ room, onChange, onDelete, onClose }: EditRoomProps) => {
    /* Implementation Hidden */
};

export default EditRoom;

```