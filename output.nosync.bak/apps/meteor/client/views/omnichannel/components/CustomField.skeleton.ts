## File: apps/meteor/client/views/omnichannel/components/CustomField.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { InfoPanelField, InfoPanelLabel, InfoPanelText } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { FormSkeleton } from '../directory/components/FormSkeleton';

export type CustomFieldProps = {
	id: string;
	value: string;
};

const CustomField = ({ id, value }: CustomFieldProps) => {
    /* Implementation Hidden */
};

export default CustomField;

```