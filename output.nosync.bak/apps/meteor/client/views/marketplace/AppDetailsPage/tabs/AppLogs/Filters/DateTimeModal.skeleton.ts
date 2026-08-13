## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/DateTimeModal.tsx

```typescript
import {
	Box,
	Button,
	Label,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalTitle,
} from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DateTimeFilter from './DateTimeFilter';

export type DateTimeModalFormData = {
	startDate?: string;
	startTime?: string;
	endDate?: string;
	endTime?: string;
};

export type DateTimeModalProps = {
	onClose: () => void;
	onSave: (value: DateTimeModalFormData) => void;
	confirmDisabled?: boolean;
	defaultValues?: DateTimeModalFormData;
};

export const DateTimeModal = ({ onSave, onClose, defaultValues }: DateTimeModalProps): ReactNode => {
    /* Implementation Hidden */
};

```