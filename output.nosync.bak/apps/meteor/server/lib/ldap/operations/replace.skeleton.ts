## File: apps/meteor/server/lib/ldap/operations/replace.ts

```typescript
export type LDAPVariableReplace = {
	operation: 'replace';
	pattern: string;
	regex?: boolean;
	flags?: string;
	all?: boolean;
	replacement: string;
};

export function executeReplace(input: string, operation: LDAPVariableReplace): string {
    /* Implementation Hidden */
}

```