## File: apps/meteor/server/services/omnichannel-integrations/service.ts

```typescript
import { ServiceClassInternal, Settings } from '@rocket.chat/core-services';
import type { IOmnichannelIntegrationService } from '@rocket.chat/core-services';
import type { ISMSProviderConstructor, ISMSProvider } from '@rocket.chat/core-typings';

import { registerSmsProviders } from './providers';

export class OmnichannelIntegrationService extends ServiceClassInternal implements IOmnichannelIntegrationService {
	protected name = 'omnichannel-integration';

	private smsServices: Record<string, ISMSProviderConstructor> = {};

	registerSmsService(name: string, service: ISMSProviderConstructor) {
        /* Implementation Hidden */
    }

	constructor() {
        /* Implementation Hidden */
    }

	async getSmsService(name: string): Promise<ISMSProvider> {
        /* Implementation Hidden */
    }

	async isConfiguredSmsService(name: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```