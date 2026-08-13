## File: apps/meteor/client/views/omnichannel/additionalForms/DepartmentBusinessHours.tsx

```typescript
import { Field, FieldLabel, FieldRow, TextInput } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type DepartmentBusinessHoursProps = { bhId: string | undefined };

export const DepartmentBusinessHours = ({ bhId }: DepartmentBusinessHoursProps) => {
    /* Implementation Hidden */
};

export default DepartmentBusinessHours;

```