## File: apps/meteor/server/lib/OutboundMessageProvider.ts

```typescript
import type {
	IOutboundEmailMessageProvider,
	IOutboundMessageProviders,
	IOutboundPhoneMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';
import type { ValidOutboundProvider, IOutboundProvider, IOutboundMessageProvider } from '@rocket.chat/core-typings';

export class OutboundMessageProvider implements IOutboundMessageProvider {
	private readonly outboundMessageProviders: Map<ValidOutboundProvider, IOutboundMessageProviders[]>;

	constructor() {
        /* Implementation Hidden */
    }

	public findOneByProviderId(providerId: string) {
        /* Implementation Hidden */
    }

	public registerPhoneProvider(provider: IOutboundPhoneMessageProvider): void {
        /* Implementation Hidden */
    }

	public registerEmailProvider(provider: IOutboundEmailMessageProvider): void {
        /* Implementation Hidden */
    }

	public getOutboundMessageProviders(type?: ValidOutboundProvider): IOutboundProvider[] {
        /* Implementation Hidden */
    }

	public unregisterProvider(appId: string, providerType: ValidOutboundProvider): void {
        /* Implementation Hidden */
    }
}

```