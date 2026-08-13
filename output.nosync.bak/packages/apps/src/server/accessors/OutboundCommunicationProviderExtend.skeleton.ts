## File: packages/apps/src/server/accessors/OutboundCommunicationProviderExtend.ts

```typescript
import type { IOutboundCommunicationProviderExtend } from '@rocket.chat/apps-engine/definition/accessors/IOutboundCommunicationProviderExtend';
import type {
	IOutboundPhoneMessageProvider,
	IOutboundEmailMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import type { AppOutboundCommunicationProviderManager } from '../managers/AppOutboundCommunicationProviderManager';

export class OutboundMessageProviderExtend implements IOutboundCommunicationProviderExtend {
	constructor(
		private readonly manager: AppOutboundCommunicationProviderManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public registerPhoneProvider(provider: IOutboundPhoneMessageProvider): Promise<void> {
        /* Implementation Hidden */
    }

	public registerEmailProvider(provider: IOutboundEmailMessageProvider): Promise<void> {
        /* Implementation Hidden */
    }
}

```