## File: apps/meteor/tests/mocks/client/FakeChatProvider.tsx

```typescript
import type { ReactNode } from 'react';

import { ChatContext } from '../../../client/views/room/contexts/ChatContext';
import { createFakeSubscription } from '../data';

type FakeChatProviderProps = {
	children?: ReactNode;
};

const FakeChatProvider = ({ children }: FakeChatProviderProps) => {
    /* Implementation Hidden */
};

export default FakeChatProvider;

```