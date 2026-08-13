## File: apps/meteor/client/views/room/contextualBar/Info/EditRoomInfo/EditRoomInfo.tsx

```typescript
/* eslint-disable complexity */
import type { IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	FieldError,
	Field,
	FieldRow,
	FieldLabel,
	FieldHint,
	TextInput,
	PasswordInput,
	ToggleSwitch,
	MultiSelect,
	Accordion,
	Callout,
	NumberInput,
	FieldGroup,
	Button,
	ButtonGroup,
	Box,
	TextAreaInput,
	AccordionItem,
} from '@rocket.chat/fuselage';
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
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useSetting, useTranslation, useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { useId, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import type { EditRoomInfoFormData } from './useEditRoomInitialValues';
import { useEditRoomInitialValues } from './useEditRoomInitialValues';
import { useEditRoomPermissions } from './useEditRoomPermissions';
import { MessageTypesValues } from '../../../../../../app/lib/lib/MessageTypes';
import RawText from '../../../../../components/RawText';
import RoomAvatarEditor from '../../../../../components/avatar/RoomAvatarEditor';
import { msToTimeUnit, TIMEUNIT } from '../../../../../lib/convertTimeUnit';
import { getDirtyFields } from '../../../../../lib/getDirtyFields';
import { links } from '../../../../../lib/links';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { useIsABACManagedRoom } from '../../../../admin/ABAC/hooks/useIsABACManagedRoom';
import { useArchiveRoom } from '../../../../hooks/roomActions/useArchiveRoom';
import { useRetentionPolicy } from '../../../hooks/useRetentionPolicy';

type EditRoomInfoProps = {
	room: IRoomWithRetentionPolicy;
	onClickClose: () => void;
	onClickBack: () => void;
};

const title = {
	team: 'Edit_team',
	channel: 'Edit_channel',
	discussion: 'Edit_discussion',
} as const;

const getRetentionSetting = (roomType: IRoomWithRetentionPolicy['t']): string => {
    /* Implementation Hidden */
};

const EditRoomInfo = ({ room, onClickClose, onClickBack }: EditRoomInfoProps) => {
    /* Implementation Hidden */
};

export default EditRoomInfo;

```