## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomForm.tsx

```typescript
import { Box, Callout, Field, FieldLabel, FieldRow, FieldError, ButtonGroup, Button, ContextualbarFooter } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import type { Dispatch, SetStateAction } from 'react';
import { useId } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import RoomFormAttributeFields from './RoomFormAttributeFields';
import RoomFormAutocomplete from './RoomFormAutocomplete';
import RoomFormAutocompleteDummy from './RoomFormAutocompleteDummy';

export type RoomFormProps = {
	onClose: () => void;
	onSave: (data: RoomFormData) => void;
	roomInfo?: { rid: string; name: string };
	setSelectedRoomLabel: Dispatch<SetStateAction<string>>;
	redacted?: boolean;
};

export type RoomFormData = {
	room: string;
	attributes: { key: string; values: string[] }[];
};

const RoomForm = ({ onClose, onSave, roomInfo, setSelectedRoomLabel, redacted = false }: RoomFormProps) => {
    /* Implementation Hidden */
};

export default RoomForm;

```