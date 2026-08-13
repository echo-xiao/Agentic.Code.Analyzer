## File: apps/meteor/client/views/room/webdav/SaveToWebdavModal.tsx

```typescript
import type { MessageAttachment, IWebdavAccount } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	Modal,
	Box,
	Button,
	FieldGroup,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	Select,
	Throbber,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useMethod, useSetting, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useState, useMemo, useEffect, useRef, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useWebDAVAccountIntegrationsQuery } from '../../../hooks/webdav/useWebDAVAccountIntegrationsQuery';
import { getWebdavServerName } from '../../../lib/getWebdavServerName';

type SaveToWebdavModalProps = {
	onClose: () => void;
	data: {
		attachment: MessageAttachment;
		url: string;
	};
};

const SaveToWebdavModal = ({ onClose, data }: SaveToWebdavModalProps) => {
    /* Implementation Hidden */
};
export default SaveToWebdavModal;

```