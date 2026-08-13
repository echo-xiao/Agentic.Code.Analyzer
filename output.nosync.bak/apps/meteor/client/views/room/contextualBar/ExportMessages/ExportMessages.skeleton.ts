## File: apps/meteor/client/views/room/contextualBar/ExportMessages/ExportMessages.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { ButtonGroup, Button, Icon, InputBox, Callout } from '@rocket.chat/fuselage';
import { FieldError, Field, FieldLabel, FieldRow, TextAreaInput, FieldGroup, Select, TextInput } from '@rocket.chat/fuselage-forms';
import { useAutoFocus } from '@rocket.chat/fuselage-hooks';
import { validateEmail } from '@rocket.chat/tools';
import {
	ContextualbarHeader,
	ContextualbarScrollableContent,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { usePermission, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useContext, useEffect, useId, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useDownloadExportMutation } from './useDownloadExportMutation';
import { useExportMessagesAsPDFMutation } from './useExportMessagesAsPDFMutation';
import { useRoomExportMutation } from './useRoomExportMutation';
import UserAutoCompleteMultiple from '../../../../components/UserAutoCompleteMultiple';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { SelectedMessageContext, useCountSelected } from '../../MessageList/contexts/SelectedMessagesContext';
import { useRoom } from '../../contexts/RoomContext';

export type ExportMessagesFormValues = {
	type: 'email' | 'file' | 'download';
	dateFrom: string;
	dateTo: string;
	format: 'html' | 'json' | 'pdf';
	toUsers: string[];
	additionalEmails: string;
	messagesCount: number;
	subject: string;
};

const ExportMessages = () => {
    /* Implementation Hidden */
};

export default ExportMessages;

```