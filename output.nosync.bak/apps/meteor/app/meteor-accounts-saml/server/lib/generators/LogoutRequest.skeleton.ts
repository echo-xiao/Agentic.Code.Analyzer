## File: apps/meteor/app/meteor-accounts-saml/server/lib/generators/LogoutRequest.ts

```typescript
import type { ILogoutRequestVariables } from '../../definition/ILogoutRequestVariables';
import type { ISAMLRequest } from '../../definition/ISAMLRequest';
import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import { SAMLUtils } from '../Utils';
import { defaultIdentifierFormat, defaultLogoutRequestTemplate } from '../constants';

/*
	A Logout Request is used when the user is logged out of Rocket.Chat and the Service Provider is configured to also logout from the Identity Provider.
*/
export class LogoutRequest {
	static generate(serviceProviderOptions: IServiceProviderOptions, nameID: string, sessionIndex: string): ISAMLRequest {
        /* Implementation Hidden */
    }

	static getDataForNewRequest(
		serviceProviderOptions: IServiceProviderOptions,
		nameID: string,
		sessionIndex: string,
	): ILogoutRequestVariables {
        /* Implementation Hidden */
    }
}

```