## File: apps/meteor/server/lib/ldap/operations/fallback.ts

```typescript
import type { ILDAPEntry } from '@rocket.chat/core-typings';

import { getLdapDynamicValue } from '../getLdapDynamicValue';

export type LDAPVariableFallback = {
	operation: 'fallback';
	fallback: string;

	minLength?: number;
};

export function executeFallback(ldapUser: ILDAPEntry, input: string, operation: LDAPVariableFallback): string | undefined {
    /* Implementation Hidden */
}

```