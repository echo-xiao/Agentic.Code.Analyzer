## File: apps/meteor/tests/e2e/utils/omnichannel/custom-field.ts

```typescript
import type { ILivechatCustomField } from '@rocket.chat/core-typings';

import type { BaseTest } from '../test';

type CustomField = Omit<ILivechatCustomField, '_id' | '_updatedAt'> & { field: string };

export const removeCustomField = (api: BaseTest['api'], id: string) => {
    /* Implementation Hidden */
};

export const setVisitorCustomFieldValue = async (
	api: BaseTest['api'],
	params: { token: string; customFieldId: string; value: string; overwrite?: boolean },
) => {
    /* Implementation Hidden */
};

export const createCustomField = async (api: BaseTest['api'], overwrites: Partial<CustomField>) => {
    /* Implementation Hidden */
};

```