## File: packages/apps/src/server/bridges/OutboundMessagesBridge.ts

```typescript
import type {
	IOutboundEmailMessageProvider,
	IOutboundMessageProviders,
	IOutboundPhoneMessageProvider,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class OutboundMessageBridge extends BaseBridge {
	public async doRegisterPhoneProvider(info: IOutboundPhoneMessageProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doRegisterEmailProvider(info: IOutboundEmailMessageProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doUnRegisterProvider(info: IOutboundMessageProviders, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private hasProviderPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	protected abstract registerPhoneProvider(info: IOutboundPhoneMessageProvider, appId: string): Promise<void>;

	protected abstract registerEmailProvider(info: IOutboundEmailMessageProvider, appId: string): Promise<void>;

	protected abstract unRegisterProvider(info: IOutboundMessageProviders, appId: string): Promise<void>;
}

```