## File: apps/meteor/app/meteor-accounts-saml/server/definition/ILogoutResponseVariables.ts

```typescript
export interface ILogoutResponseVariables extends Record<string, string> {
	newId: string;
	instant: string;
	idpSLORedirectURL: string;
	issuer: string;
	identifierFormat: string;
	nameID: string;
	sessionIndex: string;
	inResponseToId: string;
}

```