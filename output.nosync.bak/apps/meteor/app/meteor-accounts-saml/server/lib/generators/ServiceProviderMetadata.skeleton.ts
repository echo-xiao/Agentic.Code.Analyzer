## File: apps/meteor/app/meteor-accounts-saml/server/lib/generators/ServiceProviderMetadata.ts

```typescript
import { Meteor } from 'meteor/meteor';

import type { IMetadataVariables } from '../../definition/IMetadataVariables';
import type { IServiceProviderOptions } from '../../definition/IServiceProviderOptions';
import { SAMLUtils } from '../Utils';
import { defaultIdentifierFormat, defaultMetadataCertificateTemplate, defaultMetadataTemplate } from '../constants';

/*
	The metadata will be available at the following url:
	[rocketchat-url]/_saml/metadata/[provider-name]
*/

export class ServiceProviderMetadata {
	public static generate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static certificateTagTemplate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static metadataTemplate(serviceProviderOptions: IServiceProviderOptions): string {
        /* Implementation Hidden */
    }

	private static getData(serviceProviderOptions: IServiceProviderOptions): IMetadataVariables {
        /* Implementation Hidden */
    }
}

```