## File: packages/core-typings/src/ldap/ILDAPLoginResult.ts

```typescript
export interface ILDAPLoginResult extends Record<string, any> {
	userId?: string;
}

export type LDAPLoginResult = ILDAPLoginResult | undefined;

```