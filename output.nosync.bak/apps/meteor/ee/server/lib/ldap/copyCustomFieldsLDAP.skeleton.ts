## File: apps/meteor/ee/server/lib/ldap/copyCustomFieldsLDAP.ts

```typescript
import type { IImportUser, ILDAPEntry } from '@rocket.chat/core-typings';
import type { Logger } from '@rocket.chat/logger';

import { replacesNestedValues } from './replacesNestedValues';
import { templateVarHandler } from '../../../../app/utils/lib/templateVarHandler';
import { getNestedProp } from '../../../../server/lib/getNestedProp';

export const copyCustomFieldsLDAP = (
	{
		ldapUser,
		userData,
		customFieldsSettings,
		customFieldsMap,
		syncCustomFields,
	}: {
		ldapUser: ILDAPEntry;
		userData: IImportUser;
		syncCustomFields: boolean;
		customFieldsSettings: string;
		customFieldsMap: string;
	},
	logger: Logger,
): void => {
    /* Implementation Hidden */
};

```