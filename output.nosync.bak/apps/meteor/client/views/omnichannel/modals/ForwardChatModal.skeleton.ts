## File: apps/meteor/client/views/omnichannel/modals/ForwardChatModal.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Field, FieldGroup, TextAreaInput, Box, Divider, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useRouter, useSetting, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback, useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LegacyRoomManager } from '../../../../app/ui-utils/client';
import AutoCompleteAgent from '../components/AutoCompleteAgent';
import AutoCompleteDepartment from '../components/AutoCompleteDepartment';

type ForwardChatModalFormData = {
	comment: string;
	department: string;
	username: string;
};

type ForwardChatModalProps = {
	room: IOmnichannelRoom;
	onCancel: () => void;
};

const ForwardChatModal = ({ room, onCancel }: ForwardChatModalProps) => {
    /* Implementation Hidden */
};

export default ForwardChatModal;

```