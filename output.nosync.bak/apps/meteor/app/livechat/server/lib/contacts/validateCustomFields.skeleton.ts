## File: apps/meteor/app/livechat/server/lib/contacts/validateCustomFields.ts

```typescript
import type { AtLeast, ILivechatCustomField } from '@rocket.chat/core-typings';

import { trim } from '../../../../../lib/utils/stringUtils';
import { i18n } from '../../../../utils/lib/i18n';

export function validateCustomFields(
	allowedCustomFields: AtLeast<ILivechatCustomField, '_id'>[],
	customFields: Record<string, string | unknown>,
	{
		ignoreAdditionalFields = false,
		ignoreValidationErrors = false,
	}: { ignoreAdditionalFields?: boolean; ignoreValidationErrors?: boolean } = {},
): Record<string, string> {
    /* Implementation Hidden */
}

```