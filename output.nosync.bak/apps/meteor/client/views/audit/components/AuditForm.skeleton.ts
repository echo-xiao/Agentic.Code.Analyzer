## File: apps/meteor/client/views/audit/components/AuditForm.tsx

```typescript
import type { IAuditLog, IRoom } from '@rocket.chat/core-typings';
import { Box, Field, FieldLabel, FieldRow, FieldError, TextInput, Button, ButtonGroup } from '@rocket.chat/fuselage';
import type { Dispatch, SetStateAction } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { AuditFields } from '../hooks/useAuditForm';
import { useAuditForm } from '../hooks/useAuditForm';
import { useSendTelemetryMutation } from '../hooks/useSendTelemetryMutation';
import DateRangePicker from './forms/DateRangePicker';
import DirectTab from './tabs/DirectTab';
import OmnichannelTab from './tabs/OmnichannelTab';
import RoomsTab from './tabs/RoomsTab';
import UsersTab from './tabs/UsersTab';

export type AuditFormProps = {
	type: IAuditLog['fields']['type'];
	onSubmit?: (payload: { type: IAuditLog['fields']['type'] } & AuditFields) => void;
	setSelectedRoom: Dispatch<SetStateAction<IRoom | undefined>>;
};

const AuditForm = ({ type, onSubmit, setSelectedRoom }: AuditFormProps) => {
    /* Implementation Hidden */
};

export default AuditForm;

```