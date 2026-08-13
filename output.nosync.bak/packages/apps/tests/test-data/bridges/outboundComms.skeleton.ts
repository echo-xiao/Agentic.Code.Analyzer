## File: packages/apps/tests/test-data/bridges/outboundComms.ts

```typescript
import type {
	IOutboundEmailMessageProvider,
	IOutboundMessageProviders,
	IOutboundPhoneMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import { OutboundMessageBridge } from '../../../src/server/bridges';

export class TestOutboundCommunicationBridge extends OutboundMessageBridge {
	protected async registerPhoneProvider(provider: IOutboundPhoneMessageProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async registerEmailProvider(provider: IOutboundEmailMessageProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async unRegisterProvider(provider: IOutboundMessageProviders, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```