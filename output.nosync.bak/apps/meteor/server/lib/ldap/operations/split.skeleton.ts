## File: apps/meteor/server/lib/ldap/operations/split.ts

```typescript
export type LDAPVariableSplit = {
	operation: 'split';
	pattern: string;
	indexToUse?: number;
};

export function executeSplit(input: string, operation: LDAPVariableSplit): string | undefined {
    /* Implementation Hidden */
}

```