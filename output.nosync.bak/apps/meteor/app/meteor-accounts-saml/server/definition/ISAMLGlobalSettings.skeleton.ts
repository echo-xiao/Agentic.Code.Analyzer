## File: apps/meteor/app/meteor-accounts-saml/server/definition/ISAMLGlobalSettings.ts

```typescript
export interface ISAMLGlobalSettings {
	generateUsername: boolean;
	nameOverwrite: boolean;
	mailOverwrite: boolean;
	immutableProperty: string;
	defaultUserRole: string;
	userDataFieldMap: string;
	usernameNormalize: string;
	channelsAttributeUpdate: boolean;
	includePrivateChannelsInUpdate: boolean;
}

```