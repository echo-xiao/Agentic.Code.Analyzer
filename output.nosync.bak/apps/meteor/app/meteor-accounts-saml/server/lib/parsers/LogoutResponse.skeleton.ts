## File: apps/meteor/app/meteor-accounts-saml/server/lib/parsers/LogoutResponse.ts

```typescript
import xmldom from '@xmldom/xmldom';

import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import type { SAMLRedirectEnvelope } from '../../definition/SAMLEnvelope';
import type { ILogoutResponseValidateCallback } from '../../definition/callbacks';
import { SAMLUtils } from '../Utils';
import { validateRedirectSignature } from '../signature/validateRedirectSignature';

export class LogoutResponseParser {
	serviceProviderOptions: IServiceProviderOptions;

	constructor(serviceProviderOptions: IServiceProviderOptions) {
        /* Implementation Hidden */
    }

	public async validate(envelope: SAMLRedirectEnvelope<'SAMLResponse'>, callback: ILogoutResponseValidateCallback): Promise<void> {
        /* Implementation Hidden */
    }

	private verifySignature(envelope: SAMLRedirectEnvelope<'SAMLResponse'>): boolean {
        /* Implementation Hidden */
    }
}

```