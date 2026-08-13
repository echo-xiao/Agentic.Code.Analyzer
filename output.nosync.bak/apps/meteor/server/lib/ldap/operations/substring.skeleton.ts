## File: apps/meteor/server/lib/ldap/operations/substring.ts

```typescript
export type LDAPVariableSubString = {
	operation: 'substring';
	start: number;
	end?: number;
};

export function executeSubstring(input: string, operation: LDAPVariableSubString): string | undefined {
    /* Implementation Hidden */
}

```