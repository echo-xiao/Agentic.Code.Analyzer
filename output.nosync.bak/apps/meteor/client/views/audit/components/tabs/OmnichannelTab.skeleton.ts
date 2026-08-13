## File: apps/meteor/client/views/audit/components/tabs/OmnichannelTab.tsx

```typescript
import { Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage';
import type { UseFormReturn } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AutoCompleteAgent from '../../../omnichannel/components/AutoCompleteAgent';
import type { AuditFields } from '../../hooks/useAuditForm';
import VisitorAutoComplete from '../forms/VisitorAutoComplete';

export type OmnichannelTabProps = {
	form: UseFormReturn<AuditFields>;
};

const OmnichannelTab = ({ form: { control } }: OmnichannelTabProps) => {
    /* Implementation Hidden */
};

export default OmnichannelTab;

```