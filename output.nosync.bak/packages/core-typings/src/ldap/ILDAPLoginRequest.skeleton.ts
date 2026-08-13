## File: packages/core-typings/src/ldap/ILDAPLoginRequest.ts

```typescript
export interface ILDAPLoginRequest {
	ldap?: boolean;
	ldapOptions?: Record<string, any>;
	username: string;
	ldapPass: string;
}

```