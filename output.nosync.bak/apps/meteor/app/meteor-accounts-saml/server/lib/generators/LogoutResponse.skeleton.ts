## File: apps/meteor/app/meteor-accounts-saml/server/lib/generators/LogoutResponse.ts

```typescript
import type { ILogoutResponse } from '../../definition/ILogoutResponse';
import type { ILogoutResponseVariables } from '../../definition/ILogoutResponseVariables';
import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import { SAMLUtils } from '../Utils';
import { defaultLogoutResponseTemplate, defaultIdentifierFormat } from '../constants';

/*
	A Logout Response is used when the Identity Provider (IdP) sends us a Logout Request.
*/
export class LogoutResponse {
	public static generate(
		serviceProviderOptions: IServiceProviderOptions,
		nameID: string,
		sessionIndex: string,
		inResponseToId: string,
	): ILogoutResponse {
        /* Implementation Hidden */
    }

	private static getDataForNewResponse(
		serviceProviderOptions: IServiceProviderOptions,
		nameID: string,
		sessionIndex: string,
		inResponseToId: string,
	): ILogoutResponseVariables {
        /* Implementation Hidden */
    }
}

```