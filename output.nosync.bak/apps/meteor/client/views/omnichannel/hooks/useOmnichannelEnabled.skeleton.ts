## File: apps/meteor/client/views/omnichannel/hooks/useOmnichannelEnabled.ts

```typescript
import { useOmnichannel } from './useOmnichannel';

export const useOmnichannelEnabled = (): boolean => useOmnichannel().enabled;

```