## File: apps/meteor/app/meteor-accounts-saml/server/lib/generators/AuthorizeRequest.ts

```typescript
import type { IAuthorizeRequestVariables } from '../../definition/IAuthorizeRequestVariables';
import type { ISAMLRequest } from '../../definition/ISAMLRequest';
import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import { SAMLUtils } from '../Utils';
import {
	defaultIdentifierFormat,
	defaultAuthnContext,
	defaultAuthRequestTemplate,
	defaultNameIDTemplate,
	defaultAuthnContextTemplate,
} from '../constants';

function resolveCustomAuthnContext(serviceProviderOptions: IServiceProviderOptions): string | undefined;
function resolveCustomAuthnContext(serviceProviderOptions: IServiceProviderOptions, defaultValue: string): string;
function resolveCustomAuthnContext(serviceProviderOptions: IServiceProviderOptions, defaultValue?: string): string | undefined {
    /* Implementation Hidden */
}

/*
	An Authorize Request is used to show the Identity Provider login form when the user clicks on the Rocket.Chat SAML login button
*/
export class AuthorizeRequest {
	public static generate(serviceProviderOptions: IServiceProviderOptions, credentialToken: string): ISAMLRequest {
        /* Implementation Hidden */
    }

	// The AuthorizeRequest template is split into three parts
	// This way, users don't need to change the template when all they want to do is remove the NameID Policy or the AuthnContext.
	// This also ensures compatibility with providers that were configured before the templates existed.
	private static authorizeRequestTemplate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static identifierFormatTagTemplate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static authnContextTagTemplate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static getDataForNewRequest(
		serviceProviderOptions: IServiceProviderOptions,
		credentialToken?: string,
	): IAuthorizeRequestVariables {
        /* Implementation Hidden */
    }
}

```