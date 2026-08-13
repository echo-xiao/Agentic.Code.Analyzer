## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/ExportLogsModal.tsx

```typescript
import {
	Box,
	Button,
	Field,
	FieldLabel,
	FieldRow,
	Label,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalTitle,
	NumberInput,
	RadioButton,
} from '@rocket.chat/fuselage';
import { useRouteParameter } from '@rocket.chat/ui-contexts';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { AppLogsFilterFormData } from '../useAppLogsFilterForm';

export type ExportLogsModalProps = {
	onClose: () => void;
	filterValues: AppLogsFilterFormData;
	onConfirm: (url: string) => void;
};

type FormDataType = {
	type: 'json' | 'csv';
	count: 'max' | 'custom';
	customExportAmount: number;
};

export const ExportLogsModal = ({ onClose, filterValues, onConfirm }: ExportLogsModalProps) => {
    /* Implementation Hidden */
};

```