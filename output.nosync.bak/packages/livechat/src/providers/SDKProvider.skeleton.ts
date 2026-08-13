## File: packages/livechat/src/providers/SDKProvider.tsx

```typescript
import type { DDPSDK } from '@rocket.chat/ddp-client';
import { createContext, type ComponentChildren } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

import { Livechat } from '../api';

type SDKContextValue = {
	sdk?: DDPSDK;
};

const SDKContext = createContext<SDKContextValue>({});

export const useSDK = () => {
    /* Implementation Hidden */
};

const SDKProvider = ({ children }: { serverURL: string; children: ComponentChildren }) => {
    /* Implementation Hidden */
};

export default SDKProvider;

```