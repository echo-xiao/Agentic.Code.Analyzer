## File: apps/meteor/client/lib/onClientMessageReceived.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { createAsyncTransformChain } from '../../lib/transforms';

export const onClientMessageReceived = createAsyncTransformChain<IMessage>();

```