## File: apps/meteor/client/views/room/modals/ReportMessageModal/ReportMessageModal.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { TextAreaInput, FieldGroup, Field, FieldRow, FieldError, FieldLabel, FieldDescription, Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../../components/MarkdownText';
import MessageContentBody from '../../../../components/message/MessageContentBody';

type ReportMessageModalsFields = {
	description: string;
};

type ReportMessageModalProps = {
	onClose: () => void;
	message: IMessage;
};

const wordBreak = css`
	word-break: break-word;
`;

const ReportMessageModal = ({ message, onClose }: ReportMessageModalProps) => {
    /* Implementation Hidden */
};

export default ReportMessageModal;

```