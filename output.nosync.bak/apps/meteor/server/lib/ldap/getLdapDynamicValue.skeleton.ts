## File: apps/meteor/server/lib/ldap/getLdapDynamicValue.ts

```typescript
import type { ILDAPEntry } from '@rocket.chat/core-typings';

import { getLdapString } from './getLdapString';
import { ldapKeyExists } from './ldapKeyExists';

export function getLdapDynamicValue(ldapUser: ILDAPEntry, attributeSetting: string | undefined): string | undefined {
    /* Implementation Hidden */
}

```