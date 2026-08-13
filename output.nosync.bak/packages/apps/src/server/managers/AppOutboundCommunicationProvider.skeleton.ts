## File: packages/apps/src/server/managers/AppOutboundCommunicationProvider.ts

```typescript
import { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import type {
	IOutboundMessage,
	IOutboundMessageProviders,
	ProviderMetadata,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import type { AppAccessorManager } from '.';
import type { ProxiedApp } from '../ProxiedApp';
import { AppOutboundProcessError } from '../errors/AppOutboundProcessError';
import type { AppLogStorage } from '../storage';

export class OutboundMessageProvider {
	public isRegistered: boolean;

	constructor(
		public app: ProxiedApp,
		public provider: IOutboundMessageProviders,
	) {
        /* Implementation Hidden */
    }

	public async runGetProviderMetadata(logStorage: AppLogStorage, accessors: AppAccessorManager): Promise<ProviderMetadata> {
        /* Implementation Hidden */
    }

	public async runSendOutboundMessage(logStorage: AppLogStorage, accessors: AppAccessorManager, body: IOutboundMessage): Promise<void> {
        /* Implementation Hidden */
    }

	private async runTheCode<T = unknown>(
		method: AppMethod._OUTBOUND_GET_PROVIDER_METADATA | AppMethod._OUTBOUND_SEND_MESSAGE,
		_logStorage: AppLogStorage,
		_accessors: AppAccessorManager,
		runContextArgs: Array<any>,
	): Promise<T> {
        /* Implementation Hidden */
    }

	public setRegistered(registered: boolean): void {
        /* Implementation Hidden */
    }
}

```