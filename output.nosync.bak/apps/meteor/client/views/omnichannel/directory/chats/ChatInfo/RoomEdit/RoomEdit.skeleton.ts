## File: apps/meteor/client/views/omnichannel/directory/chats/ChatInfo/RoomEdit/RoomEdit.tsx

```typescript
import type { ILivechatVisitor, IOmnichannelRoom, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldLabel, FieldRow, TextInput, ButtonGroup, Button } from '@rocket.chat/fuselage';
import { CustomFieldsForm, ContextualbarContent, ContextualbarFooter, ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useId } from 'react';
import { useController, useForm } from 'react-hook-form';

import { hasAtLeastOnePermission } from '../../../../../../../app/authorization/client';
import { roomsQueryKeys } from '../../../../../../lib/queryKeys';
import { SlaPoliciesSelect, PrioritiesSelect } from '../../../../additionalForms';
import Tags from '../../../../components/Tags';
import { useOmnichannelPriorities } from '../../../../hooks/useOmnichannelPriorities';
import { FormSkeleton } from '../../../components/FormSkeleton';
import { useCustomFieldsMetadata } from '../../../hooks/useCustomFieldsMetadata';
import { useSlaPolicies } from '../../../hooks/useSlaPolicies';

type RoomEditFormData = {
	topic: string;
	tags: string[];
	livechatData: any;
	slaId: string;
	priorityId: string;
};

type RoomEditProps = {
	room: Serialized<IOmnichannelRoom>;
	visitor: Serialized<ILivechatVisitor>;
	reload?: () => void;
	reloadInfo?: () => void;
	onClose: () => void;
};

const ROOM_INTIAL_VALUE = {
	topic: '',
	tags: [],
	livechatData: {},
	slaId: '',
};

const getInitialValuesRoom = (room: Serialized<IOmnichannelRoom>): RoomEditFormData => {
    /* Implementation Hidden */
};

function RoomEdit({ room, visitor, reload, reloadInfo, onClose }: RoomEditProps) {
    /* Implementation Hidden */
}

export default RoomEdit;

```