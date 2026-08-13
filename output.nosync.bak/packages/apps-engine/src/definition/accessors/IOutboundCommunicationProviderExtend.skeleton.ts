## File: packages/apps-engine/src/definition/accessors/IOutboundCommunicationProviderExtend.ts

```typescript
import type { IOutboundEmailMessageProvider, IOutboundPhoneMessageProvider } from '../outboundCommunication';

export interface IOutboundCommunicationProviderExtend {
	registerPhoneProvider(provider: IOutboundPhoneMessageProvider): Promise<void>;
	registerEmailProvider(provider: IOutboundEmailMessageProvider): Promise<void>;
}

```