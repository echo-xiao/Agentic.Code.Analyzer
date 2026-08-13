## File: apps/meteor/client/views/omnichannel/hooks/useOmnichannelRouteConfig.ts

```typescript
import type { OmichannelRoutingConfig } from '@rocket.chat/core-typings';

import { useOmnichannel } from './useOmnichannel';

export const useOmnichannelRouteConfig = (): OmichannelRoutingConfig | undefined => useOmnichannel().routeConfig;

```