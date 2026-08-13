## File: apps/meteor/client/views/omnichannel/contactInfo/hooks/useValidCustomFields.ts

```typescript
import type { ILivechatCustomField } from '@rocket.chat/core-typings';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { useCustomFieldsQuery } from '../../hooks/useCustomFieldsQuery';

const checkIsVisibleAndCorrectScope = (key: string, customFields: ILivechatCustomField[], scope: 'visitor' | 'room') => {
    /* Implementation Hidden */
};

export const useValidCustomFields = (userCustomFields: Record<string, string | unknown> | undefined, scope: 'visitor' | 'room') => {
    /* Implementation Hidden */
};

```