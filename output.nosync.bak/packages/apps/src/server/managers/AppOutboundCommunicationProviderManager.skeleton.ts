## File: packages/apps/src/server/managers/AppOutboundCommunicationProviderManager.ts

```typescript
import type {
	IOutboundMessageProviders,
	IOutboundEmailMessageProvider,
	IOutboundPhoneMessageProvider,
	ValidOutboundProvider,
	IOutboundMessage,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import type { AppAccessorManager } from '.';
import type { AppManager } from '../AppManager';
import type { OutboundMessageBridge } from '../bridges';
import { OutboundMessageProvider } from './AppOutboundCommunicationProvider';
import { AppPermissionManager } from './AppPermissionManager';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissions } from '../permissions/AppPermissions';

export class AppOutboundCommunicationProviderManager {
	private readonly accessors: AppAccessorManager;

	private readonly bridge: OutboundMessageBridge;

	private outboundMessageProviders: Map<string, Map<ValidOutboundProvider, OutboundMessageProvider>>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	public isAlreadyDefined(providerId: string, providerType: ValidOutboundProvider): boolean {
        /* Implementation Hidden */
    }

	public addProvider(appId: string, provider: IOutboundMessageProviders): void {
        /* Implementation Hidden */
    }

	public async registerProviders(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unregisterProviders(appId: string, opts?: { keepReferences: boolean }): Promise<void> {
        /* Implementation Hidden */
    }

	private async registerPhoneProvider(appId: string, provider: IOutboundPhoneMessageProvider): Promise<void> {
        /* Implementation Hidden */
    }

	private async registerEmailProvider(appId: string, provider: IOutboundEmailMessageProvider): Promise<void> {
        /* Implementation Hidden */
    }

	private async unregisterProvider(appId: string, info: OutboundMessageProvider, opts?: { keepReferences: boolean }): Promise<void> {
        /* Implementation Hidden */
    }

	public getProviderMetadata(appId: string, providerType: ValidOutboundProvider) {
        /* Implementation Hidden */
    }

	public sendOutboundMessage(appId: string, providerType: ValidOutboundProvider, body: IOutboundMessage) {
        /* Implementation Hidden */
    }
}

```