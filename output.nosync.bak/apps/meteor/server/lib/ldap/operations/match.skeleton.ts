## File: apps/meteor/server/lib/ldap/operations/match.ts

```typescript
export type LDAPVariableMatch = {
	operation: 'match';
	pattern: string;
	regex?: boolean;
	flags?: string;
	indexToUse?: number;
	valueIfTrue?: string;
	valueIfFalse?: string;
};

export function executeMatch(input: string, operation: LDAPVariableMatch): string | undefined {
    /* Implementation Hidden */
}

```