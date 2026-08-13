## File: apps/meteor/app/meteor-accounts-saml/server/lib/parsers/LogoutRequest.ts

```typescript
import xmldom from '@xmldom/xmldom';

import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import type { SAMLRedirectEnvelope } from '../../definition/SAMLEnvelope';
import type { ILogoutRequestValidateCallback } from '../../definition/callbacks';
import { SAMLUtils } from '../Utils';
import { validateRedirectSignature } from '../signature/validateRedirectSignature';

export class LogoutRequestParser {
	serviceProviderOptions: IServiceProviderOptions;

	constructor(serviceProviderOptions: IServiceProviderOptions) {
        /* Implementation Hidden */
    }

	public async validate(envelope: SAMLRedirectEnvelope<'SAMLRequest'>, callback: ILogoutRequestValidateCallback): Promise<void> {
        /* Implementation Hidden */
    }

	private verifySignature(envelope: SAMLRedirectEnvelope<'SAMLRequest'>): boolean {
        /* Implementation Hidden */
    }
}

```