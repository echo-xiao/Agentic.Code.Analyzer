## File: apps/meteor/app/meteor-accounts-saml/server/definition/ILogoutRequestVariables.ts

```typescript
export interface ILogoutRequestVariables extends Record<string, string> {
	newId: string;
	instant: string;
	idpSLORedirectURL: string;
	issuer: string;
	identifierFormat: string;
	nameID: string;
	sessionIndex: string;
}

```