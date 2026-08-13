## File: apps/meteor/client/views/omnichannel/hooks/useOmnichannelAgentAvailable.ts

```typescript
import { useOmnichannel } from './useOmnichannel';

export const useOmnichannelAgentAvailable = (): boolean => useOmnichannel().agentAvailable;

```