## File: apps/meteor/client/views/audit/components/tabs/UsersTab.tsx

```typescript
import { Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage';
import type { UseFormReturn } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import UserAutoCompleteMultiple from '../../../../components/UserAutoCompleteMultiple';
import type { AuditFields } from '../../hooks/useAuditForm';

export type UsersTabProps = {
	form: UseFormReturn<AuditFields>;
};

const UsersTab = ({ form: { control } }: UsersTabProps) => {
    /* Implementation Hidden */
};

export default UsersTab;

```