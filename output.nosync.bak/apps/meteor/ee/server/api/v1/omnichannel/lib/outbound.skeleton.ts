## File: apps/meteor/ee/server/api/v1/omnichannel/lib/outbound.ts

```typescript
import { Apps } from '@rocket.chat/apps';
import type {
	IOutboundProvider,
	ValidOutboundProvider,
	IOutboundMessageProviderService,
	IOutboundProviderMetadata,
	IOutboundMessage,
} from '@rocket.chat/core-typings';
import { ValidOutboundProviderList } from '@rocket.chat/core-typings';

import { getOutboundService } from '../../../../../../app/livechat/server/lib/outboundcommunication';
import { OutboundMessageProvider } from '../../../../../../server/lib/OutboundMessageProvider';

export class OutboundMessageProviderService implements IOutboundMessageProviderService {
	private readonly provider: OutboundMessageProvider;

	constructor() {
        /* Implementation Hidden */
    }

	get outboundMessageProvider() {
		return this.provider;
	}

	private isProviderValid(type: any): type is ValidOutboundProvider {
        /* Implementation Hidden */
    }

	public listOutboundProviders(type?: string): IOutboundProvider[] {
        /* Implementation Hidden */
    }

	public getProviderMetadata(providerId: string): Promise<IOutboundProviderMetadata> {
        /* Implementation Hidden */
    }

	private getProviderManager() {
        /* Implementation Hidden */
    }

	public sendMessage(providerId: string, message: IOutboundMessage) {
        /* Implementation Hidden */
    }
}

export const outboundMessageProvider = new OutboundMessageProviderService();

getOutboundService.patch(() => {
	return outboundMessageProvider;
});

```