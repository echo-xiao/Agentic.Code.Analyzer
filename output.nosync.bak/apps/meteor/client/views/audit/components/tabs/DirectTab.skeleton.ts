## File: apps/meteor/client/views/audit/components/tabs/DirectTab.tsx

```typescript
import { Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage';
import type { UseFormReturn } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import UserAutoCompleteMultiple from '../../../../components/UserAutoCompleteMultiple';
import type { AuditFields } from '../../hooks/useAuditForm';

export type DirectTabProps = {
	form: UseFormReturn<AuditFields>;
};

const DirectTab = ({ form: { control } }: DirectTabProps) => {
    /* Implementation Hidden */
};

export default DirectTab;

```