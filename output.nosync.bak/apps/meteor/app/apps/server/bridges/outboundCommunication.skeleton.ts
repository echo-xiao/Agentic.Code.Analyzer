## File: apps/meteor/app/apps/server/bridges/outboundCommunication.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { OutboundMessageBridge } from '@rocket.chat/apps/dist/server/bridges/OutboundMessagesBridge';
import type {
	IOutboundEmailMessageProvider,
	IOutboundMessageProviders,
	IOutboundPhoneMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import { getOutboundService } from '../../../livechat/server/lib/outboundcommunication';

export class OutboundCommunicationBridge extends OutboundMessageBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

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