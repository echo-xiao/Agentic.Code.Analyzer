## File: apps/meteor/client/views/omnichannel/directory/providers/ChatsProvider.tsx

```typescript
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';

import { ChatsContext, initialValues } from '../contexts/ChatsContext';
import { useDisplayFilters } from '../hooks/useDisplayFilters';

type ChatsProviderProps = {
	children: ReactNode;
};

const ChatsProvider = ({ children }: ChatsProviderProps) => {
    /* Implementation Hidden */
};

export default ChatsProvider;

```