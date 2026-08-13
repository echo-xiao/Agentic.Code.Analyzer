## File: apps/meteor/client/views/audit/components/AppInfoField.tsx

```typescript
import { Skeleton } from '@rocket.chat/fuselage';
import { useEndpoint, useTranslation } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import AuditModalField from './AuditModalField';
import AuditModalLabel from './AuditModalLabel';
import AuditModalText from './AuditModalText';

export type AppInfoFieldProps = {
	appId: string;
};

// This is a separate component to encapsulate its logic and in the future expand it to a field that shows more info on the App
export const AppInfoField = ({ appId }: AppInfoFieldProps) => {
    /* Implementation Hidden */
};

```